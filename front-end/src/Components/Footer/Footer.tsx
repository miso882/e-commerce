import React from "react";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { DiMootoolsBadge } from "react-icons/di";
import { BsTruck } from 'react-icons/bs';
import { FaLocationPin } from 'react-icons/fa6';


function Footer() {
    return (
        <>
            <footer className="bg-black mx-3 py-3 md:mx-24 mt-10 rounded">
                <div className="md:flex flex-wrap md:flex-nowrap justify-evenly items-center">

                    <div className="flex align-middle flex-wrap px-3 py-2 ">
                        <BsTruck className="text-white hover:text-sky-700 mr-1 ml-1 mt-1" /> 
                        <h5 className="text-white hover:text-sky-700 cursor-pointer">Livraison</h5>
                    </div>

                    <div className="flex align-middle flex-wrap px-3 py-2">
                        <FaLocationPin className="text-white hover:text-sky-700 mr-1 ml-1 mt-1" /> 
                        <h5 className="text-white hover:text-sky-700 cursor-pointer">Réseau National</h5>
                    </div>
                    

                    <div className="flex align-middle flex-wrap px-3 py-2">
                        <AiOutlineDollarCircle className="text-white hover:text-sky-700 mr-1 ml-1 mt-1" />
                        <h5 className="text-white hover:text-sky-700 cursor-pointer">Paiement</h5>
                    
                    </div>
                    
                    
                    <div className="flex align-middle flex-wrap px-3 py-2">
                        <DiMootoolsBadge className="text-white hover:text-sky-700 mr-1 ml-1 mt-1" />
                        <h5 className="text-white hover:text-sky-700 cursor-pointer">SAV</h5>
                    </div>
                    
                </div>
            </footer>
        </>
    );
}

export default Footer;
