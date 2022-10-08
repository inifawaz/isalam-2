import { getCookie } from "cookies-next";
import Link from "next/link";
import React, { useContext, useEffect } from "react";
import Container from "../components/Container";
import Layout from "../components/Layout";
import PageLoading from "../components/PageLoading";
import ProjectItem from "../components/ProjectItem";
import AppContext from "../context/AppContext";
import { axios } from "../lib/axiosInstance";
import { useRouter } from "next/router";
import Head from "next/head";

export default function Index({ projects }) {
    const { pageLoading, setPageLoading } = useContext(AppContext);
    const router = useRouter();

    useEffect(() => {
        setPageLoading(false);
        // console.log(getCookie("token"));
    }, [router]);

    return (
        <div>
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
                    content='https://isalamwakaf.com/isalam-dark.png'
                />
                <meta property='og:image:width' content='607' />

                <meta property='og:image:height' content='160' />
            </Head>
            {pageLoading && <PageLoading />}

            <Layout>
                <Container className={"grid md:grid-cols-1 gap-8 py-20"}>
                    <div className='md:px-20 flex flex-col items-center'>
                        <h2 className='text-4xl text-center font-medium text-primary-600'>
                            Mari Berwakaf Bersama Kami
                        </h2>
                        <p className='text-center md:px-20 mt-4'>
                            I-Salam menyediakan berbagai macam program wakaf
                            yang dikelola secara profesional dan amanah serta
                            diawasi oleh para asatidzah Ahlus Sunnah Wal Jama'ah
                        </p>
                        <Link href='/projects'>
                            <a className='py-2 px-3 mx-auto bg-primary-500 text-white rounded-md mt-8 inline-block'>
                                Lihat Program Wakaf
                            </a>
                        </Link>
                    </div>
                </Container>
                <Container className={""}>
                    <div className='bg-gradient-to-r from-sky-900 to-primary-800 shadow-xl rounded-md border p-4 md:p-8'>
                        <h3 className='text-2xl text-white t font-semibold mb-4'>
                            Program Wakaf Pilihan
                        </h3>
                        <div className='grid md:grid-cols-3 gap-4 md:gap-8'>
                            {projects
                                .filter((item) => item.is_favourite === "1")
                                .map((item, index) => (
                                    <ProjectItem
                                        href={`/projects/${item.id}`}
                                        key={index}
                                        data={item}
                                    />
                                ))}
                        </div>
                    </div>
                </Container>
                <Container className={""}>
                    <div className='bg-gradient-to-r from-sky-900 to-primary-800 shadow-xl rounded-md border p-4 md:p-8'>
                        <h3 className='text-2xl text-white t font-semibold mb-4'>
                            Program Wakaf Terbaru
                        </h3>
                        <div className='grid md:grid-cols-3 gap-4 md:gap-8'>
                            {projects.slice(0, 3).map((item, index) => (
                                <ProjectItem
                                    href={`/projects/${item.id}`}
                                    key={index}
                                    data={item}
                                />
                            ))}
                        </div>
                        <div className='mx-auto w-full'>
                            <Link href='/projects'>
                                <a className='px-3 py-2 mx-auto text-center bg-secondary-600 rounded-md mt-8 text-white block'>
                                    Lihat Program Wakaf Lainnya
                                </a>
                            </Link>
                        </div>
                    </div>
                </Container>
            </Layout>
        </div>
    );
}

export async function getServerSideProps() {
    let projects = [];
    await axios.get("/projects").then((response) => {
        projects = response.data.data;
    });
    return {
        props: {
            projects,
        },
    };
}
