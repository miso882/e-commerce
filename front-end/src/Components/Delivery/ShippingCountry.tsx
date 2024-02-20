import React, { useState, useEffect } from "react";
import NavbarLeft from "../Categories/NavbarLeft";
import HeaderCategorie from "../Header/HeaderCategorie";
import { useParams } from 'react-router-dom';
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import isAlpha from 'validator/lib/isAlpha';
import validator from 'validator';
import { ToastContainer, toast } from 'react-toastify';
import { HTTP } from "../../regle";


const ShippingCountry = () => {

    let { id } = useParams();
    const [PriceWeight, setPriceWeight] = useState("");
    const [DeliveryName, setDeliveryName] = useState("");
    const [DeliveryDelay, setDeliveryDelay] = useState("");
    const [CountryList, setCountryList] = useState([]);
    const [ShippingFeesList, setShippingFeesList] = useState([]);
    const [currentShipping, setCurrentShipping] = useState([]);
    const [edit, setEdit] = useState(false);
    const [value, setValue] = useState("");
    const [refresh, setRefresh] = useState(false);


    async function submit(e) {
        e.preventDefault();
        try {
            setRefresh(true);
            const response = await axios.post(HTTP+"shippingfees", {
                "PriceWeight": parseInt(PriceWeight),
                "DeliveryName": DeliveryName,
                "DeliveryDelay": parseInt(DeliveryDelay),
                "idCountry": parseInt(id)
            }
            )
            setRefresh(false);
            console.log(response);
            setDeliveryName("");
            setDeliveryDelay("");
            setPriceWeight("");
        } catch (e) {
            console.log(e.response.data)
        }
    }

   

    useEffect(() => {
        async function getCountryList() {
            const response = await axios.get(HTTP+"country/"+id )
            console.log(response);
            if (response.status === 200) {
                setCountryList(response.data);
                setShippingFeesList(response.data.delivery)
            }
        }
        getCountryList();
    }, [id, refresh])

    const delete_delivery = async (ide) => {
        const del = confirm('Êtes-vous sûr de vouloir supprimer ce pays ?');
        if (del == true) {
            setRefresh(true)
            const response = await axios.delete(HTTP+"shippingfees/" + ide)
                .then((res) => {
                    console.log(res)
                    setRefresh(false);
                   
                })
                .catch((err) => {
                    console.log(err.response.data);
                });

        } else {
            console.log("non")
        }
    }

    const edit_delivery = async (ide) => {
        const Edit = confirm('Êtes-vous sûr de vouloir modifier les frais de port ?');

        if (Edit == true) {
            if (!validator.isAlpha(value)) {
                setRefresh(true);
                const response = await axios.put(HTTP+"shippingfees/" + ide, {
                    "PriceWeight": parseInt(value),
                },
                    {
                        headers: {
                            "Authorization": `Bearer `,
                        },
                    })
                    .then((res) => {
                        console.log(res)
                        setRefresh(false)
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
                            <div className="bg-zinc-300 p-3 mt-10">
                                <h1 className="text-2xl pt-4">Ajouter un autre transporteur :</h1>
                                <div className="space-x-0 md:space-x-5 flex">
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
                                        placeholder="Délais de livraison"
                                        onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            setDeliveryDelay(e.target.value);
                                        }}
                                        value={DeliveryDelay}
                                        className="bg-white rounded-[5px] w-full md:w-1/5 px-2 py-1 mt-2 md:m-0"
                                    />
                                    <button className="bg-[#264ACB] rounded-lg h-12 w-28 mt-12 text-lg ml-16 cursor-pointer text-white" type="submit" onClick={submit}>Valider</button>
                                </div>
                            </div>
                            <h1 className="px-2 py-1 mb-3 mx-14 my-7 text-black font-medium text-3xl">{CountryList.name} :</h1>
                            <select className="border border-gray-400 px-2 py-1 rounded mb-3 mx-14 w-4/5 my-7" onChange={(e) => {
                                setCurrentShipping(JSON.parse(e.target.value));
                                console.log(currentShipping);
                            }}>
                                <option disabled value={""} selected>Transporteur</option>
                                {
                                    ShippingFeesList.map((item) => {
                                        return (
                                            <option key={item.id} value={JSON.stringify(item)} >{item.DeliveryName}</option>
                                        )
                                    })
                                }
                            </select>
                            {
                                currentShipping ?
                                    <>
                                        <ul>
                                            <li className="border border-gray-400 bg-white px-2 py-1 rounded mb-3 mx-14 w-3/5 my-7 text-black">Prix kg : {currentShipping.PriceWeight}</li>
                                            <li className="border border-gray-400 bg-white px-2 py-1 rounded mb-3 mx-14 w-3/5 my-7 text-black">Délais de livraison : {currentShipping.DeliveryDelay}</li>
                                        </ul>
                                    </>
                                    : <></>
                            }
                            <input type="submit" value="Modifier" className="bg-[#264ACB] rounded-lg h-10 w-28 text-lg text-white cursor-pointer mr-6 ml-14" onClick={() => setEdit(currentShipping)} />
                            <input type="submit" value="Supprimer" className="bg-[#B22222] rounded-lg h-10 w-28 text-lg text-white cursor-pointer mr-6 ml-14" onClick={() => delete_delivery(currentShipping.id)} />
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
                                <label className="text-black ml-16">Modifier les frais de port pour la {CountryList.name}</label>
                                <input className="border border-gray-400 bg-white px-2 py-1 rounded mb-3 mx-14 w-3/5 my-7" placeholder="Prix poids" type="number" onChange={(e) => setValue(e.target.value)} />
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

export default ShippingCountry;