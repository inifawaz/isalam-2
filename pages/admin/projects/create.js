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

export default function Create({ categories }) {
    const [editorLoaded, setEditorLoaded] = useState(false);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [fileDataURL, setFileDataURL] = useState(null);
    const [featuredImage, setFeaturedImage] = useState(null);
    const [picture, setPicture] = useState(null);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isLimitedTime, setIsLimitedTime] = useState(false);
    const [isTarget, setIsTarget] = useState(false);
    const [isShown, setIsShown] = useState(true);
    const [isEnded, setIsEnded] = useState(false);
    useEffect(() => {
        setEditorLoaded(true);
        // if (project.is_limited_time === 1) {
        //     setIsLimitedTime(true);
        // } else if (project.is_limited_time === 0) {
        //     setIsLimitedTime(false);
        // }
        // if (project.is_target === 1) {
        //     setIsTarget(true);
        // } else if (project.is_target === 0) {
        //     setIsTarget(false);
        // }
        // if (project.is_shown === 1) {
        //     setIsShown(true);
        // } else if (project.is_shown === 0) {
        //     setIsShown(false);
        // }
        // if (project.is_ended === 1) {
        //     setIsEnded(true);
        // } else if (project.is_ended === 0) {
        //     setIsEnded(false);
        // }
    }, []);
    // const formik = useFormik({
    //     initialValues: {
    //         location: "",
    //         name: "",
    //         category_id: 1,
    //         is_target: 1,
    //         is_limited_time: 1,
    //         is_shown: 1,
    //         description: "",
    //         instagram_url: "",
    //         facebook_url: "",
    //         twitter_url: "",
    //         start_date: "",
    //         end_date: "",
    //         maintenance_fee: 5000,
    //         target_amount: "",
    //         first_choice_given_amount: "",
    //         second_choice_given_amount: "",
    //         third_choice_given_amount: "",
    //         fourth_choice_given_amount: "",
    //     },
    //     onSubmit: (values) => {
    //         handleSubmit(values);
    //     },
    // });
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            // featured_image_url: project.featured_image_url,
            name: "",
            category_id: "",
            // description: project.description,
            location: "",
            instagram_url: "",
            facebook_url: "",
            twitter_url: "",
            maintenance_fee: 5000,
            // is_target: project.is_target,
            target_amount: 0,
            first_choice_given_amount: 20000,
            second_choice_given_amount: 50000,
            third_choice_given_amount: 100000,
            fourth_choice_given_amount: 200000,
            // is_limited_time: project.is_limited_time,
            start_date: "",
            end_date: "",
            // is_shown: project.is_shown,
            // is_ended: project.is_ended,
        },
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });
    const [editor, setEditor] = useState("");

    const handleSubmit = async (values) => {
        setIsLoading(true);
        const formData = new FormData();
        for (const [key, value] of Object.entries(values)) {
            formData.append(key, value);
        }
        formData.append("featured_image_url", featuredImage);
        formData.append("description", editor);
        // formData.append("is_shown", isShown ? 1 : 0);
        // formData.append("is_ended", isEnded ? 1 : 0);
        formData.append("is_target", isTarget ? 1 : 0);
        formData.append("is_limited_time", isLimitedTime ? 1 : 0);
        if (isLimitedTime == 0) {
            formData.delete("start_date");
            formData.delete("end_date");
        }
        if (isTarget == 0) {
            formData.set("target_amount", 0);
        }
        for (const [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }
        await axios
            .post(`/admin/projects`, formData, {
                headers: {
                    Authorization: `Bearer ${getCookie("token")}`,
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                // console.log(response);
                router.push("/admin/projects");
                toast.success(response.data.message);
            })
            .catch((error) => {
                toast.error("ada yang salah, coba lagi nanti");
                console.log(error.response);
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
                        Buat Program Wakaf Baru
                    </h1>
                    {/* <form
                        className='bg-white max-w-2xl shadow-md border rounded-md md:p-8 p-4'
                        onSubmit={formik.handleSubmit}>
                        <div className='mb-4'>
                            <label className='text-gray-500 tracking-wider block mb-1'>
                                Foto Program Wakaf
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
                                }}
                                name='featured_image_url'
                            />
                            <div className='aspect-square'>
                                <img
                                    className='w-full'
                                    src={
                                        picture
                                            ? picture
                                            : "https://via.placeholder.com/1080.png?text=1:1"
                                    }
                                    alt=''
                                />
                            </div>
                        </div>
                        <Input
                            label={"Nama"}
                            name='name'
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.name && formik.errors.name}
                        />

                        <Editor
                            label={"Deskripsi"}
                            onChange={(data) => {
                                setEditor(data);
                            }}
                            data={editor}
                        />
                        <Input
                            label={"Lokasi"}
                            name='location'
                            value={formik.values.location}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.location &&
                                formik.errors.location
                            }
                        />
                        <div className='flex space-x-4 '>
                            <Input
                                label={"Mulai"}
                                type='date'
                                name='start_date'
                                value={formik.values.start_date}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={
                                    formik.touched.start_date &&
                                    formik.errors.start_date
                                }
                            />
                            <Input
                                label={"Sampai"}
                                type='date'
                                name='end_date'
                                value={formik.values.end_date}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={
                                    formik.touched.end_date &&
                                    formik.errors.end_date
                                }
                            />
                        </div>
                        <Input
                            label={"Target Nominal Wakaf"}
                            name='target_amount'
                            type={"number"}
                            value={formik.values.target_amount}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.target_amount &&
                                formik.errors.target_amount
                            }
                        />
                        <Input
                            label={"Biaya pemeliharaan sistem"}
                            name='maintenance_fee'
                            type={"number"}
                            value={formik.values.maintenance_fee}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.maintenance_fee &&
                                formik.errors.maintenance_fee
                            }
                        />
                        <Input
                            label={"Pilihan Nominal Wakaf Pertama"}
                            name='first_choice_given_amount'
                            type={"number"}
                            value={formik.values.first_choice_given_amount}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.first_choice_given_amount &&
                                formik.errors.first_choice_given_amount
                            }
                        />
                        <Input
                            label={"Pilihan Nominal Wakaf Kedua"}
                            name='second_choice_given_amount'
                            type={"number"}
                            value={formik.values.second_choice_given_amount}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.second_choice_given_amount &&
                                formik.errors.second_choice_given_amount
                            }
                        />
                        <Input
                            label={"Pilihan Nominal Wakaf Ketiga"}
                            name='third_choice_given_amount'
                            type={"number"}
                            value={formik.values.third_choice_given_amount}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.third_choice_given_amount &&
                                formik.errors.third_choice_given_amount
                            }
                        />
                        <Input
                            label={"Pilihan Nominal Wakaf Keempat"}
                            name='fourth_choice_given_amount'
                            type={"number"}
                            value={formik.values.fourth_choice_given_amount}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.fourth_choice_given_amount &&
                                formik.errors.fourth_choice_given_amount
                            }
                        />
                        <Input
                            label={"Instagram Url"}
                            name='instagram_url'
                            value={formik.values.instagram_url}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.instagram_url &&
                                formik.errors.instagram_url
                            }
                        />
                        <Input
                            label={"Facebook Url"}
                            name='facebook_url'
                            value={formik.values.facebook_url}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.facebook_url &&
                                formik.errors.facebook_url
                            }
                        />
                        <Input
                            label={"Twitter Url"}
                            name='twitter_url'
                            value={formik.values.twitter_url}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.twitter_url &&
                                formik.errors.twitter_url
                            }
                        />

                        <Button loading={isLoading}>Simpan</Button>
                        <Link href={"/admin/projects"}>
                            <a className='text-center block mt-8'>Kembali</a>
                        </Link>
                    </form> */}
                    <form onSubmit={formik.handleSubmit}>
                        <div className='mb-4'>
                            <label className='text-gray-500 tracking-wider block mb-1'>
                                Foto Program Wakaf
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
                        <Input
                            disabled={isDisabled}
                            label={"Nama"}
                            name={"name"}
                            onChange={formik.handleChange}
                            value={formik.values.name}
                            onBlur={formik.handleBlur}
                            error={formik.touched.name && formik.errors.name}
                        />
                        <Editor
                            label={"Deskripsi"}
                            onChange={(data) => {
                                setEditor(data);
                            }}
                            data={editor}
                        />
                        <label className='block mb-4'>
                            <span className='text-gray-500 tracking-wider mb-1'>
                                Kategori
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
                                name='category_id'
                                value={formik.values.category_id}>
                                <option disabled></option>
                                {categories.map((item, index) => (
                                    <option key={index} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <Input
                            disabled={isDisabled}
                            label={"Lokasi"}
                            name={"location"}
                            onChange={formik.handleChange}
                            value={formik.values.location}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.location &&
                                formik.errors.location
                            }
                        />

                        <Input
                            disabled={isDisabled}
                            label={"Instagram Url"}
                            name={"instagram_url"}
                            onChange={formik.handleChange}
                            value={formik.values.instagram_url}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.instagram_url &&
                                formik.errors.instagram_url
                            }
                        />
                        <Input
                            disabled={isDisabled}
                            label={"Facebook Url"}
                            name={"facebook_url"}
                            onChange={formik.handleChange}
                            value={formik.values.facebook_url}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.facebook_url &&
                                formik.errors.facebook_url
                            }
                        />
                        <Input
                            disabled={isDisabled}
                            label={"Twitter Url"}
                            name={"twitter_url"}
                            onChange={formik.handleChange}
                            value={formik.values.twitter_url}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.twitter_url &&
                                formik.errors.twitter_url
                            }
                        />
                        <div className='rounded-md mb-4 border-gray-300 p-4 border'>
                            <label
                                htmlFor='small-toggle'
                                className='inline-flex relative items-center mb-1 cursor-pointer'>
                                <input
                                    type='checkbox'
                                    className='sr-only peer'
                                    id='small-toggle'
                                    checked={isLimitedTime}
                                    onChange={() =>
                                        setIsLimitedTime(!isLimitedTime)
                                    }
                                />
                                <div
                                    className="w-9 h-5 bg-gray-200 peer-focus:outline-none
                                         peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                <p className='ml-3 text-sm '>
                                    Aktifkan Batasan Waktu
                                </p>
                            </label>
                            {isLimitedTime && (
                                <div className='grid grid-cols-4 space-x-4'>
                                    <Input
                                        type={"date"}
                                        label='Mulai'
                                        disabled={isDisabled}
                                        name={"start_date"}
                                        onChange={formik.handleChange}
                                        value={formik.values.start_date}
                                        onBlur={formik.handleBlur}
                                        error={
                                            formik.touched.start_date &&
                                            formik.errors.start_date
                                        }
                                    />
                                    <Input
                                        type={"date"}
                                        label='Berakhir'
                                        disabled={isDisabled}
                                        name={"end_date"}
                                        onChange={formik.handleChange}
                                        value={formik.values.end_date}
                                        onBlur={formik.handleBlur}
                                        error={
                                            formik.touched.end_date &&
                                            formik.errors.end_date
                                        }
                                    />
                                </div>
                            )}
                        </div>
                        <div className='rounded-md mb-4 border-gray-300 p-4 border'>
                            <label
                                htmlFor='small-toggle-target-amount'
                                className='inline-flex relative items-center mb-1 cursor-pointer'>
                                <input
                                    type='checkbox'
                                    className='sr-only peer'
                                    id='small-toggle-target-amount'
                                    checked={isTarget}
                                    onChange={() => setIsTarget(!isTarget)}
                                />
                                <div
                                    className="w-9 h-5 bg-gray-200 peer-focus:outline-none
                                         peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                <p className='ml-3 text-sm '>
                                    Aktifkan Nominal Target
                                </p>
                            </label>
                            {isTarget && (
                                <div className='grid grid-cols-4 space-x-4'>
                                    <Input
                                        type={"number"}
                                        label='Nominal Target'
                                        disabled={isDisabled}
                                        name={"target_amount"}
                                        onChange={formik.handleChange}
                                        value={formik.values.target_amount}
                                        onBlur={formik.handleBlur}
                                        error={
                                            formik.touched.target_amount &&
                                            formik.errors.target_amount
                                        }
                                    />
                                </div>
                            )}
                        </div>
                        <Input
                            type={"number"}
                            disabled={isDisabled}
                            label={"Biaya Pemeliharaan Sistem"}
                            name={"maintenance_fee"}
                            onChange={formik.handleChange}
                            value={formik.values.maintenance_fee}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.maintenance_fee &&
                                formik.errors.maintenance_fee
                            }
                        />

                        <label className='mb-4'>
                            <span className='text-gray-500 tracking-wider mb-1 block'>
                                Pilihan Nominal Wakaf
                            </span>
                            <div className='grid md:grid-cols-4 space-x-4'>
                                <Input
                                    type={"number"}
                                    disabled={isDisabled}
                                    name={"first_choice_given_amount"}
                                    onChange={formik.handleChange}
                                    value={
                                        formik.values.first_choice_given_amount
                                    }
                                    onBlur={formik.handleBlur}
                                    error={
                                        formik.touched
                                            .first_choice_given_amount &&
                                        formik.errors.first_choice_given_amount
                                    }
                                />
                                <Input
                                    type={"number"}
                                    disabled={isDisabled}
                                    name={"second_choice_given_amount"}
                                    onChange={formik.handleChange}
                                    value={
                                        formik.values.second_choice_given_amount
                                    }
                                    onBlur={formik.handleBlur}
                                    error={
                                        formik.touched
                                            .second_choice_given_amount &&
                                        formik.errors.second_choice_given_amount
                                    }
                                />
                                <Input
                                    type={"number"}
                                    disabled={isDisabled}
                                    name={"third_choice_given_amount"}
                                    onChange={formik.handleChange}
                                    value={
                                        formik.values.third_choice_given_amount
                                    }
                                    onBlur={formik.handleBlur}
                                    error={
                                        formik.touched
                                            .third_choice_given_amount &&
                                        formik.errors.third_choice_given_amount
                                    }
                                />
                                <Input
                                    type={"number"}
                                    disabled={isDisabled}
                                    name={"fourth_choice_given_amount"}
                                    onChange={formik.handleChange}
                                    value={
                                        formik.values.fourth_choice_given_amount
                                    }
                                    onBlur={formik.handleBlur}
                                    error={
                                        formik.touched
                                            .fourth_choice_given_amount &&
                                        formik.errors.fourth_choice_given_amount
                                    }
                                />
                            </div>
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
                                    Tampilkan Program Wakaf
                                </p>
                            </label>
                        </div> */}
                        {/* <div className='rounded-md mb-4 border-gray-300 p-4 border'>
                            <label
                                htmlFor='small-toggle-ended'
                                className='inline-flex relative items-center mb-1 cursor-pointer'>
                                <input
                                    type='checkbox'
                                    className='sr-only peer'
                                    id='small-toggle-ended'
                                    checked={isEnded}
                                    onChange={() => setIsEnded(!isEnded)}
                                />
                                <div
                                    className="w-9 h-5 bg-gray-200 peer-focus:outline-none
                                         peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                <p className='ml-3 text-sm '>
                                    Program Telah Berakhir
                                </p>
                            </label>
                        </div> */}

                        <Button loading={isLoading} type='submit'>
                            Simpan
                        </Button>
                    </form>
                </div>
            </Container>
        </Layout>
    );
}

export async function getServerSideProps({ req, res }) {
    let project = {};
    let categories = [];
    await axios
        .get(`/admin/categories`, {
            headers: {
                Authorization: `Bearer ${getCookie("token", { req, res })}`,
            },
        })
        .then((response) => {
            // console.log(response);
            categories = response.data.categories;
        })
        .catch((error) => {
            console.log(error.response);
        });

    return {
        props: {
            categories,
        },
    };
}
