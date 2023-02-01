import Button from '@/components/Button'
import Card from '@/components/Card'
import Checkbox from '@/components/Checkbox'
import Input from '@/components/Input'
import AppLayout from '@/components/Layouts/AppLayout'
import DashboardAdminLayout from '@/components/Layouts/DashboardAdminLayout'
import * as Yup from 'yup'
import Select from '@/components/Select'
import axios from '@/lib/axios'
import { Form, Formik } from 'formik'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { HiPhoto } from 'react-icons/hi2'
import useSWR from 'swr'
const Editor = dynamic(() => import("@/components/Editor"), {
    ssr: false,
});

const Create = () => {
    const [errors, setErrors] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [content, setContent] = useState('')
    const [featuredImageUrl, setFeaturedImageUrl] = useState(null)
    const [featuredImageFile, setFeaturedImageFile] = useState(null)
    const router = useRouter()



    const { data: articleCategories } = useSWR(`/api/article-categories`, () => axios.get(`/api/article-categories`).then((res) => {
        console.log(res.data.data)
        return res.data.data
    }))



    const handleStore = async (values) => {
        setIsLoading(true)
        const formData = new FormData()
        formData.append('title', values.title)
        formData.append('category_id', values.category_id)
        formData.append('is_hidden', values.is_hidden ? 1 : 0)
        formData.append('is_selected', values.is_selected ? 1 : 0)
        formData.append('featured_image_url', featuredImageUrl)
        formData.append('featured_image_file', featuredImageFile)
        formData.append('content', content)
        await axios.post(`/api/articles`, formData).then(res => {
            toast.success(res.data.message)
            console.log(res)
            router.push('/admin/articles')
        }).catch((err) => {
            console.log(err)
            setErrors(err.response.data.errors)
            toast.error('Sedang terjadi kesalahan')
        }).finally(() => {
            setIsLoading(false)
        })
    }


    return (
        <>

            <div className='max-w-2xl w-full'>
                <h1 className='text-2xl font-bold text-dark-800 mb-4'>Buat Artikel Baru</h1>
                <Card padding='p-0'>
                    <div className='aspect-square relative shadow flex items-center justify-center bg-brand-50 overflow-hidden'>
                        {featuredImageUrl ? <img src={featuredImageUrl} alt="" className='object-contain' /> : <HiPhoto className='h-20 w-20 text-gray-400' />}

                    </div>
                    <div className='p-6 bg-white'>
                        <div className='mb-4'>
                            <input value={''} id='featured_image' className='hidden' onChange={(e) => {
                                let pic = URL.createObjectURL(e.target.files[0])
                                setFeaturedImageUrl(pic)
                                setFeaturedImageFile(e.target.files[0])
                            }} type='file' accept='image/*' />
                            <label className='btn-brand-light mr-4 cursor-pointer' htmlFor="featured_image">{featuredImageUrl ? 'Ganti Foto' : 'Upload Foto'}</label>
                            <Button onClick={() => setFeaturedImageUrl(null)} width='w-fit' btn='btn-danger-light'>Hapus Foto</Button>
                        </div>
                        <Formik enableReinitialize validationSchema={Yup.object({
                            title: Yup.string().required('Judul wajib diisi'),
                        })} initialValues={{
                            title: '',
                            category_id: '',
                            is_hidden: false,
                            is_selected: false
                        }} onSubmit={(values) => handleStore(values)}>
                            <Form>
                                <Input required messages={errors.title} name='title' label='Judul' type='text' />
                                <Select name='category_id' label={'Kategori'}>
                                    <option value="">Tidak ada</option>
                                    {articleCategories?.map((item, index) => (
                                        <option key={index} value={item.id}>{item.name}</option>
                                    ))}
                                </Select>
                                <div className='mb-4'>
                                    <label className='block font-medium text-sm mb-1 text-gray-700' htmlFor="">Content</label>
                                    <Editor data={content} onChange={(data) => {
                                        setContent(data)
                                    }} />
                                </div>
                                <Checkbox name='is_hidden'>Sembunyikan artikel</Checkbox>
                                <Checkbox name='is_selected'>Jadikan sebagai artikel pilihan</Checkbox>
                                <Button isLoading={isLoading} width='w-full' className={'mt-4'}>Simpan</Button>

                            </Form>
                        </Formik>
                    </div>
                </Card>
            </div>
        </>
    )
}

export default Create
Create.getLayout = function getLayout(page) {
    return <AppLayout>
        <DashboardAdminLayout>
            {page}
        </DashboardAdminLayout>
    </AppLayout>
}
