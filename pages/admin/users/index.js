import { Dialog, Tab, Transition } from "@headlessui/react";
import { getCookie } from "cookies-next";
import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import AdminNav from "../../../components/AdminNav";
import AdminProjectItem from "../../../components/AdminProjectItem";
import AdminUserItem from "../../../components/AdminUserItem";
import Container from "../../../components/Container";
import Layout from "../../../components/Layout";
import ProjectItem from "../../../components/ProjectItem";
import { axios } from "../../../lib/axiosInstance";

export default function Users() {
    const classNames = (...classes) => classes.filter(Boolean).join(" ");
    const [users, setUsers] = useState([]);
    const getAllUsers = async () => {
        await axios
            .get("/admin/users", {
                headers: {
                    Authorization: `Bearer ${getCookie("token")}`,
                },
            })
            .then((response) => {
                setUsers(response.data.users);
            });
    };

    const tabs = [
        { name: "Semua", total: users.length },

        {
            name: "Admin",
            total: users.filter((item) => item.role.includes("admin")).length,
        },
    ];

    useEffect(() => {
        getAllUsers();
    }, []);

    const [dialogDelete, setDialogDelete] = useState(false);

    return (
        <>
            <Layout>
                <Container className={"flex space-x-8 "}>
                    <AdminNav />
                    <div className='w-full'>
                        <div className='flex items-center justify-between'>
                            <h1 className='text-2xl font-semibold tracking-wider text-gray-500 mb-2'>
                                Pengguna
                            </h1>
                            <Link href='/admin/users/create'>
                                <a className='py-2 px-3 text-sm bg-primary-500 text-white rounded-md inline-block'>
                                    Buat Admin Baru
                                </a>
                            </Link>
                        </div>

                        <Tab.Group as={"div"} className='w-full'>
                            <Tab.List
                                className={
                                    "border-b mb-4 w-full border-gray-300"
                                }>
                                {tabs.map((item, index) => (
                                    <Tab
                                        key={index}
                                        className={({ selected }) =>
                                            classNames(
                                                "  whitespace-nowrap outline-none text-sm  py-2 px-4 space-x-4  border-b-2     ",
                                                selected
                                                    ? "border-primary-500  text-primary-500"
                                                    : "border-white text-gray-400"
                                            )
                                        }>
                                        <span>{item.name}</span>
                                        <span>{item.total}</span>
                                    </Tab>
                                ))}
                            </Tab.List>
                            <Tab.Panels className={"w-full"}>
                                <Tab.Panel className={""}>
                                    <table className='table-auto w-full bg-white shadow-md'>
                                        <thead className='bg-sky-900'>
                                            <tr>
                                                <th className='text-sm text-white font-medium text-left p-2'>
                                                    Email
                                                </th>
                                                <th className='text-sm text-white font-medium text-left p-2'>
                                                    Nama Lengkap
                                                </th>
                                                <th className='text-sm text-white font-medium text-left p-2'>
                                                    Role
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className='divide-y'>
                                            {users.map((item, index) => (
                                                <AdminUserItem
                                                    data={item}
                                                    key={index}
                                                />
                                            ))}
                                        </tbody>
                                    </table>
                                </Tab.Panel>

                                <Tab.Panel>
                                    <table className='table-auto w-full bg-white shadow-md'>
                                        <thead className='bg-sky-900'>
                                            <tr>
                                                <th className='text-sm text-white font-medium text-left p-2'>
                                                    Email
                                                </th>
                                                <th className='text-sm text-white font-medium text-left p-2'>
                                                    Nama Lengkap
                                                </th>
                                                <th className='text-sm text-white font-medium text-left p-2'>
                                                    Role
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className='divide-y'>
                                            {users
                                                .filter((item) =>
                                                    item.role.includes("admin")
                                                )
                                                .map((item, index) => (
                                                    <AdminUserItem
                                                        data={item}
                                                        key={index}
                                                    />
                                                ))}
                                        </tbody>
                                    </table>
                                </Tab.Panel>
                            </Tab.Panels>
                        </Tab.Group>
                    </div>
                </Container>
            </Layout>
        </>
    );
}
