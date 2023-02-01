import AppLayout from '@/components/Layouts/AppLayout'
import { useAuth } from '@/hooks/auth'
import Head from 'next/head'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
const Dashboard = () => {
    const router = useRouter();
    useEffect(() => {
        router.push('/')
    }, [])
}

export default Dashboard
