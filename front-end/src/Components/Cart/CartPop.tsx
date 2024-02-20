import React, { useEffect, useState } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const CartPop = () => {
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        setProducts(cart);

        const cartTotal = cart.reduce(
            (acc, product) => acc + product.price.toFixed(2) * product.quantity,
            0
        );
        setTotal(cartTotal);
    }, []);

    const handleDecrease = (index) => {
        const updatedProducts = [...products];
        if (updatedProducts[index].quantity > 1) {
            updatedProducts[index].quantity -= 1;
            setProducts(updatedProducts);
            updateCartAndTotal(updatedProducts);
        }
    };

    const handleIncrease = (index) => {
        const updatedProducts = [...products];
        updatedProducts[index].quantity += 1;
        setProducts(updatedProducts);
        updateCartAndTotal(updatedProducts);
    };

    const updateCartAndTotal = (updatedProducts) => {
        localStorage.setItem("cart", JSON.stringify(updatedProducts));
        const cartTotal = updatedProducts.reduce(
            (acc, product) => acc + product.price.toFixed(2) * product.quantity,
            0
        );
        setTotal(cartTotal);
    };

    const handleDelete = (index) => {
        const updatedProducts = [...products];
        updatedProducts.splice(index, 1);
        setProducts(updatedProducts);
        updateCartAndTotal(updatedProducts);
    };

    return (
        <div className="bg-gray-300  no-overflow-y-scroll h-auto">
            {products.length === 0 ? (
                <p className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Votre panier est vide
                </p>
            ) : (
                products.map((product, index) => (
                    <div
                        key={product.id}
                        className="cart__container border rounded-md p-4 flex md:flex-row items-center hover:bg-gray-400"
                    >
                        <img
                            src={`http://145.239.142.113:4031/${product.image1}`}
                            alt="product"
                            className="w-20 h-20 rounded-md object-cover mb-1 md:mb-0"
                        />
                        <div className="flex-1">
                            <h4 className="text-lg font-semibold">
                                {product.name}
                            </h4>
                            <span className="text-black">
                                Price: {product.price.toFixed(2)} €
                            </span>
                            <div className="mt-2 flex items-center">
                                <button
                                    onClick={() => handleDecrease(index)}
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
                                    onClick={() => handleIncrease(index)}
                                    className="bg-gray-300 text-gray-700 px-2 py-1 rounded-full"
                                >
                                    +
                                </button>
                            </div>
                            <div className="mt-2 flex items-center">
                                <button
                                    onClick={() => handleDelete(index)}
                                    className="ml-auto"
                                >
                                    <BsFillTrashFill />
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            )}
            {products.length > 0 && (
                <div className="flex justify-between">
                    <p className="text-xl font-semibold mt-4">
                        Total: {total.toFixed(2)} €
                    </p>
                    <Link
                        to="/cart"
                        className="btn bg-blue-500 text-white py-1 rounded-md inline-block mt-4"
                    >
                        Voir mon panier
                    </Link>
                </div>
            )}
        </div>
    );
};

export default CartPop;
