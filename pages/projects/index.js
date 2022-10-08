import { Tab } from "@headlessui/react";
import { getCookie } from "cookies-next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { createContext, useContext, useEffect, useState } from "react";
import Container from "../../components/Container";
import Input from "../../components/Input";
import Layout from "../../components/Layout";
import PageLoading from "../../components/PageLoading";
import ProjectItem from "../../components/ProjectItem";
import AppContext from "../../context/AppContext";
import { axios } from "../../lib/axiosInstance";

export default function Index({ projects: a, categories, paginations: b }) {
    const [projects, setProjects] = useState(a);
    const [paginations, setPaginations] = useState(b);
    const classNames = (...classes) => {
        return classes.filter(Boolean).join(" ");
    };
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = useState(null);
    const { pageLoading, setPageLoading } = useContext(AppContext);
    useEffect(() => {
        setSelectedCategory(null);
        setPageLoading(false);
    }, [router]);

    const goToPage = async (link) => {
        setProjects([]);
        setPageLoading(true);
        await axios
            .get(link, {
                headers: {
                    Authorization: `Bearer ${getCookie("token")}`,
                },
            })
            .then((response) => {
                setProjects(response.data.data);
                setSelectedCategory(null);
                setPaginations(response.data.meta.links);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setPageLoading(false);
            });
    };

    const getProjectsByCategory = async (category) => {
        setProjects([]);
        setPageLoading(true);
        await axios
            .get(`/projects`, {
                params: {
                    category: category,
                },
                headers: {
                    Authorization: `Bearer ${getCookie("token")}`,
                },
            })
            .then((response) => {
                setProjects(response.data.projects);
                setSelectedCategory(response.data.category);
                setPaginations(null);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setPageLoading(false);
            });
    };
    const getAllProjects = async (category) => {
        setProjects([]);
        setPageLoading(true);
        await axios
            .get(`/projects`, {
                headers: {
                    Authorization: `Bearer ${getCookie("token")}`,
                },
            })
            .then((response) => {
                setProjects(response.data.data);
                setSelectedCategory(null);
                setPaginations(response.data.meta.links);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setPageLoading(false);
            });
    };

    return (
        <>
            <Head>
                <title>i-Salam Wakaf Online</title>

                <meta
                    name='description'
                    content="I-Salam menyediakan berbagai macam program wakaf yang dikelola secara profesional dan amanah serta diawasi oleh para asatidzah Ahlus Sunnah Wal Jama'ah"
                    key='wakaf'
                />
                <meta
                    property='og:title'
                    content="I-Salam Wakaf Online | I-Salam menyediakan berbagai macam program wakaf yang dikelola secara profesional dan amanah serta diawasi oleh para asatidzah Ahlus Sunnah Wal Jama'ah"
                />
                <meta property='og:url' content='https://isalamwakaf.com/' />
                <meta
                    property='og:description'
                    content="I-Salam menyediakan berbagai macam program wakaf yang dikelola secara profesional dan amanah serta diawasi oleh para asatidzah Ahlus Sunnah Wal Jama'ah"
                />
                <meta
                    property='og:image'
                    content='https://isalamwakaf.com/isalam-bg-white.png'
                />
                <meta property='og:image:width' content='607' />

                <meta property='og:image:height' content='160' />
            </Head>
            {pageLoading && <PageLoading />}
            <Layout>
                <Container>
                    <h2 className='text-2xl font-medium text-gray-500'>
                        Program Wakaf
                    </h2>
                    <div className='border-b mb-4 border-gray-300'>
                        <button
                            onClick={() => {
                                getAllProjects();
                            }}
                            className={`whitespace-nowrap outline-none text-sm  py-2 px-2  border-b-2 ${
                                !selectedCategory
                                    ? "border-primary-500  text-primary-500"
                                    : "border-white text-gray-400"
                            }`}>
                            Semua
                        </button>
                        {categories.map((item, index) => (
                            <button
                                onClick={() => {
                                    getProjectsByCategory(item.name);
                                }}
                                key={index}
                                className={`whitespace-nowrap outline-none text-sm  py-2 px-2  border-b-2 ${
                                    selectedCategory === item.name
                                        ? "border-primary-500  text-primary-500"
                                        : "border-white text-gray-400"
                                }`}>
                                {item.name}
                            </button>
                        ))}
                    </div>

                    {selectedCategory && (
                        <div className=''>
                            <p className='text-lg mb-4'>
                                Menampilkan kategori {selectedCategory}
                            </p>
                        </div>
                    )}
                    <div className={"grid md:grid-cols-3 gap-8"}>
                        {projects.map((item, index) => (
                            <ProjectItem
                                href={`/projects/${item.id}`}
                                key={index}
                                data={item}
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
                </Container>
            </Layout>
        </>
    );
}

export async function getServerSideProps(ctx) {
    let projects = [];
    let paginations = [];
    console.log(ctx);
    const params = ctx.query ?? null;
    let categories = [];
    await axios.get(`/projects`, { params }).then((response) => {
        projects = response.data.data;
        paginations = response.data.meta.links;
    });
    await axios.get(`/categories`).then((response) => {
        categories = response.data.categories;
    });
    console.log("test");

    return {
        props: {
            projects,
            categories,
            paginations,
        },
    };
}
