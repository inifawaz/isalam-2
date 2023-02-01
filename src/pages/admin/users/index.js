import Button from '@/components/Button'
import Dropdown from '@/components/Dropdown'
import { DropdownButton } from '@/components/DropdownLink'
import Input from '@/components/Input'
import AppLayout from '@/components/Layouts/AppLayout'
import DashboardAdminLayout from '@/components/Layouts/DashboardAdminLayout'
import PageLoader from '@/components/PageLoader'
import UserItem from '@/components/UserItem'
import axios from '@/lib/axios'
import { Form, Formik } from 'formik'
import React, { useState } from 'react'
import useSWR from 'swr'

const Index = () => {
    const [query, setQuery] = useState('')
    const [url, setUrl] = useState('/api/users')
    const [search, setSearch] = useState('')

    const { data, mutate } = useSWR([url, query], (url, queryParams) =>
        axios.get(`${url}${queryParams}`).then(res => {
            console.log(res.data)
            return res.data
        }),
    )
    const handleSearch = (values) => {
        setQuery(`?search=${values.search}`)

    }
    if (!data) return <PageLoader />
    return (
        <div>
            <h1 className='text-2xl font-bold text-dark-800'>Daftar Pengguna</h1>
            <div className='mt-4 sm:flex'>
                <Dropdown
                    align="left"
                    width="48"
                    trigger={
                        <button className="flex  mr-4 items-center text-sm bg-white rounded-md py-2 px-3 shadow border font-medium text-gray-500 hover:text-gray-700 focus:outline-none transition duration-150 ease-in-out">
                            <p>Jenis Akun</p>
                            <div className="ml-1">
                                <svg
                                    className="fill-current h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                        </button>
                    }>
                    <DropdownButton onClick={() => {
                        setQuery('')
                    }}>
                        Semua
                    </DropdownButton>
                    <DropdownButton onClick={() => {
                        setQuery('?type=admin')
                    }}>
                        Admin
                    </DropdownButton>
                    <DropdownButton onClick={() => {
                        setQuery('?type=suspended')
                    }}>
                        Dibekukan
                    </DropdownButton>


                </Dropdown>
                <Formik enableReinitialize initialValues={{
                    search: ''
                }} onSubmit={(values, actions) => {
                    handleSearch(values)
                    actions.resetForm()
                }}>
                    <Form className='sm:flex sm:space-x-2 mt-4 sm:mt-0 '>
                        <Input placeholder="cari berdasarkan email atau nama" type='text' name='search' width='w-full' className='text-sm sm:w-fit placeholder:text-dark-300 ' />
                        <Button width='w-full sm:w-24' className={''}>Cari</Button>
                    </Form>
                </Formik>
            </div>
            <div className='grid lg:grid-cols-2 gap-6 my-8'>
                {data?.data.map((item, index) => (
                    <UserItem mutate={mutate} data={item} key={index} />
                ))}
            </div>
        </div >
    )
}

export default Index
Index.getLayout = function getLayout(page) {
    return <AppLayout>
        <DashboardAdminLayout>
            {page}
        </DashboardAdminLayout>
    </AppLayout>
}
