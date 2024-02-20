import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../Context";
import axios, { AxiosRequestConfig } from "axios";
import React, { useEffect, useState } from "react";
import { HTTP } from "../../regle";
export default function Paymentmsg (){
    const { user } = useAuth();
    const { state } = useLocation();
    const [user_id, setUser_id] = useState(0);


    if(state.id === 1){
        if(state.email !==""){
            useEffect(() => {
                const email = state.customer;
                const get_user_id = async()=>{
                    const response = await axios.get(`https://127.0.0.1:8000/api/users/${email}`)
                    const user_id = response.data.id;
                    setUser_id(user_id);
                    console.log(user_id)
                }
                get_user_id();
            }
            , []);
        }

        const inseration_data = {
            customer:  state.customer,
            User_Id: user_id,
            payment_status: state.payment_status,
            products: state.order,
            total: state.total,
            paymentDate: state.paymentDate,
            address: state.address, 
            country: state.country,
            postalcode: state.postalcode,
        }
        // console.log(inseration_data)
        
        useEffect(() => {

            const checkoutinseration = async()=>{
                const response = await axios.post("https://127.0.0.1:8000/api/paymentinseration", inseration_data)
                console.log(response);
            }
            checkoutinseration();
        }
        , []);

        return(
            <div className="mt-11">
                <div className="bg-white rounded grid grid-rows-2 m-auto w-1/3 h-64 pb-10">
                    <div className="justify-center items-center m-auto">
                        <img src="./yes.png"  className="h-16 w-16"/>
                    </div>
                    <div className="justify-center items-center m-auto">
                        <p>{state.msg}</p>
                        <Link to={`/`}><button className="px-7 py-2 rounded mt-2 bg-[#83ed84]">See My Order</button></Link>
                    </div>
                </div>
            </div>
        )
    }
    if(state.id === 2){
        return(
            <div className="mt-11">
                <div className="bg-white rounded grid grid-rows-2 m-auto w-1/3 h-64 pb-10">
                    <div className="justify-center items-center m-auto">
                    <img src="./management-service.png"  className="h-16 w-16"/>
                    </div>
                    <div className="justify-center items-center m-auto">
                        <p>{state.msg}</p>
                    </div>
                </div>
           </div>
        )
    }
    if(state.id === 3){
        return(
            <div className="mt-11">
                <div className="bg-white rounded grid grid-rows-2 m-auto w-1/3 h-64 pb-10">
                    <div className="justify-center items-center m-auto">
                        <img src="./failed.png"  className="h-16 w-16"/>
                    </div>
                    <div className="justify-center items-center m-auto">
                        <p>{state.msg}</p>
                        <Link to={`/payment`}><button className="px-7 py-2 rounded mt-2 bg-[#DF4F5F]">Back Payment</button></Link>
                    </div>
                </div>
           </div>
        )
    }
    if(state.id === 4){
        return(
            <div className="mt-11">
                <div className="bg-white rounded grid grid-rows-2 m-auto w-1/3 h-64 pb-10">
                    <div className="justify-center items-center m-auto">
                        <img src="./error.png"  className="h-16 w-16"/>
                    </div>
                    <div className="justify-center items-center m-auto">
                        <p>{state.msg}</p>
                        <Link to={`/payment`}><button className="px-7 py-2 rounded mt-2 bg-[#DF4F5F]">Back Payment</button></Link>
                    </div>
                </div>
           </div>
        )
    }
}