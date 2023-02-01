import Button from '@/components/Button'
import Card from '@/components/Card'
import Checkbox from '@/components/Checkbox'
import InformationItem from '@/components/InformationItem'
import Input from '@/components/Input'
import AppLayout from '@/components/Layouts/AppLayout'
import DashboardAdminLayout from '@/components/Layouts/DashboardAdminLayout'
import ManualPaymentItem from '@/components/ManualPaymentItem'
import Modal from '@/components/Modal'
import PageLoader from '@/components/PageLoader'
import Select from '@/components/Select'
import formatToCurreny from '@/functions/formatToCurreny'
import axios from '@/lib/axios'
import { Tab } from '@headlessui/react'
import clsx from 'clsx'
import { Form, Formik } from 'formik'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { HiPhoto } from 'react-icons/hi2'
import useSWR from 'swr'
import * as Yup from 'yup'
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
    const { data, mutate } = useSWR(`/api/campaigns/${id}`, () => axios.get(`/api/campaigns/${id}`).then((res) => {
        setContent(res.data.data.content)
        setFeaturedImageUrl(res.data.data.featured_image_url)
        console.log(res.data.data)
        return res.data.data
    }), {
        revalidateOnFocus: false,
    })

    const { data: campaignCategories } = useSWR(`/api/campaign-categories`, () => axios.get(`/api/campaign-categories`).then((res) => {
        console.log(res.data.data)
        return res.data.data
    }))

    const handleDelete = async () => {
        setIsLoading(true)
        await axios.delete(`/api/campaigns/${data.id}`).then(res => {
            toast.success(res.data.message)
            router.push('/admin/campaigns')
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
        const choice_amount = [values.choice_amount_1, values.choice_amount_2, values.choice_amount_3, values.choice_amount_4].filter(e => !Number.isNaN(e) && e !== null && e > 0).map((e) => parseInt(e));
        const formData = new FormData()
        formData.append('title', values.title)
        formData.append('category_id', values.category_id)
        formData.append('choice_amount', JSON.stringify(choice_amount))
        formData.append('maintenance_fee', values.maintenance_fee)
        formData.append('is_target', values.is_target ? 1 : 0)
        formData.append('target_amount', values.target_amount)
        formData.append('is_limited_time', values.is_limited_time ? 1 : 0)
        formData.append('start_date', values.start_date);
        formData.append('end_date', values.end_date);
        formData.append('is_hidden', values.is_hidden ? 1 : 0)
        formData.append('is_selected', values.is_selected ? 1 : 0)
        formData.append('is_completed', values.is_completed ? 1 : 0)
        formData.append('featured_image_url', featuredImageUrl)
        formData.append('featured_image_file', featuredImageFile)
        formData.append('content', content)
        formData.append('_method', 'PUT')
        await axios.post(`/api/campaigns/${data.id}`, formData).then(res => {
            mutate()
            toast.success(res.data.message)
            console.log(res)
            setIsLoading(false)

        }).catch((err) => {
            mutate()
            console.log(err)
            setIsLoading(false)
            toast.error('Sedang terjadi kesalahan')
        })
    }

    const [openAddInformation, setOpenAddInformation] = useState(false)
    const [titleInfo, setTitleInfo] = useState('')
    const [contentInfo, setContentInfo] = useState('')
    const handleAddInformation = async () => {
        setIsLoading(true)
        await axios.post('/api/information', {
            title: titleInfo,
            content: contentInfo,
            campaign_id: id,
        }).then(res => {
            toast.success(res.data.message)
            mutate()
        }).catch(err => {
            console.log(err)
            toast.error('Sedang terjadi error')

        }).finally(() => {
            setIsLoading(false)
            setTitleInfo('')
            setContentInfo('')
            setOpenAddInformation(false)
        })
    }

    if (!data) return <PageLoader />

    return (
        <>
            <Modal open={openAddInformation} setOpen={setOpenAddInformation} onClose={() => {
                setTitleInfo('')
                setContentInfo('')
                setOpenAddInformation(false)

            }}>
                <Modal.Title>Menambah Informasi Baru</Modal.Title>
                <Modal.Body>
                    <label htmlFor="comment" className='block font-medium text-sm mb-1 text-gray-700'>Judul</label>
                    <input type='text' className='rounded-md w-full  shadow-sm mb-4 border-gray-300 disabled:bg-dark-200 placeholder:text-dark-300  focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50' value={titleInfo} onChange={(e) => setTitleInfo(e.target.value)} />
                    <label className='block font-medium text-sm mb-1 text-gray-700' htmlFor="">Content</label>
                    <Editor data={contentInfo} onChange={(data) => {
                        setContentInfo(data)
                    }} />
                </Modal.Body>
                <Modal.Footer className='flex items-center justify-end'>
                    <p onClick={() => setOpenAddInformation(false)} className='mr-8 cursor-pointer text-dark-500'>Batal</p>
                    <Button isLoading={isLoading} onClick={handleAddInformation} width='w-fit'>Simpan</Button>
                </Modal.Footer>
            </Modal>
            <Modal open={open} setOpen={setOpen} onClose={() => {
                setOpen(false)
            }}>
                <Modal.Title>Menghapus Program Wakaf</Modal.Title>
                <Modal.Body>Apakah anda yakin ingin menghapus program wakaf ini? penghapusan ini akan bersifat permanen dan tidak dapat dikembalikan</Modal.Body>
                <Modal.Footer className='flex items-center justify-end'>
                    <p onClick={() => setOpen(false)} className='mr-8 cursor-pointer text-dark-500'>Batal</p>
                    <Button isLoading={isLoading} onClick={handleDelete} btn='btn-danger' width='w-fit'>Ya, saya yakin</Button>
                </Modal.Footer>
            </Modal>
            <h1 className='text-2xl font-bold text-dark-800 mb-4'>{data.title}</h1>
            <Tab.Group>
                <Tab.List className='bg-white border mb-4 shadow'>
                    <Tab className={({ selected }) => clsx({
                        'py-3 px-4 text-sm  inline-block cursor-pointer outline-none font-semibold': true,
                        'border-b-2 border-brand-600 text-brand-600 ': selected == true,
                        "text-dark-500": selected == false
                    })}>
                        Ringkasan
                    </Tab>
                    <Tab className={({ selected }) => clsx({
                        'py-3 px-4 text-sm  inline-block cursor-pointer outline-none font-semibold': true,
                        'border-b-2 border-brand-600 text-brand-600 ': selected == true,
                        "text-dark-500": selected == false
                    })}>
                        Detail Program
                    </Tab>
                    <Tab className={({ selected }) => clsx({
                        'py-3 px-4 text-sm  inline-block cursor-pointer outline-none font-semibold': true,
                        'border-b-2 border-brand-600 text-brand-600 ': selected == true,
                        "text-dark-500": selected == false
                    })}>
                        Informasi
                    </Tab>

                </Tab.List>
                <Tab.Panels>
                    <Tab.Panel>
                        <div className='flex flex-wrap'>
                            <div className='p-4 bg-white shadow grow border'>
                                <p className='text-sm text-dark-500'>Terkumpul</p>
                                <p className='font-semibold text-dark-600'>{formatToCurreny(data.total_amount)}</p>
                            </div>
                            <div className='p-4 bg-white shadow grow border'>
                                <p className='text-sm text-dark-500'>Jumlah Pewakaf</p>
                                <p className='font-semibold text-dark-600'>{data.backers.length}</p>
                            </div>
                            {data.is_limited_time && (
                                <div className='p-4 bg-white shadow grow border'>
                                    <p className='text-sm text-dark-500'>Sisa Waktu</p>
                                    <p className='font-semibold text-dark-600'>{data.days_left}</p>
                                </div>
                            )}
                            {data.is_target && (
                                <div className='p-4 bg-white shadow grow border'>
                                    <p className='text-sm text-dark-500'>Target</p>
                                    <p className='font-semibold text-dark-600'>{formatToCurreny(data.target_amount)}</p>
                                </div>
                            )}
                        </div>
                        <h3 className='font-semibold text-dark-600 mt-10 mb-2'>Pembayaran Pada Program Wakaf Ini</h3>
                        <Tab.Group>
                            <Tab.List className='bg-white  border mb-4 shadow'>
                                <Tab className={({ selected }) => clsx({
                                    'py-3 px-4 text-sm  inline-block cursor-pointer font-semibold': true,
                                    'border-b-2 border-brand-600 text-brand-600 ': selected == true,
                                    "text-dark-500": selected == false
                                })}>
                                    Berhasil
                                </Tab>
                                <Tab className={({ selected }) => clsx({
                                    'py-3 px-4 text-sm  inline-block cursor-pointer font-semibold': true,
                                    'border-b-2 border-brand-600 text-brand-600 ': selected == true,
                                    "text-dark-500": selected == false
                                })}>
                                    Menunggu Konfirmasi
                                </Tab>
                                <Tab className={({ selected }) => clsx({
                                    'py-3 px-4 text-sm  inline-block cursor-pointer font-semibold': true,
                                    'border-b-2 border-brand-600 text-brand-600 ': selected == true,
                                    "text-dark-500": selected == false
                                })}>
                                    Ditolak
                                </Tab>
                                <Tab className={({ selected }) => clsx({
                                    'py-3 px-4 text-sm  inline-block cursor-pointer font-semibold': true,
                                    'border-b-2 border-brand-600 text-brand-600 ': selected == true,
                                    "text-dark-500": selected == false
                                })}>
                                    Belum Dibayar
                                </Tab>
                            </Tab.List>
                            <Tab.Panels>
                                <Tab.Panel>
                                    <div className='grid lg:grid-cols-2 gap-6'>
                                        {data?.payments.filter(e => e.status_code == 2).map((item, index) => (
                                            <ManualPaymentItem key={index} item={item} mutate={mutate} />
                                        ))}
                                    </div>
                                </Tab.Panel>
                                <Tab.Panel>
                                    <div className='grid lg:grid-cols-2 gap-6'>
                                        {data?.payments.filter(e => e.status_code == 1).map((item, index) => (
                                            <ManualPaymentItem key={index} item={item} mutate={mutate} />
                                        ))}
                                    </div>
                                </Tab.Panel>
                                <Tab.Panel>
                                    <div className='grid lg:grid-cols-2 gap-6'>
                                        {data?.payments.filter(e => e.status_code == 3).map((item, index) => (
                                            <ManualPaymentItem key={index} item={item} mutate={mutate} />
                                        ))}
                                    </div>
                                </Tab.Panel>
                                <Tab.Panel>
                                    <div className='grid lg:grid-cols-2 gap-6'>
                                        {data?.payments.filter(e => e.status_code == 0).map((item, index) => (
                                            <ManualPaymentItem key={index} item={item} mutate={mutate} />
                                        ))}
                                    </div>
                                </Tab.Panel>
                            </Tab.Panels>
                        </Tab.Group>


                    </Tab.Panel>
                    <Tab.Panel>

                        <div className=' max-w-xl mt-4 w-full'>
                            <Card padding='p-0'>
                                <div className='aspect-square relative shadow flex items-center justify-center bg-brand-50 overflow-hidden'>
                                    {featuredImageUrl ? <img src={featuredImageUrl} alt="" className='object-contain' /> : <HiPhoto className='h-20 w-20 text-gray-400' />}

                                </div>
                                <div className='p-6 bg-white'>
                                    <div className='mb-4 flex flex-col sm:flex-row space-y-4'>
                                        <input value={''} id='featured_image' className='hidden' onChange={(e) => {
                                            let pic = URL.createObjectURL(e.target.files[0])
                                            setFeaturedImageUrl(pic)
                                            setFeaturedImageFile(e.target.files[0])
                                        }} type='file' accept='image/*' />
                                        <label className='btn-brand-light mr-4 sm:w-fit w-full cursor-pointer' htmlFor="featured_image">{featuredImageUrl ? 'Ganti Foto' : 'Upload Foto'}</label>
                                        <Button onClick={() => setFeaturedImageUrl(null)} width='sm:w-fit w-full' btn='btn-danger-light'>Hapus Foto</Button>
                                    </div>
                                    <Formik enableReinitialize initialValues={{
                                        title: data?.title ?? '',
                                        category_id: data?.category_id ?? '',

                                        choice_amount_1: data?.choice_amount[0] ?? '',
                                        choice_amount_2: data?.choice_amount[1] ?? '',
                                        choice_amount_3: data?.choice_amount[2] ?? '',
                                        choice_amount_4: data?.choice_amount[3] ?? '',

                                        maintenance_fee: data?.maintenance_fee ?? '',

                                        is_target: data?.is_target,
                                        target_amount: data?.target_amount ?? '',

                                        is_limited_time: data?.is_limited_time,
                                        start_date: data?.start_date ?? '',
                                        end_date: data?.end_date ?? '',

                                        is_hidden: data?.is_hidden,
                                        is_selected: data?.is_selected,
                                        is_completed: data?.is_completed,


                                    }} validationSchema={Yup.object({
                                        title: Yup.string().required('Judul wajib diisi'),

                                    })} onSubmit={(values) => handleUpdate(values)}>
                                        <Form>
                                            <Input required messages={errors.title} name='title' label='Judul' type='text' />
                                            <Select name='category_id' label={'Kategori'}>
                                                <option value="">Tidak ada</option>
                                                {campaignCategories?.map((item, index) => (
                                                    <option key={index} value={item.id}>{item.name}</option>
                                                ))}
                                            </Select>
                                            <Input name='maintenance_fee' label='Infak Pemeliharaan Sistem' type='number' />
                                            <div>
                                                <Checkbox name='is_target'>Aktifkan Nominal Target</Checkbox>
                                                <Input name='target_amount' label='Nominal Target' type='number' />
                                            </div>
                                            <label className={clsx({
                                                'block font-medium text-sm mb-1 text-gray-700': true,
                                                // 'after:content-["*"] after:ml-0.5 after:text-red-500':
                                            })} >Pilihan Nominal Wakaf</label>
                                            <div className='grid sm:grid-cols-4 gap-4'>
                                                <Input name='choice_amount_1' type='number' />
                                                <Input name='choice_amount_2' type='number' />
                                                <Input name='choice_amount_3' type='number' />
                                                <Input name='choice_amount_4' type='number' />
                                            </div>
                                            <div>
                                                <Checkbox name='is_limited_time'>Aktifkan Batasan Waktu</Checkbox>
                                                <div className='grid sm:grid-cols-2 gap-4'>
                                                    <Input name='start_date' type='date' label={'Tanggal Mulai'} />
                                                    <Input name='end_date' type='date' label={'Tanggal Berakhir'} />

                                                </div>
                                            </div>
                                            <div className='mb-4 '>
                                                <label className='block font-medium text-sm mb-1 text-gray-700' htmlFor="">Content</label>
                                                <Editor data={content} onChange={(data) => {
                                                    setContent(data)
                                                }} />
                                            </div>
                                            <Checkbox name='is_hidden'>Sembunyikan Program Wakaf</Checkbox>
                                            <Checkbox name='is_selected'>Jadikan sebagai program wakaf pilihan</Checkbox>
                                            <Checkbox name='is_completed'>Program wakaf telah berakhir</Checkbox>
                                            <Button isLoading={isLoading} width='w-full' className={'mt-4'}>Simpan Perubahan</Button>
                                            <div className='flex mt-8 mb-4 justify-center'>
                                                <span onClick={() => setOpen(true)} className='text-center cursor-pointer text-danger-600 font-semibold'>Hapus</span>
                                            </div>
                                        </Form>
                                    </Formik>
                                </div>
                            </Card>
                        </div >
                    </Tab.Panel>
                    <Tab.Panel>
                        <Button className={'mb-6'} width='w-fit' onClick={() => setOpenAddInformation(true)}>Tambah Informasi Baru</Button>
                        <div className='space-y-6'>
                            {data.information.map((item, index) => (
                                <InformationItem data={item} key={index} mutate={mutate} />
                            ))}
                        </div>
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>


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
