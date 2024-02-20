import React, { useState, useEffect } from "react";
import NavbarLeft from "../Categories/NavbarLeft";
import HeaderCategorie from "../Header/HeaderCategorie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { HTTP } from "../../regle";
import { useAuth } from "../../Context";

export const Produits = () => {
    const { user } = useAuth();
    const navigate = useNavigate("/");
    if (user.role !== "ROLE_ADMIN") {
        navigate("/")
    }
    const [product_name, setProduct_name] = useState("");
    const [images, setImages] = useState<File>();
    const [product_price, setProduct_price] = useState("");
    const [categories, setCategories] = useState("");
    const [subcategoris, setSubcategoris] = useState("");
    const [weight, setWeight] = useState("");
    const [description, setDescription] = useState("");
    const [stock, setStock] = useState("");
    const [characteristic, setCharacteristic] = useState("");
    const [imagePreview, setImagePreview] = useState<string | undefined>(
        undefined
    );


    function Caracteristique(id: number) {
        navigate("/caracteristique/" + id);
    }

    const [dropdown_categories, setDropdown_categories] = useState([]);
    const [dropdown_subcategories, setDropdown_subcategories] = useState([]);

    useEffect(() => {
        async function drop_categories() {
            const response = await axios.get(HTTP + "categories");
            setDropdown_categories(response.data);
        }
        drop_categories();
    }, []);

    async function set_send(data: React.SetStateAction<string>) {
        console.log(data);
        setCategories(data);
        const response = await axios.get(HTTP + `categories/${data}`);
        console.log(response.data);
        setDropdown_subcategories(response.data.subcategories);
    }

    async function selectFile(event: React.ChangeEvent<HTMLInputElement>) {
        const selectedImage = event.target.files?.[0];
        setImages(selectedImage);

        if (selectedImage) {
            const previewUrl = URL.createObjectURL(selectedImage);
            setImagePreview(previewUrl);
        }
    }

    async function create_item(e: { preventDefault: () => void }) {
        e.preventDefault();
        const data = new FormData();
        data.append("name", product_name);
        data.append("price", product_price);
        data.append("image1", images);
        data.append("category", parseInt(categories));
        data.append("weight", ""+weight);
        data.append("subcategory", parseInt(subcategoris));
        data.append("shortdescription", description);
        data.append("stock", parseInt(stock));
        data.append("description", characteristic);

        try {
            const response = await axios.post(HTTP + "items", data, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            if (response.status === 201) {
                Caracteristique(response.data.id);
            }
            if (response.status === 500) {
                console.log("smth went wrong");
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="">
            <HeaderCategorie />
            <div className="flex">
                <NavbarLeft />
                <div className="mt-5">
                    <div className="bg-zinc-300 w-4/5 h-screen mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-zinc-300 pl-2 space-x-6">
                            <div className="p-3 block">
                                <h1 className="text-5xl pt-4 pl-7">Produits</h1>
                                <div className="mt-32 m-20">
                                    <img
                                        className="rounded-[5px] object-cover"
                                        src={imagePreview || "./add.png"}
                                        alt="Product 1"
                                    />
                                </div>
                                <div className="bg-[#EDEBEB] p-3 rounded-[5px]">
                                    <input
                                        type="file"
                                        id="avatar"
                                        onChange={(e) => {
                                            selectFile(e);
                                        }}
                                        name="avatar"
                                        accept="image/png, image/jpeg"
                                    />
                                </div>
                            </div>
                            <div className="bg-zinc-300 p-3 block mt-7 h-maxscre ">
                                <div className="space-x-0 md:space-x-20">
                                    <input
                                        type="text"
                                        placeholder="Nom du produit"
                                        onChange={(ev) =>
                                            setProduct_name(ev.target.value)
                                        }
                                        value={product_name}
                                        name="product_name"
                                        className="bg-white rounded-[5px] w-full md:w-4/12 px-2 py-1"
                                    />
                                    <input
                                        type="number"
                                        placeholder="Prix"
                                        name="product_price"
                                        onChange={(ev) =>
                                            
                                            {
                                                if(typeof parseFloat(ev.target.value) == "number" && !isNaN(ev.target.value)){
                                                    const value = parseFloat(ev.target.value).toFixed(2);
                                                if(Number.isInteger(ev.target.value)){
                                                    setProduct_price(value)
                                                }else{
                                                    setProduct_price(value)
                                                    console.log(product_price);
                                                }
                                            }
                                            }
                                        }
                                        className="bg-white rounded-[5px] w-full md:w-1/5 px-2 py-1 mt-2 md:m-0"
                                    />
                                </div>

                                <div className="flex flex-col mt-4">
                                    <input
                                        type="number"
                                        placeholder="Weight"
                                        name="weight"
                                        onChange={(ev) =>
                                            
                                            {
                                                setWeight(ev.target.value)
                                            }
                                        }
                                        className="bg-white rounded-[5px] w-full md:w-1/5 px-2 py-1 mt-2 md:m-0"
                                    />
                                    <div className="bg-zinc-200 mt-3 mb-3 p-4 grid grid-cols-1 rounded-[5px]">
                                        <label className="text-black">
                                            Catégories :
                                        </label>

                                        <select
                                            name="categories"
                                            onChange={(ev) =>
                                                set_send(ev.target.value)
                                            }
                                            className="border border-gray-400 rounded w-4/5 px-2 py-1"
                                        >
                                            <option selected disabled>Catégories</option>
                                            {dropdown_categories.map(
                                                (data: any) => (
                                                    <>
                                                        <option
                                                            value={data.id}
                                                            key={data.id}
                                                        >
                                                            {data.name}
                                                        </option>
                                                    </>
                                                )
                                            )}
                                        </select>
                                    </div>

                                    <div className="bg-zinc-200 mt-3 mb-3 p-4 grid grid-cols-1 rounded-[5px]">
                                        <label className="text-black">
                                            Sous catégories :
                                        </label>

                                        <select
                                            name="subcategoris"
                                            onChange={(ev) =>
                                                setSubcategoris(ev.target.value)
                                            }
                                            className="border border-gray-400 rounded w-4/5 px-2 py-1"
                                        >
                                            <option selected disabled>Sous catégories</option>

                                            {dropdown_subcategories.map(
                                                (data: any) => (
                                                    <>
                                                        <option
                                                            value={data.id}
                                                            key={data.id}
                                                        >
                                                            {data.name}
                                                        </option>
                                                    </>
                                                )
                                            )}
                                        </select>
                                    </div>

                                    <div className="flex flex-col mt-4">
                                        <div className="flex flex-col md:flex-row items-center mt-3 mb-3 p-4">
                                            <p className="mb-2 md:mb-0 md:mr-2">
                                                Il reste
                                            </p>
                                            <input
                                                type="number"
                                                name="stock"
                                                value={stock}
                                                onChange={(ev) =>
                                                    setStock(ev.target.value)
                                                }
                                                className="rounded-[5px] px-1 w-1/12w md:w-auto"
                                            />
                                            <p className="ml-2">articles</p>
                                        </div>
                                    </div>

                                    <div className="bg-zinc-200 mt-3 mb-3 p-4 grid grid-cols-1 rounded-[5px] w-2/3">
                                        <label className="text-black">
                                            Courte description:
                                        </label>
                                        <textarea
                                            name="description"
                                            value={description}
                                            onChange={(ev) =>
                                                setDescription(ev.target.value)
                                            }
                                            className="border border-gray-400 rounded w-4/5 px-2 py-1 resize-none"
                                        />
                                    </div>

                                    <div className=" bg-gray-200 rounded-md p-3">
                                        <label className="text-black p-2">
                                            Description longue:
                                        </label>
                                        <div className="bg-white p-3 h-auto">
                                            <textarea
                                                className="w-4/5 resize-none"
                                                name="characteristic"
                                                value={characteristic}
                                                onChange={(ev) =>
                                                    setCharacteristic(
                                                        ev.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        onClick={create_item}
                                        className="bg-gradient-to-r from-sky-700 to-sky-800 hover:from-sky-800 hover:to-sky-900 text-white rounded-md text-sm px-3 py-2 my-7 mr-36"
                                    >
                                        Valider
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
