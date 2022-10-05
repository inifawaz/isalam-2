import React from "react";
import { useContext } from "react";
import AppContext from "../context/AppContext";
import Footer from "./Footer";
import Header from "./Header";
import PageLoading from "./PageLoading";

export default function Layout({ children }) {
    const { pageLoading } = useContext(AppContext);
    return (
        <div className='min-h-screen  flex flex-col justify-between'>
            <Header />
            {pageLoading && <PageLoading />}
            <div className='pt-14 relative'>{children}</div>
            <Footer />
        </div>
    );
}
