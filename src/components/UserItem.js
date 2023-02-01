import axios from '@/lib/axios'
import { Form, Formik } from 'formik'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import Avatar from './Avatar'
import Button from './Button'
import Card from './Card'
import Checkbox from './Checkbox'
import Modal from './Modal'

const UserItem = ({ data, mutate }) => {
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const handleSubmit = async (values) => {
        console.log(values)
        setIsLoading(true)
        await axios.put(`/api/users/${data.id}`, {
            ...values
        }).then(res => {
            console.log(res)
            toast.success(res.data.message)
            mutate()
        }).catch((err) => [
            toast.error('Sedang terjadi kesalahan')
        ]).finally(() => {
            setIsLoading(false)
            mutate()
        })
    }

    const handleDelete = async () => {
        setIsLoading(true)

        await axios.delete(`/api/users/${data.id}`).then((res) => {
            toast.success(res.data.message)
        }).catch((err) => {
            toast.error('Sedang terjadi kesalahan')
            console.log(err)
            mutate()
        }).finally(() => {
            setIsLoading(false)

            setOpen(false)

            mutate()
        })
    }
    return (
        <>
            <Modal open={open} setOpen={setOpen} onClose={() => {
                setOpen(false)
            }}>
                <Modal.Title>Menghapus Pengguna</Modal.Title>
                <Modal.Body>Apakah anda yakin ingin menghapus pengguna ini? penghapusan ini akan bersifat permanen dan tidak dapat dikembalikan</Modal.Body>
                <Modal.Footer className='flex items-center justify-end'>
                    <p onClick={() => setOpen(false)} className='mr-8 cursor-pointer text-dark-500'>Batal</p>
                    <Button isLoading={isLoading} onClick={handleDelete} btn='btn-danger' width='w-fit'>Ya, saya yakin</Button>
                </Modal.Footer>
            </Modal>
            <Card className={'flex flex-col justify-between'}>
                <div className=''>
                    <Avatar avatar={data.avatar_url} size={20} />
                    <h1 className='text-lg font-semibold text-dark-700'>{data.name}</h1>
                    <p className='text-dark-600'>{data.address}</p>
                    <p className='text-dark-600'>{data.mobile}</p>
                    <p className='text-dark-600'>{data.email}</p>
                </div>
                <div className=''>
                    <Formik enableReinitialize initialValues={{
                        is_suspended: data.is_suspended,
                        is_admin: data.roles.includes('Admin')
                    }} onSubmit={(values) => handleSubmit(values)}>
                        <Form >

                            <Checkbox name='is_suspended'>Bekukan Akun</Checkbox>
                            <Checkbox name='is_admin'>Jadikan Sebagai Admin</Checkbox>
                            <Button isLoading={isLoading} width='w-full' className={'mt-4'}>Simpan Perubahan</Button>
                            <p onClick={() => setOpen(true)} className='text-center text-sm   text-danger-600 mt-4 cursor-pointer font-semibold'>Hapus Akun</p>
                        </Form>
                    </Formik>
                </div>
            </Card>
        </>
    )
}

export default UserItem
