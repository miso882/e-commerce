import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavbarLeft from "../Categories/NavbarLeft";
import HeaderCategorie from "../Header/HeaderCategorie";
import axios from "axios";
import { HTTP } from "../../regle";

const Stocks = () => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(HTTP + "items");
                console.log(response.data);
                setData(response.data);
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }, []);

    async function deleteItem(dataId: number) {
        console.log(dataId);
        try {
            const response = await axios.delete(HTTP + `items/${dataId}`);
            if (response.status === 404) {
                alert("Something went wrong");
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="w-full">
            <HeaderCategorie />
            <div className="flex">
                <NavbarLeft />
                <div className="bg-zinc-300 w-4/5 mx-auto mt-5 p-5 h-screen">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {data.map((item: any) => (
                            <div key={item.id} className="bg-white p-3">
                                <div className="flex flex-row">
                                    <img
                                        className="w-24 h-24 object-cover rounded-md"
                                        src={`http://145.239.142.113:4031/${item.image1}`}
                                        alt="Icon"
                                    />
                                    <div className="flex flex-col ml-2">
                                        <h4 className="font-black text-black mb-1">
                                            {item.name}
                                        </h4>
                                        <div className="price flex items-center">
                                            <p className="text-black">
                                                {item.price}€
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex mt-2 items-center justify-between">
                                    <div className="flex items-center">
                                        {item.stock !== 0 ? (
                                            <div className="flex items-center">
                                                <img
                                                    src="/check.png"
                                                    className="w-4 h-4 mr-1"
                                                    alt="Check Icon"
                                                />
                                                <strong className="text-green-700">
                                                    {item.stock} en stock
                                                </strong>
                                            </div>
                                        ) : (
                                            <div className="flex items-center">
                                                <img
                                                    src="/false.png"
                                                    className="w-4 h-4 mr-1"
                                                    alt="False"
                                                />
                                                <strong className="text-red-600">
                                                    Plus d'article en stock
                                                </strong>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex">
                                        <Link
                                            to={`/produit/${item.id}`}
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-xs mr-1"
                                        >
                                            Modifier produit
                                        </Link>
                                        <button
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-xs"
                                            onClick={() => {
                                                deleteItem(item.id);
                                            }}
                                        >
                                            Supprimer produit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center mt-5">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-xs mr-1"
                            disabled={page <= 1}
                            onClick={() => setPage(page - 1)}
                        >
                            Page précédente
                        </button>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-xs"
                            disabled={page >= totalPages}
                            onClick={() => setPage(page + 1)}
                        >
                            Page suivante
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Stocks;
