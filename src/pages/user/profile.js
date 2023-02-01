import Avatar from '@/components/Avatar'
import Button from '@/components/Button'
import Input from '@/components/Input'
import AppLayout from '@/components/Layouts/AppLayout'
import DashboardAdminLayout from '@/components/Layouts/DashboardAdminLayout'
import { useAuth } from '@/hooks/auth'
import axios from '@/lib/axios'
import { Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import * as Yup from 'yup';

const Profile = () => {
    const { user, userMutate } = useAuth()
    const [isLoading, setIsLoading] = useState(false)
    const [avatarUrl, setAvatarUrl] = useState(user?.avatar_url)
    const [avatarFile, setAvatarFile] = useState(null)
    const handleUpdate = async (values) => {
        setIsLoading(true)
        const formData = new FormData()
        formData.append('name', values.name)
        formData.append('address', values.address)
        formData.append('mobile', values.mobile)
        formData.append('new_password', values.new_password)
        formData.append('new_password_confirmation', values.new_password_confirmation)
        formData.append('avatar_url', avatarUrl)
        formData.append('avatar_file', avatarFile)
        formData.append('_method', 'PUT')
        await axios.post('/api/user/profile', formData).then(res => {
            toast.success(res.data.message)
        }).catch(err => {
            toast.error('Sedang terjadi kesalahan')
            console.log(err)
        }).finally(() => {
            userMutate()
            setIsLoading(false)
        })
    }

    useEffect(() => {
        setAvatarUrl(user?.avatar_url)
    }, [user])
    return (
        <div>
            <div className='max-w-sm w-full'>
                <h1 className='text-2xl font-bold text-dark-800 mb-4'>Data Diri</h1>

                <div className='bg-white rounded-md shadow border p-6'>
                    <div>
                        <Avatar avatar={avatarUrl} size={20} />
                        <div className='my-4'>
                            <input value={''} id='avatar' className='hidden' onChange={(e) => {
                                let pic = URL.createObjectURL(e.target.files[0])
                                setAvatarUrl(pic)
                                setAvatarFile(e.target.files[0])
                            }} type='file' accept='image/*' />
                            <label className='btn-brand-light mr-4 cursor-pointer' htmlFor="avatar">{avatarUrl ? 'Ganti Foto' : 'Upload Foto'}</label>
                            <Button onClick={() => {
                                setAvatarUrl(null)
                                setAvatarFile(null)
                            }} width='w-fit' btn='btn-danger-light'>Hapus Foto</Button>
                        </div>
                    </div>

                    <Formik enableReinitialize initialValues={{
                        name: user?.name ?? '',
                        address: user?.address ?? '',
                        mobile: user?.mobile ?? '',
                        email: user?.email ?? '',
                        new_password: '',
                        new_password_confirmation: ''
                    }} validationSchema={Yup.object({
                        new_password: Yup.string().min(6, 'minimal 8 karaketer')
                    })} onSubmit={(values) => handleUpdate(values)}>

                        <Form >

                            <Input name='name' label={'Nama Lengkap'} />
                            <Input name='address' label={'Alamat Lengkap'} />
                            <Input name='mobile' label={'Nomer Telepon'} />
                            <Input disabled name='email' label={'Email'} />
                            <Input placeholder='kosongkan jika tidak ingin mengganti password' className={'placeholder:text-dark-300'} name='new_password' label={'Password Baru'} />
                            <Input placeholder='kosongkan jika tidak ingin mengganti password' className={'placeholder:text-dark-300'} name='new_password_confirmation' label={'Konfirmasi Password Baru'} />
                            <Button isLoading={isLoading} width='w-full'>Simpan Perubahan</Button>
                        </Form>
                    </Formik>
                </div>

            </div>


        </div>
    )
}

export default Profile
Profile.getLayout = function getLayout(page) {
    return <AppLayout>
        <DashboardAdminLayout>
            {page}
        </DashboardAdminLayout>
    </AppLayout>
}

