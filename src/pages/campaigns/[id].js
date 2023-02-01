import BackerItem from '@/components/BackerItem'
import Button from '@/components/Button'
import CampaignItem from '@/components/CampaignItem'
import Card from '@/components/Card'
import Checkbox from '@/components/Checkbox'
import Container from '@/components/Container'
import Input from '@/components/Input'
import AppLayout from '@/components/Layouts/AppLayout'
import PageLoader from '@/components/PageLoader'
import Thumbnail from '@/components/Thumbnail'
import formatToCurreny from '@/functions/formatToCurreny'
import { useAuth } from '@/hooks/auth'
import axios from '@/lib/axios'
import { Tab } from '@headlessui/react'
import clsx from 'clsx'
import { Form, Formik } from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { BiBullseye, BiGroup, BiPurchaseTag, BiTimer } from 'react-icons/bi'
import { HiCodeBracketSquare } from 'react-icons/hi2'
import useSWR from 'swr'
import * as Yup from 'yup'
import Head from 'next/head';




const Id = () => {
    const [isLoading, setisLoading] = useState(false)
    const [choiceAmount, setChoiceAmount] = useState('')
    const { user } = useAuth()
    const router = useRouter()
    const { id } = router.query
    const { data, mutate } = useSWR(`/api/campaigns/${id}`, () => axios.get(`/api/campaigns/${id}`).then((res) => {

        return res.data.data
    }))

    const createPayment = async (values) => {
        values.amount = choiceAmount
        values.campaign_id = data.id
        if (values.amount < 1) {
            toast.error('Nominal wakaf tidak boleh kosong')
            return
        }
        setisLoading(true)

        await axios.post('/api/manual-payments', values).then(res => {
            toast.success(res.data.message)
            router.push('/user/manual-payments')
        }).catch(err => {
            toast.error("Sedang terjadi kesalahan")
            console.log(err)
        }).finally(() => {
            setisLoading(false)
        })
    }

    if (!data) return <PageLoader />

    return (
        <Container>
            <Head>
                <Head>
                    <title>i-Salam Wakaf Online</title>

                    <meta
                        name='description'
                        content="I-Salam menyediakan berbagai macam program wakaf yang dikelola secara profesional dan amanah serta diawasi oleh para asatidzah Ahlus Sunnah Wal Jama'ah"
                        key='wakaf'
                    />
                    <meta
                        property='og:title'
                        content="I-Salam Wakaf Online | I-Salam menyediakan berbagai macam program wakaf yang dikelola secara profesional dan amanah serta diawasi oleh para asatidzah Ahlus Sunnah Wal Jama'ah"
                    />
                    <meta property='og:url' content='https://isalamwakaf.com/' />
                    <meta
                        property='og:description'
                        content="I-Salam menyediakan berbagai macam program wakaf yang dikelola secara profesional dan amanah serta diawasi oleh para asatidzah Ahlus Sunnah Wal Jama'ah"
                    />
                    <meta
                        property='og:image'
                        content='https://isalamwakaf.com/isalam-light.png'
                    />
                    <meta property='og:image:width' content='607' />

                    <meta property='og:image:height' content='160' />
                </Head>
            </Head>
            <div className='grid lg:grid-cols-5 gap-6'>
                <div className='lg:col-span-3'>
                    <CampaignItem data={data} />
                    <Tab.Group>
                        <Tab.List className='bg-white border my-2 shadow'>
                            <Tab className={({ selected }) => clsx({
                                'py-3 px-4 text-sm  inline-block cursor-pointer font-semibold': true,
                                'border-b-2 border-brand-600 text-brand-600 ': selected == true,
                                "text-dark-500": selected == false
                            })}>
                                Deskripsi
                            </Tab>
                            <Tab className={({ selected }) => clsx({
                                'py-3 px-4 text-sm  inline-block cursor-pointer font-semibold': true,
                                'border-b-2 border-brand-600 text-brand-600 ': selected == true,
                                "text-dark-500": selected == false
                            })}>
                                Pewakaf
                            </Tab>
                            <Tab className={({ selected }) => clsx({
                                'py-3 px-4 text-sm  inline-block cursor-pointer font-semibold': true,
                                'border-b-2 border-brand-600 text-brand-600 ': selected == true,
                                "text-dark-500": selected == false
                            })}>
                                Informasi
                            </Tab>

                        </Tab.List>
                        <Card padding='p-4 sm:p-6'>
                            <Tab.Panels >
                                <Tab.Panel>
                                    <div className='prose prose-slate' dangerouslySetInnerHTML={{
                                        __html: data.content
                                    }}></div>
                                </Tab.Panel>
                                <Tab.Panel className={'divide-y'}>
                                    {data?.backers.length < 1 && (
                                        <div className='text-amber-500 font-semibold'>
                                            Belum ada pewakaf, jadilah yang pertama berwakaf
                                        </div>
                                    )}
                                    {data.backers.map((item, index) => (
                                        <BackerItem key={index} data={item} />
                                    ))}
                                </Tab.Panel>
                                <Tab.Panel>
                                    {data?.information.length < 1 && (
                                        <div className='text-amber-500 font-semibold'>
                                            Belum ada informasi terbaru
                                        </div>
                                    )}
                                    <ol className="relative border-l border-gray-200 dark:border-gray-700">
                                        {data?.information.map((item, index) => {
                                            const convertDate = (value) => {
                                                const date = new Date(value?.toString())
                                                const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
                                                const month = date.getMonth() + 1
                                                const year = date.getFullYear()
                                                const hour = date.getHours()
                                                const minute = date.getMinutes()
                                                return (day + '/' + (month < 10 ? "0" + month : month) + '/' + year + ' ' + (hour < 10 ? "0" + hour : hour) + ':' + (minute < 10 ? "0" + minute : minute))
                                            }
                                            return <li className="ml-4 pb-6 ">
                                                <div className="absolute w-3 h-3 bg-amber-500 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700" />
                                                <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{convertDate(item.created_at)}</time>
                                                <h3 className="text-lg font-semibold text-amber-600">{item.title}</h3>
                                                <div dangerouslySetInnerHTML={{
                                                    __html: item.content
                                                }} className="prose prose-slate"></div>
                                            </li>
                                        })}
                                    </ol>
                                </Tab.Panel>
                            </Tab.Panels>
                        </Card>

                    </Tab.Group>


                </div>
                {true && (
                    <div className='lg:col-span-2'>
                        <Card className={'relative'}>
                            {data.is_completed && (
                                <div className='absolute z-10  bg-black/60 text-center py-2 font-semibold text-white inset-0 flex items-center justify-center'>
                                    <div className='border-2 border-white py-2 px-4'>
                                        Berakhir
                                    </div>
                                </div>
                            )}
                            <h1 className='text-brand-600 line-clamp-2 my-2 font-semibold'>{data?.title}</h1>

                            <label className={clsx({
                                'block font-medium text-sm  text-gray-700': true,
                                'after:content-["*"] after:ml-0.5 after:text-red-500': true
                            })}>Pilih Nominal Wakaf</label>
                            <div className='flex flex-wrap mb-2'>
                                {data?.choice_amount.map((item, index) => (
                                    <div onClick={() => setChoiceAmount(item)} key={index} className={clsx({
                                        'text-xs text-dark-500 bg-dark-100  border-dark-300 cursor-pointer  py-1 px-2  mr-2 mt-2 border': true,
                                        "bg-brand-600 text-white": choiceAmount == item,
                                    })}>{formatToCurreny(item)}</div>
                                ))}
                            </div>
                            <input value={choiceAmount} onChange={(e) => setChoiceAmount(e.target.value)} type="number" className='rounded-md  shadow-sm border-gray-300 disabled:bg-dark-200 placeholder:text-dark-300  focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-full mb-4' />
                            <Formik enableReinitialize initialValues={{
                                on_behalf: user?.name,
                                wos: '',
                                maintenance_fee: data?.maintenance_fee,
                                is_anonim: false
                            }} validationSchema={Yup.object({
                                on_behalf: Yup.string().required('Nama pewakaf wajib diisi')
                            })} onSubmit={(values) => createPayment(values)}>
                                <Form>
                                    <Input name='maintenance_fee' label={'Infak Pemeliharaan Sistem'} />
                                    <Input name='on_behalf' label={'Nama Pewakaf'} labelRequired />
                                    <Input placeholder='kosongkan jika tidak ada' name='wos' label={'Doa atau Kata Kata Dukungan'} />
                                    <Checkbox name='is_anonim'>Sembunyikan Nama Pewakaf</Checkbox>
                                    {user ? <Button isLoading={isLoading} width='w-full' className={'mt-2'}>Lakukan Pembayaran</Button> : <Button onClick={() => router.push('/login')} type='button' width='w-full' className={'mt-2'}>Login Untuk Mulai Berwakaf</Button>}

                                </Form>
                            </Formik>
                        </Card>
                    </div>
                )}

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
