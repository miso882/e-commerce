import "./App.css";
import LandingPage from "./Components/LandingPage/LandingPage";
import { Produits } from "./Components/Produits/Produits";
// import Reviews from "./Components/Reviews/Reviews";
import SignUp from "./Components/SignUp/SignUp";
import ErrorPage from "./error-page";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useAutoLogin } from "./Context";
// import { useContext } from 'react'
import ArticlePage from "./Components/ArticlePage/ArticlePage";
import Login from "./Components/Login/Login";
import Logout from "./Components/Logout/Logout";
import Search from "./Components/Search/Search";
import Categorie from "./Components/Categories/CreateCategorie";
import Test from "./Test";
import SubCategories from "./Components/SubCategories/SubCategories";
import Stocks from "./Components/Stocks/Stocks";
import { StocksEdit } from "./Components/Stocks/StocksEdit";
import { CaracteristiquePage } from "./Components/CaracteristiquePage/CaracteristiquePage";
import { ImagesEdit } from "./Components/ImagesEdit/ImagesEdit";
import SearchCategories from "./Components/Search/SearchCategory";
import SearchSubCategories from "./Components/Search/SearchSubCategory";
import Cart from "./Components/Cart/Cart";
import { GoogleOAuthProvider } from "@react-oauth/google";
import StripeContainer from "./Components/Payment/Stripecontainer";
import CategoryPage from "./Components/CategoryPage/CategoryPage";
import SubcategoryPage from "./Components/SubcategoryPage/SubcategoryPage";
import CompatiblePage from "./Components/Compatible/CompatiblePage";
import Delivery from "./Components/Delivery/Delivery";
import Footer from "./Components/Footer/Footer";
import Paymentmsg from "./Components/Payment/Paymentmsg";
import Orderview from "./Components/Payment/OrderView";
import Shipping from "./Components/Delivery/Shipping";
import ShippingPayment from "./Components/Delivery/ShippingPayment";
import Country from "./Components/Delivery/Country";
import ShippingCountry from "./Components/Delivery/ShippingCountry";
import AdminUser from "./Components/AdminUser/AdminUser";
function App() {
    // const currentUser = useContext(AuthContext);
    const router = createBrowserRouter([
        {
            path: "/",
            element: <LandingPage />,
            errorElement: <ErrorPage />,
        },
        {
            path: "/register",
            element: <SignUp />,
        },
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/produit",
            element: <Produits />,
        },
        {
            path: "/produit/:id",
            element: <StocksEdit />,
        },
        {
            path: "/article",
            element: <ArticlePage />,
        },
        {
            path: "/logout",
            element: <Logout />,
        },
        {
            path: "/search/:itemName?",
            element: <Search />,
        },
        {
            path: "/search/cate/:itemName?/:categoryId",
            element: <SearchCategories />,
        },
        {
            path: "/search/sub/:itemName?/:subcategoryId",
            element: <SearchSubCategories />,
        },
        {
            path: "/article/:id",
            element: <ArticlePage />,
        },
        {
            path: "/categories",
            element: <Categorie />,
        },
        {
            path: "/test",
            element: <Test />,
        },
        {
            path: "/stocks",
            element: <Stocks />,
        },
        {
            path: "/subcategories",
            element: <SubCategories />,
        },
        {
            path: "/caracteristique/:id",
            element: <CaracteristiquePage />,
        },
        {
            path: "/images/:id",
            element: <ImagesEdit />,
        },
        {
            path: "/cart",
            element: <Cart />,
        },
        {
            path: "/category/:id",
            element: <CategoryPage />,
        },
        {
            path: "/subcategory/:id",
            element: <SubcategoryPage/>
        },
        {
            path: "/payment",
            element: <StripeContainer />,
        },
        {
            path: "/paymentmsg",
            element: <Paymentmsg />,
        },
        {
            path: "/compatible",
            element: <CompatiblePage />
        },
        {
            path: "/compatible/:id",
            element: <CompatiblePage/>
            
        },
        {
            path: "/Delivery",
            element: <Delivery />,
        },
        {
            path: "/order",
            element: <Orderview />,
        },
        {
            path: "/shippingfees",
            element: <Shipping />
        },
        {
            path: "/shippingfees/:id",
            element: <ShippingCountry />
        },
        {
            path: "/shipping/:id",
            element: <ShippingPayment />
        },
        {
            path: "/shipping",
            element: <ShippingPayment />
        },
        {
            path: "/country",
            element: <Country />
        },
        {
            path: "/adminuser",
            element: <AdminUser />
        }
    ]);
    useAutoLogin();
    return (
        <>
            {/* <AuthContext.Provider value={currentUser}> */}
            <GoogleOAuthProvider
                clientId="249834473450-1id8da1e9sh4chnu42vj3e785ujfnsa4.apps.googleusercontent.com"
            >
                <div className="heha">

                <RouterProvider router={router} />
                </div>
            </GoogleOAuthProvider>
            {/* </AuthContext.Provider> */}
            <Footer />
        </>
    );
}

export default App;
