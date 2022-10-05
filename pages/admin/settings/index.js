import { Dialog, Tab, Transition } from "@headlessui/react";
import { getCookie } from "cookies-next";
import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import AdminCategoryItem from "../../../components/AdminCategoryItem";
import AdminNav from "../../../components/AdminNav";
import Container from "../../../components/Container";
import Input from "../../../components/Input";
import Layout from "../../../components/Layout";
import { axios } from "../../../lib/axiosInstance";
import { useFormik } from "formik";
import Button from "../../../components/Button";

import { toast } from "react-hot-toast";
import AdminTopicItem from "../../../components/AdminTopicItem";

export default function Settings() {
    const tabs = ["Kategori Wakaf", "Topik Artikel"];
    const [topics, setTopics] = useState([]);
    const [categories, setCategories] = useState([]);
    const classNames = (...classes) => classes.filter(Boolean).join(" ");

    const getAllCategories = async () => {
        setCategories([]);
        await axios
            .get("/admin/categories", {
                headers: {
                    Authorization: `Bearer ${getCookie("token")}`,
                },
            })
            .then((response) => {
                setCategories(response.data.categories);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const getAllTopics = async () => {
        setTopics([]);
        await axios
            .get("/admin/topics", {
                headers: {
                    Authorization: `Bearer ${getCookie("token")}`,
                },
            })
            .then((response) => {
                setTopics(response.data.topics);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getAllCategories();
        getAllTopics();
    }, []);
    const [dialogAddCategory, setDialogAddCategory] = useState(false);
    const [isAddCategoryLoading, setIsAddCategoryLoading] = useState(false);
    const categoryFormik = useFormik({
        initialValues: {
            name: "",
        },
    });

    const handleAddCategory = async () => {
        setIsAddCategoryLoading(true);
        await axios
            .post(
                "/admin/categories",
                {
                    name: categoryFormik.values.name,
                },
                {
                    headers: {
                        Authorization: `Bearer ${getCookie("token")}`,
                    },
                }
            )
            .then((response) => {
                getAllCategories();
                setDialogAddCategory(false);
                toast.success(response.data.message);
            })
            .catch((error) => {
                console.log(error);
                toast.error("ada yang salah, coba lagi nanti");
            })
            .finally(() => {
                setIsAddCategoryLoading(false);
            });
    };
    const [dialogAddTopic, setDialogAddTopic] = useState(false);
    const [isAddTopicLoading, setIsAddTopicLoading] = useState(false);
    const topicFormik = useFormik({
        initialValues: {
            name: "",
        },
    });

    const handleAddTopic = async () => {
        setIsAddTopicLoading(true);
        await axios
            .post(
                "/admin/topics",
                {
                    name: topicFormik.values.name,
                },
                {
                    headers: {
                        Authorization: `Bearer ${getCookie("token")}`,
                    },
                }
            )
            .then((response) => {
                getAllTopics();
                setDialogAddTopic(false);
                toast.success(response.data.message);
            })
            .catch((error) => {
                console.log(error);
                toast.error("ada yang salah, coba lagi nanti");
            })
            .finally(() => {
                setIsAddTopicLoading(false);
            });
    };
    return (
        <>
            <Transition appear show={dialogAddCategory} as={Fragment}>
                <Dialog
                    as='div'
                    className='relative z-10'
                    onClose={() => setDialogAddCategory(false)}>
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
                                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-md bg-white p-6 text-left align-middle shadow-xl transition-all'>
                                    <Dialog.Title
                                        as='h3'
                                        className='text-lg font-medium leading-6 text-gray-900'>
                                        Menambah Kategori Program Wakaf
                                    </Dialog.Title>
                                    <div className='mt-2'>
                                        <Input
                                            value={categoryFormik.values.name}
                                            name='name'
                                            onChange={
                                                categoryFormik.handleChange
                                            }
                                            onBlur={categoryFormik.handleBlur}
                                        />
                                    </div>

                                    <div className='mt-4 flex justify-end space-x-2'>
                                        <button
                                            type='button'
                                            className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                                            onClick={() => {
                                                setDialogAddCategory(false);
                                                categoryFormik.handleReset();
                                            }}>
                                            Batal
                                        </button>
                                        <div className='w-20'>
                                            <Button
                                                onClick={handleAddCategory}
                                                color={"secondary"}
                                                loading={isAddCategoryLoading}>
                                                Tambah
                                            </Button>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
            <Transition appear show={dialogAddTopic} as={Fragment}>
                <Dialog
                    as='div'
                    className='relative z-10'
                    onClose={() => setDialogAddTopic(false)}>
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
                                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-md bg-white p-6 text-left align-middle shadow-xl transition-all'>
                                    <Dialog.Title
                                        as='h3'
                                        className='text-lg font-medium leading-6 text-gray-900'>
                                        Menambah Topic Artikel
                                    </Dialog.Title>
                                    <div className='mt-2'>
                                        <Input
                                            value={topicFormik.values.name}
                                            name='name'
                                            onChange={topicFormik.handleChange}
                                            onBlur={topicFormik.handleBlur}
                                        />
                                    </div>

                                    <div className='mt-4 flex justify-end space-x-2'>
                                        <button
                                            type='button'
                                            className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                                            onClick={() => {
                                                setDialogAddTopic(false);
                                                topicFormik.handleReset();
                                            }}>
                                            Batal
                                        </button>
                                        <div className='w-20'>
                                            <Button
                                                onClick={handleAddTopic}
                                                color={"secondary"}
                                                loading={isAddTopicLoading}>
                                                Tambah
                                            </Button>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
            <Layout>
                <Container className={"flex space-x-8 "}>
                    <AdminNav />
                    <div className='w-full'>
                        <div>
                            <div className='flex items-center justify-between'>
                                <h1 className='text-2xl font-semibold tracking-wider text-gray-500 mb-2'>
                                    Pengaturan
                                </h1>
                            </div>
                        </div>
                        <Tab.Group>
                            <Tab.List
                                className={"border-b mb-4 border-gray-300"}>
                                {tabs.map((item, index) => (
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
                                        {item}
                                    </Tab>
                                ))}
                            </Tab.List>
                            <Tab.Panels>
                                <Tab.Panel
                                    className={"flex flex-col space-y-4"}>
                                    <div>
                                        <button
                                            onClick={() =>
                                                setDialogAddCategory(true)
                                            }
                                            className='px-3 text-sm py-2 inline-block bg-primary-500 text-white rounded-md'>
                                            Tambah Kategori
                                        </button>
                                    </div>
                                    {categories.map((item, index) => (
                                        <AdminCategoryItem
                                            getAllCategories={getAllCategories}
                                            data={item}
                                            key={index}
                                        />
                                    ))}
                                </Tab.Panel>
                                <Tab.Panel
                                    className={"flex flex-col space-y-4"}>
                                    <div>
                                        <button
                                            onClick={() =>
                                                setDialogAddTopic(true)
                                            }
                                            className='px-3 text-sm py-2 inline-block bg-primary-500 text-white rounded-md'>
                                            Tambah Topic
                                        </button>
                                    </div>
                                    {topics.map((item, index) => (
                                        <AdminTopicItem
                                            getAllTopics={getAllTopics}
                                            data={item}
                                            key={index}
                                        />
                                    ))}
                                </Tab.Panel>
                            </Tab.Panels>
                        </Tab.Group>
                    </div>
                </Container>
            </Layout>
        </>
    );
}
