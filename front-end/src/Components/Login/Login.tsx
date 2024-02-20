import React, { useContext, useEffect, useState } from "react";
import "./Login.module.sass";
import { useAuth } from "../../Context";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { HTTP } from "../../regle";
import FacebookLogin from "@greatsumini/react-facebook-login";
import MicrosoftLogin from "react-microsoft-login";
import HeaderRegister from "../Header/HeaderRegister";


const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [provider, setProvider] = useState("");
    const { setUser } = useAuth();
    async function socialLog(cred) {
        try {
            const jwt = jwt_decode(cred.credential);
            const request = {
                email: jwt.email,
                idgoogle: jwt.sub,
            };
            const response = await axios.post(HTTP + "login/google", request);
            if (response.status === 200) {
                const jwt: { username: string; roles: string } =
                    await jwt_decode(response.data);
                localStorage.setItem("username", jwt.username);
                localStorage.setItem("role", jwt.roles[0]);
                localStorage.setItem("id", jwt.id);
                // currentUser.email = jwt.username;
                // currentUser.role = jwt.roles[0];
                console.log(jwt);
                setUser({ email: jwt.username, role: jwt.roles[0], token: response.data });
                navigate("/");
            }
        } catch (e) {
            console.log(e);
        }
    }
    async function facebookLog(cred) {
        try {
            const request = {
                email: cred.email,
                idfacebook: cred.id,
            };
            const response = await axios.post(HTTP + "login/facebook", request);
            if (response.status === 200) {
                const jwt: { username: string; roles: string } =
                    await jwt_decode(response.data);
                localStorage.setItem("username", jwt.username);
                localStorage.setItem("role", jwt.roles[0]);
                localStorage.setItem("id", jwt.id);
                // currentUser.email = jwt.username;
                // currentUser.role = jwt.roles[0];
                setUser({ email: jwt.username, role: jwt.roles[0], token: response.data });
                navigate("/");
            }
        } catch (e) {
            console.log(e);
        }
    }
    async function authHandler(error, data) {
        try {
            const request = {
                email: data.account.username,
                idmicrosoft: data.uniqueId,
            };
            const response = await axios.post(
                HTTP + "login/microsoft",
                request
            );
            if (response.status === 200) {
                const jwt: { username: string; roles: string } =
                    await jwt_decode(response.data);
                localStorage.setItem("username", jwt.username);
                localStorage.setItem("role", jwt.roles[0]);
                localStorage.setItem("id", jwt.id);
                // currentUser.email = jwt.username;
                // currentUser.role = jwt.roles[0];
                setUser({ email: jwt.username, role: jwt.roles[0], token: response.data });
                navigate("/");
            }
        } catch (e) {
            console.log(e);
        }
    }
    async function submit(e) {
        e.preventDefault();
        try {
            const response = await axios.post(HTTP + "login_check", {
                username: email,
                password: password,
            });
            if (response.status === 200) {
                console.log("You are now connected");
                const jwt: { username: string; roles: string } =
                    await jwt_decode(response.data.token);
                localStorage.setItem("username", jwt.username);
                localStorage.setItem("role", jwt.roles[0]);
                localStorage.setItem("id", jwt.id);
                // currentUser.email = jwt.username;
                // currentUser.role = jwt.roles[0];
                setUser({ email: jwt.username, role: jwt.roles[0], token: response.data.token });
                navigate("/");
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>
        <HeaderRegister />
            <main>
                <div className=" bg-cover h-4/5  bg-no-repeat bg-center flex m-auto" style = {{width: "86vw"}}>
                    <div className=" bg-[url('./Logo_dayoo.png')] bg-no-repeat bg-center xxs:w-0sm:ml-48 lg:w-1/2 lg:ml-0 xxs:mt-5"></div>
                    <div className="bg-[#1818189a] lg:m-0 m-auto h-85 backdrop-blur-sm xxs:w-auto xxs:h-min xxs:mt-50 lg:w-1/2 lg:h-85 lg:mt-0 lg:ml-0">
                        <div className="rounded-md">
                            <div className="flex flex-col w-60 mx-10">
                                <h1 className="mt-10 lg:mt-52 text-white">
                                    Email
                                </h1>
                                <input
                                    className="my-4 bg-transparent border-solid border-white border-b-2 outline-none rounded-md text-white"
                                    type="text"
                                    onInput={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => {
                                        setEmail(e.target.value);
                                    }}
                                    value={email}
                                    name="email"
                                />
                            </div>
                            <div className="flex flex-col w-60 mx-10 pb-10">
                                <h1 className="mt-10 text-white">Password</h1>
                                <input
                                    className="my-4 bg-transparent border-solid border-white border-b-2 outline-none rounded-md text-white"
                                    type="password"
                                    onInput={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => {
                                        setPassword(e.target.value);
                                    }}
                                    value={password}
                                    name="password"
                                />
                                <div className="flex justify-center m-auto space-x-7 mt-20 xxs:mt-10 xxs:space-x-4">
                                    <Link to={"/register"}>
                                        <button className="p-2 border-solid border-white border-2 bg-white text-[#0f0f0fef] rounded-lg w-40 xxs:w-24">
                                            Sign up
                                        </button>
                                    </Link>
                                    <button
                                        type="submit"
                                        className="p-2 border-solid border-white border-2 rounded-lg w-40 text-white xxs:w-28"
                                        onClick={submit}
                                    >
                                        Log in
                                    </button>
                                </div>
                                <div className="flex flex-col mt-5">
                                    <div className="mt-2 mb-2 px">
                                        <GoogleLogin
                                            onSuccess={(credentialResponse) => {
                                                setProvider("Google");
                                                socialLog(credentialResponse);
                                            }}
                                            onError={() => {
                                                console.log("Login Failed");
                                            }}
                                        />
                                    </div>
                                    <div className="mt-1 mb-2 w-98 flex  bg-blue-500 rounded-md hover:bg-blue-700 items-center">
                                        <svg
                                            width="12"
                                            height="18"
                                            viewBox="0 0 12 20"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="ml-2"
                                        >
                                            <path
                                                d="M3.19776 19.5H7.19776V11.49H10.8018L11.1978 7.51H7.19776V5.5C7.19776 5.23478 7.30311 4.98043 7.49065 4.79289C7.67819 4.60536 7.93254 4.5 8.19776 4.5H11.1978V0.5H8.19776C6.87168 0.5 5.59991 1.02678 4.66222 1.96447C3.72454 2.90215 3.19776 4.17392 3.19776 5.5V7.51H1.19776L0.801758 11.49H3.19776V19.5Z"
                                                fill="white"
                                            />
                                        </svg>

                                        <FacebookLogin
                                            appId="845304190707725"
                                            className="px-2 py-2 text-white"
                                            onFail={(error) => {
                                                console.log(
                                                    "Login Failed!",
                                                    error
                                                );
                                            }}
                                            onProfileSuccess={(response) => {
                                                facebookLog(response);
                                            }}
                                        />
                                    </div>
                                    <MicrosoftLogin
                                        className="text-white bg-white-500 rounded-md hover:bg-red-300 "
                                        clientId={
                                            "98e8ada9-e00a-4f42-9172-b0f5c3caebfe"
                                        }
                                        authCallback={authHandler}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Login;
