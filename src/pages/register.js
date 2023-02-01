import ApplicationLogo from '@/components/ApplicationLogo'
import AuthCard from '@/components/AuthCard'
import Button from '@/components/Button'
import GuestLayout from '@/components/Layouts/GuestLayout'
import Input from '@/components/Input'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useState } from 'react'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'

const Register = () => {
    const { register } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard',
    })
    const [errors, setErrors] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const submitForm = async values => {
        await register({
            ...values,
            setErrors,
            setIsLoading

        })
    }

    return (
        <GuestLayout>
            <AuthCard
                logo={
                    <Link href="/">
                        <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                    </Link>
                }>
                <Formik initialValues={{
                    name: '',
                    address: '',
                    mobile: '',
                    email: '',
                    password: '',
                    password_confirmation: ''
                }} validationSchema={Yup.object({
                    name: Yup.string().required('Email wajib diisi'),
                    address: Yup.string().required('Alamat lengkap wajib diisi'),
                    mobile: Yup.string().required('Nomer telepon wajib diisi'),
                    email: Yup.string().required('Email wajib diisi'),
                    password: Yup.string().required('Password wajib diisi'),
                    password_confirmation: Yup.string().required('Konfirmasi password wajib diisi').oneOf([Yup.ref('password'), null], 'Password tidak sama')
                })} onSubmit={(values) => {
                    submitForm(values)
                }}>
                    <Form>
                        <Input required label={'Nama Lengkap'} messages={errors.name} name='name' />
                        <Input required label={'Alamat Lengkap'} messages={errors.address} name='address' />
                        <Input required label={'Nomer Telepon'} messages={errors.mobile} name='mobile' />
                        <Input type='email' required label={'Email'} messages={errors.email} name='email' />
                        <Input type='password' required label={'Password'} messages={errors.password} name='password' />
                        <Input type='password' required label={'Konfirmasi Password'} messages={errors.password_confirmation} name='password_confirmation' />
                        <Button width='w-full' isLoading={isLoading} className='mt-4'>Daftar</Button>
                    </Form>

                </Formik>



                <div className='flex items-center justify-center'>
                    <Link className='text-sm text-dark-400 font-semibold mt-4' href='/login'>Sudah punya akun? <span className='text-brand-600'>Login sekarang</span></Link>
                </div>
            </AuthCard>
        </GuestLayout >
    )
}

export default Register
