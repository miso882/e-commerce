import React, { useEffect, useRef, useState, Fragment } from "react";
import { BiSearch } from "react-icons/bi";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Categories from "../Categories/Banner";
import CartPop from "../Cart/CartPop";
import { useAuth } from "../../Context";
import Breadcrumbs from "../BreadCrumbs/BreadCrumbs";
import { HTTP } from "../../regle";

const Header = () => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [open, setOpen] = useState(false);
    const popupRef = useRef(null);
    const [categoriesSearch, setCategoriesSearch] = useState([]);
    const [categoryInput, setCategoryInput] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const [searchResult, setSearchResult] = useState(<></>);
    const [filter, setFilter] = useState([]);
    const [dropdownResult, setDropdownResult] = useState(false);
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [cartItemsCount, setCartItemsCount] = useState(0);
    const localcart = localStorage.getItem("cart");
    const { user } = useAuth();

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(HTTP + "categories");
            setCategoriesSearch(response.data);
            const items = await axios.get(HTTP + "items");
            setData(items.data);
        }
        fetchData();
        console.log(user);
    }, [user]);
    useEffect(() => {
        const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        const totalItemsCount = cartItems.reduce(
            (totalCount, item) => totalCount + item.quantity,
            0
        );
        setCartItemsCount(totalItemsCount);
    }, [localcart]);

    function redirectArticle(id) {
        navigate("/article/" + id);
    }

    useEffect(() => {
        const fetchData = async () => {
            if (categoryInput.subcate === false) {
                const filtred = await data.filter(
                    (item) =>
                        item.name.includes(searchInput || "") &&
                        item.category.id == categoryInput.id
                );
                setFilter(filtred);
            } else if (categoryInput.subcate === true) {
                const filtred = await data.filter(
                    (item) =>
                        item.name.includes(searchInput || "") &&
                        item.subcategory.id == categoryInput.id
                );
                setFilter(filtred);
            } else {
                const filtred = await data.filter((item) =>
                    item.name.includes(searchInput || "")
                );
                setFilter(filtred);
            }
            const result = (
                <div className="bg-zinc-400 h-64 no-scrollbar overflow-y-scroll w-9/12">
                    {filter.map((item) => {
                        return (
                            <Fragment key={item.id}>
                                <div
                                    onClick={() => {
                                        redirectArticle(item.id);
                                    }}
                                    className="w-full w-min-full bg-red flex m-auto hover:bg-zinc-300"
                                >
                                    <div className="w-3/12 h-32 ">
                                        <img
                                            src={
                                                "http://145.239.142.113:4031/" +
                                                item.image1
                                            }
                                            alt="product"
                                        />
                                    </div>
                                    <div className="w-9/12">
                                        <p>{item.name}</p>
                                        <p>{item.price} $</p>
                                    </div>
                                </div>
                            </Fragment>
                        );
                    })}
                </div>
            );
            setSearchResult(result);
        };
        const timer = setTimeout(() => {
            fetchData();
        }, 1000);

        return () => clearTimeout(timer);
    }, [searchInput, categoryInput, data, filter]);

    const search = () => {
        if (searchInput === "") {
            return;
        }
        if (categoryInput.subcate === true) {
            navigate("/search/sub/" + searchInput + "/" + categoryInput.id);
        } else if (categoryInput.subcate === false) {
            navigate("/search/cate/" + searchInput + "/" + categoryInput.id);
        } else {
            navigate("/search/" + searchInput);
        }
    };

    const handleDropdownClick = () => {
        setDropdownOpen((prevState) => !prevState);
        setOpen(false);
    };

    const handlePopupClick = () => {
        setOpen(!open);
        setDropdownOpen(false);
    };

    return (
        <>
            <header className="border-gray-400 px-2 text-white  md:px-5 py-4">
                <div className="flex flex-wrap items-center justify-between">
                    <div className="w-full md:w-auto mb-3 md:mb-0 md:mr-3">
                        <Link to="/">
                            <img
                                src={"/Logo_dayoo.png"}
                                className="w-16 h-16 bg-9 m-auto"
                                alt="react"
                            />
                        </Link>
                    </div>
                    <div className="w-full md:w-5/12 lg:w-6/12 mb-3 md:mb-0 md:ml-auto md:mr-auto">
                        <div className="flex relative">
                            <input
                                onFocus={() => setDropdownResult(true)}
                                type="search"
                                onKeyDownCapture={(e) => {
                                    if (e.code === "Enter") search();
                                }}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                    setSearchInput(e.target.value);
                                }}
                                className="md:w-9/12 w-9/12 lg:w-full bg-white px-2 py-1 rounded"
                                placeholder="Search.."
                            />
                            <button onClick={search}>
                                <BiSearch className="translate-x-[-22px]" />
                            </button>
                            <div
                                className="flex justify-items-center z-50"
                                style={{
                                    position: "absolute",
                                    bottom: -10,
                                    transform: "translateY(100%)",
                                }}
                            >
                                <div className="w-12/12 m-auto pt-10">
                                    {dropdownResult === true ? (
                                        searchResult
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-right">
                        <div className="flex items-center space-x-2">
                            <div
                                className="relative cursor-pointer"
                                onClick={handlePopupClick}
                            >
                                <img
                                    src="/cart.png"
                                    className="w-7"
                                    alt="wallet"
                                />
                                {cartItemsCount > 0 && (
                                    <div className="absolute -top-2 -left-3 bg-red-500 w-5 h-5 text-white text-xs rounded-full flex items-center justify-center">
                                        {cartItemsCount}
                                    </div>
                                )}
                            </div>
                            <span
                                className="hidden md:inline text-sm cursor-pointer text-white hover:text-sky-700"
                                onClick={handlePopupClick}
                            >
                                Mon panier
                            </span>
                            <img
                                src="/user.png"
                                className="w-6 cursor-pointer"
                                alt="account"
                                onClick={handleDropdownClick}
                            />
                            <span
                                className="hidden md:inline text-sm cursor-pointer text-white hover:text-sky-700"
                                onClick={() => handleDropdownClick()}
                            >
                                {user.email ? user.email : "Login"}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-center text-white"></div>
            </header>
            {isDropdownOpen && (
                <div
                    ref={dropdownRef}
                    className="absolute z-10 right-[6rem] w-40 bg-white border border-gray-300 rounded shadow-md"
                >
                    <div className="py-1">
                        {user.email ? (
                            <>
                                <Link
                                    to={"/Edit"}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Edit Profile
                                </Link>

                                <Link
                                    to={"/Logout"}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Logout
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    to={"/Login"}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Login
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
            {open && (
                <div
                    ref={popupRef}
                    className="absolute z-10 bg-white w-96  right-44 shadow-2xl rounded-md p-1"
                >
                    <CartPop />
                </div>
            )}
        </>
    );
};

export default Header;
