import { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { Cards } from "../Cards/Cards";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ArticleInterface } from "../../Interface";
import { HTTP } from "../../regle";
import Breadcrumbs from "../BreadCrumbs/BreadCrumbs";
const SearchCategories = () => {
    const { itemName } = useParams();
    const { categoryId } = useParams();
    const [category, setCategory] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        async function getItemByName() {
            const response = await axios.get(
                HTTP+"categories/" + categoryId
            );

            if (response.status !== 404) {
                if (response.data) {
                    setCategory(response.data)
                    const responseData = response.data.items.filter(
                        (item: ArticleInterface) =>
                            item.name.includes(itemName || "")
                    );
                    setData(responseData);
                }
            }
        }
        getItemByName();
    }, [itemName, categoryId]);
    return (
        <>
            <div className="bg-[#DDDDDD] pt-6">
                <Header />
                    <Breadcrumbs category={category} search={itemName}/>
                <div className="flex justify-center flex-wrap mt-10 gap-x-6 gap-y-8">

                    {data.map((item: ArticleInterface) => (
                        <Cards
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            shortdescription={item.shortdescription}
                            description={item.description}
                            image1={item.image1}
                            price={item.price}
                            stock={item.stock}
                        />
                    ))}
                </div>
                <Footer />
            </div>
        </>
    );
};

export default SearchCategories;
