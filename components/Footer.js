import Image from "next/image";
import Link from "next/link";
import React from "react";
import Container from "./Container";
import isalamLight from "../public/isalam-light.png";
import { FaFacebook, FaInstagram, FaTelegram, FaTwitter } from "react-icons/fa";

export default function Footer() {
    return (
        <div className='bg-slate-800 mt-20 '>
            <Container
                className={
                    "flex flex-col space-y-8 pb-20 pt-10 md:flex-row md:space-y-0 md:space-x-8"
                }>
                <div className='w-80 grow shrink-0'>
                    <Link href={"/"}>
                        <div className=' relative cursor-pointer  w-40  mb-4'>
                            <Image
                                src={isalamLight}
                                layout='responsive'
                                alt='isalam logo'
                            />
                        </div>
                    </Link>
                    <p className='text-gray-200'>
                        Yayasan iSalam Kariim, maksimalkan pahala, optimalkan
                        manfaat.
                    </p>
                </div>
                <div>
                    <h2 className='text-lg text-slate-100 font-medium '>
                        Kantor Kami
                    </h2>
                    <p className='text-gray-200'>
                        Jl. Gunung Lompobattang No. 56
                        <br /> Kel. Pisang Utara
                        <br />
                        Kec. Ujung Pandang
                        <br />
                        Kota Makassar 90115 CP: 0812 4282 216
                    </p>
                </div>
                <div className='grow shrink-0'>
                    <h2 className='text-lg text-slate-100 font-medium '>
                        Kontak Kami
                    </h2>
                    <ul className=' mt-4 flex grow space-x-4 items-center'>
                        <a
                            href='https://www.instagram.com/isalamkarim'
                            rel='noreferrer'
                            target='_blank'
                            className='text-slate-300'>
                            <FaInstagram size={"1.2em"} />
                        </a>

                        <a
                            href='https://www.facebook.com/isalamkarim'
                            rel='noreferrer'
                            target='_blank'
                            className='text-slate-300'>
                            <FaFacebook size={"1.2em"} />
                        </a>
                        <a
                            href='https://twitter.com/isalamkarim'
                            rel='noreferrer'
                            target='_blank'
                            className='text-slate-300'>
                            <FaTwitter size={"1.2em"} />
                        </a>
                        <a
                            href='t.me/isalamkarim'
                            rel='noreferrer'
                            target='_blank'
                            className='text-slate-300'>
                            <FaTelegram size={"1.2em"} />
                        </a>
                    </ul>
                    <div className='mt-4'>
                        <p className='text-slate-200'>Sekretariat Jendral</p>
                        <p className='text-slate-100'>+62 813 2211 7794</p>
                    </div>
                </div>
            </Container>
        </div>
    );
}
