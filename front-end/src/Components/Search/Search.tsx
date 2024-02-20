import React, { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { Cards } from "../Cards/Cards";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ArticleInterface } from "../../Interface";
import { HTTP } from "../../regle";
import Breadcrumbs from "../BreadCrumbs/BreadCrumbs";

const Search = () => {
    const { itemName } = useParams();
    const { categoryId } = useParams();
    const [data, setData] = useState([]);
    const [sortOrder, setSortOrder] = useState("AtoZ"); // Added sortOrder state

    useEffect(() => {
        async function getItemByName() {
            const response = await axios.get(HTTP + "items");
            if (response.status !== 404) {
                if (response.data) {
                    const responseData = response.data.filter(
                        (item: ArticleInterface) =>
                            item.name.includes(itemName || "")
                    );
                    setData(responseData);
                }
            }
        }
        getItemByName();
    }, [itemName, categoryId]);

    // Sorting logic
    const sortedData = data.slice().sort((a, b) => {
        if (sortOrder === "AtoZ") {
            return a.name.localeCompare(b.name);
        } else if (sortOrder === "ZtoA") {
            return b.name.localeCompare(a.name);
        }
        return 0;
    });

    return (
        <>
            <div className="bg-[#b4b2b2] pt-6">
                <Header />
                <Breadcrumbs search={itemName} />
                <div className="flex justify-center mt-4 space-x-4">
                    <button
                        className={`${
                            sortOrder === "AtoZ" ? "bg-gray-800 text-white" : ""
                        } px-4 py-2 rounded-md`}
                        onClick={() => setSortOrder("AtoZ")}
                    >
                        Trier de A à Z
                    </button>
                    <button
                        className={`${
                            sortOrder === "ZtoA" ? "bg-gray-800 text-white" : ""
                        } px-4 py-2 rounded-md`}
                        onClick={() => setSortOrder("ZtoA")}
                    >
                        Trier de Z à A
                    </button>
                </div>

                <div className="flex justify-center flex-wrap mt-10 gap-x-6 gap-y-8">
                    {sortedData.map((item: ArticleInterface) => (
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
            </div>
        </>
    );
};

export default Search;
