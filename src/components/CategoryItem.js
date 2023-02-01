import axios from '@/lib/axios'
import { Form, Formik } from 'formik'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import Button from './Button'
import Input from './Input'
import Modal from './Modal'

const CategoryItem = ({ data, mutate, type }) => {
    const [isEdit, setIsEdit] = useState(false)
    const [isLoading, setisLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const handleDelete = async () => {
        setisLoading(true)
        await axios.delete(`/api/${type}-categories/${data.id}`).then((res) => {
            toast.success(res.data.message)
            mutate()
            setOpen(false)
        }).catch((err) => {
            console.log(err)
            toast.error('Sedang terajid kesalahan')
        }).finally(() => {
            setisLoading(false)
            setOpen(false)
        })
    }
    const handleUpdate = async (values) => {
        console.log(values)
        setisLoading(true)
        await axios.put(`/api/${type}-categories/${data.id}`, values).then((res) => {
            toast.success(res.data.message)
            setIsEdit(false)
            mutate()
        }).catch((err) => {
            console.log(err)
            toast.error('Sedang terjadi kesalahan')
        }).finally(() => {
            setisLoading(false)
            setIsEdit(false)
        })
    }


    return (
        <>
            <Modal open={open} setOpen={setOpen} onClose={() => {
                setOpen(false)
            }}>
                <Modal.Title>Menghapus Kategori {type == 'article' && 'Artikel'} {type == 'campaign' && 'Program Wakaf'}</Modal.Title>
                <Modal.Body>Apakah anda yakin ingin menghapus kategori {type == 'article' && 'Artikel'} {type == 'campaign' && 'Program Wakaf'} ini? penghapusan ini akan bersifat permanen dan tidak dapat dikembalikan</Modal.Body>
                <Modal.Footer className='flex items-center justify-end'>
                    <p onClick={() => setOpen(false)} className='mr-8 cursor-pointer text-dark-500'>Batal</p>
                    <Button isLoading={isLoading} onClick={handleDelete} btn='btn-danger' width='w-fit'>Ya, saya yakin</Button>
                </Modal.Footer>
            </Modal>
            <Formik enableReinitialize initialValues={{
                name: data.name
            }} onSubmit={(values) => {
                handleUpdate(values)
            }}>
                <>
                    <Form className='flex flex-col lg:flex-row bg-white shadow pt-4 px-4 pb-4 lg:pb-0 rounded-md border'>
                        <Input disabled={!isEdit} width='w-full lg:w-fit' className='text-sm mr-4 disabled:bg-gray-50' name='name' type='text' />


                        {!isEdit ? (
                            <>

                                <Button onClick={() => setOpen(true)} btn='btn-danger-light' className={'mr-2 mb-2'} width='w-full lg:w-24' type='button'>Hapus</Button>
                                <div onClick={() => setIsEdit(true)} type='button' className='w-full btn-brand cursor-pointer lg:w-24'>Edit</div>
                            </>
                        ) : (
                            <>
                                <Button onClick={(e) => {
                                    e.reset
                                    setTimeout(() => {
                                        setIsEdit(false)
                                    }, 400)
                                }} type='reset' btn='btn-muted' className={`mr-2 `} >Batal</Button>
                                <Button type='submit'>Simpan</Button>
                            </>
                        )}

                    </Form>

                </>
            </Formik >
        </>
    )
}

export default CategoryItem
