import React, { useState, useEffect } from "react";
import { BiSolidTruck } from "react-icons/bi";
import Header from "../Header/Header";

const Delivery = () => {
    const [trackingNumber, setTrackingNumber] = useState("");
    const [deliveryStatus, setDeliveryStatus] = useState("");
    const handleTrackingNumberChange = (event) => {
        setTrackingNumber(event.target.value);
    };

    const handleValidationClick = () => {
        if (trackingNumber === "123456") {
            setDeliveryStatus("Commande passée");
        } else if (trackingNumber === "654321") {
            setDeliveryStatus("En cours");
        } else if (trackingNumber === "987654") {
            setDeliveryStatus("Colis reçu");
        } else {
            setDeliveryStatus("");
        }
    };

    const [userDetails, setUserDetails] = useState({
        email: "",
        address: "",
        zipcode: "",
    });

    const fetchUserDetails = async () => {
        try {
            const response = await fetch("your_user_details_api_endpoint");
            const data = await response.json();
            setUserDetails({
                email: data.email,
                address: data.address,
                zipcode: data.zipcode,
            });
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    };

    useEffect(() => {
        fetchUserDetails();
    }, []); // Fetch user details only once on component mount

    const handlePrintDetailsClick = () => {
        console.log("Email:", userDetails.email);
        console.log("Address:", userDetails.address);
        console.log("Zipcode:", userDetails.zipcode);
    };

    const getProgressBarWidth = () => {
        if (deliveryStatus === "Commande passée") {
            return "33%";
        } else if (deliveryStatus === "En cours") {
            return "66%";
        } else if (deliveryStatus === "Colis reçu") {
            return "100%";
        }
        return "0%";
    };

    return (
        <>
            <Header />
            <div className="grid grid-cols-2 bg-gray-100 mx-3 md:mx-24 rounded p-4 flex-col md:flex-row justify-center mt-7 mb-7">
                <div className="payment-body rounded">
                    <form id="payment-form" className="payment-form">
                        <div className="flex flex-col">
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                type="email"
                                value={userDetails.email}
                                className="w-2/3 p-2 h-1/6 border rounded mr-2"
                                readOnly // Make the input read-only
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="address">Address</label>
                            <input
                                id="address"
                                type="text"
                                value={userDetails.address}
                                className="w-2/3 p-2 h-1/6 border rounded mr-2"
                                readOnly // Make the input read-only
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="zipcode">Zipcode</label>
                            <input
                                id="zipcode"
                                type="text"
                                value={userDetails.zipcode}
                                className="w-2/3 p-2 h-1/6 border rounded mr-2"
                                readOnly // Make the input read-only
                            />
                        </div>
                        <button
                            className="bg-blue-500 text-white px-2 py-1 rounded"
                            onClick={handlePrintDetailsClick}
                        >
                            Print details
                        </button>
                    </form>
                </div>
                <div className="md:ml-7 mr-1 items-center space-x-11 justify-center mt-32 px-7">
                    <div className="flex items-center mb-24">
                        <strong className="w-64">Numéro de suivi:</strong>
                        <input
                            type="text"
                            placeholder="Entrez le numéro de suivi"
                            className="w-2/3 p-2 h-1/6 border rounded mr-2"
                            value={trackingNumber}
                            onChange={handleTrackingNumberChange}
                        />
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded h-1/6"
                            onClick={handleValidationClick}
                        >
                            Valider
                        </button>
                    </div>
                    <div className="pr-7">
                        <div className="flex justify-between ">
                            <div className="text-green-500 items-center flex ml-1">
                                Commande passée{" "}
                                <BiSolidTruck className="mx-2" />
                            </div>
                            <div className="text-yellow-500 flex items-center">
                                En cours <BiSolidTruck className="mx-2" />
                            </div>
                            <div className="text-blue-500 flex items-center">
                                Colis reçu <BiSolidTruck className="mx-2" />
                            </div>
                        </div>
                        <div className="bg-black h-1 mt-5 mb-7  relative">
                            <div
                                className="h-full bg-green-500 absolute"
                                style={{ width: getProgressBarWidth() }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Delivery;
