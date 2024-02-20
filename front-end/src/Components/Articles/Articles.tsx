import React, { useState } from "react";
import { AiOutlineDollarCircle, AiOutlineEuro } from "react-icons/ai";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Header from "../Header/Header";
import Breadcrumbs from "../BreadCrumbs/BreadCrumbs";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context";

Modal.setAppElement("#root");

export const Articles = (props) => {
    const data = props.item;
    const images = props.item.image;
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const [notifyMe, setNotifyMe] = useState(false);
    const { user } = useAuth();
    const handleAddToCart = () => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingItem = cart.find((item) => item.id === data.id);
        if (existingItem) {
            existingItem.quantity += selectedQuantity;
        } else {
            cart.push({ ...data, quantity: selectedQuantity });
        }
        localStorage.setItem("cart", JSON.stringify(cart));
    };

    const toggleNotifyMe = () => {
        setNotifyMe(!notifyMe);
    };

    return (
        <div>
            <Breadcrumbs
                category={data.category}
                sub={data.subcategory}
                item={data}
            />
            <div
                className={`bg-zinc bg-gray-300 mx-3 md:mx-24 rounded flex flex-col md:flex-row justify-center mt-7 h-auto ${data.stock === 0 ? "bg-gray-100 filter brightness-50" : ""
                    }`}
            >
                <div className="w-full md:w-6/12 md:flex md:flex-col ml-12 mt-7 md:mr-12">
                    <Carousel
                        swipeable={true}
                        centerMode={false}
                        dynamicHeight={true}
                    >
                        <div>
                            <img
                                src={
                                    "http://145.239.142.113:4031/" + data.image1
                                }
                                alt={data.name}
                            />
                        </div>
                        {images.map((item) => (
                            <div key={item.id}>
                                <img
                                    src={
                                        "http://145.239.142.113:4031/" +
                                        item.url
                                    }
                                />
                            </div>
                        ))}
                    </Carousel>
                </div>
                <div className="w-full md:w-6/12 md:ml-7 mr-1">
                    <div className="flex ml-3 mb-3flex-col md:flex-row justify-between mb-4">
                        <p className="text-black mt-8">
                            <strong>{data.name}</strong>
                        </p>
                        <p className="text-black mt-4 md:mt-8 md:ml-4 mr-12 flex items-center">
                            {data.price}
                            <AiOutlineEuro className="text-black ml-2" />
                        </p>
                    </div>
                    {
                        user.role == "ROLE_ADMIN" ? <Link className="text-red-900" to={"/produit/"+data.id}>Modifier le produit dans le panel admin</Link>: <></>
                    }
                    <div className="bg-gray-200 rounded mt-5 md:mt-0 md:mr-9 h-auto p-3.5">
                        <p className="text-black items-center">
                            <strong>Description:</strong>
                            <br />
                            {data.description}
                        </p>
                    </div>
                    <div className="md:flex items-center justify-around">
                        {data.stock || data.stock === 0 ? (
                            data.stock !== 0 ? (
                                <>
                                    <img
                                        src="/check.png"
                                        className="w-8 h-8 m-4"
                                    />
                                    <strong className="text-green-700">
                                        Il y a {data.stock} articles en stock
                                    </strong>
                                </>
                            ) : (
                                <>
                                    <strong className="text-red-600">
                                        Plus d'article en stock
                                    </strong>
                                    <div className="flex flex-col md:flex-row items-center mt-2 mb-2 md:mr-9 ">
                                        <button
                                            onClick={toggleNotifyMe}
                                            className="bg-gradient-to-r from-sky-700 to-sky-800 hover:from-sky-800 hover:to-sky-900 text-white rounded-md text-sm px-6 py-2 "
                                        >
                                            Notifiez-moi
                                        </button>
                                    </div>
                                </>
                            )
                        ) : (
                            <></>
                        )}
                    </div>
                    {data.stock !== 0 && (
                        <div className="flex flex-col md:flex-row items-center justify-between mt-2 mb-2 md:mr-9">
                            Quantité:
                            <input
                                type="number"
                                min={1}
                                max={data.stock}
                                onChange={(e) =>
                                    setSelectedQuantity(Number(e.target.value))
                                }
                                className="bg-gray-200 rounded-md shadow-md w-12"
                            />
                            <button
                                onClick={handleAddToCart}
                                className="bg-gradient-to-r from-sky-700 to-sky-800 hover:from-sky-800 hover:to-sky-900 text-white rounded-md text-sm px-6 py-2 "
                            >
                                Ajouter au panier
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};