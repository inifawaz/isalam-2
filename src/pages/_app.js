import { Toaster } from 'react-hot-toast';
import 'styles/globals.css';
import Head from 'next/head';
const App = ({ Component, pageProps }) => {
    // Use the layout defined at the page level, if available
    const getLayout = Component.getLayout || (page => page);

    return getLayout(
        <>
            <Head>
                <title>Yayasan I-Salam | Wakaf Online</title>
            </Head>
            <Component {...pageProps} /> <Toaster toastOptions={{

                style: {
                    background: '#1e293b',
                    color: '#fff',
                },
            }} />
        </>,
    );
};
export default App;
