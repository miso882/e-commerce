import "./Payment.css";
import React, { useEffect, useState } from "react";
import {
  CardElement,
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import axios from "axios";
import Header from "../Header/Header";
import "./Payment.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context";
export default function Payment({ products }) {
  // console.log(products);
  const { user } = useAuth();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [total, setTotal] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const emailafter = user.email === "" ? JSON.parse(localStorage.getItem("notLogged")).email : user.email;

  useEffect(() => {
    const cartTotal = products.reduce(
        (acc, product) => acc + product.price * product.quantity,
        0
    );
    setTotal((cartTotal + parseFloat(localStorage.getItem("deliveryPrice"))).toFixed(2));

}, [products]);
  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          navigate(
            '/paymentmsg',
            {
              state: {
                id: 1,
                msg: "Payment succeeded!",
                order: products,
                customer: emailafter,
                payment_status: "paid",
                total: total,
                paymentDate: new Date().toLocaleString(),
                country:"france",
                address:"2 Rue du Professeur Charles Appleton",
                postalcode: 69007,
              }
            }
          )
          localStorage.removeItem("cart");
          break;
        case "processing":
          navigate(
            '/paymentmsg',
            {
              state: {
                id: 2,
                msg: "Your payment is processing.",
                order: products,
                customer: email,
              }
            }
          )
          break;
        case "requires_payment_method":
          navigate(
            '/paymentmsg',
            {
              state: {
                id: 3,
                msg: "your payment was not successful, please try again.", 
                order: products,
                customer: email,
              }
            }
          )
          break;
        default:
          navigate(
            'paymentmsg',
            {
              state: {
                id: 4,
                msg: "Something went wrong.", 
                order: products,
                customer: email,
              }
            }
          )
          break;
      }
    });
  }, [stripe]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:5173/payment",
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <>
      <Header />
      <div className="grid grid-cols-2 bg-gray-100 mx-3 md:mx-24 rounded p-4 flex-col md:flex-row justify-center mt-7 mb-7">
        <div className="payment-body rounded">
          <form id="payment-form" className="payment-form"
            onSubmit={handleSubmit}
          >
            <LinkAuthenticationElement
              id="link-authentication-element"
              onChange={(e) => {setEmail(e.value.email)}}
            />
            <PaymentElement
              id="payment-element"
              options={paymentElementOptions}
            />
            <button
              className="my-payment-btn"
              disabled={isLoading || !stripe || !elements}
              id="submit"
            >
              <span id="button-text">
                {isLoading ? (
                  <div className="spinner" id="spinner"></div>
                ) : (
                  "Pay now"
                )}
              </span>
            </button>
          </form>
        </div>
        <div className="ml-2">
          {products.map((product, index) => (
            <div key={product.id} className="flex flex-col md:flex-row items-center mb-2 rounded bg-white p-3  overflow-scroll">
              
              <div className="flex flex-col items-center md:items-start md:flex-row">
                <img className="w-20 h-24 rounded-md object-cover  md:mb-0"
                  src={"http://145.239.142.113:4031/" + product.image1}  alt="product"
                />

                <div className="m-1 md:w-2/3">
                  <h4 className="text-lg font-semibold py-1"> {product.name} </h4>
                  <p className="text-black py-1"> quantity: {product.quantity} </p>
                  <span className="text-black"> Price: {product.price.toFixed(2)} € </span>
                </div>
              
              </div>
            </div>
          ))}
          <h5 className="flex text-xl justify-center items-center"> Total :  {total} €</h5>
        </div>
      </div>
    </>
  );
}
