import Button from '@/components/Button'
import Card from '@/components/Card'
import Checkbox from '@/components/Checkbox'
import Input from '@/components/Input'
import AppLayout from '@/components/Layouts/AppLayout'
import DashboardAdminLayout from '@/components/Layouts/DashboardAdminLayout'
import Modal from '@/components/Modal'
import PageLoader from '@/components/PageLoader'
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

const Id = () => {
    const [errors, setErrors] = useState([])
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [content, setContent] = useState('')
    const [featuredImageUrl, setFeaturedImageUrl] = useState('')
    const [featuredImageFile, setFeaturedImageFile] = useState(null)
    const router = useRouter()
    const { id } = router.query
    const { data, mutate } = useSWR(`/api/articles/${id}`, () => axios.get(`/api/articles/${id}`).then((res) => {
        setContent(res.data.data.content)
        setFeaturedImageUrl(res.data.data.featured_image_url)
        console.log(res.data.data)
        return res.data.data
    }), {
        revalidateOnFocus: false,
    })

    const { data: articleCategories } = useSWR(`/api/article-categories`, () => axios.get(`/api/article-categories`).then((res) => {
        console.log(res.data.data)
        return res.data.data
    }))

    const handleDelete = async () => {
        setIsLoading(true)
        await axios.delete(`/api/articles/${data.id}`).then(res => {
            toast.success(res.data.message)
            router.push('/admin/articles')
        }).catch((err) => {
            console.log(err)
            toast.error('Sedang terjadi kesalahan')
        }).finally(() => {
            setIsLoading(false)
            setOpen(false)
        })
    }

    const handleUpdate = async (values) => {
        setIsLoading(true)
        const formData = new FormData()
        formData.append('title', values.title)
        formData.append('category_id', values.category_id)
        formData.append('is_hidden', values.is_hidden ? 1 : 0)
        formData.append('is_selected', values.is_selected ? 1 : 0)
        formData.append('featured_image_url', featuredImageUrl)
        formData.append('featured_image_file', featuredImageFile)
        formData.append('content', content)
        formData.append('_method', 'PUT')
        await axios.post(`/api/articles/${data.id}`, formData).then(res => {
            toast.success(res.data.message)
            console.log(res)
        }).catch((err) => {
            setIsLoading(false)
            console.log(err)
            toast.error('Sedang terjadi kesalahan')
        })
    }



    if (!data) return <PageLoader />

    return (
        <>
            <Modal open={open} setOpen={setOpen} onClose={() => {
                setOpen(false)
            }}>
                <Modal.Title>Menghapus Artikel</Modal.Title>
                <Modal.Body>Apakah anda yakin ingin menghapus artikel ini? penghapusan ini akan bersifat permanen dan tidak dapat dikembalikan</Modal.Body>
                <Modal.Footer className='flex items-center justify-end'>
                    <p onClick={() => setOpen(false)} className='mr-8 cursor-pointer text-dark-500'>Batal</p>
                    <Button isLoading={isLoading} onClick={handleDelete} btn='btn-danger' width='w-fit'>Ya, saya yakin</Button>
                </Modal.Footer>
            </Modal>
            <div className='max-w-2xl w-full'>
                <h1 className='text-2xl font-bold text-dark-800 mb-4'>Detail Artikel</h1>
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
                        <Formik enableReinitialize initialValues={{
                            title: data?.title,
                            category_id: data?.category_id,
                            is_hidden: data?.is_hidden,
                            is_selected: data?.is_selected
                        }} onSubmit={(values) => handleUpdate(values)}>
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
                                <Button width='w-full' className={'mt-4'}>Simpan Perubahan</Button>
                                <div className='flex mt-8 mb-4 justify-center'>
                                    <span onClick={() => setOpen(true)} className='text-center cursor-pointer text-danger-600 font-semibold'>Hapus</span>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </Card>
            </div>
        </>
    )
}

export default Id
Id.getLayout = function getLayout(page) {
    return <AppLayout>
        <DashboardAdminLayout>
            {page}
        </DashboardAdminLayout>
    </AppLayout>
}
