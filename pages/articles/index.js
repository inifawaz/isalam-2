import { Tab } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { HiOutlineTag } from "react-icons/hi";
import Container from "../../components/Container";
import Layout from "../../components/Layout";
import AppContext from "../../context/AppContext";
import { axios } from "../../lib/axiosInstance";
import { useRouter } from "next/router";

export default function Index({ articles, topics }) {
    const classNames = (...classes) => classes.filter(Boolean).join(" ");
    const { setPageLoading } = useContext(AppContext);
    const router = useRouter();

    useEffect(() => {
        setPageLoading(false);
    }, []);

    return (
        <>
            <Layout>
                <Container>
                    <h2 className='text-2xl font-medium text-gray-500'>
                        Artikel
                    </h2>
                    <Tab.Group>
                        <Tab.List className={"border-b mb-4 border-gray-300"}>
                            <Tab
                                className={({ selected }) =>
                                    classNames(
                                        "  whitespace-nowrap outline-none text-sm  py-2 px-2  border-b-2     ",
                                        selected
                                            ? "border-primary-500  text-primary-500"
                                            : "border-white text-gray-400"
                                    )
                                }>
                                Semua
                            </Tab>
                            {topics.map((item, index) => (
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
                            <Tab.Panel className={"flex flex-col space-y-4"}>
                                {articles.map((item, index) => (
                                    // <Link href={`/admin/articles/${item.id}`}>
                                    <div
                                        key={index}
                                        className=' h-fit flex flex-col md:flex-row  transition-all'>
                                        <div className='relative md:w-60 md:h-60 aspect-square shadow-md aspect-square'>
                                            <Image
                                                src={item.featured_image_url}
                                                layout='fill'
                                                alt='project image'
                                            />
                                        </div>
                                        <div className='p-4 bg-white border grow shadow-md'>
                                            <div className='flex space-x-4 justify-between items-center'>
                                                <div className='flex items-center  space-x-1'>
                                                    <HiOutlineTag className='text-gray-400' />
                                                    <p className='text-xs text-gray-400'>
                                                        {item.topic}
                                                    </p>
                                                </div>
                                                <time className='text-xs text-gray-400'>
                                                    {item.created_at}
                                                </time>
                                            </div>
                                            <div
                                                className=' prose line-clamp-4 w-full '
                                                dangerouslySetInnerHTML={{
                                                    __html: item.content,
                                                }}></div>
                                            <div className='flex space-x-4 mt-4'>
                                                <Link
                                                    href={`/articles/${item.id}`}>
                                                    <a className='inline-block py-1 px-2 rounded text-sm bg-primary-500 text-white'>
                                                        Baca Selengkapnya
                                                    </a>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    // </Link>
                                ))}
                            </Tab.Panel>
                            {topics.map((item, index) => {
                                const topicName = item.name;
                                return (
                                    <Tab.Panel
                                        key={index}
                                        className={"flex flex-col space-y-4"}>
                                        {articles
                                            .filter(
                                                (item) =>
                                                    item.topic === topicName
                                            )
                                            .map((item, index) => (
                                                // <Link href={`/admin/articles/${item.id}`}>
                                                <div
                                                    key={index}
                                                    className=' h-fit flex flex-col md:flex-row   '>
                                                    <div className='relative w-60 h-60 shadow-md aspect-square'>
                                                        <Image
                                                            src={
                                                                item.featured_image_url
                                                            }
                                                            layout='fill'
                                                            alt='project image'
                                                        />
                                                    </div>
                                                    <div className='p-4 bg-white border grow shadow-md'>
                                                        <div className='flex space-x-4 justify-between items-center'>
                                                            <div className='flex items-center  space-x-1'>
                                                                <HiOutlineTag className='text-gray-400' />
                                                                <p className='text-xs text-gray-400'>
                                                                    {item.topic}
                                                                </p>
                                                            </div>
                                                            <time className='text-xs text-gray-400'>
                                                                {
                                                                    item.created_at
                                                                }
                                                            </time>
                                                        </div>
                                                        <div
                                                            className=' prose line-clamp-4 w-full '
                                                            dangerouslySetInnerHTML={{
                                                                __html: item.content,
                                                            }}></div>
                                                        <div className='flex space-x-4 mt-4'>
                                                            <Link
                                                                href={`/articles/${item.id}`}>
                                                                <a className='inline-block py-1 px-2 rounded text-sm bg-primary-500 text-white'>
                                                                    Baca
                                                                    Selengkapnya
                                                                </a>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                                // </Link>
                                            ))}
                                    </Tab.Panel>
                                );
                            })}
                        </Tab.Panels>
                        {/* <Tab.Panels>
                        <Tab.Panel className={"flex flex-col space-y-4"}>
                            {articles.map((item, index) => (
                                // <Link href={`/admin/articles/${item.id}`}>
                                <div className=' h-fit flex   transition-all'>
                                    <div className='relative w-60 h-60 shadow-md aspect-square'>
                                        <Image
                                            src={item.featured_image_url}
                                            layout='fill'
                                            alt='project image'
                                        />
                                    </div>
                                    <div className='p-4 bg-white border grow shadow-md'>
                                        <div className='flex space-x-4 justify-between items-center'>
                                            <div className='flex items-center  space-x-1'>
                                                <HiOutlineTag className='text-gray-400' />
                                                <p className='text-xs text-gray-400'>
                                                    {item.topic}
                                                </p>
                                            </div>
                                            <time className='text-xs text-gray-400'>
                                                {item.created_at}
                                            </time>
                                        </div>
                                        <div
                                            className=' prose line-clamp-4 w-full '
                                            dangerouslySetInnerHTML={{
                                                __html: item.content,
                                            }}></div>
                                        <div className='flex space-x-4 mt-4'>
                                            <Link
                                                href={`/admin/articles/${item.id}`}>
                                                <a className='inline-block py-1 px-2 rounded text-sm bg-primary-500 text-white'>
                                                    Detail
                                                </a>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                // </Link>
                            ))}
                        </Tab.Panel>
                        <Tab.Panel className={"flex flex-col space-y-4"}>
                            {articles
                                .filter((item) => item.is_shown === 0)
                                .map((item, index) => (
                                    <Link href={`/admin/articles/${item.id}`}>
                                        <div className=' h-fit flex cursor-pointer  transition-all'>
                                            <div className='relative w-60 h-60 shadow-md aspect-square'>
                                                <Image
                                                    src={
                                                        item.featured_image_url
                                                    }
                                                    layout='fill'
                                                    alt='project image'
                                                />
                                            </div>
                                            <div className='p-4 bg-white border shadow-md'>
                                                <div className='flex space-x-4 justify-between items-center'>
                                                    <div className='flex items-center space-x-1'>
                                                        <HiOutlineTag className='text-gray-400' />
                                                        <p className='text-xs text-gray-400'>
                                                            {item.topic}
                                                        </p>
                                                    </div>
                                                    <time className='text-xs text-gray-400'>
                                                        {item.created_at}
                                                    </time>
                                                </div>
                                                <div
                                                    className=' prose line-clamp-5 w-full '
                                                    dangerouslySetInnerHTML={{
                                                        __html: item.content,
                                                    }}></div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                        </Tab.Panel>
                    </Tab.Panels> */}
                    </Tab.Group>
                </Container>
            </Layout>
        </>
    );
}

export async function getServerSideProps() {
    let articles = [];
    await axios.get("/articles").then((response) => {
        console.log(response.data.articles);
        articles = response.data.articles;
    });
    let topics = [];
    await axios.get("/topics").then((response) => {
        console.log(response.data.topics);
        topics = response.data.topics;
    });
    return {
        props: {
            articles,
            topics,
        },
    };
}
