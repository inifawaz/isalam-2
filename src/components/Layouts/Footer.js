import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaFacebookSquare, FaInstagramSquare, FaTelegram, FaTwitterSquare } from 'react-icons/fa'
import Container from '../Container'

const Footer = () => {
    return (
        <div className='bg-slate-800 py-8'>
            <Container>
                <div>
                    <div className="flex-shrink-0 mb-4 flex items-center">
                        <Link href="/">
                            {/* <ApplicationLogo className="block h-10 w-auto fill-current text-gray-600" /> */}
                            <div className="relative h-12 w-40">
                                <Image
                                    priority
                                    src={'/isalam-light.png'}
                                    fill
                                    alt='logo brand'
                                    sizes='40'
                                    className="object-contain"
                                />
                            </div>
                        </Link>
                    </div>
                    <div className='mb-10'>
                        <h1 className='text-amber-500 text-xl  font-bold'>Kantor Kami</h1>
                        <div className='flex items-center flex-wrap '>
                            <div className='text-slate-300 mr-10 mt-2'>
                                <h1 className='font-semibold text-white'>MAKASSAR</h1>
                                <p>Jl. Gunung Lompobattang No. 56</p>
                                <p>Kel. Pisang Utara Kec. Ujung Pandang </p>
                                <p>Kota Makassar 90115</p>
                                <p>CP: 0812 4282 216</p>
                            </div>
                            <div className='text-slate-300 mr-10 mt-2'>
                                <h1 className='font-semibold text-white'>SURABAYA</h1>
                                <p>Ruko RMI Blok C.11</p>
                                <p>Jl. Ngagel Jaya Selatan Taman Flora</p>
                                <p>Kota Surabaya 60115</p>
                                <p>CP: 0811 310 979</p>
                            </div>
                            <div className='text-slate-300 mr-10 mt-2'>
                                <h1 className='font-semibold text-white'>BANDUNG</h1>
                                <p>Jl. Kawung Ece No. 6 Kel. Sukaluyu</p>
                                <p>Kec. Cibeunying Kaler</p>
                                <p>Kota Bandung 40123</p>
                                <p>CP: 0813 2211 7794</p>
                            </div>
                        </div>

                    </div>
                    <div className='mb-10'>
                        <h1 className='text-amber-500 text-xl  font-bold'>Media Sosial</h1>
                        <div className='flex  items-center flex-wrap'>

                            <a className='flex space-x-4 mr-10 mt-2 items-center' href='https://www.facebook.com/isalamkarim' target={'_blank'}>
                                <FaFacebookSquare className='text-white h-10 w-10' />
                                <p className='text-slate-300'>I-Salam Karim</p>
                            </a>
                            <a className='flex space-x-4 mr-10 mt-2 items-center' href='https://www.instagram.com/isalamkarim/' target={'_blank'}>
                                <FaInstagramSquare className='text-white h-10 w-10' />
                                <p className='text-slate-300'>isalamkarim</p>
                            </a>
                            <a className='flex space-x-4 mr-10 mt-2 items-center' href='https://t.me/isalamkarim' target={'_blank'}>
                                <FaTelegram className='text-white h-10 w-10' />
                                <p className='text-slate-300'>I-Salam Karim</p>
                            </a>
                            <a className='flex space-x-4 mr-10 mt-2 items-center' href='https://twitter.com/isalamkarim' target={'_blank'}>
                                <FaTwitterSquare className='text-white h-10 w-10' />
                                <p className='text-slate-300'>I-Salam Karim</p>
                            </a>
                        </div>
                    </div>
                    <div className='mb-10'>
                        <h1 className='text-amber-500 text-xl  font-bold'>Kontak Kami</h1>
                        <div className='flex  flex-wrap items-center'>

                            <div className=' mr-10 mt-2'>
                                <p className='text-slate-300'>Sekretariat Jenderal</p>
                                <p className='text-white'>+62 813 2211 7794</p>
                            </div>
                            <div className=' mr-10 mt-2'>
                                <p className='text-slate-300'>Keuangan</p>
                                <p className='text-white'>+62 811 54 7227</p>
                            </div>
                            <div className=' mr-10 mt-2'>
                                <p className='text-slate-300'>Wakaf</p>
                                <p className='text-white'>+62 811 4606 682</p>
                            </div>
                            <div className=' mr-10 mt-2'>
                                <p className='text-slate-300'>Manajemen Aset</p>
                                <p className='text-white'>+62 812 4282 216</p>
                            </div>
                            <div className=' mr-10 mt-2'>
                                <p className='text-slate-300'>Pusdiklat</p>
                                <p className='text-white'>+62 813 2766 0272</p>
                            </div>
                            <div className=' mr-10 mt-2'>
                                <p className='text-slate-300'>Ekonomi Umat</p>
                                <p className='text-white'>+62 0811 310 979</p>
                            </div>
                            <div className=' mr-10 mt-2'>
                                <p className='text-slate-300'>Dakwah & Sosial</p>
                                <p className='text-white'>+62 812 2889 1110</p>
                            </div>

                        </div>
                    </div>
                    <div>
                        <h1 className='text-amber-500 text-xl  font-bold'>Rekening Perbankan Kami</h1>
                        <div className='flex  flex-wrap items-center'>


                            <div className='mt-2 mr-10'>
                                <h1 className='text-white mb-2'>Bank Syariah Indonesia a.n YAYASAN I-SALAM</h1>
                                <div className='grid lg:grid-cols-2  text-slate-300'>
                                    <p className='text-sm'>Operasional</p>
                                    <p>777-0120-211</p>
                                    <p className='text-sm'>Wakaf</p>
                                    <p>777-0120-227</p>
                                    <p className='text-sm'>Zakat</p>
                                    <p>777-0120-238</p>
                                    <p className='text-sm'>Infaq & Shadaqah</p>
                                    <p>777-0120-246</p>
                                    <p className='text-sm'>Pusdiklat</p>
                                    <p>777-0120-254</p>
                                </div>
                            </div>
                            <div className='mt-2 mr-10'>
                                <h1 className='text-white mb-2'>Mandiri a.n YAYASAN INISIATOR SALAM KARIIM</h1>
                                <div className='grid lg:grid-cols-2  text-slate-300'>
                                    <p className='text-sm'>Operasional</p>
                                    <p>152-05-4007012-1</p>
                                    <p className='text-sm'>Wakaf</p>
                                    <p>152-05-0107021-9</p>
                                    <p className='text-sm'>Zakat</p>
                                    <p>152-05-8010072-1</p>
                                    <p className='text-sm'>Infaq & Shadaqah</p>
                                    <p>152-05-0700121-8</p>
                                    <p className='text-sm'>Pusdiklat</p>
                                    <p>152-05-7012021-8</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </Container>


        </div>
    )
}

export default Footer
