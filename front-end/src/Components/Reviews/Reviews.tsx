import React, { useState } from "react";
import "../../App.css";
// const Star = () => {
//     return <span className="star">&#9733;</span>;
// };
const StarRating = () => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    return (
        <div className="star-rating flex">
            {[...Array(5)].map((star, index) => {
                index += 1;
                return (
                    <button
                        type="button"
                        key={index}
                        className={index <= (hover || rating) ? "on" : "off"}
                        onClick={() => setRating(index)}
                        onMouseEnter={() => setHover(index)}
                        onMouseLeave={() => setHover(rating)}
                    >
                        <span className="star">&#9733;</span>
                    </button>
                );
            })}
        </div>
    );
};

const Reviews = () => {
    return (
        <div className="bg-zinc-300 mx-3 md:mx-24 rounded flex flex-col md:flex-row justify-center mt-7 h-5/6">
            <div className="bg-white rounded p-14 mx-7 my-7 flex flex-col md:flex-row items-center w-5/6">
                <div className="flex flex-col justify-between md:mr-4 mb-4 md:mb-0">
                    <strong className="mr-4">Note Générale</strong>
                    <p className="mb-2 mt-3">50 avis</p>
                </div>
                <div className="md:ml-auto flex mt-5">
                    <div className="avis flex items-center justify-center">
                        <StarRating />
                    </div>
                </div>
                <button className="ml-auto mt-4 px-6 py-2 bg-gradient-to-r from-sky-800 to-sky-900 hover:from-sky-800 hover:to-sky-900 text-white rounded-md text-sm">
                    Donner votre avis
                </button>
            </div>
        </div>
    );
};
export default Reviews;