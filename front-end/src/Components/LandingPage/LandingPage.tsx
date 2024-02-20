import React, { useState, useEffect } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { Carousel } from "../Carousel/Carousel";
import { Cards } from "../Cards/Cards";
import axios, { AxiosResponse } from "axios";
import { useAuth } from "../../Context";
import { HTTP, HTTPS } from "../../regle";
import Breadcrumbs from "../BreadCrumbs/BreadCrumbs";

const LandingPage = () => {
    const [data, setData] = useState([]);
    const [sortOrder, setSortOrder] = useState("AtoZ");

    useEffect(() => {
        async function fetchData() {
            try {
                await axios
                    .get(HTTPS + "items")
                    .then((response: AxiosResponse) => {
                        response.data.length = 20;
                        setData(response.data);
                    });
            } catch (e) {
                console.log;
            }
        }
        fetchData();
    }, []);

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
                <Carousel />
                <Breadcrumbs />

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
                    {sortedData.map((data: any) => (
                        <Cards
                            key={data.id}
                            id={data.id}
                            name={data.name}
                            shortdescription={data.shortdescription}
                            description={data.description}
                            image1={data.image1}
                            image2={data.image2}
                            image3={data.image3}
                            image4={data.image4}
                            price={data.price}
                            stock={data.stock}
                        />
                    ))}
                </div>

            </div>
        </>
    );
};

export default LandingPage;
