import React from "react";
import { Link } from "react-router-dom";

const Breadcrumbs = ({ sub, category, item, search }) => {
    if (item != undefined && item !== null && item.name.length > 10) {
        item.name = item.name.slice(0, 15) + "..";
    }
    return (
        <div className="breadcrumbs text-white ml-24 mt-3">
            <Link to={"/"} className="breadcrumb-link hover:text-blue-500">
                Home
            </Link>
            {category == undefined || category == null ? (
                <></>
            ) : (
                <>
                    {" > "}
                    <Link
                        to={"/category/" + category.id}
                        className="breadcrumb-link hover:text-blue-500"
                    >
                        {category.name}
                    </Link>
                </>
            )}
            {sub == undefined || sub == null ? (
                <></>
            ) : (
                <>
                    {" > "}
                    <Link
                        to={"/subcategory/" + sub.id}
                        className="breadcrumb-link hover:text-blue-500"
                    >
                        {sub.name}
                    </Link>
                </>
            )}
            {search == undefined || search == null ? (
                <></>
            ) : (
                <>
                    {" > "}
                    <Link
                        to={location.href}
                        className="breadcrumb-link hover:text-blue-500"
                    >
                        {search}
                    </Link>
                </>
            )}
            {item == undefined || item == null ? (
                <></>
            ) : (
                <>
                    {" > "}
                    <Link
                        to={location.href}
                        className="breadcrumb-link hover:text-blue-500"
                    >
                        {item.name}
                    </Link>
                </>
            )}
        </div>
    );
};

export default Breadcrumbs;
