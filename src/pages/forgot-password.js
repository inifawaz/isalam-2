import ApplicationLogo from '@/components/ApplicationLogo'
import AuthCard from '@/components/AuthCard'
import AuthSessionStatus from '@/components/AuthSessionStatus'
import Button from '@/components/Button'
import GuestLayout from '@/components/Layouts/GuestLayout'
import Input from '@/components/Input'

import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useState } from 'react'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'

const ForgotPassword = () => {
    const { forgotPassword } = useAuth({ middleware: 'guest' })

    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)

    const submitForm = values => {

        forgotPassword({ ...values, setErrors, setStatus })
    }

    return (
        <GuestLayout>
            <AuthCard
                logo={
                    <Link href="/">
                        <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                    </Link>
                }>
                <div className="mb-4 text-sm text-gray-600">
                    Lupa password? tidak masalah. beritahu kepada kami email anda dan kami akan mengirimkan email untuk membuat password baru anda.
                </div>

                <AuthSessionStatus className="mb-4" status={status} />
                <Formik initialValues={{
                    email: ''
                }} validationSchema={Yup.object({
                    email: Yup.string().required('Email wajib diisi')
                })} onSubmit={(values) => {
                    submitForm(values)
                }}>
                    <Form>
                        <Input required messages={errors.email} label='Email' name='email' type='email' autoFocus />
                        <Button className={'mt-4'} width='w-full'>Kirim email untuk mengganti password</Button>
                    </Form>
                </Formik>


            </AuthCard>
        </GuestLayout>
    )
}

export default ForgotPassword
