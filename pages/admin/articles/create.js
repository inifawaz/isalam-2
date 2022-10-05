import { getCookie } from "cookies-next";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/AdminNav";
import Container from "../../../components/Container";
import Input from "../../../components/Input";
import Layout from "../../../components/Layout";
import Button from "../../../components/Button";
import Link from "next/link";
import dynamic from "next/dynamic";
import { axios } from "../../../lib/axiosInstance";
import Image from "next/image";
import toast from "react-hot-toast";

const Editor = dynamic(() => import("../../../components/MyEditor"), {
    ssr: false,
});

export default function Create({ topics }) {
    const [featuredImage, setFeaturedImage] = useState(null);
    const [picture, setPicture] = useState(null);
    const [isDisabled, setisDisabled] = useState(false);
    const [editor, setEditor] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const [errors, setErrors] = useState({});

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            topic_id: "",
        },
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });
    const handleSubmit = async (values) => {
        setIsLoading(true);
        const formData = new FormData();
        for (const [key, value] of Object.entries(values)) {
            formData.append(key, value);
        }
        formData.append("featured_image_url", featuredImage);
        formData.append("content", editor);
        for (const [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }
        await axios
            .post(`/admin/articles`, formData, {
                headers: {
                    Authorization: `Bearer ${getCookie("token")}`,
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                console.log(response);
                router.push("/admin/articles");
                toast.success(response.data.message);
            })
            .catch((error) => {
                if (error.response.data.message) {
                    toast.error(error.response.data.message);
                } else {
                    toast.error(
                        "ada yang salah,mohon bantuannya untuk menghubungi admin"
                    );
                }

                if (error.response.data.errors) {
                    setErrors(error.response.data.errors);
                }
                console.log(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <Layout>
            <Container className={"flex space-x-8"}>
                <AdminNav />
                <div>
                    <h1 className='text-2xl font-semibold tracking-wider text-gray-500 mb-2'>
                        Buat Artikel Baru
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

                        {/* <div className='rounded-md mb-4 border-gray-300 p-4 border'>
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
                        </div> */}

                        <Button
                            disabled={
                                formik.values.topic_id === "" ||
                                editor === "" ||
                                featuredImage === null
                                    ? true
                                    : false
                            }
                            loading={isLoading}
                            type='submit'>
                            Simpan Perubahan
                        </Button>
                    </form>
                </div>
            </Container>
        </Layout>
    );
}

export async function getServerSideProps({ req, res, query }) {
    let topics = [];

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
            topics,
        },
    };
}
