import dynamic from "next/dynamic";
import React, { Fragment, useState } from "react";
import Button from "./Button";
import { BiTrash } from "react-icons/bi";
import { axios } from "../lib/axiosInstance";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { Transition, Dialog } from "@headlessui/react";

const Editor = dynamic(() => import("./MyEditor"), {
    ssr: false,
});

export default function AdminInformationItem({ data }) {
    const [editor, setEditor] = useState(data.content);
    const [isLoading, setIsLoading] = useState(false);
    const [dialogDelete, setDialogDelete] = useState(false);
    const [isDeleteLoading, setIsDeleteLoading] = useState(false);
    const router = useRouter();
    const handleUpdate = async () => {
        setIsLoading(true);
        await axios
            .put(
                `/admin/information/${data.id}`,
                {
                    content: editor,
                },
                {
                    headers: {
                        Authorization: `Bearer ${getCookie("token")}`,
                    },
                }
            )
            .then(async (response) => {
                console.log(response);
                toast.success(response.data.message);
                router.reload(window.location.pathname);
            })
            .catch((error) => {
                toast.error("ada yang salah, coba lagi nanti");
                console.log(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };
    const handleDelete = async () => {
        setIsDeleteLoading(true);
        await axios
            .delete(
                `/admin/information/${data.id}`,

                {
                    headers: {
                        Authorization: `Bearer ${getCookie("token")}`,
                    },
                }
            )
            .then((response) => {
                console.log(response);
                setDialogDelete(false);
                toast.success(response.data.message);

                router.reload(window.location.pathname);
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
                                        Menghapus Informasi
                                    </Dialog.Title>
                                    <div className='mt-2'>
                                        <p className='text-sm text-gray-500'>
                                            Apakah anda yakin ingin menghapus
                                            informasi ini?
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
            <li className='mb-8 relative  prose'>
                <div className='h-3 w-3 absolute -left-[6.1px] top-1.5  rounded-full bg-primary-400'></div>
                <div className='ml-4'>
                    <div className='flex items-center mb-2 justify-between'>
                        <time className='font-medium text-primary-600'>
                            {data.created_at}
                        </time>
                        <button className='p-1 bg-warning-100 rounded-md'>
                            <BiTrash
                                onClick={() => setDialogDelete(true)}
                                size={"1.3em"}
                                className='text-warning-500 cursor-pointer'
                            />
                        </button>
                    </div>

                    <Editor
                        onChange={(data) => {
                            setEditor(data);
                        }}
                        data={editor}
                    />
                    <Button onClick={handleUpdate} loading={isLoading}>
                        Simpan Perubahan
                    </Button>
                </div>
            </li>
        </>
    );
}
