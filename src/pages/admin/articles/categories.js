import Button from '@/components/Button'
import CategoryItem from '@/components/CategoryItem'
import Input from '@/components/Input'
import AppLayout from '@/components/Layouts/AppLayout'
import DashboardAdminLayout from '@/components/Layouts/DashboardAdminLayout'
import axios from '@/lib/axios'
import { Form, Formik } from 'formik'
import Link from 'next/link'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import useSWR from 'swr'

const Categories = () => {
    const [isLoading, setIsLoading] = useState(false)
    const { data, mutate } = useSWR(`/api/article-categories`, () => axios.get('/api/article-categories').then(res => {
        return res.data.data
    }))
    const handleAdd = async (values, actions) => {
        setIsLoading(true)
        await axios.post('/api/article-categories', {
            ...values
        }).then(res => {
            toast.success(res.data.message)
            actions.resetForm()
            mutate()
        }).catch((err) => {
            console.log(err)
            toast.error('Sedang terjadi error')
        }).finally(() => {
            setIsLoading(false)
        })
    }
    return (
        <div>
            <div className='flex items-center justify-between'>
                <h1 className='text-2xl font-bold text-dark-800 mb-4'>Daftar Kategori Artikel</h1>
                <div>

                    <Link href={'/admin/articles/create'}>
                        <Button width='w-fit' className={'mr-4'}>Buat Artikel Baru</Button>
                    </Link>

                </div>
            </div>

            <Formik initialValues={{
                name: ''
            }} onSubmit={(values, actions) => handleAdd(values, actions)}>
                <Form className='flex'>
                    <Input width='w-fit' name='name' className={'text-sm mr-4'} />
                    <Button isLoading={isLoading}>Tambah</Button>
                </Form>
            </Formik>

            <div className='space-y-4'>
                {data?.map((item, index) => (
                    <CategoryItem type={'article'} mutate={mutate} data={item} key={index} />
                ))}
            </div>
        </div>
    )
}

export default Categories
Categories.getLayout = function getLayout(page) {
    return <AppLayout>
        <DashboardAdminLayout>{page}</DashboardAdminLayout>
    </AppLayout>
}
