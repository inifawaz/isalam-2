import { getCookie } from "cookies-next";
import { useFormik } from "formik";
import React, { Fragment, useEffect, useState } from "react";
import AdminNav from "../../../components/AdminNav";
import Button from "../../../components/Button";
import Container from "../../../components/Container";
import Input from "../../../components/Input";
import Layout from "../../../components/Layout";
import { axios } from "../../../lib/axiosInstance";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/router";
import { Dialog, Transition } from "@headlessui/react";
import toast from "react-hot-toast";

const Editor = dynamic(() => import("../../../components/MyEditor"), {
    ssr: false,
});

export default function ArticleDetails({ article, topics }) {
    const [featuredImage, setFeaturedImage] = useState(null);
    const [picture, setPicture] = useState(article.featured_image_url);
    const [isDisabled, setisDisabled] = useState(false);
    const [editor, setEditor] = useState(article.content);
    const [isShown, setIsShown] = useState(article.is_shown);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    useEffect(() => {
        if (article.is_shown == 1) {
            setIsShown(true);
        } else if (article.is_shown == 0) {
            setIsShown(false);
        }
    }, []);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            topic_id: article.topic_id ?? "",
        },
        onSubmit: (values) => {
            handleUpdate(values);
        },
    });
    const handleUpdate = async (values) => {
        setIsLoading(true);
        const formData = new FormData();
        for (const [key, value] of Object.entries(values)) {
            formData.append(key, value);
        }
        formData.append("featured_image_url", featuredImage);
        formData.append("content", editor);
        formData.append("is_shown", isShown ? 1 : 0);
        formData.append("_method", "PUT");
        // for (const [key, value] of formData.entries()) {
        //     console.log(`${key}: ${value}`);
        // }
        await axios
            .post(`/admin/articles/${article.id}`, formData, {
                headers: {
                    Authorization: `Bearer ${getCookie("token")}`,
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                // console.log(response);
                router.push("/admin/articles");
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

    const [dialogDelete, setDialogDelete] = useState(false);
    const [isDeleteLoading, setIsDeleteLoading] = useState(false);
    const handleDelete = async () => {
        setIsDeleteLoading(true);
        await axios
            .delete(
                `/admin/articles/${article.id}`,

                {
                    headers: {
                        Authorization: `Bearer ${getCookie("token")}`,
                    },
                }
            )
            .then((response) => {
                // console.log(response);
                setDialogDelete(false);
                toast.success(response.data.message);

                router.push(`/admin/articles`);
            })
            .catch((error) => {
                toast.error("ada yang salah, coba lagi nanti");
                console.log(error);
            })
            .finally(() => {
                setIsDeleteLoading(false);
            });
    };

    return (
        <>
            <Transition appear show={dialogDelete} as={Fragment}>
                <Dialog
                    as='div'
                    className='relative z-10'
                    onClose={() => setDialogDelete(false)}>
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
                                        Menghapus Artikel
                                    </Dialog.Title>
                                    <div className='mt-2'>
                                        <p className='text-sm text-gray-500'>
                                            Apakah anda yakin ingin menghapus
                                            artikel ini?
                                        </p>
                                    </div>

                                    <div className='mt-4 flex justify-end space-x-2'>
                                        <button
                                            type='button'
                                            className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                                            onClick={() =>
                                                setDialogDelete(false)
                                            }>
                                            Batal
                                        </button>
                                        <div className='w-20'>
                                            <Button
                                                onClick={handleDelete}
                                                color={"warning"}
                                                loading={isDeleteLoading}>
                                                Hapus
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
                <Container className={"flex space-x-8"}>
                    <AdminNav />
                    <div className='w-full'>
                        <h1 className='text-2xl font-semibold tracking-wider text-gray-500 mb-2'>
                            Detail Artikel
                        </h1>
                        <form onSubmit={formik.handleSubmit}>
                            <div className='mb-4'>
                                <label className='text-gray-500 tracking-wider block mb-1'>
                                    Featured Image
                                </label>
                                <input
                                    type={"file"}
                                    accept='image/*'
                                    className='mb-2'
                                    onChange={(e) => {
                                        let pic = URL.createObjectURL(
                                            e.target.files[0]
                                        );
                                        setPicture(pic);
                                        setFeaturedImage(e.target.files[0]);
                                        console.log(picture);
                                        console.log(featuredImage);
                                    }}
                                    name='featured_image'
                                />
                                <div className='aspect-square relative'>
                                    <Image
                                        src={
                                            picture
                                                ? picture
                                                : "https://via.placeholder.com/1080.png?text=1:1"
                                        }
                                        alt=''
                                        layout='fill'
                                    />
                                </div>
                            </div>

                            <Editor
                                label={"Konten"}
                                onChange={(data) => {
                                    setEditor(data);
                                }}
                                data={editor}
                            />
                            <label className='block mb-4'>
                                <span className='text-gray-500 tracking-wider mb-1'>
                                    Topic
                                </span>
                                <select
                                    disabled={isDisabled}
                                    className='
                                    opacity-100
                                       
                                    disabled:bg-gray-100
                                    text-gray-600
                                    tracking-wider
                                    block
                                    w-full
                                    rounded-md
                                    border-gray-300
                                    shadow-sm
                                    placeholder:text-gray-300
                                    focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    name='topic_id'
                                    value={formik.values.topic_id}>
                                    <option disabled></option>
                                    {topics.map((item, index) => (
                                        <option key={index} value={item.id}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </label>

                            <div className='rounded-md mb-4 border-gray-300 p-4 border'>
                                <label
                                    htmlFor='small-toggle-shown'
                                    className='inline-flex relative items-center mb-1 cursor-pointer'>
                                    <input
                                        type='checkbox'
                                        className='sr-only peer'
                                        id='small-toggle-shown'
                                        checked={isShown}
                                        onChange={() => setIsShown(!isShown)}
                                    />
                                    <div
                                        className="w-9 h-5 bg-gray-200 peer-focus:outline-none
                                         peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                    <p className='ml-3 text-sm '>
                                        Tampilkan Article
                                    </p>
                                </label>
                            </div>

                            <Button loading={isLoading} type='submit'>
                                Simpan Perubahan
                            </Button>
                        </form>
                        <button
                            onClick={() => setDialogDelete(true)}
                            className='block text-center mx-auto mt-8 text-warning-500'>
                            Hapus
                        </button>
                    </div>
                </Container>
            </Layout>
        </>
    );
}

export async function getServerSideProps({ req, res, query }) {
    let article = [];
    let topics = [];
    await axios
        .get(`/admin/articles/${query.id}`, {
            headers: {
                Authorization: `Bearer ${getCookie("token", { req, res })}`,
            },
        })
        .then((response) => {
            article = response.data.article;
            // console.log(response.data.article);
        })
        .catch((error) => {
            console.log(error);
        });
    await axios
        .get(`/admin/topics`, {
            headers: {
                Authorization: `Bearer ${getCookie("token", { req, res })}`,
            },
        })
        .then((response) => {
            topics = response.data.topics;
        })
        .catch((error) => {
            console.log(error);
        });
    return {
        props: {
            article,
            topics,
        },
    };
}
