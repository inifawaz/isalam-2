import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html>
                <Head>
                    <link
                        href="https://fonts.bunny.net/css2?family=Nunito:wght@400;600;700&display=swap"
                        rel="stylesheet"
                    />
                    <link
                        rel='icon'
                        type='image/png'
                        sizes='48x48'
                        href='/favicon-48x48.png'
                    />
                    <meta
                        name='description'
                        content="I-Salam menyediakan berbagai macam program wakaf yang dikelola secara profesional dan amanah serta diawasi oleh para asatidzah Ahlus Sunnah Wal Jama'ah"
                        key='wakaf'
                    />
                    <meta
                        property='og:title'
                        content="I-Salam Wakaf Online | I-Salam menyediakan berbagai macam program wakaf yang dikelola secara profesional dan amanah serta diawasi oleh para asatidzah Ahlus Sunnah Wal Jama'ah"
                    />
                    <meta property='og:url' content='https://isalamwakaf.com/' />
                    <meta
                        property='og:description'
                        content="I-Salam menyediakan berbagai macam program wakaf yang dikelola secara profesional dan amanah serta diawasi oleh para asatidzah Ahlus Sunnah Wal Jama'ah"
                    />
                    <meta
                        property='og:image'
                        content='https://isalamwakaf.com/isalam-light.png'
                    />
                    <meta property='og:image:width' content='607' />

                    <meta property='og:image:height' content='160' />
                </Head>
                <body className="antialiased">
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument
