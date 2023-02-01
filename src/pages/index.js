import CampaignItem from '@/components/CampaignItem'
import AppLayout from '@/components/Layouts/AppLayout'
import PageLoader from '@/components/PageLoader'
import axios from '@/lib/axios'
import React, { useState } from 'react'
import useSWR from 'swr'
import Container from '@/components/Container'
import clsx from 'clsx'

const Index = () => {
    const [query, setQuery] = useState('')
    const [url, setUrl] = useState('/api/campaigns')
    const [search, setSearch] = useState('')

    const { data, mutate } = useSWR([url, query], (url, queryParams) =>
        axios.get(`${url}${queryParams}`).then(res => {
            console.log(res.data)
            return res.data
        }),
    )
    const { data: campaignCategories } = useSWR(`/api/campaign-categories`, () => axios.get(`/api/campaign-categories`).then((res) => {
        console.log(res.data.data)
        return res.data.data
    }))
    const handleSearch = (values) => {
        setQuery(`?search=${values.search}`)

    }

    if (!data) return <PageLoader />
    return (
        <div>

            <div className='bg-white py-10'>
                <Container className={'flex flex-col items-center '}>
                    <h3 className='text-2xl font-semibold  text-dark-500'>Pilihan Kategori Program Wakaf</h3>
                    <div className='flex flex-wrap mt-2'>
                        <div onClick={() => {
                            setQuery(``)
                        }} className={clsx({
                            'py-2 px-4 text-sm cursor-pointer border-2 transition font-semibold  inline-block mr-2 mt-2 ': true,
                            "bg-brand-600 border-brand-600 text-white": query == ``,
                            'bg-brand-50  border-amber-600 text-brand-600 ': query !== ``,
                        })}>Semua</div>
                        <div onClick={() => {
                            setQuery(`?type=selected`)
                        }} className={clsx({
                            'py-2 px-4 text-sm cursor-pointer border-2 transition font-semibold  inline-block mr-2 mt-2 ': true,
                            "bg-brand-600 border-brand-600 text-white": query == `?type=selected`,
                            'bg-brand-50  border-amber-600 text-brand-600 ': query !== `?type=selected`,
                        })}>Pilihan</div>
                        {campaignCategories?.map((item, index) => (
                            <div key={index} onClick={() => {
                                setQuery(`?category=${item.id}`)
                            }} className={clsx({
                                'py-2 px-4 text-sm cursor-pointer border-2 transition font-semibold  inline-block mr-2 mt-2 ': true,
                                "bg-brand-600 border-brand-600 text-white": query == `?category=${item.id}`,
                                'bg-brand-50  border-amber-600 text-brand-600 ': query !== `?category=${item.id}`,
                            })}>{item.name}</div>
                        ))}
                        <div onClick={() => {
                            setQuery(`?type=completed`)
                        }} className={clsx({
                            'py-2 px-4 text-sm cursor-pointer border-2 transition font-semibold  inline-block mr-2 mt-2 ': true,
                            "bg-brand-600 border-brand-600 text-white": query == `?type=completed`,
                            'bg-brand-50  border-amber-600 text-brand-600 ': query !== `?type=completed`,
                        })}>Berakhir</div>
                    </div>
                </Container>
            </div>

            <Container>
                <div className='grid lg:grid-cols-3 gap-6 my-8'>
                    {data?.data.map((item, index) => (
                        <CampaignItem mutate={mutate} data={item} key={index} />
                    ))}
                </div>
            </Container>

        </div>
    )
}

export default Index
Index.getLayout = function getLayout(page) {
    return <AppLayout>
        {page}
    </AppLayout>
}
