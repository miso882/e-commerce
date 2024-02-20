import React, { useState, useEffect } from "react";
import './Payment.css'
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import Payment from "./Payment"
import axios from "axios";
import { HTTP } from "../../regle";


const PUBLIC_KEY = "pk_test_51NiDmCInFRDdeEbEUnv8m6eduH3j9KVmB2OxSMWFFmRL4DCQ61f6eqffNqVj7y7MlkewzdlaL2MSa2927gAata6a00M1gxd1yW"
const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer() {
	const [clientSecret, setClientSecret] = useState("");
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState("");
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
	const cart = JSON.parse(localStorage.getItem("cart")) || [];
        setProducts(cart);
        setRefresh(true);
    }, []);
    useEffect(() => {
       const cartTotal = products.reduce(
           (acc, product) => acc + product.price * product.quantity,
           0
       );
	   const weightTotal = products.reduce(
		(acc, product) => acc + product.weight * product.quantity,
		0
	);
	//mby ajouter des trucs min
	const ptotal = weightTotal * 2 * 100;
       setTotal(cartTotal * 100 + ptotal);

    }, [products]);

    useEffect(() => {
       // Create PaymentIntent as soon as the page loads
       const payment_info = {
           amount: total,
        };
       const checkoutpayment = async()=>{
           const response = await axios.post(
               HTTP +"payment", payment_info)
           const clientsecret = response.data.clientSecret;
           console.log(clientsecret);
           setClientSecret(clientsecret)
        }
       if(total !== 0){
       checkoutpayment()
    }
    }
   , [total]);

   const appearance = {
       theme: 'stripe',
    };
   const options = {
       clientSecret,
       appearance,
    };

   if(refresh === true){

       return (
           <>
       {clientSecret && (
           <Elements stripe={stripeTestPromise}  options={options}>
               <Payment products={products} />
           </Elements>
       )}
       </>
   )
}else{
   return(
       <></>
   )
}
}