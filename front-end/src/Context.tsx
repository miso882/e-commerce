import { createContext, useContext, useEffect, useState } from "react";

// export const AuthContext = localStorage.getItem("username") ? createContext({email: localStorage.getItem("username"), role: localStorage.getItem("role")}) : createContext({email: "", role: ""});

interface AuthProviderInterface {
    children: JSX.Element;
}
interface UserInterface {
    email: string | null;
    role: string | null;
    token: string | null
}

interface AuthContextInterface {
    user: UserInterface;
    setUser: (user: UserInterface) => void;
    setUserField: (key: "email" | "role" | "token", value: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextInterface>({
    user: { email: "", role: "", token: "" },
    setUser: () => {},
    setUserField: () => {},
    logout: () => {},
});

export const useAuth = (): AuthContextInterface => useContext(AuthContext);

export const useAutoLogin = () => {
    const { setUser } = useAuth();

    useEffect(() => {
        if (localStorage.getItem("username"))
            setUser({
                email: localStorage.getItem("username"),
                role: localStorage.getItem("role"),
                token: localStorage.getItem("token")
            });
    }, []);
};

const AuthProvider = ({ children }: AuthProviderInterface) => {
    const [user, setUser] = useState<UserInterface>({ email: "", role: "", token: "" });

    const setUserField = (key: "email" | "role" | "token", value: string) => {
        const tmpUser = { ...user };
        tmpUser[key] = value;
        setUser(tmpUser);
    };

    const logout = () => {
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        localStorage.removeItem("token");
        setUser({ email: "", role: "", token: "" });
    };

    return (
        <AuthContext.Provider value={{ user, setUser, setUserField, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
