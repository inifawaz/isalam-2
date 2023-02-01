import ApplicationLogo from '@/components/ApplicationLogo'
import AuthCard from '@/components/AuthCard'
import AuthSessionStatus from '@/components/AuthSessionStatus'
import Button from '@/components/Button'
import GuestLayout from '@/components/Layouts/GuestLayout'
import Input from '@/components/Input'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import Checkbox from '@/components/Checkbox'

const Login = () => {
    const router = useRouter()

    const { login } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard',
    })



    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (router.query.reset?.length > 0 && errors.length === 0) {
            setStatus(atob(router.query.reset))
        } else {
            setStatus(null)
        }
    })

    const handleLogin = async (values) => {

        login({
            ...values,
            setErrors,
            setStatus,
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
                {/* Session Status */}
                <AuthSessionStatus className="mb-4" status={status} />
                <Formik initialValues={{
                    email: '',
                    password: '',
                    remember: false
                }} validationSchema={Yup.object({
                    email: Yup.string().required('Email wajib diisi')
                })} onSubmit={(values) => {
                    handleLogin(values)
                }}>
                    <Form>
                        <Input required messages={errors.email} label='Email' name="email" type='email' />
                        <Input required messages={errors.password} label='Password' name="password" type='password' />
                        <div className='flex justify-between items-center'>
                            <Checkbox name='remember'>Ingat saya</Checkbox>
                            <Link
                                href="/forgot-password"
                                className=" text-sm text-gray-600 hover:text-gray-900">
                                Lupa password?
                            </Link>
                        </div>
                        <Button isLoading={isLoading} className={'mt-4'} width='w-full'>
                            Login
                        </Button>
                    </Form>

                </Formik>
                <div className='flex items-center justify-center'>
                    <Link className='text-sm text-dark-400 font-semibold mt-4' href='/register'>Belum punya akun? <span className='text-brand-600'>Daftar sekarang</span></Link>
                </div>
            </AuthCard>
        </GuestLayout >
    )
}

export default Login
