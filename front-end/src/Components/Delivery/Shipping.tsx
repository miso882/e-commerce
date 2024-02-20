import React, { useState, useEffect, Fragment } from "react";
import NavbarLeft from "../Categories/NavbarLeft";
import HeaderCategorie from "../Header/HeaderCategorie";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import isAlpha from 'validator/lib/isAlpha';
import validator from 'validator';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { HTTP } from "../../regle";


const Shipping = () => {
    const [country, setCountry] = useState("");
    const [PriceWeight, setPriceWeight] = useState("");
    const [PriceDimension, setPriceDimension] = useState("");
    const [DeliveryName, setDeliveryName] = useState("");
    const [DeliveryDelay, setDeliveryDelay] = useState("");
    const [ShippingFeesList, setShippingFeesList] = useState([]);
    
    const [edit, setEdit] = useState(false);
    const [value, setValue] = useState("");
    const navigate = useNavigate();

    const navigateToCountry = (id) => {
        navigate('/shippingfees/' + id);
    };


    useEffect(() => {
        async function getShippingFeesList() {
            const response = await axios.get(HTTP+"shippingfees")
            console.log(response);
            if (response.status === 200) {
                setShippingFeesList(response.data);
            }
        }
        getShippingFeesList();
    }, [])

    async function create_delivery(e) {
        e.preventDefault();
        try {
            const response = 
            // axios.all([
                await axios.post(HTTP+"shippingfees", {
                    "name": country,
                    "PriceWeight": parseInt(PriceWeight),
                    "PriceDimension": parseInt(PriceDimension),
                    "DeliveryName": DeliveryName,
                    "DeliveryDelay": parseInt(DeliveryDelay)
                },
                    {
                        headers: {
                            "Authorization": `Bearer `,
                        },
                    }
                )
            console.log(response);
        } catch (e) {
            console.log(e.response.data)
        }
    }

    const delete_delivery = async (id) => {
        const del = confirm('Êtes-vous sûr de vouloir supprimer cette méthode de livraison ?');

        if (del == true) {
            const response = await axios.delete(HTTP+"shippingfees/" + id)
                .then((res) => {
                    console.log(res)
                })
                .catch((err) => {
                    console.log(err.response.data);
                });

        } else {
            console.log("non")
        }
    }

    const edit_delivery = async (id) => {
        const Edit = confirm('Êtes-vous sûr de vouloir modifier les frais de port ?');

        if (Edit == true) {
            if (!validator.isAlpha(value)) {
                const response = await axios.put(HTTP+"shippingfees/" + id, {
                    "PriceWeight": parseInt(value),
                    "PriceDimension": parseInt(PriceDimension),
                },
                    {
                        headers: {
                            "Authorization": `Bearer `,
                        },
                    })
                    .then((res) => {
                        console.log(res)
                    })
                    .catch((err) => {
                        console.log(err.response.data);
                    });
            } else {
                toast.warn('Erreur', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        } else {
            console.log("no")
        }
    }

    if (!edit) {
        return (
            <>
                <div>
                    <HeaderCategorie />
                    <div className="flex">
                        <NavbarLeft />
                        <div className="bg-zinc-300 w-4/5 mx-auto h-screen">
                            <h1 className="text-5xl pt-4 pl-7">Livraison</h1>
                            <div className="bg-zinc-300 p-3 mt-10">
                                <div className="space-x-0 md:space-x-5 flex">
                                    <input
                                        type="text"
                                        placeholder="Pays"
                                        onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            setCountry(e.target.value);
                                        }}
                                        value={country}
                                        className="bg-white rounded-[5px] w-full md:w-4/12 px-2 py-1"
                                    />
                                    <input
                                        type="number"
                                        placeholder="Prix au kg"
                                        name="PriceWeight"
                                        onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            setPriceWeight(e.target.value);
                                        }}
                                        value={PriceWeight}
                                        className="bg-white rounded-[5px] w-full md:w-1/5 px-2 py-1 mt-2 md:m-0"
                                    />
                                    <input
                                        type="number"
                                        placeholder="Prix dimension"
                                        name="PriceDimension"
                                        onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            setPriceDimension(e.target.value);
                                        }}
                                        value={PriceDimension}
                                        className="bg-white rounded-[5px] w-full md:w-1/5 px-2 py-1 mt-2 md:m-0"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Transporteur"
                                        name="DeliveryName"
                                        onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            setDeliveryName(e.target.value);
                                        }}
                                        value={DeliveryName}
                                        className="bg-white rounded-[5px] w-full md:w-1/5 px-2 py-1 mt-2 md:m-0"
                                    />
                                    <input
                                        type="number"
                                        placeholder="Délais de livraison"
                                        onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            setDeliveryDelay(e.target.value);
                                        }}
                                        value={DeliveryDelay}
                                        className="bg-white rounded-[5px] w-full md:w-1/5 px-2 py-1 mt-2 md:m-0"
                                    />
                                    <button className="bg-[#264ACB] rounded-lg h-12 w-28 mt-12 text-lg ml-16 cursor-pointer text-white" type="submit" value="Valider" onClick={create_delivery}>Valider</button>
                                </div>
                            </div>
                            <div>
                                {
                                    ShippingFeesList.map((item) => {
                                        return (
                                            <Fragment key={item.id}>
                                            <div key={item.id}>
                                                <input type="submit" value="Voir" className="bg-[#4ae65c] rounded-lg h-10 w-28 text-lg text-white cursor-pointer ml-14 mr-6" onClick={() => navigateToCountry(item.id)} />
                                                <input type="submit" value="Supprimer" className="bg-[#B22222] rounded-lg h-10 w-28 text-lg text-white cursor-pointer" onClick={() => delete_delivery(item.id)} />
                                            </div>
                                            </Fragment>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <>
                <div>
                    <HeaderCategorie />
                    <div className="flex">
                        <NavbarLeft />
                        <div className="left-72 top-[150px] absolute text-3xl font-normal">
                            <ToastContainer
                                position="top-right"
                                autoClose={5000}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                                theme="dark"
                            />
                            <div key={edit.id} className="bg-zinc-300 h-screen pt-16">
                                <label className="text-black ml-16">Modifier les frais de port pour la {edit.country}</label>
                                <input className="border border-gray-400 bg-white px-2 py-1 rounded mb-3 mx-14 w-3/5 my-7" placeholder="Prix poids" type="number" onChange={(e) => setValue(e.target.value)} />
                                <input className="border border-gray-400 bg-white px-2 py-1 rounded mb-3 mx-14 w-3/5 my-7" placeholder="Prix taille" type="number" onChange={(e) => setPriceDimension(e.target.value)} />
                                <input type="submit" className="bg-[#264ACB] rounded-lg h-12 w-28 text-lg text-white cursor-pointer mr-7" value="Enregister" onClick={() => edit_delivery(edit.id)} />
                                <input type="submit" className="bg-[#B22222] rounded-lg h-12 w-28 text-lg text-white cursor-pointer" value="Annuler" onClick={() => setEdit(false)} />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Shipping;