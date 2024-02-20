import React, { useState, useEffect } from "react";
import NavbarLeft from "../Categories/NavbarLeft";
import HeaderCategorie from "../Header/HeaderCategorie";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
// import isAlpha from 'validator/lib/isAlpha';
import validator from 'validator';
import { useNavigate } from "react-router-dom";
import { HTTP } from "../../regle";
// import { ToastContainer, toast } from 'react-toastify';


const Country = () => {
    const navigate = useNavigate();
    const [country, setCountry] = useState("");
    const [PriceWeight, setPriceWeight] = useState("");
    const [PriceDimension, setPriceDimension] = useState("");
    const [CountryList, setCountryList] = useState([]);
    const [value, setValue] = useState("");

    const navigateToShipping = (id) => {
        navigate('/shippingfees/' + id);
    };
    async function create_country(e) {
        e.preventDefault();
        try {
            const response =
                await axios.post(HTTP+"country", {
                    "name": country,
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

    useEffect(() => {
        async function getCountryList() {
            const response = await axios.get(HTTP+"country")
            console.log(response);
            if (response.status === 200) {
                setCountryList(response.data);
            }
        }
        getCountryList();
    }, [])

    const delete_country = async (id) => {
        const del = confirm('Êtes-vous sûr de vouloir supprimer ce pays ?');

        if (del == true) {
            const response = await axios.delete(HTTP+"country/" + id)
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

    const edit_country = async (id) => {
        const Edit = confirm('Êtes-vous sûr de vouloir modifier ce pays ?');

        if (Edit == true) {
            if (!validator.isAlpha(value)) {
                const response = await axios.put(HTTP+"country/" + id, {
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

    // if (!edit) {
    return (
        <>
            <div>
                <HeaderCategorie />
                <div className="flex">
                    <NavbarLeft />
                    <div className="bg-zinc-300 w-4/5 mx-auto h-screen">
                        <h1 className="text-5xl pt-4 pl-7">Pays</h1>
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
                                <button className="bg-[#264ACB] rounded-lg h-12 w-28 mt-12 text-lg ml-16 cursor-pointer text-white" type="submit" value="Valider" onClick={create_country}>Ajouter</button>
                            </div>
                        </div>
                        <div>
                            {
                                CountryList.map((item) => {
                                    return (
                                        <div key={item.id}>
                                            <h1 className="px-2 py-1 rounded mb-3 mx-14 w-3/5 my-7 text-black font-medium">{item.name}</h1>
                                            <input type="submit" value="Voir" className="bg-[#4ae65c] rounded-lg h-10 w-28 text-lg text-white cursor-pointer ml-14 mr-6" onClick={() => navigateToShipping(item.id)} />
                                            <input type="submit" value="Supprimer" className="bg-[#B22222] rounded-lg h-10 w-28 text-lg text-white cursor-pointer" onClick={() => delete_country(item.id)} />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
    // } else {
    //     return (
    //         <>
    //             <div>
    //                 <HeaderCategorie />
    //                 <div className="flex">
    //                     <NavbarLeft />
    //                     <div className="left-72 top-[150px] absolute text-3xl font-normal">
    //                         <ToastContainer
    //                             position="top-right"
    //                             autoClose={5000}
    //                             hideProgressBar={false}
    //                             newestOnTop={false}
    //                             closeOnClick
    //                             rtl={false}
    //                             pauseOnFocusLoss
    //                             draggable
    //                             pauseOnHover
    //                             theme="dark"
    //                         />
    //                         <div key={edit.id} className="bg-zinc-300 h-screen pt-16">
    //                             <label className="text-black ml-16">Modifier les frais de port pour la {edit.country}</label>
    //                             <input className="border border-gray-400 bg-white px-2 py-1 rounded mb-3 mx-14 w-3/5 my-7" placeholder="Prix poids" type="number" onChange={(e) => setValue(e.target.value)} />
    //                             <input className="border border-gray-400 bg-white px-2 py-1 rounded mb-3 mx-14 w-3/5 my-7" placeholder="Prix taille" type="number" onChange={(e) => setPriceDimension(e.target.value)} />
    //                             <input type="submit" className="bg-[#264ACB] rounded-lg h-12 w-28 text-lg text-white cursor-pointer mr-7" value="Enregister" onClick={() => edit_delivery(edit.id)} />
    //                             <input type="submit" className="bg-[#B22222] rounded-lg h-12 w-28 text-lg text-white cursor-pointer" value="Annuler" onClick={() => setEdit(false)} />
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         </>
    //     );
    // }
}

export default Country;