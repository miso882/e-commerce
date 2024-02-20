import React, { useState, useContext, useEffect } from "react";
import "../Categories/Categories.module.sass";
import NavbarLeft from "../Categories/NavbarLeft";
import axios from "axios";
import HeaderCategorie from "../Header/HeaderCategorie";
import isAlpha from "validator/lib/isAlpha";
import validator from "validator";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HTTP } from "../../regle";

const SubCategories = () => {
    const [subcategory, setSubCategory] = useState("");
    const [categoriesList, setCategoriesList] = useState([]);
    const [subCategoriesList, setSubCategoriesList] = useState([]);
    const [categorieId, setCategorieId] = useState("");
    const [mod, setMod] = useState(false);
    const [value, setValue] = useState("");
    const [OtherCategorieId, setOtherCategorieId] = useState("");

    useEffect(() => {
        async function getCategoriesList() {
            const response = await axios.get(HTTP + "categories");
            if (response.status === 200) {
                setCategoriesList(response.data);
            }
        }
        getCategoriesList();
    }, []);

    async function getSubCategoriesList(theprops) {
        const response = await axios.get(HTTP + "categories/" + theprops);
        if (response.status === 200) {
            setSubCategoriesList(response.data);
        }
    }

    async function submit(e) {
        e.preventDefault();
        if (categorieId == "") {
            return;
        }
        try {
            console.log(categorieId);
            const response = await axios.post(
                HTTP + "subcategories",
                {
                    name: subcategory,
                    category: parseInt(categorieId),
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
        let bar = confirm("Êtes-vous sûr de supprimer cette spus-catégorie ?");

        if (bar == true) {
            console.log("yes");
            console.log(id);
            const response = await axios
                .delete(HTTP + "subcategories/" + id)
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
        let bar = confirm("Êtes-vous sûr de modifier cette sous-catégorie ?");

        if (bar == true) {
            if (validator.isAlpha(value)) {
                if (OtherCategorieId) {
                    const response = await axios
                        .put(
                            HTTP + "subcategories/" + id,
                            {
                                name: value,
                                idCategory: parseInt(OtherCategorieId),
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
                    console.log("tontontontotntot");
                    const response = await axios
                        .put(
                            HTTP + "subcategories/" + id,
                            {
                                name: value,
                                idCategory: parseInt(categorieId),
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
                }
            } else {
                toast.warn("Concentre toi mon reuf", {
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

    return (
        <>
            <div className="bg-[#D9D9D9] flex">
                <div className="text-3xl border-l border-black  font-normal">
                    <label className="text-black ml-16">
                        Créer une sous-catégorie :
                    </label>
                    <br />
                    <select
                        className="border border-gray-400 px-2 py-1 rounded mb-3 mx-14 w-4/5 my-7"
                        onChange={(e) => {
                            setCategorieId(e.target.value);
                            getSubCategoriesList(e.target.value);
                        }}
                    >
                        <option disabled value={""} selected>
                            Catégorie
                        </option>
                        {categoriesList.map((item) => {
                            return <option value={item.id}>{item.name}</option>;
                        })}
                    </select>
                    <input
                        type="text"
                        className="border border-gray-400 px-2 py-1 rounded mb-3 mx-14 w-2/4 my-7 text-black"
                        onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setSubCategory(e.target.value);
                        }}
                        value={subcategory}
                        placeholder="Nom de la sous-catégorie"
                    />
                    <button
                        className="bg-[#264ACB] rounded-lg h-12 w-28 text-lg text-white cursor-pointer"
                        type="submit"
                        value="Valider"
                        onClick={submit}
                    >
                        Valider
                    </button>
                    {/* <select className="border border-gray-400 px-2 py-1 rounded mb-3 mx-14 w-4/5 my-7">
                        <option value="lorem">Sous-catégorie</option>
                        {
                            subCategoriesList.map((item) => {
                                return (
                                    <option value={item.id}>{item.name}</option>
                                    )
                                })
                            }
                        </select> */}
                    <ul>
                        {mod == false ? (
                            subCategoriesList.subcategories ? (
                                <>
                                    {subCategoriesList.subcategories.map(
                                        (item) => {
                                            console.log(item);
                                            return (
                                                <div>
                                                    <li
                                                        className="border border-gray-400 bg-white px-2 py-1 rounded mb-3 mx-14 w-4/5 my-7"
                                                        value={item.id}
                                                    >
                                                        {item.name}
                                                    </li>
                                                    <input
                                                        type="submit"
                                                        value="Modifier"
                                                        className="bg-[#264ACB] rounded-lg h-12 w-28 text-lg text-white cursor-pointer"
                                                        onClick={() =>
                                                            setMod(item)
                                                        }
                                                    />
                                                    <input
                                                        type="submit"
                                                        value="Supprimer"
                                                        className="bg-[#B22222] rounded-lg h-12 w-28 text-lg text-white cursor-pointer"
                                                        onClick={() =>
                                                            dilete(item.id)
                                                        }
                                                    />
                                                </div>
                                            );
                                        }
                                    )}
                                </>
                            ) : (
                                <li className="border border-gray-400 bg-white px-2 py-1 rounded mb-3 mx-14 w-4/5 my-7">
                                    Pas de cate
                                </li>
                            )
                        ) : (
                            <div>
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
                                <label className="text-black ml-16">
                                    Modifier la sous-catégorie {mod.name}
                                </label>
                                <input
                                    className="border border-gray-400 bg-white px-2 py-1 rounded mb-3 mx-14 w-3/5 my-7"
                                    type="text"
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                />
                                <select
                                    className="border border-gray-400 px-2 py-1 rounded mb-3 mx-14 w-1/5 my-7"
                                    onChange={(e) => {
                                        setOtherCategorieId(e.target.value);
                                        getSubCategoriesList(e.target.value);
                                    }}
                                >
                                    <option disabled value={""} selected>
                                        Catégorie
                                    </option>
                                    {categoriesList.map((item) => {
                                        return (
                                            <option value={item.id}>
                                                {item.name}
                                            </option>
                                        );
                                    })}
                                </select>
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
                        )}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default SubCategories;
