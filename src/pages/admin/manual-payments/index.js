import Button from '@/components/Button'
import Input from '@/components/Input'
import AppLayout from '@/components/Layouts/AppLayout'
import DashboardAdminLayout from '@/components/Layouts/DashboardAdminLayout'
import ManualPaymentItem from '@/components/ManualPaymentItem'
import PageLoader from '@/components/PageLoader'
import axios from '@/lib/axios'
import clsx from 'clsx'
import { Form, Formik } from 'formik'
import React, { useState } from 'react'
import useSWR from 'swr'

const Index = () => {
    const [query, setQuery] = useState('?status=1')
    const [url, setUrl] = useState('/api/manual-payments')
    const [search, setSearch] = useState('')
    const handleSearch = (values) => {
        setQuery(`?search=${values.search}`)

    }
    const { data, mutate } = useSWR([url, query], (url, queryParams) =>
        axios.get(`${url}${queryParams}`).then(res => {
            console.log(res.data)
            return res.data
        }), { refreshInterval: 30000 },
    )

    if (!data) return <PageLoader />
    return (
        <div>
            <h1 className='text-2xl font-bold text-dark-800 mb-4'>Pembayaran</h1>
            <Formik enableReinitialize initialValues={{
                search: ''
            }} onSubmit={(values, actions) => {
                handleSearch(values)
                actions.resetForm()
            }}>
                <Form className='sm:flex mr-4 sm:space-x-1 mt-4 sm:mt-0 '>
                    <Input placeholder="cari berdasarkan referensi" type='text' name='search' width='w-full' className='text-sm sm:w-fit placeholder:text-dark-300 ' />
                    <Button width='w-full sm:w-fit' className={''}>Cari</Button>
                </Form>
            </Formik>
            <div className='bg-white border mb-4 shadow'>
                <div onClick={() => setQuery('?status=1')} className={clsx({
                    'py-3 px-4 text-sm  inline-block cursor-pointer font-semibold': true,
                    'border-b-2 border-brand-600 text-brand-600 ': query == '?status=1',
                    "text-dark-500": query !== '?status=1'
                })}>
                    Menunggu Konfirmasi
                </div>
                <div onClick={() => setQuery('?status=0')} className={clsx({
                    'py-3 px-4 text-sm  inline-block cursor-pointer font-semibold': true,
                    'border-b-2 border-brand-600 text-brand-600 ': query == '?status=0',
                    "text-dark-500": query !== '?status=0'
                })}>
                    Belum dibayar
                </div>

                <div onClick={() => setQuery('?status=2')} className={clsx({
                    'py-3 px-4 text-sm  inline-block cursor-pointer font-semibold': true,
                    'border-b-2 border-brand-600 text-brand-600 ': query == '?status=2',
                    "text-dark-500": query !== '?status=2'
                })}>
                    Berhasil
                </div>
                <div onClick={() => setQuery('?status=3')} className={clsx({
                    'py-3 px-4 text-sm  inline-block cursor-pointer font-semibold': true,
                    'border-b-2 border-brand-600 text-brand-600 ': query == '?status=3',
                    "text-dark-500": query !== '?status=3'
                })}>
                    Ditolak
                </div>
            </div>
            <div className='grid lg:grid-cols-2 gap-6'>
                {data?.data.map((item, index) => (
                    <ManualPaymentItem key={index} item={item} mutate={mutate} />
                ))}
            </div>
        </div>
    )
}

export default Index
Index.getLayout = function getLayout(page) {
    return <AppLayout>
        <DashboardAdminLayout>{page}</DashboardAdminLayout>
    </AppLayout>
}

