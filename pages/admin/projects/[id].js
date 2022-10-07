import { Dialog, Tab, Transition } from "@headlessui/react";
import { getCookie } from "cookies-next";
import { Formik, useFormik } from "formik";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import AdminInformationItem from "../../../components/AdminInformationItem";
import AdminNav from "../../../components/AdminNav";
import AdminReportItem from "../../../components/AdminReportItem";
import Button from "../../../components/Button";
import Container from "../../../components/Container";
import Input from "../../../components/Input";
import Layout from "../../../components/Layout";
import AppContext from "../../../context/AppContext";
import { axios } from "../../../lib/axiosInstance";
import formatToCurreny from "../../../utils/formatToCurreny";
const Editor = dynamic(() => import("../../../components/MyEditor"), {
    ssr: false,
});
export default function ProjectDetails({
    project,
    categories,
    statistics,
    information,
    reports,
    payments,
}) {
    const [dialogDelete, setDialogDelete] = useState(false);
    const [isDeleteLoading, setIsDeleteLoading] = useState(false);
    const [picture, setPicture] = useState(project.featured_image_url);
    const [featuredImage, setFeaturedImage] = useState(null);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isLimitedTime, setIsLimitedTime] = useState(false);
    const [isTarget, setIsTarget] = useState(false);
    const [isShown, setIsShown] = useState(false);
    const [isFavourite, setIsFavourite] = useState(false);
    const [isEnded, setIsEnded] = useState(false);
    const [editor, setEditor] = useState(project.description);
    const [editorLoaded, setEditorLoaded] = useState(false);
    const { setPageLoading } = useContext(AppContext);
    useEffect(() => {
        setPageLoading(false);
        setEditorLoaded(true);
        if (project.is_limited_time == 1) {
            setIsLimitedTime(true);
        } else if (project.is_limited_time == 0) {
            setIsLimitedTime(false);
        }
        if (project.is_target == 1) {
            setIsTarget(true);
        } else if (project.is_target == 0) {
            setIsTarget(false);
        }
        if (project.is_shown == 1) {
            setIsShown(true);
        } else if (project.is_shown == 0) {
            setIsShown(false);
        }
        if (project.is_ended == 1) {
            setIsEnded(true);
        } else if (project.is_ended == 0) {
            setIsEnded(false);
        }
        if (project.is_favourite == 1) {
            setIsFavourite(true);
        } else if (project.is_favourite == 0) {
            setIsFavourite(false);
        }
    }, []);

    const classNames = (...classes) => classes.filter(Boolean).join(" ");
    const tabs = [
        { name: "Overview" },
        { name: "Detail Program" },
        { name: "Informasi" },
        { name: "Laporan" },
    ];
    const projectDetailsFormik = useFormik({
        enableReinitialize: true,
        initialValues: {
            id: project.id,
            // featured_image_url: project.featured_image_url,
            name: project.name,
            category_id: project.category_id ?? "",
            // description: project.description,
            location: project.location,
            instagram_url: project.instagram_url ?? "",
            facebook_url: project.facebook_url ?? "",
            twitter_url: project.twitter_url ?? "",
            maintenance_fee: project.maintenance_fee,
            // is_target: project.is_target,
            target_amount: project.target_amount,
            first_choice_given_amount: project.first_choice_given_amount,
            second_choice_given_amount: project.second_choice_given_amount,
            third_choice_given_amount: project.third_choice_given_amount,
            fourth_choice_given_amount: project.fourth_choice_given_amount,
            // is_limited_time: project.is_limited_time,
            start_date: project.start_date ?? "",
            end_date: project.end_date ?? "",
            // is_shown: project.is_shown,
            // is_ended: project.is_ended,
        },
        onSubmit: (values) => {
            handleUpdate(values);
        },
    });
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const handleUpdate = async (values) => {
        setIsLoading(true);
        const formData = new FormData();
        for (const [key, value] of Object.entries(values)) {
            formData.append(key, value);
        }
        formData.append("featured_image_url", featuredImage);
        formData.append("description", editor);
        formData.append("is_shown", isShown ? 1 : 0);
        formData.append("is_ended", isEnded ? 1 : 0);
        formData.append("is_target", isTarget ? 1 : 0);
        formData.append("is_limited_time", isLimitedTime ? 1 : 0);
        formData.append("is_favourite", isFavourite ? 1 : 0);
        formData.append("_method", "PUT");
        // for (const [key, value] of formData.entries()) {
        //     console.log(`${key}: ${value}`);
        // }
        await axios
            .post(`/admin/projects/${project.id}`, formData, {
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

    const [dialogAddInformation, setDialogAddInformation] = useState(false);
    const [informationAddLoading, setInformationAddLoading] = useState(false);
    const [editorInformation, setEditorInformation] = useState();
    const handleAddInformation = async () => {
        setInformationAddLoading(true);
        await axios
            .post(
                `/admin/information`,
                {
                    project_id: project.id,
                    content: editorInformation,
                },
                {
                    headers: {
                        Authorization: `Bearer ${getCookie("token")}`,
                    },
                }
            )
            .then((response) => {
                // console.log(response.data);
                toast.success(response.data.message);
                router.reload(window.location.pathname);
            })
            .catch((error) => {
                toast.error("ada yang salah, coba lagi nanti");
                console.log(error);
            })
            .finally(() => {
                setInformationAddLoading(false);
            });
    };
    const [dialogAddReport, setDialogAddReport] = useState(false);
    const [reportAddLoading, setReportAddLoading] = useState(false);
    const [editorReport, setEditorReport] = useState("");
    const handleAddReport = async () => {
        setReportAddLoading(true);
        await axios
            .post(
                `/admin/reports`,
                {
                    project_id: project.id,
                    content: editorReport,
                },
                {
                    headers: {
                        Authorization: `Bearer ${getCookie("token")}`,
                    },
                }
            )
            .then((response) => {
                // console.log(response.data);
                toast.success(response.data.message);
                router.reload(window.location.pathname);
            })
            .catch((error) => {
                toast.error("ada yang salah, coba lagi nanti");
                console.log(error);
            })
            .finally(() => {
                setReportAddLoading(false);
            });
    };

    const deleteProject = async () => {
        setIsDeleteLoading(true);
        await axios
            .delete(`/admin/projects/${project.id}`, {
                headers: {
                    Authorization: `Bearer ${getCookie("token")}`,
                },
            })
            .then((response) => {
                // console.log(response);
                toast.success(response.data.message);

                router.push(`/admin/projects`);
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
                                        Menghapus Program Wakaf
                                    </Dialog.Title>
                                    <div className='mt-2'>
                                        <p className='text-sm text-gray-500'>
                                            Apakah anda yakin ingin menghapus
                                            Program Wakaf ini?
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
                                                onClick={deleteProject}
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
            <Transition appear show={dialogAddInformation} as={Fragment}>
                <Dialog
                    as='div'
                    className='relative z-10'
                    onClose={() => {
                        setEditorInformation("");
                        setDialogAddInformation(false);
                    }}>
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

                    <div className='fixed inset-0 pt-20 overflow-y-auto'>
                        <div className='flex  justify-center p-4 text-center'>
                            <Transition.Child
                                as={Fragment}
                                enter='ease-out duration-300'
                                enterFrom='opacity-0 scale-95'
                                enterTo='opacity-100 scale-100'
                                leave='ease-in duration-200'
                                leaveFrom='opacity-100 scale-100'
                                leaveTo='opacity-0 scale-95'>
                                <Dialog.Panel className='w-full max-w-3xl transform overflow-hidden rounded-md bg-white p-6 text-left align-middle shadow-xl transition-all'>
                                    <Dialog.Title
                                        as='h3'
                                        className='text-lg font-medium leading-6 text-gray-900'>
                                        Menambah Informasi
                                    </Dialog.Title>
                                    <div className='mt-2'>
                                        <Editor
                                            onChange={(data) => {
                                                setEditorInformation(data);
                                            }}
                                            data={editorInformation}
                                        />
                                    </div>

                                    <div className='mt-4 flex justify-end space-x-2'>
                                        <button
                                            type='button'
                                            className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                                            onClick={() =>
                                                setDialogAddInformation(false)
                                            }>
                                            Batal
                                        </button>
                                        <div className='w-20'>
                                            <Button
                                                onClick={handleAddInformation}
                                                loading={informationAddLoading}>
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
            <Transition appear show={dialogAddReport} as={Fragment}>
                <Dialog
                    as='div'
                    className='relative z-10'
                    onClose={() => {
                        setEditorReport("");
                        setDialogAddReport(false);
                    }}>
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

                    <div className='fixed inset-0 pt-20 overflow-y-auto'>
                        <div className='flex  justify-center p-4 text-center'>
                            <Transition.Child
                                as={Fragment}
                                enter='ease-out duration-300'
                                enterFrom='opacity-0 scale-95'
                                enterTo='opacity-100 scale-100'
                                leave='ease-in duration-200'
                                leaveFrom='opacity-100 scale-100'
                                leaveTo='opacity-0 scale-95'>
                                <Dialog.Panel className='w-full max-w-3xl transform overflow-hidden rounded-md bg-white p-6 text-left align-middle shadow-xl transition-all'>
                                    <Dialog.Title
                                        as='h3'
                                        className='text-lg font-medium leading-6 text-gray-900'>
                                        Menambah Laporan
                                    </Dialog.Title>
                                    <div className='mt-2'>
                                        <Editor
                                            onChange={(data) => {
                                                setEditorReport(data);
                                            }}
                                            data={editorReport}
                                        />
                                    </div>

                                    <div className='mt-4 flex justify-end space-x-2'>
                                        <button
                                            type='button'
                                            className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                                            onClick={() =>
                                                setDialogAddReport(false)
                                            }>
                                            Batal
                                        </button>
                                        <div className='w-20'>
                                            <Button
                                                onClick={handleAddReport}
                                                loading={reportAddLoading}>
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
                <Container className={"flex space-x-8"}>
                    <AdminNav />
                    <div className='w-full'>
                        <h1 className='text-2xl font-semibold tracking-wider text-gray-500 mb-2'>
                            {project.name}
                        </h1>
                        <Tab.Group>
                            <Tab.List
                                className={"border-b mb-4  border-gray-300"}>
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
                                        {item.name}
                                    </Tab>
                                ))}
                            </Tab.List>
                            <Tab.Panels>
                                <Tab.Panel className={"grid md:grid-cols-3"}>
                                    <div className='p-4 shadow-md border'>
                                        <p className='text-sm'>Terkumpul</p>
                                        <p className='text-xl font-medium'>
                                            {formatToCurreny(
                                                statistics.collected_amount ?? 0
                                            )}
                                        </p>
                                    </div>

                                    <div className='p-4 shadow-md border'>
                                        <p className='text-sm'>Pembayaran</p>
                                        <p className='text-xl font-medium'>
                                            {statistics.successful_payments ??
                                                0}
                                            x
                                        </p>
                                    </div>
                                    <div className='col-span-3 '>
                                        <h2 className='text-xl mb-2 mt-8'>
                                            Pembayaran Terbaru
                                        </h2>
                                        <div>
                                            <table className='table-auto w-full bg-white shadow-md'>
                                                <thead className='bg-sky-900'>
                                                    <tr>
                                                        <th className='text-sm text-white font-medium text-left p-2'>
                                                            Tanggal
                                                        </th>
                                                        <th className='text-sm text-white font-medium text-left p-2'>
                                                            Nama
                                                        </th>
                                                        <th className='text-sm text-white font-medium text-left p-2'>
                                                            Nominal
                                                        </th>
                                                        <th className='text-sm text-white font-medium text-left p-2'>
                                                            Metode Pembayaran
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className='divide-y'>
                                                    {payments.map(
                                                        (item, index) => (
                                                            <tr
                                                                className='odd:bg-white even:bg-sky-100'
                                                                key={index}>
                                                                <td className='text-gray-500 text-sm p-2 '>
                                                                    {
                                                                        item.paid_at
                                                                    }
                                                                </td>
                                                                <td className='text-gray-500 text-sm p-2 '>
                                                                    {item.name}
                                                                </td>
                                                                <td className='text-gray-500 text-sm p-2 '>
                                                                    {formatToCurreny(
                                                                        item.given_amount
                                                                    )}
                                                                </td>
                                                                <td className='text-gray-500 text-sm p-2 '>
                                                                    {
                                                                        item.payment_name
                                                                    }
                                                                </td>
                                                            </tr>
                                                        )
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </Tab.Panel>
                                <Tab.Panel
                                    as='form'
                                    onSubmit={
                                        projectDetailsFormik.handleSubmit
                                    }>
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
                                                setFeaturedImage(
                                                    e.target.files[0]
                                                );
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
                                        onChange={
                                            projectDetailsFormik.handleChange
                                        }
                                        value={projectDetailsFormik.values.name}
                                        onBlur={projectDetailsFormik.handleBlur}
                                        error={
                                            projectDetailsFormik.touched.name &&
                                            projectDetailsFormik.errors.name
                                        }
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
                                            onChange={
                                                projectDetailsFormik.handleChange
                                            }
                                            onBlur={
                                                projectDetailsFormik.handleBlur
                                            }
                                            name='category_id'
                                            value={
                                                projectDetailsFormik.values
                                                    .category_id
                                            }>
                                            <option disabled></option>
                                            {categories.map((item, index) => (
                                                <option
                                                    key={index}
                                                    value={item.id}>
                                                    {item.name}
                                                </option>
                                            ))}
                                        </select>
                                    </label>

                                    <Input
                                        disabled={isDisabled}
                                        label={"Lokasi"}
                                        name={"location"}
                                        onChange={
                                            projectDetailsFormik.handleChange
                                        }
                                        value={
                                            projectDetailsFormik.values.location
                                        }
                                        onBlur={projectDetailsFormik.handleBlur}
                                        error={
                                            projectDetailsFormik.touched
                                                .location &&
                                            projectDetailsFormik.errors.location
                                        }
                                    />

                                    <Input
                                        disabled={isDisabled}
                                        label={"Instagram Url"}
                                        name={"instagram_url"}
                                        onChange={
                                            projectDetailsFormik.handleChange
                                        }
                                        value={
                                            projectDetailsFormik.values
                                                .instagram_url
                                        }
                                        onBlur={projectDetailsFormik.handleBlur}
                                        error={
                                            projectDetailsFormik.touched
                                                .instagram_url &&
                                            projectDetailsFormik.errors
                                                .instagram_url
                                        }
                                    />
                                    <Input
                                        disabled={isDisabled}
                                        label={"Instagram Url"}
                                        name={"facebook_url"}
                                        onChange={
                                            projectDetailsFormik.handleChange
                                        }
                                        value={
                                            projectDetailsFormik.values
                                                .facebook_url
                                        }
                                        onBlur={projectDetailsFormik.handleBlur}
                                        error={
                                            projectDetailsFormik.touched
                                                .facebook_url &&
                                            projectDetailsFormik.errors
                                                .facebook_url
                                        }
                                    />
                                    <Input
                                        disabled={isDisabled}
                                        label={"Twitter Url"}
                                        name={"twitter_url"}
                                        onChange={
                                            projectDetailsFormik.handleChange
                                        }
                                        value={
                                            projectDetailsFormik.values
                                                .twitter_url
                                        }
                                        onBlur={projectDetailsFormik.handleBlur}
                                        error={
                                            projectDetailsFormik.touched
                                                .twitter_url &&
                                            projectDetailsFormik.errors
                                                .twitter_url
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
                                                    setIsLimitedTime(
                                                        !isLimitedTime
                                                    )
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
                                                    onChange={
                                                        projectDetailsFormik.handleChange
                                                    }
                                                    value={
                                                        projectDetailsFormik
                                                            .values.start_date
                                                    }
                                                    onBlur={
                                                        projectDetailsFormik.handleBlur
                                                    }
                                                    error={
                                                        projectDetailsFormik
                                                            .touched
                                                            .start_date &&
                                                        projectDetailsFormik
                                                            .errors.start_date
                                                    }
                                                />
                                                <Input
                                                    type={"date"}
                                                    label='Berakhir'
                                                    disabled={isDisabled}
                                                    name={"end_date"}
                                                    onChange={
                                                        projectDetailsFormik.handleChange
                                                    }
                                                    value={
                                                        projectDetailsFormik
                                                            .values.end_date
                                                    }
                                                    onBlur={
                                                        projectDetailsFormik.handleBlur
                                                    }
                                                    error={
                                                        projectDetailsFormik
                                                            .touched.end_date &&
                                                        projectDetailsFormik
                                                            .errors.end_date
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
                                                onChange={() =>
                                                    setIsTarget(!isTarget)
                                                }
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
                                                    onChange={
                                                        projectDetailsFormik.handleChange
                                                    }
                                                    value={
                                                        projectDetailsFormik
                                                            .values
                                                            .target_amount
                                                    }
                                                    onBlur={
                                                        projectDetailsFormik.handleBlur
                                                    }
                                                    error={
                                                        projectDetailsFormik
                                                            .touched
                                                            .target_amount &&
                                                        projectDetailsFormik
                                                            .errors
                                                            .target_amount
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
                                        onChange={
                                            projectDetailsFormik.handleChange
                                        }
                                        value={
                                            projectDetailsFormik.values
                                                .maintenance_fee
                                        }
                                        onBlur={projectDetailsFormik.handleBlur}
                                        error={
                                            projectDetailsFormik.touched
                                                .maintenance_fee &&
                                            projectDetailsFormik.errors
                                                .maintenance_fee
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
                                                name={
                                                    "first_choice_given_amount"
                                                }
                                                onChange={
                                                    projectDetailsFormik.handleChange
                                                }
                                                value={
                                                    projectDetailsFormik.values
                                                        .first_choice_given_amount
                                                }
                                                onBlur={
                                                    projectDetailsFormik.handleBlur
                                                }
                                                error={
                                                    projectDetailsFormik.touched
                                                        .first_choice_given_amount &&
                                                    projectDetailsFormik.errors
                                                        .first_choice_given_amount
                                                }
                                            />
                                            <Input
                                                type={"number"}
                                                disabled={isDisabled}
                                                name={
                                                    "second_choice_given_amount"
                                                }
                                                onChange={
                                                    projectDetailsFormik.handleChange
                                                }
                                                value={
                                                    projectDetailsFormik.values
                                                        .second_choice_given_amount
                                                }
                                                onBlur={
                                                    projectDetailsFormik.handleBlur
                                                }
                                                error={
                                                    projectDetailsFormik.touched
                                                        .second_choice_given_amount &&
                                                    projectDetailsFormik.errors
                                                        .second_choice_given_amount
                                                }
                                            />
                                            <Input
                                                type={"number"}
                                                disabled={isDisabled}
                                                name={
                                                    "third_choice_given_amount"
                                                }
                                                onChange={
                                                    projectDetailsFormik.handleChange
                                                }
                                                value={
                                                    projectDetailsFormik.values
                                                        .third_choice_given_amount
                                                }
                                                onBlur={
                                                    projectDetailsFormik.handleBlur
                                                }
                                                error={
                                                    projectDetailsFormik.touched
                                                        .third_choice_given_amount &&
                                                    projectDetailsFormik.errors
                                                        .third_choice_given_amount
                                                }
                                            />
                                            <Input
                                                type={"number"}
                                                disabled={isDisabled}
                                                name={
                                                    "fourth_choice_given_amount"
                                                }
                                                onChange={
                                                    projectDetailsFormik.handleChange
                                                }
                                                value={
                                                    projectDetailsFormik.values
                                                        .fourth_choice_given_amount
                                                }
                                                onBlur={
                                                    projectDetailsFormik.handleBlur
                                                }
                                                error={
                                                    projectDetailsFormik.touched
                                                        .fourth_choice_given_amount &&
                                                    projectDetailsFormik.errors
                                                        .fourth_choice_given_amount
                                                }
                                            />
                                        </div>
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
                                                onChange={() =>
                                                    setIsShown(!isShown)
                                                }
                                            />
                                            <div
                                                className="w-9 h-5 bg-gray-200 peer-focus:outline-none
                                         peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                            <p className='ml-3 text-sm '>
                                                Tampilkan Program Wakaf
                                            </p>
                                        </label>
                                    </div>
                                    <div className='rounded-md mb-4 border-gray-300 p-4 border'>
                                        <label
                                            htmlFor='small-toggle-favourite'
                                            className='inline-flex relative items-center mb-1 cursor-pointer'>
                                            <input
                                                type='checkbox'
                                                className='sr-only peer'
                                                id='small-toggle-favourite'
                                                checked={isFavourite}
                                                onChange={() =>
                                                    setIsFavourite(!isFavourite)
                                                }
                                            />
                                            <div
                                                className="w-9 h-5 bg-gray-200 peer-focus:outline-none
                                         peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                            <p className='ml-3 text-sm '>
                                                Jadikan Sebagai Program Plihan
                                            </p>
                                        </label>
                                    </div>
                                    <div className='rounded-md mb-4 border-gray-300 p-4 border'>
                                        <label
                                            htmlFor='small-toggle-ended'
                                            className='inline-flex relative items-center mb-1 cursor-pointer'>
                                            <input
                                                type='checkbox'
                                                className='sr-only peer'
                                                id='small-toggle-ended'
                                                checked={isEnded}
                                                onChange={() =>
                                                    setIsEnded(!isEnded)
                                                }
                                            />
                                            <div
                                                className="w-9 h-5 bg-gray-200 peer-focus:outline-none
                                         peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                            <p className='ml-3 text-sm '>
                                                Program Telah Berakhir
                                            </p>
                                        </label>
                                    </div>

                                    <Button loading={isLoading} type='submit'>
                                        Simpan Perubahan
                                    </Button>
                                    {payments.length < 1 && (
                                        <div
                                            onClick={() => {
                                                setDialogDelete(true);
                                            }}
                                            className='text-warning-600 mt-8 cursor-pointer text-center'>
                                            Hapus
                                        </div>
                                    )}
                                </Tab.Panel>
                                <Tab.Panel className={"w-full"}>
                                    <a
                                        onClick={() =>
                                            setDialogAddInformation(true)
                                        }
                                        className='py-2 px-3 cursor-pointer text-sm mb-2 bg-primary-500 text-white rounded-md inline-block'>
                                        Tambah Informasi
                                    </a>
                                    <ol className='border-l relative flex flex-col  border-gray-300'>
                                        {information.map((item, index) => (
                                            <AdminInformationItem
                                                data={item}
                                                key={index}
                                            />
                                        ))}
                                    </ol>
                                </Tab.Panel>
                                <Tab.Panel>
                                    <a
                                        onClick={() => setDialogAddReport(true)}
                                        className='py-2 px-3 cursor-pointer text-sm mb-2 bg-primary-500 text-white rounded-md inline-block'>
                                        Tambah Laporan
                                    </a>
                                    <ol className='border-l relative  border-gray-300'>
                                        {reports.map((item, index) => (
                                            <AdminReportItem
                                                data={item}
                                                key={index}
                                            />
                                        ))}
                                    </ol>
                                </Tab.Panel>
                            </Tab.Panels>
                        </Tab.Group>
                    </div>
                </Container>
            </Layout>
        </>
    );
}

export async function getServerSideProps({ req, res, query }) {
    let project = {};
    let categories = [];
    let statistics = [];
    let information = [];
    let reports = [];
    let payments = [];
    const { id } = query;
    await axios
        .get(`/admin/projects/${id}`, {
            headers: {
                Authorization: `Bearer ${getCookie("token", { req, res })}`,
            },
        })
        .then((response) => {
            // console.log(response);
            project = response.data.project;
            categories = response.data.categories;
            statistics = response.data.statistics;
            information = response.data.information;
            reports = response.data.reports;
            payments = response.data.payments;
        })
        .catch((error) => {
            console.log(error.response);
        });

    return {
        props: {
            project,
            categories,
            statistics,
            information,
            reports,
            payments,
        },
    };
}
