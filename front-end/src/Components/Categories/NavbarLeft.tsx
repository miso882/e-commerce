import React from "react";
import HeaderCategorie from "../Header/HeaderCategorie";
import { Link } from "react-router-dom";

const NavbarLeft = () => {
    return (
        <>
            <div className="w-[200px] bg-[#203742] ml-14 flex flex-col items-center">
                <div className="text-center text-white text-xl font-normal pt-10 hover:text-blue-500">
                    <button>Nouveauté et promotion</button>
                </div>
                <div className="text-center text-white text-xl font-normal pt-10 hover:text-blue-500">
                    <Link to={`/produit`}>
                        <button>Produits</button>
                    </Link>
                </div>
                <div className="text-center text-white text-xl font-normal pt-10 hover:text-blue-500">
                    <button>Commandes</button>
                </div>
                <div className="text-center text-white text-xl font-normal pt-10 hover:text-blue-500">
                    <Link to={`/categories`}>
                        <button>Catégorie</button>
                    </Link>
                </div>
                <div className="text-center text-white text-xl font-normal pt-10 hover:text-blue-500">
                    <Link to={`/subcategories`}>
                        <button>Sous-catégorie</button>
                    </Link>
                </div>
                <div className="text-center text-white text-xl font-normal pt-10 hover:text-blue-500">
                    <Link to={`/stocks`}>
                        <button>Gérer les stocks</button>
                    </Link>
                </div>
                <div className="text-center text-white text-xl font-normal pt-10 hover:text-blue-500">
                    <button>Plus</button>
                </div>
            </div>
        </>
    );
};

export default NavbarLeft;
