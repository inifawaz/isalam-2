import { Menu, Tab, Transition } from "@headlessui/react";
import { getCookie } from "cookies-next";
import { useFormik } from "formik";
import Link from "next/link";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { BiTrash } from "react-icons/bi";
import AdminNav from "../../../components/AdminNav";
import AdminProjectItem from "../../../components/AdminProjectItem";
import Button from "../../../components/Button";
import Container from "../../../components/Container";
import Input from "../../../components/Input";
import Layout from "../../../components/Layout";
import PageLoading from "../../../components/PageLoading";
import ProjectItem from "../../../components/ProjectItem";
import AppContext from "../../../context/AppContext";
import { axios } from "../../../lib/axiosInstance";
import { BiChevronDown } from "react-icons/bi";

export default function Projects() {
    useEffect(() => {
        getAllProjects();
    }, []);
    const classNames = (...classes) => classes.filter(Boolean).join(" ");
    const { pageLoading, setPageLoading } = useContext(AppContext);
    const [projects, setProjects] = useState([]);
    const [paginations, setPaginations] = useState([]);
    const [message, setMessage] = useState(null);
    const [selectedType, setSelectedType] = useState(null);
    const getAllProjects = async () => {
        setMessage(null);
        setProjects([]);
        setPageLoading(true);
        await axios
            .get("/admin/projects", {
                headers: {
                    Authorization: `Bearer ${getCookie("token")}`,
                },
            })
            .then((response) => {
                setProjects(response.data.projects.data);
                setPaginations(response.data.projects.meta.links);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setPageLoading(false);
            });
    };
    const getProjectsByType = async (data) => {
        setMessage(null);
        setProjects([]);
        setPageLoading(true);
        await axios
            .get("/admin/projects", {
                params: {
                    type: data.type,
                },
                headers: {
                    Authorization: `Bearer ${getCookie("token")}`,
                },
            })
            .then((response) => {
                setProjects(response.data.projects);
                setMessage(response.data.message);
                setSelectedType(data.name);
                // setPaginations(response.data.projects.meta.links);
                setPaginations(null);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setPageLoading(false);
            });
    };

    const searchFormik = useFormik({
        initialValues: {
            search: "",
        },
        onSubmit: (values) => {
            searchProject(values);
        },
    });
    const searchProject = async (values) => {
        setProjects([]);
        setPageLoading(true);
        await axios
            .get("/admin/projects", {
                params: {
                    search: values.search,
                },
                headers: {
                    Authorization: `Bearer ${getCookie("token")}`,
                },
            })
            .then((response) => {
                // console.log(response);
                setProjects(response.data.projects);
                setPaginations(null);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setPageLoading(false);
            });
    };

    const goToPage = async (link) => {
        setMessage(null);

        setProjects([]);
        setPageLoading(true);
        await axios
            .get(link, {
                headers: {
                    Authorization: `Bearer ${getCookie("token")}`,
                },
            })
            .then((response) => {
                setProjects(response.data.projects.data);
                setPaginations(response.data.projects.meta.links);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setPageLoading(false);
            });
    };

    const tabs = [
        {
            name: "Semua",
            get: function () {
                getAllProjects();
            },
        },
        {
            name: "Berlangsung",
            type: "in-progress",
            get: function () {
                getProjectsByType(this);
            },
        },
        {
            name: "Berakhir",
            type: "ended",
            get: function () {
                getProjectsByType(this);
            },
        },
        {
            name: "Pilihan",
            type: "favourite",
            get: function () {
                getProjectsByType(this);
            },
        },
        {
            name: "Disembunyikan",
            type: "hidden",
            get: function () {
                getProjectsByType(this);
            },
        },
    ];

    return (
        <>
            <Layout>
                <Container className={"flex space-x-8 "}>
                    <AdminNav />
                    <div className='w-full'>
                        <div className='flex items-start space-x-4'>
                            <h1 className='text-2xl font-semibold tracking-wider text-gray-500 mb-2'>
                                Program Wakaf
                            </h1>

                            <Link href='/admin/projects/create'>
                                <a className='py-2 px-3 text-sm bg-primary-500 text-white rounded-md inline-block'>
                                    Buat Baru
                                </a>
                            </Link>
                        </div>
                        <form
                            onSubmit={searchFormik.handleSubmit}
                            className=' mt-4 grid grid-cols-4 gap-4 items-start '>
                            <div className='col-span-3 flex space-x-4'>
                                <div className='grow'>
                                    <Input
                                        name='search'
                                        value={searchFormik.values.search}
                                        onChange={searchFormik.handleChange}
                                        placeholder={"id project/ nama project"}
                                    />
                                </div>

                                <BiTrash
                                    size={"2.5em"}
                                    onClick={() => {
                                        searchFormik.handleReset();
                                        getAllProjects();
                                    }}
                                    className='inline-block p-2 cursor-pointer  bg-warning-100 text-warning-400 rounded-md'
                                />
                            </div>
                            <Button>Cari</Button>
                        </form>

                        <Menu as={"div"} className='relative'>
                            <Menu.Button
                                className={`py-2 mb-4 text-sm px-3 rounded-md shadow-md flex items-center space-x-2`}>
                                <span>{selectedType ?? "Pilih Type"}</span>{" "}
                                <BiChevronDown />
                            </Menu.Button>
                            <Menu.Items
                                className={
                                    "flex absolute z-30 border  flex-col p-1 rounded-md shadow-md bg-white"
                                }>
                                {tabs.map((item, index) => (
                                    <Menu.Item key={index}>
                                        {({ active }) => (
                                            <button
                                                onClick={() => {
                                                    // getProjectsByType(
                                                    //     item.type
                                                    // );
                                                    item.get();
                                                }}
                                                className={classNames(
                                                    "text-sm text-left p-1 pr-6 rounded-md",
                                                    active
                                                        ? "bg-gray-100"
                                                        : "bg-white"
                                                )}>
                                                {item.name}
                                            </button>
                                        )}
                                    </Menu.Item>
                                ))}
                            </Menu.Items>
                        </Menu>

                        <div className={"grid md:grid-cols-2 gap-8"}>
                            {projects.map((item, index) => (
                                <ProjectItem
                                    href={`/admin/projects/${item.id}`}
                                    data={item}
                                    key={index}
                                />
                            ))}
                        </div>
                        {paginations && (
                            <div onClick={() => console.log(paginations)}>
                                {paginations.map((item, index) =>
                                    item.url === null ? null : (
                                        <button
                                            disabled={
                                                item.url === null ? true : false
                                            }
                                            onClick={() => {
                                                goToPage(item.url);
                                            }}
                                            key={index}
                                            className={`py-1  mt-4 px-3 text-sm rounded-md  mr-2 ${
                                                item.active
                                                    ? "bg-sky-600 text-white"
                                                    : "bg-gray-200 text-gray-500"
                                            } `}
                                            dangerouslySetInnerHTML={{
                                                __html: item.label,
                                            }}></button>
                                    )
                                )}
                            </div>
                        )}
                    </div>
                </Container>
            </Layout>
        </>
    );
}
