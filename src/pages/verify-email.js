import ApplicationLogo from '@/components/ApplicationLogo'
import AuthCard from '@/components/AuthCard'
import Button from '@/components/Button'
import GuestLayout from '@/components/Layouts/GuestLayout'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useState } from 'react'

const VerifyEmail = () => {
    const { logout, resendEmailVerification } = useAuth({
        middleware: 'auth',
        redirectIfAuthenticated: '/dashboard',
    })

    const [status, setStatus] = useState(null)

    return (
        <GuestLayout>
            <AuthCard
                logo={
                    <Link href="/">
                        <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                    </Link>
                }>

                <div className="mb-4 text-sm text-gray-600">
                    Terimakasih telah mendaftar! Sebelum memulai, silahkan lakukan verifikasi email dengan mengklik verifikasi pada email yang baru saja kami kirimkan ke anda.
                </div>

                {status === 'verification-link-sent' && (
                    <div className="mb-4 font-medium text-sm text-green-600">
                        Email verifikasi telah kami kirimkan ke email yang anda daftarkan ketika membuat akun
                    </div>
                )}

                <div className="mt-4 flex items-center justify-between">
                    <Button
                        width='w-fitt'
                        onClick={() => resendEmailVerification({ setStatus })}>
                        Kirim ulang email verifikasi
                    </Button>

                    <button
                        type="button"
                        className="underline text-sm text-gray-600 hover:text-gray-900"
                        onClick={logout}>
                        Logout
                    </button>
                </div>
            </AuthCard>
        </GuestLayout>
    )
}

export default VerifyEmail
