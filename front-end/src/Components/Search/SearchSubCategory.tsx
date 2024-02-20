import { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { Cards } from "../Cards/Cards";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ArticleInterface } from "../../Interface";
import { HTTP } from "../../regle";
import Breadcrumbs from "../BreadCrumbs/BreadCrumbs";
const SearchSubCategories = () => {
    const { itemName } = useParams();
    const { subcategoryId } = useParams();
    const [data, setData] = useState([]);
    const [subcategory, setSubCategory] = useState([]);

    useEffect(() => {
        async function getItemByName() {
            const response = await axios.get(
                HTTP+"subcategories/" + subcategoryId
            );
            if (response.status !== 404) {
                if (response.data) {
                    setSubCategory(response.data);
                    console.log(response.data);
                    const responseData = response.data.item.filter(
                        (item: ArticleInterface) =>
                            item.name.includes(itemName || "")
                    );
                    setData(responseData);
                }
            }
        }
        getItemByName();
    }, [itemName, subcategoryId]);
    return (
        <>
            <div className="bg-[#DDDDDD] pt-6">
                <Header />
                <Breadcrumbs category={subcategory.category} sub={subcategory} search={itemName} />
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

export default SearchSubCategories;
