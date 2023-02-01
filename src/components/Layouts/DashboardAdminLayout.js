import { useAuth } from '@/hooks/auth'
import { adminMenu, userMenu } from '@/variables/menu'
import { useRouter } from 'next/router'
import React from 'react'
import Avatar from '../Avatar'
import Card from '../Card'
import Container from '../Container'
import ResponsiveNavLink from '../ResponsiveNavLink'

const DashboardAdminLayout = ({ children }) => {
    const router = useRouter()
    const { user, isAdmin } = useAuth()
    return (
        <Container className={'flex justify-between lg:space-x-6'}>
            {/* Navigation */}
            <Card padding='py-6 px-0 ' className={'w-60 shrink-0 h-fit hidden lg:block'}>
                <Avatar avatar={user?.avatar_url} size={20} className='mx-auto' />
                <p className='text-center text-sm font-semibold text-dark-700'>{user?.name}</p>
                <p className='text-center text-xs text-muted'>{user?.email}</p>
                <div className='mt-2'>
                    {isAdmin && adminMenu.map((item, index) => (
                        <ResponsiveNavLink key={index} href={item.href} active={router.pathname == item.href}>{item.name}</ResponsiveNavLink>
                    ))}
                    {!isAdmin && userMenu.map((item, index) => (
                        <ResponsiveNavLink key={index} href={item.href} active={router.pathname == item.href}>{item.name}</ResponsiveNavLink>

                    ))}
                </div>
            </Card>

            {/* Page */}
            <main className='grow'>
                {children}
            </main>
        </Container>

    )
}

export default DashboardAdminLayout
