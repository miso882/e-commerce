import React, { useEffect, useState } from "react";
import HeaderCategorie from "../Header/HeaderCategorie";
import { Link, useNavigate, useParams } from "react-router-dom";
import { HTTP } from "../../regle";
import axios from "axios";

const ShippingPayment = () => {
    let { id } = useParams();
    const [deliveryMethodList, setDeliveryMethodList] = useState([]);
    const [priceDelivery, setPriceDelivery] = useState(0);
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();
    const [weightTotals, setWeightTotal] = useState(0);
    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        setProducts(cart);
    }, []);
    useEffect(() => {
        localStorage.removeItem("deliveryPrice");
        localStorage.setItem("deliveryPrice", priceDelivery);
        if(priceDelivery !== 0)
        navigate("/payment")
    }, [priceDelivery])
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
        async function getCountryList() {
            const response = await axios.get(HTTP + "country/" + id)
            if (response.data) {
                console.log(response.data)
                setDeliveryMethodList(response.data.delivery);
            }
        }
        getCountryList();
    }, [id])

    return (
        <div className="p-4 text-center">
            <HeaderCategorie />
            <div className="bg-white">
                <h2 className="text-2xl mb-4 pt-8">Choisissez vos frais de port</h2>
                <div className="rounded-md p-4 mb-4">
                    {
                        deliveryMethodList.map((item) => {
                            return (<>
                                <div className="flex mb-7">
                                    <h4 className="justify-left items-center">{item.DeliveryName}</h4>
                                    <h4 className="m-auto justify-center items-center">{item.DeliveryDelay} jours estimés</h4>
                                    <span className="items-center">{item.PriceWeight * weightTotals / 10 + item.PriceWeight} €</span>
                                    <span onClick={() => setPriceDelivery(item.PriceWeight * weightTotals / 10 + item.PriceWeight)} className="border rounded p-2 ml-8 hover:bg-slate-300 items-center">Choisir</span>
                                </div>
                            </>)
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default ShippingPayment;
