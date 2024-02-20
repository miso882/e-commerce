import React, { useState, useEffect } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { Carousel } from "../Carousel/Carousel";
import { Cards } from "../Cards/Cards";
import axios, { AxiosResponse } from "axios";
import { useAuth } from "../../Context";
import { HTTP, HTTPS } from "../../regle";
import Breadcrumbs from "../BreadCrumbs/BreadCrumbs";
import { useParams } from "react-router-dom";

const SubcategoryPage = () => {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [items, setItems] = useState([]);
    useEffect(() => {
        async function fetchData() {
            try {
                await axios
                    .get(HTTPS + "categories/" + id)
                    .then((response: AxiosResponse) => {
                        console.log(response.data);
                        setData(response.data);
                        setItems(response.data.items);
                    });
            } catch (e) {
                console.log;
            }
        }
        fetchData();
    }, [id]);

    return (
        <>
            <div className="bg-[#b4b2b2] pt-6">
                <Header />
                <Breadcrumbs category={data} />
                <div className="flex justify-center flex-wrap mt-10 gap-x-6 gap-y-8">
                    {items.map((data: any) => (
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

export default SubcategoryPage;
