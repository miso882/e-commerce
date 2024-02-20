import React, { useEffect, useState } from "react";
import NavbarLeft from "../Categories/NavbarLeft";
import HeaderCategorie from "../Header/HeaderCategorie";
import { ArticleInterface } from "../../Interface";
import axios, { AxiosResponse } from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { HTTP } from "../../regle";

export const StocksEdit = () => {
    const { id } = useParams();

    const [product_name, setProduct_name] = useState(""); //
    const [images, setImages] = useState("");
    const [product_price, setProduct_price] = useState(""); //
    const [categories, setCategories] = useState(""); //
    const [subcategoris, setSubcategoris] = useState(""); //
    const [description, setDescription] = useState(""); //
    const [stock, setStock] = useState(""); //
    const [characteristic, setCharacteristic] = useState(""); //
    const [product_name2, setProduct_name2] = useState(""); //
    const [images2, setImages2] = useState<File>();
    const [product_price2, setProduct_price2] = useState(""); //
    const [categories2, setCategories2] = useState(""); //
    const [subcategoris2, setSubcategoris2] = useState(""); //
    const [description2, setDescription2] = useState(""); //
    const [stock2, setStock2] = useState(""); //
    const [characteristic2, setCharacteristic2] = useState(""); //
    const [editWeight, setEditWeight] = useState(0); //
    const [dropdown_categories, setDropdown_categories] = useState([]);
    const [dropdown_subcategories, setDropdown_subcategories] = useState([]);

    const navigate = useNavigate();
    function Caracteristique(id) {
        navigate("/caracteristique/" + id);
    }
    function Images(id) {
        navigate("/images/" + id);
    }

    useEffect(() => {
        async function fetchitem() {
            const response = await axios.get(
                HTTP+`items/` + id
            );
            setProduct_name(response.data.name);
            setProduct_price(response.data.price);
            setStock(response.data.stock);
            setSubcategoris(response.data.subcategory.name);
            setCategories(response.data.category.name);
            setDescription(response.data.shortdescription);
            setCharacteristic(response.data.description);
            setImages(response.data.image1);
            setProduct_name2(response.data.name);
            setProduct_price2(response.data.price);
            setStock2(response.data.stock);
            setSubcategoris2(response.data.subcategory.name);
            setCategories2(response.data.category.name);
            setDescription2(response.data.shortdescription);
            setCharacteristic2(response.data.description);
            setEditWeight(response.data.weight);
        }
        fetchitem();
    }, []);

    async function fetchitem() {
        const response = await axios.get(HTTP+`items/` + id);
        console.log(response.data);
        setProduct_name(response.data.name);
        setProduct_price(response.data.price);
        setStock(response.data.stock);
        setSubcategoris(response.data.subcategory.name);
        setCategories(response.data.category.name);
        setDescription(response.data.shortdescription);
        setCharacteristic(response.data.description);
        setImages(response.data.image1);
        setProduct_name2(response.data.name);
        setProduct_price2(response.data.price);
        setStock2(response.data.stock);
        setSubcategoris2(response.data.subcategory.name);
        setCategories2(response.data.category.name);
        setDescription2(response.data.shortdescription);
        setEditWeight(response.data.weight);
        setCharacteristic2(response.data.description);
    }

    useEffect(() => {
        async function drop_categories() {
            const response = await axios.get(HTTP+"categories");
            setDropdown_categories(response.data);
        }
        drop_categories();
    }, []);
    async function selectFile(event: React.ChangeEvent<HTMLInputElement>) {
        setImages2(event.target.files?.[0]);
    }

    async function set_send(data: React.SetStateAction<string>) {
        console.log(data);
        setCategories2(data);
        const response = await axios.get(
            HTTP+`categories/${data}`
        );
        console.log(response.data);
        setDropdown_subcategories(response.data.subcategories);
    }

    async function updateItem() {
        const data = {
            name: product_name2,
            price: parseInt(product_price2),
            image1: images2,
            idCategory: parseInt(categories2),
            idSubcategory: parseInt(subcategoris2),
            shortdescription: description2,
            stock: parseInt(stock2),
            weight: parseInt(editWeight), 
            description: characteristic2,
        };
        try {
            const response = await axios.put(
                HTTP+`items/` + id,
                data
            );
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            <div className="">
                <HeaderCategorie />
                <div className="flex">
                    <NavbarLeft />
                    <div className="mt-5">
                        <div className="bg-zinc-300 w-4/5 h-screen mx-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-zinc-300 pl-2 space-x-6">
                                {/* <form  onSubmit={create_item}> */}
                                <div className="p-3 block">
                                    <h1 className="text-5xl pt-4 pl-7">Produits</h1>
                                    <div>
                                        <div>{product_name}</div>
                                        <div>{product_price}</div>
                                        <div>{categories}</div>
                                        <div>{subcategoris}</div>
                                        <div>{description}</div>
                                        <div>{stock}</div>
                                        <div>{characteristic}</div>
                                        <div>{images}</div>
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
                                <div className="bg-zinc-300 p-3 block">
                                    <div className="space-x-0 md:space-x-20">
                                        <input
                                            type="text"
                                            placeholder="produit"
                                            onChange={(ev) =>
                                                setProduct_name2(ev.target.value)
                                            }
                                            value={product_name2}
                                            name="product_name"
                                            className="bg-white rounded-[5px] w-full md:w-4/12 px-2 py-1"
                                        />
                                        <input
                                            type="number"
                                            placeholder="Weight"
                                            onChange={(ev) =>
                                                setEditWeight(ev.target.value)
                                            }
                                            value={editWeight}
                                            name="product_name"
                                            className="bg-white rounded-[5px] w-full md:w-4/12 px-2 py-1"
                                        />
                                        <input
                                            type="number"
                                            placeholder="Prix"
                                            name="product_price"
                                            onChange={(ev) =>
                                                setProduct_price2(ev.target.value)
                                            }
                                            value={product_price2}
                                            className="bg-white rounded-[5px] w-full md:w-1/5 px-2 py-1 mt-2 md:m-0"
                                        />
                                    </div>

                                    <div className="flex flex-col mt-4">
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
                                                subcategories :
                                            </label>

                                            <select
                                                name="subcategoris"
                                                onChange={(ev) =>
                                                    setSubcategoris2(ev.target.value)
                                                }
                                                className="border border-gray-400 rounded w-4/5 px-2 py-1"
                                            >
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

                                        <div className="bg-zinc-200 mt-3 mb-3 p-4 grid grid-cols-1 rounded-[5px]">
                                            <label className="text-black">
                                                Description:
                                            </label>
                                            <textarea
                                                name="description"
                                                value={description2}
                                                onChange={(ev) =>
                                                    setDescription2(ev.target.value)
                                                }
                                                className="border border-gray-400 rounded w-4/5 px-2 py-1 resize-none"
                                            />
                                        </div>

                                        <div className="flex flex-col mt-4">
                                            <div className="flex flex-col md:flex-row items-center mt-3 mb-3 p-4">
                                                <p className="mb-2 md:mb-0 md:mr-2">
                                                    Il reste
                                                </p>
                                                <input
                                                    type="number"
                                                    name="stock"
                                                    value={stock2}
                                                    onChange={(ev) =>
                                                        setStock2(ev.target.value)
                                                    }
                                                    className="rounded-[5px] px-1 w-full md:w-auto"
                                                />
                                                <p className="ml-2">articles</p>
                                            </div>
                                        </div>

                                        <div className="bg-zinc-200 mt-3 mb-3 p-4 grid grid-cols-1 rounded-[5px]">
                                            <label className="text-black">
                                                Compatibilité
                                            </label>
                                            <input
                                                type="text"
                                                className="border border-gray-400 rounded w-4/5 px-2 py-1"
                                            />
                                        </div>

                                        <div className="bg-zinc-200 mb-4 flex w-3/4 py-2 rounded-[5px]">
                                            <label className="text-black p-2 mr-6">
                                                Images:
                                            </label>
                                            <input
                                                type="submit"
                                                className="border border-gray-400 rounded w-2/5 px-2 py-1"
                                                value="Modifier"
                                                onClick={() => Images(id)}
                                            />
                                        </div>
                                        <div className="bg-zinc-200 mb-4 flex w-3/4 py-2 rounded-[5px]">
                                            <label className="text-black p-2">
                                                Caractéristiques:
                                            </label>
                                            <input
                                                type="submit"
                                                className="border border-gray-400 rounded w-2/5 px-2 py-1"
                                                value="Modifier"
                                                onClick={() => Caracteristique(id)}
                                            />
                                        </div>
                                        <div className="h-auto w-full bg-gray-200 rounded-md p-3">
                                            <label className="text-black p-2">
                                                Caractéristiques de l'article:
                                            </label>
                                            <div className="bg-white p-3 h-auto">
                                                <textarea
                                                    className="w-1/3 h-40 resize-none"
                                                    name="characteristic"
                                                    value={characteristic2}
                                                    onChange={(ev) =>
                                                        setCharacteristic2(
                                                            ev.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <button
                                            type="submit"
                                            onClick={() => {
                                                updateItem();
                                                fetchitem();
                                            }}
                                            className="bg-gradient-to-r from-sky-700 to-sky-800 hover:from-sky-800 hover:to-sky-900 text-white rounded-md text-sm px-3 py-2 my-7 mr-36"
                                        >
                                            Valider
                                        </button>
                                    </div>
                                </div>
                                {/* </form> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
