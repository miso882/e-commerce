import React, { useEffect, useState } from "react";
import validator from "validator";
import axios from "axios";
import "./SignUp.module.sass";
import { useAuth } from "../../Context";
import { useNavigate, Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { GoogleLogin } from "@react-oauth/google";
import { HTTP } from "../../regle";
import FacebookLogin from "@greatsumini/react-facebook-login";
import MicrosoftLogin from "react-microsoft-login";
import Header from "../Header/HeaderRegister";

const SignUp = () => {
    const [step, setStep] = useState(1);
    const [nextStep, setNextStep] = useState(<></>);
    const [email, setEmail] = useState("");
    const [lastname, setLastname] = useState("");
    const [firstname, setFirstname] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [adress, setadress] = useState("");
    const [country, setCountry] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [countryList, setCountryList] = useState([]);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { setUser } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        async function getData() {
            const response = await axios.get(HTTP + "country");
            if (response.data) {
                setCountryList(response.data);
            }
        }
        getData();
    }, [])
    const authHandler = async (err, data) => {
        console.log(data);
        const name = data.account.name.split(" ");
        if (validator.isEmail(data.account.username)) {
            const request = {
                email: data.account.username,
                lastname: "",
                firstname: "",
                ismicrosoft: true,
                idmicrosoft: data.uniqueId,
            };
            if (name[1]) {
                request.lastname = name[1];
            }
            if (name[0]) {
                request.firstname = name[0];
            }
            const response = await axios.post(
                HTTP + "microsoftusers",
                request
            );
            if (response.status === 201) {
                const response = await axios.post(HTTP + "login/microsoft", request);
                if (response.status === 200) {
                    const jwt: { username: string; roles: string; id: string } =
                        await jwt_decode(response.data);
                    localStorage.setItem("username", jwt.username);
                    localStorage.setItem("role", jwt.roles[0]);
                    localStorage.setItem("id", jwt.id);
                    // currentUser.email = jwt.username;
                    // currentUser.role = jwt.roles[0];
                    setUser({ email: jwt.username, role: jwt.roles[0], token: response.data });
                    navigate("/");
                }
                console.log(response);
            }
        }
    };

    const googleAuth = async (authCredential: any) => {
        console.log(authCredential);
        const data = jwt_decode(authCredential.credential);
        console.log(data);
        if (validator.isEmail(data.email)) {
            const request = {
                email: data.email,
                lastname: "",
                firstname: "",
                isgoogle: true,
                idgoogle: data.sub,
            };
            if (data.family_name) {
                request.lastname = data.family_name;
            }
            if (data.given_name) {
                request.firstname = data.given_name;
            }
            const response = await axios.post(
                HTTP + "googleusers",
                request
            );
            if (response.status === 201) {
                const response = await axios.post(HTTP + "login/google", request);
                if (response.status === 200) {
                    const jwt: { username: string; roles: string } =
                        await jwt_decode(response.data);
                    localStorage.setItem("username", jwt.username);
                    localStorage.setItem("role", jwt.roles[0]);
                    // currentUser.email = jwt.username;
                    // currentUser.role = jwt.roles[0];
                    setUser({ email: jwt.username, role: jwt.roles[0], token: response.data });
                    navigate("/");
                }
                console.log(response);
            }
        }
    };
    const facebookAuth = async (authCredential: any) => {
        const name = authCredential.name.split(" ");
        if (validator.isEmail(authCredential.email)) {
            const request = {
                email: authCredential.email,
                lastname: "",
                firstname: "",
                isfacebook: true,
                idfacebook: authCredential.id,
            };
            if (name[1]) {
                request.lastname = name[1];
            }
            if (name[0]) {
                request.firstname = name[0];
            }
            const response = await axios.post(
                HTTP + "facebookusers",
                request
            );
            if (response.status === 201) {
                const response = await axios.post(HTTP + "login/facebook", request);
                if (response.status === 200) {
                    const jwt: { username: string; roles: string } =
                        await jwt_decode(response.data);
                    localStorage.setItem("username", jwt.username);
                    localStorage.setItem("role", jwt.roles[0]);
                    // currentUser.email = jwt.username;
                    // currentUser.role = jwt.roles[0];
                    setUser({ email: jwt.username, role: jwt.roles[0], token: response.data });
                    navigate("/");
                }
                console.log(response);
            }
        }
    };
    useEffect(() => {
        async function next() {
            if (
                validator.isEmail(email) &&
                !validator.isEmpty(lastname) &&
                !validator.isEmpty(firstname) &&
                step === 1
            ) {
                setStep(2);
            } else if (
                validator.isDate(birthdate) &&
                step === 2
            ) {
                setStep(3);
            } else if (
                validator.isStrongPassword(password) &&
                password === confirmPassword &&
                step === 3
            ) {
                const request = {
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    country: country,
                    birthdate: birthdate,
                    password: password,
                    zipcode: zipcode,
                    address: adress
                };
                console.log(request)
                const response = await axios.post(
                    HTTP + "users",
                    request
                );
                if (response.status === 201) {
                    const data = await axios.post(
                        HTTP + "login_check",
                        { username: request.email, password: password }
                    );
                    if (data.status === 200) {
                        const jwt: { username: string; roles: string } =
                            await jwt_decode(data.data.token);
                        localStorage.setItem("username", jwt.username);
                        localStorage.setItem("role", jwt.roles[0]);
                        // currentUser.email = jwt.username;
                        // currentUser.role = jwt.roles[0];
                        setUser({ email: jwt.username, role: jwt.roles[0], token: response.data.token });
                        navigate("/");
                    }
                }
            }
        }
        if (step === 1) {
            setNextStep(
                <>
                    <div className="rounded-md">
                        <div className="flex flex-col w-60 mx-10">
                            <h1 className="mt-10 lg:mt-20 text-white">Firstname</h1>
                            <input
                                className="pl-3 my-4 bg-transparent border-solid border-white border-b-2 outline-none rounded-md text-white"
                                type="text"
                                onInput={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                    setFirstname(e.target.value);
                                }}
                                value={firstname}
                                placeholder="Firstname"
                                name="firstname"
                            ></input>
                        </div>
                        <div className="flex flex-col w-60 mx-10">
                            <h1 className="mt-10 text-white">Lastname</h1>
                            <input
                                className="pl-3 my-4 bg-transparent border-solid border-white border-b-2 outline-none rounded-md text-white"
                                type="text"
                                onInput={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                    setLastname(e.target.value);
                                }}
                                value={lastname}
                                placeholder="Lastname"
                                name="lastname"
                            ></input>
                        </div>

                        <div className="flex flex-col w-60 mx-10">
                            <h1 className="mt-10  text-white">Email</h1>

                            <input
                                className="pl-3 my-4 bg-transparent border-solid border-white border-b-2 outline-none rounded-md text-white"
                                type="email"
                                onInput={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                    setEmail(e.target.value);
                                }}
                                value={email}
                                placeholder="Email"
                                name="email"
                            ></input>
                        </div>
                        <div className="flex m-auto space-x-7 mt-10 xxs:mt-10 xxs:space-x-4 mx-10">
                            <Link to={"/login"} >
                                <button className="p-2 border-solid border-white border-2 bg-white text-[#0f0f0fef] rounded-lg w-40 xxs:w-24">
                                    Login
                                </button>
                            </Link>
                            <button
                                className="p-2 border-solid border-white border-2 rounded-lg w-40 text-white xxs:w-28"
                                onClick={() => {
                                    next();
                                }}
                            >
                                Next step
                            </button>
                        </div>
                    </div>
                </>
            );
        } else if (step === 2) {
            setNextStep(
                <>
                    <div className="rounded-md">
                        <div className="flex flex-col w-60 mx-10">
                            <h1 className="mt-10 lg:mt-8 text-white">Birthdate</h1>
                            <input
                                className="pl-3 my-4 bg-transparent border-solid border-white border-b-2 outline-none rounded-md text-white"
                                onInput={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                    setBirthdate(e.target.value);
                                }}
                                type="date"
                                value={birthdate}
                                placeholder="Birthdate"
                                name="birthdate"
                            ></input>
                        </div>
                        <div className="flex flex-col w-60 mx-10">
                            <h1 className="mt-10 text-white">adresse</h1>
                            <input
                                className="pl-3 my-4 bg-transparent border-solid border-white border-b-2 outline-none rounded-md text-white"
                                onInput={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                    setadress(e.target.value);
                                }}
                                type="text"
                                name="adresse"
                                placeholder="adresse"
                            ></input>
                        </div>
                        <div className="flex flex-col w-60 mx-10">
                            <h1 className="mt-10 text-white">Country</h1>
                            <select className="pl-3 my-4 bg-transparent border-solid border-white border-b-2 outline-none rounded-md text-white" onChange={(e) => { setCountry(e.target.value) }}>
                                <option selected value={"PAYS"}>
                                    Select a country
                                </option>
                                {countryList ? <>
                                    {
                                        countryList.map((item) => {
                                            return (
                                                <option className="" key={item.id} value={item.id}>{item.name}</option>
                                            )
                                        }
                                        )}
                                </>
                                    : <></>
                                }
                            </select>
                        </div>
                        <div className="flex flex-col w-60 mx-10">
                            <h1 className="mt-10 text-white">Zipcode</h1>
                            <input
                                className="pl-3 my-4 bg-transparent border-solid border-white border-b-2 outline-none rounded-md text-white"
                                onInput={(
                                    e
                                ) => {
                                    setZipcode(e.target.value);
                                }}
                                type="text"
                                name="zipcode"
                                placeholder="zipcode"
                            ></input>
                        </div>
                        <div className="flex justify-center m-auto space-x-7 mt-20 xxs:mt-10 xxs:space-x-4">
                            <button
                                className="p-2 border-solid border-white border-2 rounded-lg w-40 text-white xxs:w-28"
                                onClick={() => {
                                    next();
                                }}
                            >
                                Next Step
                            </button>
                        </div>
                    </div>
                </>
            );
        } else if (step === 3) {
            setNextStep(
                <>
                    <div className="rounded-md">
                        <div className="flex flex-col w-60 mx-10">
                            <h1 className="mt-10 lg:mt-20 text-white">Password</h1>

                            <input
                                className="pl-3 my-4 bg-transparent border-solid border-white border-b-2 outline-none rounded-md text-white"
                                onInput={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                    setPassword(e.target.value);
                                }}
                                type="password"
                                value={password}
                                placeholder="Password"
                                name="password"
                            ></input>
                        </div>
                        <div className="flex flex-col w-60 mx-10">
                            <h1 className="mt-10 text-white">Confirm password</h1>

                            <input
                                onInput={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                    setConfirmPassword(e.target.value);
                                }}
                                className="my-4 bg-transparent border-solid border-white border-b-2 outline-none rounded-md text-white"
                                type="password"
                                value={confirmPassword}
                                placeholder="Password"
                                name="confirmPassword"
                            ></input>
                        </div>

                        <div className="flex justify-center m-auto space-x-7 mt-20 xxs:mt-10 xxs:space-x-4">
                            <button
                                className="p-2 border-solid border-white border-2 bg-white text-[#0f0f0fef] rounded-lg w-40 xxs:w-24"
                                onClick={() => next()}
                            >
                                Sign up
                            </button>
                        </div>
                    </div>
                </>
            );
        }
    }, [
        firstname,
        lastname,
        email,
        step,
        country,
        birthdate,
        password,
        confirmPassword,
    ]);
    return (
        <>
            <Header />
            <main>
                <div className=" bg-cover h-4/5  bg-no-repeat bg-center flex m-auto" style={{ width: "86vw" }}>
                    <div className="bg-[url('./Logo_dayoo.png')] bg-no-repeat bg-center xxs:w-0sm:ml-48 lg:w-1/2 lg:ml-0 xxs:mt-5"></div>
                    <div className="bg-[#1818189a] lg:m-0 m-auto h-screen backdrop-blur-sm xxs:w-auto xxs:h-min xxs:mt-5 lg:w-1/2 lg:h-77 lg:mt-0 lg:ml-0">
                        {nextStep}
                        <div className="flex flex-col mt-5 mx-10">
                            <div className="mt-2 mb-2 px">
                                <GoogleLogin

                                    onSuccess={(credentialResponse) => {
                                        googleAuth(credentialResponse);
                                    }}
                                    onError={() => {
                                        console.log("Login Failed");
                                    }}
                                />
                            </div>
                            <div className="mt-1 mb-2 px w-64 flex items-center  bg-blue-500 rounded-md hover:bg-blue-700">
                                <svg width="12" height="18" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2">
                                    <path d="M3.19776 19.5H7.19776V11.49H10.8018L11.1978 7.51H7.19776V5.5C7.19776 5.23478 7.30311 4.98043 7.49065 4.79289C7.67819 4.60536 7.93254 4.5 8.19776 4.5H11.1978V0.5H8.19776C6.87168 0.5 5.59991 1.02678 4.66222 1.96447C3.72454 2.90215 3.19776 4.17392 3.19776 5.5V7.51H1.19776L0.801758 11.49H3.19776V19.5Z" fill="white" />
                                </svg>
                                <FacebookLogin
                                    appId="845304190707725"
                                    className="px-4 py-2 text-white"
                                    onFail={(error) => {
                                        console.log("Login Failed!", error);
                                    }}
                                    onProfileSuccess={(response) => {
                                        facebookAuth(response);
                                    }}
                                />
                            </div>
                            <MicrosoftLogin
                                className="text-white bg-white-500 rounded-md hover:bg-red-300 mb-10"
                                clientId={
                                    "98e8ada9-e00a-4f42-9172-b0f5c3caebfe"
                                }
                                authCallback={authHandler}
                            />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default SignUp;
