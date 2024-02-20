import React, { useState, useEffect, Fragment } from "react";
import NavbarLeft from "../Categories/NavbarLeft";
import HeaderCategorie from "../Header/HeaderCategorie";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { HTTP } from "../../regle";

export const CaracteristiquePage = () => {
    let { id } = useParams();
    const navigate = useNavigate();
    const [namecaracteristique, setName] = useState("");
    const [valuecaracteristique, setValue] = useState("");
    const [caracter, getCaracteristique] = useState("");
    const [compatibles, setCompatibles] = useState([]);
    const [compatiblesItem, setCompatiblesItem] = useState([]);
    const [addCompatible, setAddCompatible] = useState(0);
    const [refresh, setRefresh] = useState(false);

    async function getItem() {
        const response = await axios.get(HTTP + "items/" + id);
        if (response.status === 200) {
            getCaracteristique(response.data);
            setCompatiblesItem(response.data.compatibles);
        }
    }
    function Images(id) {
        navigate("/images/" + id);
    }
    useEffect(() => {
        async function getItem() {
            const response = await axios.get(HTTP + "items/" + id);
            if (response.status === 200) {
                console.log(response.data);
                getCaracteristique(response.data);
                setCompatiblesItem(response.data.compatibles);
            }
        }
        getItem();
        async function getCompatibles() {
            const response = await axios.get(HTTP + "compatible");
            if (response.status === 200) {
                console.log(response.data);
                setCompatibles(response.data);
            }
        }
        getCompatibles();
    }, [refresh]);

    async function addNewCompatible(addCompatible: number) {
        setRefresh(true);
        const request = {
            idItem: id,
        };
        await axios.put(HTTP + "compatible/" + addCompatible, request);
        setRefresh(false);
    }

    const addcaracteristique = async () => {
        const response = await axios
            .post(HTTP + "caracteristique", {
                name: namecaracteristique,
                value: valuecaracteristique,
                item: id,
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const dilete = async (id) => {
        const bar = confirm("Êtes-vous sûr de supprimer cette caractéristique ?");

        if (bar == true) {
            console.log("yes");
            console.log(id);
            const response = await axios
                .delete(HTTP + "caracteristique/" + id)
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
    const deleteCompatible = async (idCompatible) => {
        const bar = confirm("Êtes-vous sûr de supprimer cette compatibilité ?");

        if (bar == true) {
        setRefresh(true);
            const response = await axios
                .put(HTTP + "compatible/" + idCompatible, {
                    removeItemId: id,
                })
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        setRefresh(false);
    };

    return (
        <div className=" bg-[#203742]">
            <HeaderCategorie />
            <div className="flex">
                <NavbarLeft />
                <div className="mt-5">
                    <div className="bg-zinc-200 mb-4 w-6/7 py-2 rounded-[5px]">
                        <div>
                            <label className="text-black p-2">Compatibilité:</label>
                            <select
                                onChange={(e) => setAddCompatible(e.target.value)}
                                name="compatible"
                            >
                                <option
                                    selected
                                    label="Empty"
                                    disabled
                                ></option>
                                {compatibles.map((item) => {
                                    return (
                                        <Fragment key={item.id}>
                                            <option
                                                value={item.id}
                                                label={item.name + "  /  " + item.describe}
                                            ></option>
                                        </Fragment>
                                    );
                                })}
                            </select>
                            <button
                                className="bg-gradient-to-r from-sky-700 to-sky-800 hover:from-sky-800 hover:to-sky-900 text-white rounded-md text-sm px-3 py-2 my-7 mr-3"
                                onClick={() => {
                                    addNewCompatible(addCompatible);
                                }}
                            >
                                Ajouter
                            </button>
                        </div>
                        <div>
                            <div>
                                <>
                                    {compatiblesItem ? (
                                        <>
                                            <div className="p-2">
                                                <table>
                                                    <thead>
                                                        <tr>
                                                            <th
                                                                colSpan={1}
                                                                className="p-2"
                                                            >
                                                                Compatibilité ajouté:{" "}
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {compatiblesItem.map(
                                                            (item) => {
                                                                console.log(item);
                                                                return (
                                                                    <tr
                                                                        key={item.id}
                                                                    >
                                                                        <td className="border border-gray-900 p-2 ">
                                                                            {
                                                                                item.name
                                                                            }
                                                                        </td>
                                                                        <td style={{backgroundColor: item.value}} className="border border-gray-900 p-2 ">
                                                                        </td>
                                                                        <td className="border border-gray-900 p-2 ">
                                                                            {
                                                                                item.describe
                                                                            }
                                                                        </td>
                                                                        <input
                                                                            type="submit"
                                                                            value="Supprimer"
                                                                            className="bg-[#B22222] rounded-lg h-12 w-28 text-lg text-white cursor-pointer ml-3 mt-2"
                                                                            onClick={() => {
                                                                                deleteCompatible(
                                                                                    item.id
                                                                                );
                                                                                getItem();
                                                                            }}
                                                                        />
                                                                    </tr>
                                                                );
                                                            }
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </>
                                    ) : (
                                        <div></div>
                                    )}
                                </>
                            </div>

                            <label className="text-black p-2">
                                Caractéristiques:
                            </label>
                            <input
                                type="text"
                                className="border border-gray-400 rounded w-2/7 px-2 py-1"
                                placeholder="Name"
                                onChange={(e) => setName(e.target.value)}
                            />
                            <input
                                type="text"
                                className="border border-gray-400 rounded w-2/7 px-2 py-1"
                                placeholder="Value"
                                onChange={(e) => setValue(e.target.value)}
                            />
                            <button
                                className="bg-gradient-to-r from-sky-700 to-sky-800 hover:from-sky-800 hover:to-sky-900 text-white rounded-md text-sm px-3 py-2 my-7 mr-3"
                                onClick={() => {
                                    addcaracteristique();
                                    getItem();
                                }}
                            >
                                Ajouter
                            </button>
                        </div>

                        <div>
                            <>
                                {caracter ? (
                                    <div className="p-2">
                                        {console.log(caracter)}
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th colSpan={2} className="p-2">
                                                        Caractéristiques ajouté:{" "}
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {caracter.caracteristiques.map(
                                                    (item) => {
                                                        console.log(item);
                                                        return (
                                                            <tr key={item.id}>
                                                                <td className="border border-gray-900 p-2 ">
                                                                    {item.name}
                                                                </td>
                                                                <td className="border border-gray-400 p-2 ">
                                                                    {item.value}
                                                                </td>
                                                                <input
                                                                    type="submit"
                                                                    value="Supprimer"
                                                                    className="bg-[#B22222] rounded-lg h-12 w-28 text-lg text-white cursor-pointer ml-3 mt-2"
                                                                    onClick={() => {
                                                                        dilete(
                                                                            item.id
                                                                        );
                                                                        getItem();
                                                                    }}
                                                                />
                                                            </tr>
                                                        );
                                                    }
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div></div>
                                )}
                            </>
                        </div>

                        <button
                            type="submit"
                            onClick={() => Images(id)}
                            className="bg-gradient-to-r from-sky-700 to-sky-800 hover:from-sky-800 hover:to-sky-900 text-white rounded-md text-sm px-3 py-2 my-7 mr-36"
                        >
                            Gérer les images
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
