import { AiOutlineDollarCircle } from "react-icons/ai";
import "./Cards.css";
import { ArticleInterface } from "../../Interface";
import { Link } from "react-router-dom";
export const Cards = ({id, name, shortdescription, price, image1, stock}) => {
    
    return (
        <div className={`flip-card px-2 py-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/5 h-80 bg-white rounded
        ${
            stock === 0 ? "bg-gray-100 filter brightness-50" : ""
        }
        `}>
        <div className="flip-card-inner relative w-full h-full">
            <div className="flip-card-front mt-7">
                <div className="flex justify-center m-auto">
                    <img
                        src={"http://145.239.142.113:4031/"+image1}
                        className="img-card rounded-md w-48 h-2/ 5mt-2 aspect-square object-cover"
                        alt="RTX 3080"
                    />
                </div>

                <div className="body-card flex justify-between items-center  mt-3 mb-3 ml-3 ">
                    <div className="card-title">
                        <h4 className=" text-black fonyyy-bold text-lg">{name}</h4>
                    </div>

                    <div className="price flex items-center">
                        <p className="font-black font-mono text-black">{price}</p>
                        <div className="price-icon m-1 text-black " >
                            €
                        </div>
                    </div>
                </div>
            </div> 
            <div className="flip-card-back bg-[#DDDDDD] rounded text-black px-4 py-2  w-auto">
                <p className="title font-black text-lg text-black">Description: </p>
                <p className="text-sm mb-1">
                    {shortdescription}
                </p>
                {
                        stock != 0 ? (
                            <>
                        <strong className="text-green-700">Il y a {stock} en stock</strong>
                        </>
                        ) : (
                            <>
                        <strong className="text-red-600">Plus d'article en stock</strong>
                            </>
                        )
                    }
                <Link to={`/article/${id}`}>
                <button  className="flex justify-center item-center m-auto cursor-pointer duration-200 hover:scale-125 active:scale-100" title="Add New">
                    <svg className="stroke-blue-300 fill-blue-100" viewBox="0 0 24 24" height="30px" width="30px" xmlns="http://www.w3.org/2000/svg">
                        <path strokeWidth={"1.5"} d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"></path>
                        <path strokeWidth={"1.5"} d="M8 12H16"></path>
                        <path strokeWidth={"1.5"} d="M12 16V8"></path>
                    </svg>
                </button>
                </Link>
            </div>   
        </div>   
    </div>
    );
};
