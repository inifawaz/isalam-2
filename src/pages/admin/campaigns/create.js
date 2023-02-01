import Button from '@/components/Button';
import Card from '@/components/Card';
import Checkbox from '@/components/Checkbox';
import Input from '@/components/Input';
import AppLayout from '@/components/Layouts/AppLayout';
import DashboardAdminLayout from '@/components/Layouts/DashboardAdminLayout';
import Modal from '@/components/Modal';
import PageLoader from '@/components/PageLoader';
import Select from '@/components/Select';
import axios from '@/lib/axios';
import clsx from 'clsx';
import { Form, Formik } from 'formik';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { HiPhoto } from 'react-icons/hi2';
import useSWR from 'swr';
import * as Yup from 'yup';
const Editor = dynamic(() => import("@/components/Editor"), {
    ssr: false,
});

const Create = () => {
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [content, setContent] = useState('');
    const [featuredImageUrl, setFeaturedImageUrl] = useState('');
    const [featuredImageFile, setFeaturedImageFile] = useState(null);
    const router = useRouter();
    const { id } = router.query;


    const { data: campaignCategories } = useSWR(`/api/campaign-categories`, () => axios.get(`/api/campaign-categories`).then((res) => {
        console.log(res.data.data);
        return res.data.data;
    }));



    const handleStore = async (values) => {

        setIsLoading(true);
        const choice_amount = [values.choice_amount_1, values.choice_amount_2, values.choice_amount_3, values.choice_amount_4].filter(e => !Number.isNaN(e) && e !== null && e > 0).map((e) => parseInt(e));
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('category_id', values.category_id);
        formData.append('choice_amount', JSON.stringify(choice_amount));
        formData.append('maintenance_fee', values.maintenance_fee);
        formData.append('is_target', values.is_target ? 1 : 0);
        formData.append('target_amount', values.target_amount);
        formData.append('is_limited_time', values.is_limited_time ? 1 : 0);
        formData.append('start_date', values.start_date);
        formData.append('end_date', values.end_date);
        formData.append('is_hidden', values.is_hidden ? 1 : 0);
        formData.append('is_selected', values.is_selected ? 1 : 0);
        formData.append('is_completed', values.is_completed ? 1 : 0);
        formData.append('featured_image_url', featuredImageUrl);
        formData.append('featured_image_file', featuredImageFile);
        formData.append('content', content);
        await axios.post(`/api/campaigns`, formData).then(res => {
            toast.success(res.data.message);
            console.log(res);
            setIsLoading(false);
            router.push('/admin/campaigns');

        }).catch((err) => {
            console.log(err);
            setIsLoading(false);
            toast.error('Sedang terjadi kesalahan');
        });
    };


    return (
        <>

            <div className='max-w-2xl w-full'>
                <h1 className='text-2xl font-bold text-dark-800 mb-4'>Detail Program Wakaf</h1>
                <Card padding='p-0'>
                    <div className='aspect-square relative shadow flex items-center justify-center bg-brand-50 overflow-hidden'>
                        {featuredImageUrl ? <img src={featuredImageUrl} alt="" className='object-contain' /> : <HiPhoto className='h-20 w-20 text-gray-400' />}

                    </div>
                    <div className='p-6 bg-white'>
                        <div className='mb-4'>
                            <input value={''} id='featured_image' className='hidden' onChange={(e) => {
                                let pic = URL.createObjectURL(e.target.files[0]);
                                setFeaturedImageUrl(pic);
                                setFeaturedImageFile(e.target.files[0]);
                            }} type='file' accept='image/*' />
                            <label className='btn-brand-light mr-4 cursor-pointer' htmlFor="featured_image">{featuredImageUrl ? 'Ganti Foto' : 'Upload Foto'}</label>
                            <Button onClick={() => setFeaturedImageUrl(null)} width='w-fit' btn='btn-danger-light'>Hapus Foto</Button>
                        </div>
                        <Formik enableReinitialize initialValues={{
                            title: '',
                            category_id: '',

                            choice_amount_1: 50000,
                            choice_amount_2: 100000,
                            choice_amount_3: 150000,
                            choice_amount_4: 200000,

                            maintenance_fee: 2000,

                            is_target: false,
                            target_amount: '',

                            is_limited_time: false,
                            start_date: '',
                            end_date: '',

                            is_hidden: false,
                            is_selected: false,
                            is_completed: false,


                        }} validationSchema={Yup.object({
                            title: Yup.string().required('Judul wajib diisi'),

                        })} onSubmit={(values) => handleStore(values)}>
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
                                <div className='mb-4'>
                                    <label className='block font-medium text-sm mb-1 text-gray-700' htmlFor="">Content</label>
                                    <Editor data={content} onChange={(data) => {
                                        setContent(data);
                                    }} />
                                </div>
                                <Checkbox name='is_hidden'>Sembunyikan Program Wakaf</Checkbox>
                                <Checkbox name='is_selected'>Jadikan sebagai program wakaf pilihan</Checkbox>
                                <Checkbox name='is_completed'>Program wakaf telah berakhir</Checkbox>
                                <Button isLoading={isLoading} width='w-full' className={'mt-4'}>Simpan</Button>

                            </Form>
                        </Formik>
                    </div>
                </Card>
            </div >
        </>
    );
};

export default Create;
Create.getLayout = function getLayout(page) {
    return <AppLayout>
        <DashboardAdminLayout>
            {page}
        </DashboardAdminLayout>
    </AppLayout>;
};
