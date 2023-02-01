import AppLayout from '@/components/Layouts/AppLayout'
import Thumbnail from '@/components/Thumbnail'
import React from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import axios from '@/lib/axios'
import Container from '@/components/Container'
import PageLoader from '@/components/PageLoader'
import { BiPurchaseTag } from 'react-icons/bi'
import Link from 'next/link'
import Button from '@/components/Button'

const Id = () => {
    const router = useRouter()
    const { id } = router.query
    const { data, mutate } = useSWR(`/api/articles/${id}`, () => axios.get(`/api/articles/${id}`).then((res) => {
        return res.data.data
    }))
    if (!data) return <PageLoader />
    return (
        <Container>
            <div className='max-w-xl w-full mx-auto'>
                <Thumbnail data={data} />
                <div className='bg-white p-4 sm:p-6 shadow '>
                    {data.category && (
                        <div className='mr-2 mt-1 flex items-center space-x-1'>
                            <BiPurchaseTag className='h-4 w-4 text-brand-600' />
                            <p className='text-dark-400 text-xs font-semibold'>{data.category}</p>
                        </div>
                    )}
                    <h1 className='text-brand-600 font-semibold text-lg mb-2 my-2'>{data.title}</h1>
                    <div className='prose prose-slate' dangerouslySetInnerHTML={{
                        __html: data.content
                    }}>

                    </div>
                </div>

                <Link href='/articles'>
                    <Button width='w-full' className={'mt-4'}>Kembali</Button>
                </Link>
            </div>
        </Container>
    )
}

export default Id

Id.getLayout = function getLayout(page) {
    return <AppLayout>
        {page}
    </AppLayout>
}
