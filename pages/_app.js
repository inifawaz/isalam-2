import AppContext, { AppProvider } from "../context/AppContext";
import "../styles/globals.css";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

function MyApp({ Component, pageProps }) {
    // const router = useRouter();
    // const { setPageLoading } = useContext(AppContext);
    // useEffect(() => {
    //     const handleStart = (url) =>
    //         url !== router.asPath && setPageLoading(true);
    //     const handleComplete = (url) =>
    //         url === router.asPath &&
    //         setTimeout(() => {
    //             setPageLoading(false);
    //         }, 5000);

    //     router.events.on("routeChangeStart", handleStart);
    //     router.events.on("routeChangeComplete", handleComplete);
    //     router.events.on("routeChangeError", handleComplete);

    //     return () => {
    //         router.events.off("routeChangeStart", handleStart);
    //         router.events.off("routeChangeComplete", handleComplete);
    //         router.events.off("routeChangeError", handleComplete);
    //     };
    // });
    return (
        <AppProvider>
            <Component {...pageProps} />
            <Toaster
                toastOptions={{
                    duration: 3000,
                    style: {
                        color: "white",
                        backgroundColor: "#0f172a",
                    },
                }}
            />
        </AppProvider>
    );
}

export default MyApp;
