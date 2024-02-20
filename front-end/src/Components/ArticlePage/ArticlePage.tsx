import React, { useEffect, useState } from "react";
import { Articles } from "../Articles/Articles";
import axios from "axios";
import { Description } from "../Description/Descritpion";
import Reviews from "../Reviews/Reviews";
import Suggestion from "../Suggestion/Suggestion";
import { useParams } from "react-router-dom";
import { Caracteristique } from "../Caracteristique/Caracteristique";
import { HTTPS, HTTP } from "../../regle";
import Breadcrumbs from "../BreadCrumbs/BreadCrumbs";
import Header from "../Header/Header";
import Compatible from "../Compatible/Compatible";
import Footer from "../Footer/Footer";

const ArticlePage = () => {
    const { id } = useParams();

    const [item, setItem] = useState([]);
    useEffect(() => {
        async function getItem() {
            const response = await axios.get(
                HTTPS+"items/" + id
            );
            if (response.status === 200) {
                setItem(response.data);
            }
        }
        getItem();
    }, [id]);
    return (
        <>
            {item.name ? (
                <>
                    <Header />
                    <Articles item={item} />
                    <Caracteristique item={item} />
                    {/* <Compatible item={item}/> */}
                </>
            ): <></>}
        </>
    );
};

export default ArticlePage;
