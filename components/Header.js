import Image from "next/image";
import React, { Fragment, useContext, useState } from "react";
import Container from "./Container";
import isalamDark from "../public/isalam-dark.png";
import Link from "next/link";
import { HiMenu, HiUserCircle } from "react-icons/hi";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import AppContext from "../context/AppContext";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { axios } from "../lib/axiosInstance";
import { useFormik } from "formik";
import * as yup from "yup";
import Input from "./Input";
import Button from "./Button";
import toast from "react-hot-toast";
import PageLoading from "./PageLoading";

const navigations = [
    {
        href: "/",
        text: "Beranda",
    },
    {
        href: "/projects",
        text: "Wakaf",
    },
    {
        href: "/articles",
        text: "Artikel",
    },
    {
        href: "/about-us",
        text: "Tentang Kami",
    },
];

const navigationsAuth = [
    {
        href: "/me/dashboard",
        text: "Dashboard",
    },
];

export default function Header() {
    const {
        user,
        token,
        setUser,
        setToken,
        dialogLogin,
        setDialogLogin,
        setPageLoading,
    } = useContext(AppContext);
    function classNames(...classes) {
        return classes.filter(Boolean).join(" ");
    }

    const router = useRouter();
    const handleLogout = async () => {
        await axios
            .get(
                "/logout",

                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((response) => {
                toast.success("berhasil logout");
                console.log(response);
                deleteCookie("token");
                deleteCookie("user");
                setUser(false);
                setToken(false);
                router.push("/");
            })
            .catch((error) => {
                toast.error("ada yang salah, coba lagi nanti");
                console.log(error);
            });
    };

    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const formikLogin = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: yup.object({
            email: yup.string().required("email tidak boleh kosong"),
            password: yup.string().required("password tidak boleh kosong"),
        }),
        onSubmit: (values) => {
            handleLogin(values);
        },
    });
    const handleLogin = async (values) => {
        setMessage("");
        setIsLoading(true);
        await axios
            .post("/login", values)
            .then((response) => {
                console.log(response);
                const token = response.data.token;
                const user = response.data.user;
                setCookie("token", token);
                setCookie("user", user);

                setUser(JSON.parse(getCookie("user")));
                setToken(getCookie("token"));
                formikLogin.handleReset();
                setDialogLogin(false);
                toast.success("berhasil login");
                // if (user.role.includes("admin")) {
                //     router.push("/admin/dashboard");
                // } else {
                //     router.push("/");
                // }
            })
            .catch((error) => {
                toast.error("ada yang salah, coba lagi nanti");
                setMessage(error.response.data.message);
                console.log(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const [dialogRegister, setDialogRegister] = useState(false);
    const formikRegister = useFormik({
        initialValues: {
            full_name: "",
            phone_number: "",
            email: "",
            password: "",
        },
        onSubmit: (values) => {
            handleRegister(values);
        },
    });
    const handleRegister = async (values) => {
        setMessage("");
        setIsLoading(true);
        await axios
            .post("/register", values)
            .then((response) => {
                toast.success("akun anda berhasil dibuat");
                console.log(response);
                const token = response.data.token;
                const user = response.data.user;
                setCookie("token", token);
                setCookie("user", user);
                setUser(user);
                setToken(token);
                router.push("/");
            })
            .catch((error) => {
                toast.error("ada yang salah, coba lagi nanti");
                console.log(error);
                setMessage(error.response?.data?.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };
    return (
        <>
            <Transition appear show={dialogRegister} as={Fragment}>
                <Dialog
                    as='div'
                    className='relative z-10'
                    onClose={() => {
                        setDialogRegister(false);
                        formikRegister.handleReset();
                    }}>
                    <Transition.Child
                        as={Fragment}
                        enter='ease-out duration-300'
                        enterFrom='opacity-0'
                        enterTo='opacity-100'
                        leave='ease-in duration-200'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'>
                        <div className='fixed inset-0 bg-black bg-opacity-70' />
                    </Transition.Child>

                    <div className='fixed inset-0 overflow-y-auto'>
                        <div className='flex min-h-full items-center justify-center p-4 text-center'>
                            <Transition.Child
                                as={Fragment}
                                enter='ease-out duration-300'
                                enterFrom='opacity-0 scale-95'
                                enterTo='opacity-100 scale-100'
                                leave='ease-in duration-200'
                                leaveFrom='opacity-100 scale-100'
                                leaveTo='opacity-0 scale-95'>
                                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-md  text-left align-middle shadow-xl transition-all'>
                                    <form
                                        onSubmit={formikRegister.handleSubmit}
                                        className='max-w-sm w-full rounded-md bg-white shadow-md border p-8'>
                                        {message && (
                                            <div className='bg-warning-50 text-sm p-3 mb-4 text-warning-500'>
                                                {message}
                                            </div>
                                        )}
                                        <div className='flex flex-col mb-4'>
                                            <h2 className='text-2xl mb-2 font-medium text-primary-600 text-center'>
                                                Daftar
                                            </h2>
                                            <Input
                                                label={"Nama Lengkap"}
                                                name={"full_name"}
                                                value={
                                                    formikRegister.values
                                                        .full_name
                                                }
                                                onBlur={
                                                    formikRegister.handleBlur
                                                }
                                                onChange={
                                                    formikRegister.handleChange
                                                }
                                                error={
                                                    formikRegister.touched
                                                        .full_name &&
                                                    formikRegister.errors
                                                        .full_name
                                                }
                                            />
                                            <Input
                                                label={"Nomer Telepon"}
                                                name={"phone_number"}
                                                value={
                                                    formikRegister.values
                                                        .phone_number
                                                }
                                                onBlur={
                                                    formikRegister.handleBlur
                                                }
                                                onChange={
                                                    formikRegister.handleChange
                                                }
                                                error={
                                                    formikRegister.touched
                                                        .phone_number &&
                                                    formikRegister.errors
                                                        .phone_number
                                                }
                                            />
                                            <Input
                                                label={"Email"}
                                                type='email'
                                                name={"email"}
                                                value={
                                                    formikRegister.values.email
                                                }
                                                onBlur={
                                                    formikRegister.handleBlur
                                                }
                                                onChange={
                                                    formikRegister.handleChange
                                                }
                                                error={
                                                    formikRegister.touched
                                                        .email &&
                                                    formikRegister.errors.email
                                                }
                                            />
                                            <Input
                                                label={"Password"}
                                                type='password'
                                                name={"password"}
                                                value={
                                                    formikRegister.values
                                                        .password
                                                }
                                                onBlur={
                                                    formikRegister.handleBlur
                                                }
                                                onChange={
                                                    formikRegister.handleChange
                                                }
                                                error={
                                                    formikRegister.touched
                                                        .password &&
                                                    formikRegister.errors
                                                        .password
                                                }
                                            />
                                        </div>

                                        <Button loading={isLoading}>
                                            Daftar
                                        </Button>
                                        <div className='text-center mt-8'>
                                            <small className='text-gray-500'>
                                                sudah punya akun?{" "}
                                                <span
                                                    onClick={() => {
                                                        setDialogLogin(true);
                                                        setDialogRegister(
                                                            false
                                                        );
                                                    }}
                                                    className='font-medium text-primary-500 cursor-pointer'>
                                                    masuk sekarang
                                                </span>
                                            </small>
                                        </div>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
            <Transition appear show={dialogLogin} as={Fragment}>
                <Dialog
                    as='div'
                    className='relative z-10'
                    onClose={() => {
                        setDialogLogin(false);
                        formikLogin.handleReset();
                    }}>
                    <Transition.Child
                        as={Fragment}
                        enter='ease-out duration-300'
                        enterFrom='opacity-0'
                        enterTo='opacity-100'
                        leave='ease-in duration-200'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'>
                        <div className='fixed inset-0 bg-black bg-opacity-70' />
                    </Transition.Child>

                    <div className='fixed inset-0 overflow-y-auto'>
                        <div className='flex min-h-full items-center justify-center p-4 text-center'>
                            <Transition.Child
                                as={Fragment}
                                enter='ease-out duration-300'
                                enterFrom='opacity-0 scale-95'
                                enterTo='opacity-100 scale-100'
                                leave='ease-in duration-200'
                                leaveFrom='opacity-100 scale-100'
                                leaveTo='opacity-0 scale-95'>
                                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-md  text-left align-middle shadow-xl transition-all'>
                                    <form
                                        onSubmit={formikLogin.handleSubmit}
                                        className='max-w-sm w-full rounded-md bg-white shadow-md border p-8'>
                                        {message && (
                                            <div className='bg-warning-50 text-sm p-3 mb-4 text-warning-500'>
                                                {message}
                                            </div>
                                        )}
                                        <div className='flex flex-col mb-4'>
                                            <h2 className='text-2xl mb-2 font-medium text-primary-600 text-center'>
                                                Masuk
                                            </h2>
                                            <Input
                                                label={"Email"}
                                                type='email'
                                                name={"email"}
                                                value={formikLogin.values.email}
                                                onBlur={formikLogin.handleBlur}
                                                onChange={
                                                    formikLogin.handleChange
                                                }
                                                error={
                                                    formikLogin.touched.email &&
                                                    formikLogin.errors.email
                                                }
                                            />
                                            <Input
                                                label={"Password"}
                                                type='password'
                                                name={"password"}
                                                value={
                                                    formikLogin.values.password
                                                }
                                                onBlur={formikLogin.handleBlur}
                                                onChange={
                                                    formikLogin.handleChange
                                                }
                                                error={
                                                    formikLogin.touched
                                                        .password &&
                                                    formikLogin.errors.password
                                                }
                                            />
                                        </div>

                                        <Button loading={isLoading}>
                                            Masuk
                                        </Button>
                                        <div className='text-center mt-8'>
                                            <small className='text-gray-500'>
                                                belum punya akun?{" "}
                                                <span
                                                    onClick={() => {
                                                        setDialogLogin(false);
                                                        setDialogRegister(true);
                                                    }}
                                                    className='font-medium text-primary-500 cursor-pointer'>
                                                    daftar sekarang
                                                </span>
                                            </small>
                                        </div>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
            <div className='shadow bg-white   fixed z-20 inset-x-0 top-0'>
                <Container className={"flex justify-between items-center "}>
                    <Link href={"/"}>
                        <div className=' relative cursor-pointer  w-32  '>
                            <Image
                                src={isalamDark}
                                layout='responsive'
                                alt='isalam logo'
                            />
                        </div>
                    </Link>

                    <div className='flex  items-center '>
                        <Menu
                            as={"div"}
                            className={`relative order-1  ${
                                user && token ? "" : "md:hidden"
                            }`}>
                            <Menu.Button
                                as='div'
                                className={"cursor-pointer ml-8"}>
                                {user && token ? (
                                    <div className='flex items-center space-x-1'>
                                        {user.avatar_url ? (
                                            <div className='relative h-8 w-8 rounded-full overflow-hidden shadow-lg border'>
                                                <Image
                                                    src={user.avatar_url}
                                                    layout='fill'
                                                    alt='avatar'
                                                    objectFit='contain'
                                                />
                                            </div>
                                        ) : (
                                            <HiUserCircle
                                                size='2rem'
                                                className='text-gray-400'
                                            />
                                        )}

                                        <div className='hidden md:block'>
                                            <p className='text-sm leading-none'>
                                                {user.full_name}
                                            </p>
                                            <p className='text-xs leading-none'>
                                                {user.email}
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <HiMenu
                                        size={"2em"}
                                        className='text-primary-600'
                                    />
                                )}
                            </Menu.Button>
                            <Menu.Items
                                className={
                                    "absolute right-0 focus:outline-none bg-white w-60 rounded-md shadow-md border text-sm p-2"
                                }>
                                {/* TODO: tidak perlu render ketika md */}
                                {navigations.map((item, index) => (
                                    <Menu.Item
                                        className='md:hidden'
                                        key={index}>
                                        {({ active }) => (
                                            <div>
                                                <Link href={item.href}>
                                                    <a
                                                        onClick={() =>
                                                            setPageLoading(true)
                                                        }
                                                        className={classNames(
                                                            "block p-2 rounded-md transition-all",
                                                            active
                                                                ? "bg-gray-100"
                                                                : ""
                                                        )}>
                                                        {item.text}
                                                    </a>
                                                </Link>
                                            </div>
                                        )}
                                    </Menu.Item>
                                ))}
                                {user && token && (
                                    <>
                                        {navigationsAuth.map((item, index) => (
                                            <Menu.Item key={index}>
                                                {({ active }) => (
                                                    <div>
                                                        <Link href={item.href}>
                                                            <a
                                                                className={classNames(
                                                                    "block p-2 rounded-md transition-all",
                                                                    active
                                                                        ? "bg-gray-100"
                                                                        : ""
                                                                )}>
                                                                {item.text}
                                                            </a>
                                                        </Link>
                                                    </div>
                                                )}
                                            </Menu.Item>
                                        ))}
                                        {user.role.includes("admin") && (
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <div>
                                                        <Link
                                                            href={
                                                                "/admin/dashboard"
                                                            }>
                                                            <a
                                                                className={classNames(
                                                                    "block p-2 rounded-md transition-all",
                                                                    active
                                                                        ? "bg-gray-100"
                                                                        : ""
                                                                )}>
                                                                Admin
                                                            </a>
                                                        </Link>
                                                    </div>
                                                )}
                                            </Menu.Item>
                                        )}
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                    onClick={handleLogout}
                                                    className={classNames(
                                                        "block bg-primary-100 text-primary-600 p-1.5 w-full rounded-md transition-all",
                                                        active
                                                            ? "bg-primary-200"
                                                            : ""
                                                    )}>
                                                    Keluar
                                                </button>
                                            )}
                                        </Menu.Item>
                                    </>
                                )}

                                {!user && !token && (
                                    <div className='flex justify-between space-x-2'>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                    onClick={() =>
                                                        router.push("/login")
                                                    }
                                                    className={classNames(
                                                        "bg-primary-100 text-primary-600 p-1.5 w-full rounded-md transition-all",
                                                        active
                                                            ? "bg-primary-200"
                                                            : ""
                                                    )}>
                                                    Masuk
                                                </button>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                    onClick={() => {
                                                        router.push(
                                                            "/register"
                                                        );
                                                    }}
                                                    className={classNames(
                                                        "bg-primary-500 text-white p-1.5 w-full rounded-md transition-all",
                                                        active
                                                            ? "bg-primary-600"
                                                            : ""
                                                    )}>
                                                    Daftar
                                                </button>
                                            )}
                                        </Menu.Item>
                                    </div>
                                )}
                            </Menu.Items>
                        </Menu>

                        <div className='text-sm space-x-8  hidden md:flex items-center'>
                            {navigations.map((item, index) => (
                                <Link key={index} href={item.href}>
                                    <a onClick={() => setPageLoading(true)}>
                                        {item.text}
                                    </a>
                                </Link>
                            ))}
                            {!user && !token && (
                                <div className='space-x-2'>
                                    <button
                                        onClick={() => router.push("/login")}
                                        className='bg-primary-100 text-primary-600 hover:bg-primary-200 p-1.5 w-16 rounded-md transition-all'>
                                        Masuk
                                    </button>
                                    <button
                                        onClick={() => {
                                            router.push("/register");
                                        }}
                                        className='bg-primary-500 text-white hover:bg-primary-600 p-1.5 w-16 rounded-md transition-all'>
                                        Daftar
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </Container>
            </div>
        </>
    );
}
