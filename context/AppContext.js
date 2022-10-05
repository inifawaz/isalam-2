import { deleteCookie, getCookie } from "cookies-next";
import { createContext, useEffect, useState } from "react";
import { axios } from "../lib/axiosInstance";
import { useRouter } from "next/router";
const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const router = useRouter();
    const [user, setUser] = useState(false);
    const [token, setToken] = useState(false);
    const [pageLoading, setPageLoading] = useState(false);
    const [dialogLogin, setDialogLogin] = useState(false);
    const checkAuth = async () => {
        await axios
            .get("/me", {
                headers: {
                    Authorization: `Bearer ${getCookie("token")}`,
                },
            })
            .then((response) => {})
            .catch((error) => {
                if (error.response.status === 401) {
                    deleteCookie("token");
                    deleteCookie("user");
                    setUser(false);
                    setToken(false);
                    router.push("/login");
                }
            });
    };
    useEffect(() => {
        setPageLoading(false);
        if (getCookie("token") && getCookie("user")) {
            setUser(JSON.parse(getCookie("user")));
            setToken(getCookie("token"));
            checkAuth();
        }
    }, []);
    return (
        <AppContext.Provider
            value={{
                user,
                setUser,
                token,
                setToken,
                pageLoading,
                setPageLoading,
                dialogLogin,
                setDialogLogin,
            }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContext;
