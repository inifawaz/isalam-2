import { deleteCookie, getCookie } from "cookies-next";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import AppContext from "../context/AppContext";
import { axios } from "../lib/axiosInstance";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

export default function NavSideAuth() {
    const { user, setUser, setToken } = useContext(AppContext);
    const router = useRouter();

    const navigationsAuth = [
        {
            href: "/me/payments",
            text: "Pembayaran",
        },
        {
            href: "/me/projects",
            text: "Program Wakaf",
        },
        {
            href: "/me/setting",
            text: "Atur Profile",
        },
    ];
    const handleLogout = async () => {
        await axios
            .post(
                "/logout",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${getCookie("token")}`,
                    },
                }
            )
            .then((response) => {
                toast.success("berhasil logout");
                console.log(response);
                deleteCookie("token");
                deleteCookie("user");
                router.push("/");

                setUser(false);
                setToken(false);
            })
            .catch((error) => {
                toast.error("ada yang salah, coba lagi nanti");
                console.log(error);
            });
    };
    return (
        <div className='p-4 bg-white border hidden md:block sticky top-[58px] rounded-md shadow-md'>
            <div className='flex items-center space-x-1'>
                <div className='relative h-8 w-8 rounded-full overflow-hidden shadow-lg border'>
                    <Image src={user.avatar_url} layout='fill' alt='avatar' />
                </div>
                <div className='hidden md:block'>
                    <p className=' leading-none'>{user.full_name}</p>
                    <p className='text-sm leading-none'>{user.email}</p>
                </div>
            </div>
            <div className='mt-4'>
                {navigationsAuth.map((item, index) => (
                    <Link key={index} href={item.href}>
                        <a
                            className={
                                "block p-1 rounded-md transition-all hover:bg-gray-100"
                            }>
                            {item.text}
                        </a>
                    </Link>
                ))}
                <button
                    onClick={handleLogout}
                    className={
                        "block   p-1 text-left w-full rounded-md transition-all hover:bg-gray-100"
                    }>
                    Keluar
                </button>
            </div>
        </div>
    );
}
