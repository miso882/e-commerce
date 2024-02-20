import React, { useState, useEffect, Fragment } from "react";
import NavbarLeft from "../Categories/NavbarLeft";
import HeaderCategorie from "../Header/HeaderCategorie";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Caracteristique } from "../Caracteristique/Caracteristique";
import { HTTP } from "../../regle";

export const ImagesEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [oldImagesList, setOldImagesList] = useState([]);
    const [newImagesList, setNewImagesList] = useState();
    const [refreshList, setRefreshed] = useState(true);
    useEffect(() => {
        async function getItem() {
            console.log("jsuisla");
            const response = await axios.get(
                HTTP+"items/" + id
            );
            if (response.status === 200) {
                setOldImagesList(response.data.image);
            }
        }
        getItem();
    }, [id, refreshList]);
    function Caracteristique(id) {
        navigate("/caracteristique/" + id);
    }
    async function sendImage(image) {
        const data = new FormData();
        for (let i = 0; i < image.length; i++) {
            data.append("images" + i, image[i]);
        }
        data.append("images", image.length);
        data.append("idItem", id);
        try {
            await axios.post(HTTP+"images", data, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return;
        } catch (error) {
            console.log(error);
        }
        return;
    }
    const imageTable = async (inputFile) => {
        const tempArray = [];
        for (let i = 0; i < inputFile.files.length; i++) {
            tempArray.push(inputFile.files[i]);
        }
        await sendImage(tempArray);
        setRefreshed(true);
    };
    const dilete = async (idItem) => {
        const notify = confirm("Êtes-vous sûr de supprimer cette image ?");
        if (notify == true) {
            const response = await axios.delete(
                HTTP+"images/" + idItem
            );
            setRefreshed(true);
        } else {
            console.log("non");
        }
    };
    return (
        <div className="">
            <HeaderCategorie />
            <div className="flex">
                <NavbarLeft />
                <div className="mt-5 w-full">
                    <div className="bg-zinc-200 mb-4 py-2 w-12/12 rounded-[5px]">
                        <h1>Ajouter des images :</h1>
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={(e) => {
                                setNewImagesList(e.target);
                            }}
                            name="New images"
                        />
                        <input
                            type="submit"
                            value="Envoyer"
                            className="bg-[#35ff23] rounded-lg h-12 w-full text-lg text-white cursor-pointer mt-5"
                            onClick={() => {
                                imageTable(newImagesList);
                                setRefreshed(false);
                            }}
                        />
                        <br />
                        <h2>Images ajoutées : </h2>
                        <div className="flex flex-wrap align-flex items-end m-auto justify-between w-12/12">
                            {oldImagesList.map((item) => {
                                return (
                                    <Fragment key={item.id}>
                                        <div className="w-32 mb-2 border-2 ">
                                            <div>
                                                <img
                                                    className="w-full  m-auto"
                                                    src={
                                                        "http://145.239.142.113:4031/" +
                                                        item.url
                                                    }
                                                ></img>
                                            </div>
                                            <div>
                                                <input
                                                    type="submit"
                                                    value="Supprimer"
                                                    className="bg-[#B22222] rounded-lg h-12 w-full text-lg text-white cursor-pointer mt-5"
                                                    onClick={() => {
                                                        dilete(item.id);
                                                        setRefreshed(false);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </Fragment>
                                );
                            })}
                        </div>
                        <button
                            type="submit"
                            onClick={() => Caracteristique(id)}
                            className="bg-gradient-to-r from-sky-700 to-sky-800 hover:from-sky-800 hover:to-sky-900 text-white rounded-md text-sm px-3 py-2 my-7 mr-36"
                        >
                            Gérer la fiche technique
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
