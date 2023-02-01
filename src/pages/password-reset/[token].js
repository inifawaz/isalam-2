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

const PasswordReset = () => {
    const router = useRouter()

    const { resetPassword } = useAuth({ middleware: 'guest' })

    const [email, setEmail] = useState('')

    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)

    const submitForm = values => {

        resetPassword({
            ...values,
            setErrors,
            setStatus,
        })
    }

    useEffect(() => {
        setEmail(router.query.email || '')
    }, [router.query.email])

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

                <Formik enableReinitialize initialValues={{
                    email: email,
                    password: '',
                    password_confirmation: ''
                }} validationSchema={Yup.object({
                    email: Yup.string().required('Email wajib diisi'),
                    password: Yup.string().required('Password wajib diisi'),
                    password_confirmation: Yup.string().required('Konfirmasi password wajib diisi')
                })} onSubmit={(values) => {
                    submitForm(values)
                }}>
                    <Form>
                        <Input required messages={errors.email} label="Email" name='email' type='email' />
                        <Input required messages={errors.password} label='Password' name='password' type='password' />
                        <Input required messages={errors.password_confirmation} label='Konfirmasi Password' name='password_confirmation' type='password' />
                        <Button width='w-full'>Ganti Password</Button>
                    </Form>

                </Formik>


            </AuthCard>
        </GuestLayout>
    )
}

export default PasswordReset
