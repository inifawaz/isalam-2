import { Tab } from "@headlessui/react";
import { deleteCookie, getCookie } from "cookies-next";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import Container from "../../components/Container";
import Layout from "../../components/Layout";
import PaymentItem from "../../components/PaymentItem";
import PageLoading from "../../components/PageLoading";
import AppContext from "../../context/AppContext";
import { axios } from "../../lib/axiosInstance";
import formatToCurreny from "../../utils/formatToCurreny";

import { useRouter } from "next/router";
import { useFormik } from "formik";
import Input from "../../components/Input";
import Button from "../../components/Button";
import toast from "react-hot-toast";
import { HiUserCircle } from "react-icons/hi";

export default function Dashboard() {
    const router = useRouter();
    const { user, setUser, setToken } = useContext(AppContext);
    const [pageLoading, setPageLoading] = useState(true);
    const [myStatistics, setMyStatistics] = useState([]);
    const [myPayments, setMyPayments] = useState([]);
    const [myProjects, setMyProjects] = useState([]);
    const [profile, setProfile] = useState({});
    const classNames = (...classes) => classes.filter(Boolean).join(" ");
    const tabs = [
        {
            name: "Dashboard",
        },
        {
            name: "Pembayaran",
            notif:
                myPayments.filter(
                    (item) => item.status && item.status.statusCode === "01"
                ).length > 0
                    ? myPayments.filter(
                          (item) =>
                              item.status && item.status.statusCode === "01"
                      ).length
                    : null,
        },
        {
            name: "Wakaf Saya",
        },
        {
            name: "Profile",
            notif: [
                user.province,
                user.city,
                user.district,
                user.village,
                user.zip_code,
                user.address,
            ].includes("")
                ? "!"
                : null,
        },
    ];

    const paymentTabs = [
        { name: "Menunggu" },
        { name: "Berhasil" },
        { name: "Gagal" },
    ];

    const getMyDashboardData = async () => {
        await axios
            .get(`/me/dashboard`, {
                headers: {
                    Authorization: `Bearer ${getCookie("token")}`,
                },
            })
            .then((response) => {
                console.log(response);
                setMyStatistics(response.data.statistics);
                setMyPayments(response.data.payments);
                setMyProjects(response.data.projects);
                setPageLoading(false);
            });
    };
    useEffect(() => {
        getMyDashboardData();
    }, []);

    const handleLogout = async () => {
        setPageLoading(true);
        await axios
            .get(
                "/logout",

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
                setUser(false);
                setToken(false);
                router.push("/");
            })
            .catch((error) => {
                toast.error("ada yang salah, coba lagi nanti");
                console.log(error);
            })
            .finally(() => {
                setPageLoading(false);
            });
    };

    const profileFormik = useFormik({
        enableReinitialize: true,
        initialValues: {
            full_name: user.full_name,
            phone_number: user.phone_number,
            email: user.email,
            province: user.province,
            city: user.city,
            district: user.district,
            village: user.village,
            zip_code: user.zip_code,
            address: user.address,
            password: "",
        },
        onSubmit: (values) => {
            handleUpdateProfile(values);
        },
    });
    const [picture, setPicture] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const handleUpdateProfile = async (values) => {
        setIsLoading(true);
        const formData = new FormData();
        for (const [key, value] of Object.entries(values)) {
            formData.append(key, value);
        }
        formData.append("avatar_url", avatarUrl);
        if (formData.get("password") === "") {
            formData.delete("password");
        }
        formData.append("_method", "PUT");

        for (const [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }

        await axios
            .post("/me", formData, {
                headers: {
                    Authorization: `Bearer ${getCookie("token")}`,
                },
            })
            .then((response) => {
                setUser(false);
                console.log(response);
                setUser(response.data.user);
                console.log(user.role);
                toast.success(response.data.message);
            })
            .catch((error) => {
                toast.error("ada yang salah, coba lagi nanti");
                console.log(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <>
            {pageLoading && <PageLoading />}
            <Layout>
                <Container className={" "}>
                    <Tab.Group
                        as={"div"}
                        vertical
                        className={"flex  flex-col md:flex-row md:space-x-8"}>
                        <div className='bg-slate-800 md:sticky top-[68px] mb-8 md:mb-0 rounded-md h-fit shrink-0 w-full  md:w-60 shadow-md border p-4'>
                            <div className='flex flex-col items-center w-full space-x-1 mb-2'>
                                {user.avatar_url ? (
                                    <div className='relative h-20 w-20 rounded-full overflow-hidden shadow-lg '>
                                        <Image
                                            src={user.avatar_url}
                                            layout='fill'
                                            alt='avatar'
                                            objectFit='contain'
                                        />
                                    </div>
                                ) : (
                                    <HiUserCircle
                                        size='5rem'
                                        className='text-slate-100'
                                    />
                                )}

                                <div className='hidden mt-2 md:block'>
                                    <p className='text-sm  text-center whitespace-nowrap w-full  text-white'>
                                        {user.full_name}
                                    </p>
                                    <p className='text-xs  text-center whitespace-nowrap text-white'>
                                        {user.role}
                                    </p>
                                </div>
                            </div>
                            <Tab.List>
                                {tabs.map((item, index) => (
                                    <Tab
                                        key={index}
                                        className={({ selected }) =>
                                            classNames(
                                                "block w-full outline-none whitespace-nowrap text-sm text-left px-2 py-0.5  border-l-2     ",
                                                selected
                                                    ? "border-primary-500 text-white"
                                                    : "border-slate-800 text-slate-400"
                                            )
                                        }>
                                        <span>{item.name}</span>
                                        {item.notif && (
                                            <span className='bg-warning-600 text-xs w-4 h-4 ml-4 inline-flex items-center justify-center  text-white  rounded-full'>
                                                {item?.notif}
                                            </span>
                                        )}
                                    </Tab>
                                ))}
                            </Tab.List>
                            <button
                                onClick={handleLogout}
                                className='block w-full py-0.5 text-sm text-left px-2 border-slate-800 text-slate-400  border-l-2 '>
                                Logout
                            </button>
                        </div>

                        <Tab.Panels className={"grow"}>
                            <Tab.Panel>
                                <h1 className='text-2xl font-semibold tracking-wider text-gray-500 mb-2'>
                                    Dashboard
                                </h1>
                                <div className='grid md:grid-cols-3 gap-4'>
                                    <div className='p-4 shadow-md border'>
                                        <p className='text-sm'>
                                            Total Wakaf Saya
                                        </p>
                                        <p className='text-xl font-medium'>
                                            {myStatistics.total_projects ?? 0}
                                        </p>
                                    </div>
                                    <div className='p-4 shadow-md border'>
                                        <p className='text-sm'>
                                            Total Nominal Diberikan
                                        </p>
                                        <p className='text-xl font-medium'>
                                            {formatToCurreny(
                                                myStatistics.total_given_amount ??
                                                    0
                                            )}
                                        </p>
                                    </div>
                                    <div className='p-4 shadow-md border'>
                                        <p className='text-sm'>
                                            Total Pembayaran Berhasil
                                        </p>
                                        <p className='text-xl font-medium'>
                                            {myStatistics.total_transactions ??
                                                0}
                                            x
                                        </p>
                                    </div>
                                </div>
                            </Tab.Panel>
                            <Tab.Panel>
                                <h1 className='text-2xl font-semibold tracking-wider text-gray-500 mb-2'>
                                    Pembayaran
                                </h1>
                                <Tab.Group>
                                    <Tab.List
                                        className={
                                            "border-b mb-4 border-gray-300"
                                        }>
                                        {paymentTabs.map((item, index) => (
                                            <Tab
                                                key={index}
                                                className={({ selected }) =>
                                                    classNames(
                                                        "  whitespace-nowrap outline-none text-sm  py-2 px-2  border-b-2     ",
                                                        selected
                                                            ? "border-primary-500  text-primary-500"
                                                            : "border-white text-gray-400"
                                                    )
                                                }>
                                                {item.name}
                                            </Tab>
                                        ))}
                                    </Tab.List>
                                    <Tab.Panels>
                                        <Tab.Panel>
                                            {myPayments
                                                .filter(
                                                    (item) =>
                                                        item.status &&
                                                        item.status
                                                            .statusCode === "01"
                                                )
                                                .map((item, index) => (
                                                    <PaymentItem
                                                        data={item}
                                                        key={index}
                                                    />
                                                ))}
                                        </Tab.Panel>
                                        <Tab.Panel>
                                            {myPayments
                                                .filter(
                                                    (item) =>
                                                        item.status_code ===
                                                        "00"
                                                )
                                                .map((item, index) => (
                                                    <PaymentItem
                                                        data={item}
                                                        key={index}
                                                    />
                                                ))}
                                        </Tab.Panel>
                                        <Tab.Panel>
                                            {myPayments
                                                .filter(
                                                    (item) =>
                                                        item.status_code ===
                                                        "01"
                                                )
                                                .map((item, index) => (
                                                    <PaymentItem
                                                        data={item}
                                                        key={index}
                                                    />
                                                ))}
                                        </Tab.Panel>
                                    </Tab.Panels>
                                </Tab.Group>
                            </Tab.Panel>
                            <Tab.Panel>
                                <h1 className='text-2xl font-semibold tracking-wider text-gray-500 mb-2'>
                                    Wakaf Saya
                                </h1>
                                <div>
                                    {myProjects.map((item, index) => (
                                        <div
                                            key={index}
                                            className='p-6 bg-white shadow-md border '>
                                            <time className='text-sm text-gray-400'>
                                                {item.created_at}
                                            </time>

                                            <Link href={`/projects/${item.id}`}>
                                                <h2 className='text-primary-600 mb-2 cursor-pointer text-xl'>
                                                    {item.name}
                                                </h2>
                                            </Link>
                                            <div className='flex space-x-8'>
                                                <div>
                                                    <p className='text-sm text-gray-400'>
                                                        Total Nominal Wakaf Anda
                                                    </p>
                                                    <p className='text-secondary-500 font-semibold'>
                                                        {formatToCurreny(
                                                            item.total_given_amount
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Tab.Panel>
                            <Tab.Panel>
                                {[
                                    user.province,
                                    user.city,
                                    user.district,
                                    user.village,
                                    user.zip_code,
                                    user.address,
                                ].includes("") && (
                                    <div className='p-4 mb-4 bg-warning-100 border rounded-md border-warning-400  font-medium'>
                                        <p className='text-warning-600'>
                                            mohon lengkapi profile anda
                                        </p>
                                    </div>
                                )}
                                <h1 className='text-2xl font-semibold tracking-wider text-gray-500 mb-2'>
                                    Profile
                                </h1>
                                <form onSubmit={profileFormik.handleSubmit}>
                                    <input
                                        type={"file"}
                                        accept='image/*'
                                        className='mb-2 w-full'
                                        onChange={(e) => {
                                            let pic = URL.createObjectURL(
                                                e.target.files[0]
                                            );
                                            setPicture(pic);
                                            setAvatarUrl(e.target.files[0]);
                                        }}
                                        name='avatar_url'
                                    />
                                    <div className='relative h-40 w-40 shadow-md border-2 rounded-full overflow-hidden'>
                                        <Image
                                            src={
                                                picture
                                                    ? picture
                                                    : user.avatar_url
                                            }
                                            alt=''
                                            layout='fill'
                                            objectFit='cover'
                                        />
                                    </div>
                                    <Input
                                        label={"Nama Lengkap"}
                                        name='full_name'
                                        value={profileFormik.values.full_name}
                                        onChange={profileFormik.handleChange}
                                        onBlur={profileFormik.handleBlur}
                                        error={
                                            profileFormik.touched.full_name &&
                                            profileFormik.errors.full_name
                                        }
                                    />
                                    <Input
                                        label={"Nomer Telepon"}
                                        name='phone_number'
                                        value={
                                            profileFormik.values.phone_number
                                        }
                                        onChange={profileFormik.handleChange}
                                        onBlur={profileFormik.handleBlur}
                                        error={
                                            profileFormik.touched
                                                .phone_number &&
                                            profileFormik.errors.phone_number
                                        }
                                    />
                                    <Input
                                        label={"Email"}
                                        name='email'
                                        value={profileFormik.values.email}
                                        onChange={profileFormik.handleChange}
                                        onBlur={profileFormik.handleBlur}
                                        error={
                                            profileFormik.touched.email &&
                                            profileFormik.errors.email
                                        }
                                    />
                                    <Input
                                        label={"Provinsi"}
                                        name='province'
                                        value={profileFormik.values.province}
                                        onChange={profileFormik.handleChange}
                                        onBlur={profileFormik.handleBlur}
                                        error={
                                            profileFormik.touched.province &&
                                            profileFormik.errors.province
                                        }
                                    />
                                    <Input
                                        label={"Kota"}
                                        name='city'
                                        value={profileFormik.values.city}
                                        onChange={profileFormik.handleChange}
                                        onBlur={profileFormik.handleBlur}
                                        error={
                                            profileFormik.touched.city &&
                                            profileFormik.errors.city
                                        }
                                    />
                                    <Input
                                        label={"Kecamatan"}
                                        name='district'
                                        value={profileFormik.values.district}
                                        onChange={profileFormik.handleChange}
                                        onBlur={profileFormik.handleBlur}
                                        error={
                                            profileFormik.touched.district &&
                                            profileFormik.errors.district
                                        }
                                    />
                                    <Input
                                        label={"Kelurahan"}
                                        name='village'
                                        value={profileFormik.values.village}
                                        onChange={profileFormik.handleChange}
                                        onBlur={profileFormik.handleBlur}
                                        error={
                                            profileFormik.touched.village &&
                                            profileFormik.errors.village
                                        }
                                    />
                                    <Input
                                        label={"Kode Pos"}
                                        name='zip_code'
                                        value={profileFormik.values.zip_code}
                                        onChange={profileFormik.handleChange}
                                        onBlur={profileFormik.handleBlur}
                                        error={
                                            profileFormik.touched.zip_code &&
                                            profileFormik.errors.zip_code
                                        }
                                    />
                                    <Input
                                        label={"Alamat"}
                                        name='address'
                                        value={profileFormik.values.address}
                                        onChange={profileFormik.handleChange}
                                        onBlur={profileFormik.handleBlur}
                                        error={
                                            profileFormik.touched.address &&
                                            profileFormik.errors.address
                                        }
                                    />
                                    <Input
                                        label={"Password Baru"}
                                        placeholder='kosong jika tidak ingin merubah password anda'
                                        name='password'
                                        value={profileFormik.values.password}
                                        onChange={profileFormik.handleChange}
                                        onBlur={profileFormik.handleBlur}
                                        error={
                                            profileFormik.touched.password &&
                                            profileFormik.errors.password
                                        }
                                    />
                                    <div>
                                        <Button loading={isLoading}>
                                            Simpan Perubahan
                                        </Button>
                                    </div>
                                </form>
                            </Tab.Panel>
                        </Tab.Panels>
                    </Tab.Group>
                </Container>
            </Layout>
        </>
    );
}
