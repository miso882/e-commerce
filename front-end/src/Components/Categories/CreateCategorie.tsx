import React, { useState, useContext, useEffect } from "react";
import "./Categories.module.sass";
import NavbarLeft from "./NavbarLeft";
import axios from "axios";
import isAlpha from "validator/lib/isAlpha";
import validator from "validator";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HTTP } from "../../regle";
import Header from "../Header/Header";
import HeaderCategorie from "../Header/HeaderCategorie";
import SubCategories from "../SubCategories/SubCategories";
import Footer from "../Footer/Footer";

const CreateCategorie = () => {
    const [categorie, setCategorie] = useState("");
    const [subcategory, setSubCategory] = useState("");
    const [categoriesList, setCategoriesList] = useState([]);
    const [mod, setMod] = useState(false);
    const [value, setValue] = useState("");

    useEffect(() => {
        async function getCategoriesList() {
            const response = await axios.get(HTTP + "categories");
            if (response.status === 200) {
                setCategoriesList(response.data);
            }
        }
        getCategoriesList();
    }, []);

    async function submit(e) {
        e.preventDefault();
        try {
            const response = axios.all([
                await axios.post(
                    HTTP + "categories",
                    {
                        name: categorie,
                    },
                    {
                        headers: {
                            Authorization: `Bearer `,
                        },
                    }
                ),
            ]);
            await axios.post(
                HTTP + "subcategories",
                {
                    name: subcategory,
                },
                {
                    headers: {
                        Authorization: `Bearer `,
                    },
                }
            );
        } catch (e) {
            console.log(e.response.data);
        }
    }

    const dilete = async (id) => {
        let bar = confirm("Êtes-vous sûr de supprimer cette catégorie ?");

        if (bar == true) {
            console.log("yes");
            console.log(id);
            const response = await axios
                .delete(HTTP + "categories/" + id)
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            console.log("non");
        }
    };

    const modifier = async (id) => {
        let bar = confirm("Êtes-vous sûr de modifier cette catégorie ?");

        if (bar == true) {
            if (value != "") {
                console.log("yes");
                const response = await axios
                    .put(
                        HTTP + "categories/" + id,
                        {
                            name: value,
                        },
                        {
                            headers: {
                                Authorization: `Bearer `,
                            },
                        }
                    )
                    .then((res) => {
                        console.log(res);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } else {
                toast.warn("Failed", {
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
            console.log("non");
        }
    };

    if (!mod) {
        return (
            <>
                <div className="w-full">
                    <HeaderCategorie />
                    <div>
                        <NavbarLeft />
                        <div className="left-72 top-[150px] absolute text-3xl font-normal bg-zinc-300">
                            <div className="mb-7">
                                <label className="text-black ml-16">
                                    Créer une catégorie :
                                </label>
                                {/* <br /> */}
                                <input
                                    type="text"
                                    className="border border-gray-400 px-2 py-1 rounded mb-16 mx-14 w-2/6 my-7  text-black"
                                    onInput={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => {
                                        setCategorie(e.target.value);
                                    }}
                                    value={categorie}
                                />
                                <button
                                    className="bg-[#264ACB] rounded-lg h-12 w-28 mt-12 text-lg ml-16 cursor-pointer text-white"
                                    type="submit"
                                    value="Valider"
                                    onClick={submit}
                                >
                                    Valider
                                </button>
                            </div>

                            <div>
                                <div className="mb-16">
                                    <SubCategories />
                                </div>
                                <div className="overflow-y-auto h-[500px]">
                                    {categoriesList.map((item) => {
                                        return (
                                            <div className="">
                                                <input
                                                    className="border border-gray-400 bg-white px-2 py-1 rounded mb-3 mx-14 w-3/5 my-7"
                                                    type="text"
                                                    disabled
                                                    value={item.name}
                                                />
                                                <input
                                                    type="submit"
                                                    value="Modifier"
                                                    className="bg-[#264ACB] rounded-lg h-7 w-28 text-lg text-white cursor-pointer"
                                                    onClick={() => setMod(item)}
                                                />
                                                <input
                                                    type="submit"
                                                    value="Supprimer"
                                                    className="bg-[#B22222] rounded-lg h-7 w-28 text-lg text-white cursor-pointer ml-7"
                                                    onClick={() =>
                                                        dilete(item.id)
                                                    }
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <>
                <Header />
                <div>
                    <NavbarLeft />
                    <div className="left-72 top-[350px] absolute text-3xl font-normal bg-zinc-400 w-screen">
                        <label className="text-black ml-16">
                            Créer une catégorie :
                        </label>
                        {/* <br /> */}
                        <input
                            type="text"
                            className="border border-gray-400 px-2 py-1 rounded mb-3 mx-14 w-1/2 my-7 text-black"
                            onInput={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                setCategorie(e.target.value);
                            }}
                            value={categorie}
                        />
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
                        <button
                            className="bg-[#264ACB] rounded-lg h-12 w-28 mt-12 text-lg ml-16 cursor-pointer"
                            type="submit"
                            value="Valider"
                            onClick={submit}
                        >
                            Valider
                        </button>

                        <div>
                            <label className="text-black ml-16">
                                Modifier la catégorie {mod.name}
                            </label>
                            <input
                                className="border border-gray-400 bg-white px-2 py-1 rounded mb-3 mx-14 w-3/5 my-7"
                                type="text"
                                onChange={(e) => setValue(e.target.value)}
                            />
                            <input
                                type="submit"
                                className="bg-[#264ACB] rounded-lg h-12 w-28 text-lg text-white cursor-pointer"
                                value="Enregister"
                                onClick={() => modifier(mod.id)}
                            />
                            <input
                                type="submit"
                                className="bg-[#B22222] rounded-lg h-12 w-28 text-lg text-white cursor-pointer"
                                value="Annuler"
                                onClick={() => setMod(false)}
                            />
                        </div>
                    </div>
                </div>
            </>
        );
    }
};

export default CreateCategorie;
