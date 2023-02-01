import Navigation from '@/components/Layouts/Navigation'
import { useAuth } from '@/hooks/auth'
import Footer from './Footer'

const AppLayout = ({ children }) => {
    // const { user } = useAuth({ middleware: 'auth' })

    return (
        <div className=" flex flex-col bg-gray-100">
            <Navigation />
            <main className='grow min-h-screen py-6'>{children}</main>
            <Footer />
        </div>
    )
}

export default AppLayout
