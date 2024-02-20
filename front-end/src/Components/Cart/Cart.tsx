import React, { Fragment, useEffect, useState } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import Header from "../Header/Header";
import { useAuth } from "../../Context";
import { IoMdCloseCircle } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import "./Cart.css";
import { HTTP } from "../../regle";
import axios from "axios";
const Cart = () => {
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [weightTotals, setWeightTotal] = useState(0);
    const [emailNL, setEmailNL] = useState("");
    const [zipcodeL, setZipcodeL] = useState("");
    const [addressL, setAddressL] = useState("");
    const [countryL, setCountryL] = useState(0);
    const [firstnameL, setFirstnameL] = useState("0");
    const [lastnameL, setLastnameL] = useState("");
    const [zipcodeNL, setZipcodeNL] = useState("");
    const [addressNL, setAddressNL] = useState("");
    const [countryNL, setCountryNL] = useState(0);
    const [countryList, setCountryList] = useState([]);
    const { user } = useAuth();
    const navigate = useNavigate();
    const [userDetail, setUserDetail] = useState([]);
    const [modal, setModal] = useState(false);
    const [modulax, setModulax] = useState(false);
    const [modulo, setModulo] = useState(false);
    const [notCompatible, setNotCompatible] = useState([]);
    const [expandedDescriptionIndex, setExpandedDescriptionIndex] = useState(-1);
    function checkinfolog(){
        if (emailNL !== "" && zipcodeNL !== "" && countryNL !== 0 && addressNL !== "") {
            const notLogged = {
                email: emailNL,
                address: addressNL,
                country: countryNL,
                zipcodeNL: zipcodeNL
            }
            localStorage.removeItem("notLogged");
            localStorage.setItem("notLogged", JSON.stringify(notLogged));
            navigate("/shipping/"+notLogged.country)
        }
    }
    async function updateInfoLog() {
        const request = {
            address: addressL,
            country: countryL,
            zipcode: zipcodeL,
            firstname: firstnameL,
            lastname: lastnameL
        }
        const response = await axios.put(HTTP + "users/" + user.email, request)
        console.log(response);
    }
    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        setProducts(cart);
        async function getData() {
            const response = await axios.get(HTTP + "users/" + user.email);
            console.log(response.data);
            setUserDetail(response.data)
            setAddressL(response.data.address);
            setZipcodeL(response.data.zipcode);
            setFirstnameL(response.data.firstname);
            setLastnameL(response.data.lastname);
        }
        if (user.email !== "") {
            getData();
        }
    }, [user,]);
    useEffect(() => {
        const cartTotal = products.reduce(
            (acc, product) => acc + product.price * product.quantity,
            0
        );
        const weightTotal = products.reduce(
            (acc, product) => acc + product.weight * product.quantity,
            0
        );
        setWeightTotal(weightTotal);
        setTotal(cartTotal);

    }, [products]);
    useEffect(() => {
        async function getData() {
            const response = await axios.get(HTTP + "country");
            if (response.data) {
                setCountryList(response.data);
            }
        }
        getData();
    }, [])
    const updateLocalStorageAndState = (updatedProducts) => {
        setProducts(updatedProducts);
        localStorage.setItem("cart", JSON.stringify(updatedProducts));
    };

    const handleIncrease = (index: string | number) => {
        const updatedProducts = [...products];
        updatedProducts[index].quantity += 1;
        updateLocalStorageAndState(updatedProducts);
    };
    const handleDecrease = (index) => {
        const updatedProducts = [...products];
        if (updatedProducts[index].quantity > 1) {
            updatedProducts[index].quantity -= 1;
            updateLocalStorageAndState(updatedProducts);
        }
    };
    const handleDelete = (index) => {
        const updatedProducts = products.filter((_, i) => i !== index);
        updateLocalStorageAndState(updatedProducts);
    };
    const toggleDescription = (index) => {
        setExpandedDescriptionIndex(
            index === expandedDescriptionIndex ? -1 : index
        );
    };
    const isCartEmpty = products.length === 0;

    const toggleModal = () => {
        setModal(!modal);
    }
    const toggleModulo = () => {
        setModulo(!modulo);
    }
    const toggleModulax = () => {
        setModulax(!modulax);
    }

    function checkCompatible(old, compatibleItem) {        for (let i = 0; i < compatibleItem.length; i++) {
            for (let j = 0; j < old.length; j++) {
                if (old[j].id === compatibleItem[i].id) {
                    return true;
                }
            }
        }
        return false;
    }
    const pay = async () => {
        let notcompa = false;
        for (let k = 0; k < products.length; k++) {
            for (let i = k; i < products.length; i++) {
                if (products[k].compatibles && products[i].compatibles && i >= 1) {
                    if (products[i].subcategory.name == "Carte mère" && products[k].subcategory.name == "Boitier PC" || products[i].subcategory.name == "Boitier PC" && products[k].subcategory.name == "Carte mère") {
                        if (checkCompatible(products[k].compatibles, products[i].compatibles) === false) {
                            setNotCompatible(products[i]);
                            notcompa = true;
                        }
                    }
                    if (products[k].subcategory.name == "Processeur" && products[i].subcategory.name == "Carte mère" || products[i].subcategory.name == "Processeur" && products[k].subcategory.name == "Carte mère") {
                        if (checkCompatible(products[k].compatibles, products[i].compatibles) === false) {
                            setNotCompatible(products[i]);
                            notcompa = true;
                        }
                    }
                    if (products[k].subcategory.name == "Carte graphiques" && products[i].subcategory.name == "Carte mère" || products[i].subcategory.name == "Carte graphiques" && products[k].subcategory.name == "Carte mère") {
                        if (checkCompatible(products[k].compatibles, products[i].compatibles) === false) {
                            setNotCompatible(products[i]);
                            notcompa = true;
                        }
                    }
                    if (products[k].subcategory.name == "Alimentation PC" && products[i].subcategory.name == "Boitier PC" || products[i].subcategory.name == "Alimentation PC" && products[k].subcategory.name == "Boitier PC") {
                        if (checkCompatible(products[k].compatibles, products[i].compatibles) === false) {
                            setNotCompatible(products[i]);
                            notcompa = true;
                        }
                    }
                    if (products[k].subcategory.name == "Stockage" && products[i].subcategory.name == "Carte mère" || products[i].subcategory.name == "Stockage" && products[k].subcategory.name == "Carte mère") {
                        if (checkCompatible(products[k].compatibles, products[i].compatibles) === false) {
                            setNotCompatible(products[i]);
                            notcompa = true;
                        }
                    }
                    if (products[k].subcategory.name == "Mémoire" && products[i].subcategory.name == "Carte mère" || products[i].subcategory.name == "Mémoire" && products[k].subcategory.name == "Carte mère") {
                        if (checkCompatible(products[k].compatibles, products[i].compatibles) === false) {
                            setNotCompatible(products[i]);
                            notcompa = true;
                        }
                    }
                    if (products[k].subcategory.name == "Mémoire" && products[i].subcategory.name == "Processeur" || products[i].subcategory.name == "Mémoire" && products[k].subcategory.name == "Processeur") {
                        if (checkCompatible(products[k].compatibles, products[i].compatibles) === false) {
                            setNotCompatible(products[i]);
                            notcompa = true;
                        }
                    }

                }
            }
        }

        if (notcompa || notCompatible.id) {
            console.log(notCompatible)
            if (!confirm("Êtes vous sur de vouloir continuer avec des articles incompatibles ?")) {
                return;
            }
        }
        //the thing to check if the user connected if so dont ask to connect else popup the thing 
        if (user.email === "") {
            toggleModal();
        } else if (userDetail.country === null || userDetail.firstname === null || userDetail.lastname === null || userDetail.zipcode === null || userDetail.address === null) {
            toggleModulax();
        } else {
            navigate("/shipping/"+userDetail.country.id);
        }
    }

    return (
        <>
            <Header />
            <div className="bg-gray-300 mx-3 md:mx-24 rounded p-4 flex-col md:flex-row justify-center mt-7 mb-7">
                <h2 className="text-2xl font-semibold mb-4">Mon panier</h2>
                {isCartEmpty ? (
                    <p className="text-xl font-semibold">
                        Votre panier est vide.
                    </p>
                ) : (
                    <>
                        {products.map((product, index) => (
                            <Fragment key={product.id}>
                                <div
                                    className="cart__container border border-black rounded-md p-4 mb-3 flex flex-col md:flex-row items-center"
                                    style={{ minHeight: "150px" }}
                                >
                                    <div className="flex flex-col items-center md:items-start md:flex-row">
                                        <img
                                            src={
                                                "http://145.239.142.113:4031/" +
                                                product.image1
                                            }
                                            alt="product"
                                            className="w-20 h-20 rounded-md object-cover mr-4 mb-4 md:mb-0"
                                        />
                                        <div className="md:w-2/3">
                                            <Link to={"/article/" + product.id}>

                                                <h4
                                                    className="text-lg font-semibold"
                                                    style={{ minHeight: "30px" }}
                                                >

                                                    {product.name}
                                                </h4>
                                            </Link>

                                            <span
                                                className="text-black"
                                                style={{ minHeight: "20px" }}
                                            >
                                                Price: {product.price} €
                                            </span>
                                            <div className="mt-2 flex items-center">
                                                <button
                                                    onClick={() =>
                                                        handleDecrease(index)
                                                    }
                                                    className="bg-gray-300 text-gray-700 px-2 py-1 rounded-full"
                                                >
                                                    -
                                                </button>
                                                <input
                                                    type="number"
                                                    value={product.quantity}
                                                    readOnly
                                                    className="w-12 mx-2 text-center bg-gray-100"
                                                />
                                                <button
                                                    onClick={() =>
                                                        handleIncrease(index)
                                                    }
                                                    className="bg-gray-300 text-gray-700 px-2 py-1 rounded-full"
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <button
                                                onClick={() =>
                                                    toggleDescription(index)
                                                }
                                                className="text-black font-semibold hover:underline focus:outline-none mt-2 block"
                                            >
                                                {expandedDescriptionIndex === index
                                                    ? "Masquer"
                                                    : "Voir plus"}
                                            </button>
                                            {expandedDescriptionIndex === index && (
                                                <p className="text-black mt-2">
                                                    {product.description}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleDelete(index)}
                                        className="text-black-500 hover:text-red-700 ml-auto"
                                    >
                                        <BsFillTrashFill />
                                    </button>

                                </div>
                            </Fragment>
                        ))}
                        <div className="flex justify-between items-center mt-4">
                            <p className="text-xl font-semibold">
                                Total: {total.toFixed(2)} €
                            </p>
                            <button onClick={() => pay()} className="bg-gray-800 text-white px-4 py-2 rounded-md">
                                Paiement
                            </button>
                        </div>
                    </>
                )}
            </div>

            {modal === true ? (
                <div className="modal">
                    <div className="overlay"></div>
                    <div className="contante bg-white p-3">
                        <button className="close-btn" onClick={toggleModal}><IoMdCloseCircle /></button>
                        <p>Vous n'êtes pas connecté</p>
                        <p>Vous pouvez vous connectez ou bien continuer vers le paiement</p>
                        <Link to={`/login`}><button className="px-2 bg-slate-200 m-1 ">Me connecter</button> </Link>
                        <span onClick={() => { toggleModal(); setModulo(true)}}><button className="px-2 bg-slate-200 m-1">Payer</button></span>
                    </div>
                </div>
            ) : <></>}
            {modulo === true ? (
                <div className="modal">
                    <div className="overlay"></div>
                    <div className="contante text-center w-1/12 bg-white p-3">
                        <button className="close-btn" onClick={toggleModulo}><IoMdCloseCircle /></button>
                        <input onChange={(e) => setEmailNL(e.target.value)} className="border rounded p-1 mb-3 bg-slate-200 border-black" type="email" placeholder="E-mail"></input>
                        <br></br>
                        <input onChange={(e) => setAddressNL(e.target.value)} className="border rounded p-1 mb-3 bg-slate-200 border-black" type="text" placeholder="Addresse"></input>
                        <br></br>
                        <input onChange={(e) => setZipcodeNL(e.target.value)} className="border rounded p-1 mb-3 bg-slate-200 border-black" type="text" placeholder="ZIPCODE"></input>
                        <br></br>
                        <select onChange={(e) => setCountryNL(e.target.value)} className="border rounded p-1 mb-3 bg-slate-200 border-black">
                        <option selected disabled>Selectionner un pays</option>
                        {
                                countryList.map((item) => {
                                    return (
                                        <option key={item.id} value={item.id}>{item.name}</option>
                                )
                            })
                        }
                        
                        </select>
                        <br></br>

                        <span onClick={() => {checkinfolog()}}><button className="border rounded p-1 mb-3 bg-slate-200 border-black">Payer</button></span>
                    </div>
                </div>
            ) : <></>}
            {modulax === true && userDetail ? (
                <div className="modal">
                    <div className="overlay"></div>
                    <div className="contante text-center w-1/12 bg-white p-3">
                        <button className="close-btn" onClick={toggleModulax}><IoMdCloseCircle /></button>
                        {
                            !userDetail.address? <>
                            <input onChange={(e) => setAddressL(e.target.value)} className="border rounded p-1 mb-3 bg-slate-200 border-black" type="text" placeholder="Addresse"></input>
                        <br></br>
                            </> :<></>
                        }
                        {
                            !userDetail.lastname || !userDetail.firstname ? <>
                                <input onChange={(e) => setLastnameL(e.target.value)} className="border rounded p-1 mb-3 bg-slate-200 border-black" type="text" placeholder="Lastname"></input>
                                <br></br>
                                <input onChange={(e) => setFirstnameL(e.target.value)} className="border rounded p-1 mb-3 bg-slate-200 border-black" type="text" placeholder="Firstname"></input>
                                <br></br>
                            </> : <></>
                        }
                        {
                            !userDetail.zipcode ? <>
                        <input onChange={(e) => setZipcodeL(e.target.value)} className="border rounded p-1 mb-3 bg-slate-200 border-black" type="text" placeholder="ZIPCODE"></input>
                        <br></br>
                            </> : <></>
                        }
                        {
                            !userDetail.country ? <>
                            <select onChange={(e) => setCountryL(e.target.value)} className="border rounded p-1 mb-3 bg-slate-200 border-black">
                            <option selected disabled>Selectionner un pays</option>
                            {
                                countryList.map((item) => {
                                    return (
                                        <option key={item.id} value={item.id}>{item.name}</option>
                                        )
                                    })
                                }

                        </select>
                        <br></br>
                                </> : <></>
                                }

                        <span onClick={() => { updateInfoLog() }}><button className="border rounded p-1 mb-3 bg-slate-200 border-black">Payer</button></span>
                    </div>
                </div>
            ) : <></>}
        </>
    );
};
export default Cart;