import { Dialog, Transition } from "@headlessui/react";
import { getCookie } from "cookies-next";
import React, { Fragment, useState } from "react";
import toast from "react-hot-toast";
import { BiTrash } from "react-icons/bi";
import { axios } from "../lib/axiosInstance";
import Button from "./Button";
import { useRouter } from "next/router";
import { useFormik } from "formik";

export default function AdminUserItem({ data }) {
    const [dialogDelete, setDialogDelete] = useState(false);
    const [dialogUpdate, setDialogUpdate] = useState(false);
    const [isDeleteLoading, setIsDeleteLoading] = useState(false);
    const [isUpdateLoading, setIsUpdateLoading] = useState(false);
    const router = useRouter();
    const handleDelete = async () => {
        setIsDeleteLoading(true);
        await axios
            .delete(`/admin/users/${data.id}`, {
                headers: {
                    Authorization: `Bearer ${getCookie("token")}`,
                },
            })
            .then((response) => {
                toast.success(response.data.message);
                router.reload(window.location.pathname);
            })
            .catch((error) => {
                console.log(error);
                toast.error("ada yang salah, coba lagi nanti");
            })
            .finally(() => {
                setIsDeleteLoading(false);
            });
    };
    const formik = useFormik({
        initialValues: {
            full_name: data.full_name,
            phone_number: "",
        },
    });
    const handleUpdate = async () => {
        setIsDeleteLoading(true);
        await axios
            .put(`/admin/users/${data.id}`, {
                headers: {
                    Authorization: `Bearer ${getCookie("token")}`,
                },
            })
            .then((response) => {
                toast.success(response.data.message);
                router.reload(window.location.pathname);
            })
            .catch((error) => {
                console.log(error);
                toast.error("ada yang salah, coba lagi nanti");
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
                                            pengguna ini?
                                        </p>
                                        <code className='text-warning-600 font-medium'>
                                            email: {data.email}
                                        </code>
                                        <br />
                                        <code className='text-warning-600 font-medium'>
                                            Nama Lengkap: {data.full_name}
                                        </code>
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
                                            pengguna ini?
                                        </p>
                                        <code className='text-warning-600 font-medium'>
                                            email: {data.email}
                                        </code>
                                        <br />
                                        <code className='text-warning-600 font-medium'>
                                            Nama Lengkap: {data.full_name}
                                        </code>
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
            <tr className='odd:bg-white even:bg-sky-100'>
                <td className='text-gray-500 text-sm p-2 '>{data.email}</td>
                <td className='text-gray-500 text-sm p-2 '>{data.full_name}</td>
                <td className='text-gray-500 text-sm p-2 '>{data.role}</td>
                {/* <td className='text-gray-500 text-sm p-2 '>
                    <button className='p-1 bg-warning-100 rounded-md'>
                        <BiTrash
                            onClick={() => setDialogDelete(true)}
                            size={"1.3em"}
                            className='text-warning-500 cursor-pointer'
                        />
                    </button>
                </td> */}
            </tr>
        </>
    );
}
