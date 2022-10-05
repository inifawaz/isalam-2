import { getCookie } from "cookies-next";
import { useFormik } from "formik";
import React, { Fragment, useState } from "react";
import { axios } from "../lib/axiosInstance";
import Input from "./Input";
import { toast } from "react-hot-toast";
import Button from "./Button";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/router";

export default function AdminCategoryItem({ data, getAllCategories }) {
    const router = useRouter();
    const [isEdit, setIsEdit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const formik = useFormik({
        initialValues: {
            name: data.name,
        },
    });

    const handleUpdate = async () => {
        setIsLoading(true);
        await axios
            .put(
                `/admin/categories/${data.id}`,
                {
                    name: formik.values.name,
                },
                {
                    headers: {
                        Authorization: `Bearer ${getCookie("token")}`,
                    },
                }
            )
            .then((response) => {
                toast.success(response.data.message);
                setIsEdit(false);
            })
            .catch((error) => {
                
                console.log(error);
                formik.handleReset();
                toast.error("ada yang salah, coba lagi nanti");
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
            .delete(`/admin/categories/${data.id}`, {
                headers: {
                    Authorization: `Bearer ${getCookie("token")}`,
                },
            })
            .then((response) => {
                toast.success(response.data.message);
                getAllCategories();
                setDialogDelete(false);
                // router.reload(window.location.pathname);
            })
            .catch((error) => {
                console.log(error);
                toast.error("ada yang  salah, coba lagi nanti");
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
                                        Menghapus Kategori
                                    </Dialog.Title>
                                    <div className='mt-2'>
                                        <p className='text-sm text-gray-500'>
                                            Apakah anda yakin ingin menghapus
                                            kategori{" "}
                                            <span className='text-warning-600 font-semibold'>
                                                {data.name}
                                            </span>{" "}
                                            ?
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
            <div className='flex space-x-4'>
                <Input
                    disabled={!isEdit}
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    name='name'
                    onBlur={formik.handleBlur}
                />

                {!isEdit && (
                    <div className='flex  space-x-4'>
                        <div>
                            <button
                                onClick={() => setDialogDelete(true)}
                                className='py-2.5 px-3 text-sm inline-block rounded-md bg-warning-100 text-warning-600'>
                                Hapus
                            </button>
                        </div>
                        <div>
                            <button
                                onClick={() => setIsEdit(true)}
                                className='py-2.5 px-3 text-sm inline-block rounded-md bg-primary-500 text-white'>
                                Ubah
                            </button>
                        </div>
                    </div>
                )}
                {isEdit && (
                    <div className='flex space-x-4'>
                        <div>
                            <button
                                onClick={() => {
                                    setIsEdit(false);
                                    formik.handleReset();
                                }}
                                className='py-2.5 px-3 text-sm rounded-md bg-white text-gray-500'>
                                Batal
                            </button>
                        </div>
                        <div>
                            <Button
                                color={"secondary"}
                                loading={isLoading}
                                onClick={handleUpdate}>
                                Simpan
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
