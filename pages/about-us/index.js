import React, { useContext, useEffect } from "react";
import Container from "../../components/Container";
import Layout from "../../components/Layout";

import { FaFacebook, FaInstagram, FaTwitter, FaTelegram } from "react-icons/fa";
import { useRouter } from "next/router";
import AppContext from "../../context/AppContext";
import Head from "next/head";

export default function Index() {
    const router = useRouter();

    const { setPageLoading } = useContext(AppContext);

    useEffect(() => {
        setPageLoading(false);
    });

    return (
        <Layout>
            <Head>
                <title>i-Salam Wakaf Online</title>

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
                    content='https://isalamwakaf.com/isalam-bg-white.png'
                />
                <meta property='og:image:width' content='607' />

                <meta property='og:image:height' content='160' />
            </Head>
            <Container>
                <div className='grid md:grid-cols-1 gap-8'>
                    <div className='bg-slate-800  shadow-md border rounded-md p-8'>
                        <h2 className='text-2xl border-b-2 border-primary-500 mb-4 text-primary-500 font-medium'>
                            Tentang Kami
                        </h2>
                        <div className='space-y-4 text-lg'>
                            <p className='text-slate-300'>
                                Kemandirian ekonomi serta keamanan dan ketahanan
                                ideologi merupakan bagian dari pilar utama
                                tegaknya sebuah negeri.
                            </p>
                            <p className='text-slate-300'>
                                Sudah menjadi tanggung jawab kita bersama untuk
                                mengembangkan potensi ditengah ummat Islam dalam
                                negeri ini serta menampilkan langkah-langkah
                                baru yang menjamin kemakmuran dan kesejahteraan
                                masyarakat.
                            </p>
                            <p className='text-slate-300'>
                                Alhamdulillah, Yayasan Inisiator Salam Kariim
                                (disingkat I-SALAM) yang disahkan oleh
                                Kementerian Hukum dan Hak Asasi Manusia dengan
                                surat keputusan nomor AHU-0001429.AH.01.04.Tahun
                                2021, hadir dengan segenap keyakinan dan
                                optimisme, serta kemampuan sumber daya yang
                                berkualitas untuk memenuhi kebutuhan
                                pengembangan potensi aset ummat dalam skala
                                nasional sehingga diharapkan memberi hasil yang
                                terbaik bagi masyarakat.
                            </p>
                            <p className='text-slate-300'>
                                Manajemen Yayasan I-SALAM memiliki jaringan yang
                                luas dikenal baik di dalam dan luar negeri dan
                                berpotensi untuk menjalin kerjasama strategis di
                                berbagai bidang. I-Salam adalah amalan jariah
                                yang diharapkan terus bermanfaat dan mengalir
                                pahalanya hingga hari kiamat pada segala
                                kegiatan yang dijalankannya. Semoga Allah
                                menjadikan I-SALAM ini sebagai wadah yang
                                mengantar kepada peradaban islami yang selalu
                                menebarkan dan membuka pintu kebaikan yang luas
                                bagi para mitra serta membawa keberkahan bagi
                                seluruh masyarakat.
                            </p>
                        </div>
                    </div>
                    <div className='bg-slate-800  shadow-md border rounded-md p-8'>
                        <h2 className='text-2xl border-b-2 border-primary-500  mb-4 text-primary-500 font-medium'>
                            Visi Kami
                        </h2>
                        <div className='space-y-4 '>
                            <p className='text-slate-300 text-lg'>
                                Menjadi Lembaga Islam yang unggul, amanah dan
                                profesional dalam mengembangkan potensi
                                keummatan secara nasional yang bermanfaat bagi
                                Umat Islam dalam bidang Dakwah, Sosial,
                                Pendidikan, Ekonomi, dan Pengembangan Aset
                                dengan berlandaskan Al-Qur'an dan As-Sunnah
                                sesuai pemahaman Para Salaf.
                            </p>
                        </div>
                    </div>
                    <div className='grid md:grid-cols-1 gap-8'>
                        <div className='bg-slate-800  shadow-md border rounded-md p-8'>
                            <h2 className='text-2xl border-b-2 border-primary-500  mb-4 text-primary-500 font-medium'>
                                Misi Kami
                            </h2>
                            <ol className='space-y-4 list-decimal pl-4 '>
                                <li className='text-slate-300 text-lg'>
                                    Mendirikan pusat pendidikan dan pelatihan
                                    (pusdiklat) yang unggul dalam mewadahi
                                    penyelenggaraan pendidikan dan pelatihan
                                    formal maupun informal.
                                </li>
                                <li className='text-slate-300 text-lg'>
                                    Menyelenggarakan program dakwah dan
                                    aktifitas sosial yang menyentuh seluruh
                                    lapisan masyarakat melalui berbagai media.
                                </li>
                                <li className='text-slate-300 text-lg'>
                                    Menyelenggarakan program dakwah dan
                                    aktifitas sosial yang menyentuh seluruh
                                    lapisan masyarakat melalui berbagai media.
                                </li>
                                <li className='text-slate-300 text-lg'>
                                    Memberdayakan potensi ekonomi umat dengan
                                    menggalakkan investasi sesuai syariat,
                                    pemberdayaan wakaf yang akuntabel serta
                                    menanamkan dan menghidupkan kewirausahaan di
                                    berbagai sektor untuk kesejahteraan umat
                                    Islam.
                                </li>
                                <li className='text-slate-300 text-lg'>
                                    Membangun dan Mengelola Aset untuk
                                    kepentingan Umat Islam baik sarana prasarana
                                    ibadah, pendidikan, dakwah, ekonomi serta
                                    sosial kemasyarakatan
                                </li>
                            </ol>
                        </div>
                    </div>

                    <div className='bg-slate-800  shadow-md border rounded-md p-8 grid md:grid-cols-1 gap-2'>
                        <div>
                            <h2 className='text-2xl border-b-2 border-primary-500  mb-4 text-primary-500 font-medium'>
                                Program & Jasa
                            </h2>
                            <p className='text-slate-300 mb-4 text-lg'>
                                Yayasan I-SALAM menawarkan berbagai pilihan
                                program & jasa pelayanan yang menjadi amanah
                                dalam mengelola dan mengembangkan potensi
                                perwakafan sehingga bermanfaat bagi Umat Islam
                            </p>
                        </div>

                        <ol className='space-y-4 list-decimal pl-4 text-lg'>
                            <li className='text-slate-300 text-lg'>
                                Program Pendidikan & Pelatihan baik formal
                                maupun informal, sebagai andil untuk
                                mencerdaskan ummat dengan metode praktis, mudah
                                diserap dan mendalam
                            </li>
                            <li className='text-slate-300 text-lg'>
                                Program Kegiatan Dakwah dan Sosial, dengan
                                bekerjasama dengan instansi pemerintah atau
                                lembaga-lembaga yang terafiliasi baik dalam
                                maupun luar negeri
                            </li>
                            <li className='text-slate-300 text-lg'>
                                Program Pemberdayaan Ekonomi Umat dengan
                                mengoptimalisasi instrument Wakaf, Zakat, Infaq
                                dan Shadaqah serta investasi pada proyek-proyek
                                strategis dan produktif
                            </li>
                            <li className='text-slate-300 text-lg'>
                                Pengembangan & Pengelolaan Aset baik untuk
                                sarana prasarana ibadah, pendidikan, dakwah,
                                sosial, dan asset yang digerakkan untuk
                                pengembangan ekonomi umat baik dalam skala kecil
                                maupun besar.
                            </li>
                        </ol>
                    </div>
                    <div className='bg-slate-800  shadow-md border rounded-md p-8'>
                        <h2 className='text-2xl border-b-2 border-primary-500  mb-4 text-primary-500 font-medium'>
                            Kantor Kami
                        </h2>

                        <ul className='space-y-4  '>
                            <li className='text-slate-300 text-lg'>
                                <h3 className='text-slate-300 font-medium'>
                                    MAKASSAR
                                </h3>
                                <p className='text-slate-300'>
                                    Jl. Gunung Lompobattang No. 56, Kel. Pisang
                                    Utara Kec. Ujung Pandang Kota Makassar 90115
                                    CP: 0812 4282 216
                                </p>
                            </li>
                            <li className='text-slate-300'>
                                <h3 className='text-slate-300 font-medium'>
                                    SURABAYA
                                </h3>
                                <p className='text-slate-300'>
                                    Ruko RMI Blok C.11 Jl. Ngagel Jaya Selatan
                                    Taman Flora Kota Surabaya 60115 CP: 0811 310
                                    979
                                </p>
                            </li>
                            <li className='text-slate-300'>
                                <h3 className='text-slate-300 font-medium'>
                                    BANDUNG
                                </h3>
                                <p className='text-slate-300'>
                                    Jl. Kawung Ece No. 6 Kel. Sukaluyu Kec.
                                    Cibeunying Kaler, Kota Bandung 40123 CP:
                                    0813 2211 7794
                                </p>
                            </li>
                        </ul>
                    </div>
                    <div className='bg-slate-800  shadow-md border rounded-md p-8'>
                        <h2 className='text-2xl border-b-2 border-primary-500  mb-4 text-primary-500 font-medium'>
                            Struktur Organisasi
                        </h2>

                        <ul className='space-y-4  text-lg'>
                            <li className='text-slate-300'>
                                <h3 className='text-slate-300 font-medium text-base'>
                                    DIREKTUR
                                </h3>
                                <p className='text-slate-300 text-lg'>
                                    UST. DZULQARNAIN M. SUNUSI
                                </p>
                            </li>
                            <li className='text-slate-300'>
                                <h3 className='text-slate-300 font-medium text-base'>
                                    WAKIL DIREKTUR & KEUANGAN
                                </h3>
                                <p className='text-slate-300 text-lg'>
                                    LUKMAN HAKIM
                                </p>
                            </li>
                            <li className='text-slate-300'>
                                <h3 className='text-slate-300 font-medium text-base'>
                                    SEKJEND
                                </h3>
                                <p className='text-slate-300 text-lg'>
                                    ANDRI MAADSA
                                </p>
                            </li>
                            <li className='text-slate-300'>
                                <h3 className='text-slate-300 font-medium text-base'>
                                    ADMIN HQ
                                </h3>
                                <p className='text-slate-300 text-lg'>
                                    SUWARDI ALI
                                </p>
                            </li>
                            <li className='text-slate-300'>
                                <h3 className='text-slate-300 font-medium text-base'>
                                    PUSDIKLAT
                                </h3>
                                <p className='text-slate-300 text-lg'>
                                    UST ABU AHMAD ROKHMAD RIYADI, SPD.
                                </p>
                            </li>
                            <li className='text-slate-300'>
                                <h3 className='text-slate-300 font-medium text-base'>
                                    DAKWAH SOSIAL
                                </h3>
                                <p className='text-slate-300 text-lg'>
                                    UST ABDUL MU’THIY ALMAIDANY
                                </p>
                            </li>
                            <li className='text-slate-300'>
                                <h3 className='text-slate-300 font-medium text-base'>
                                    MANAJEMEN ASET
                                </h3>
                                <p className='text-slate-300 text-lg'>
                                    RISWAN ILYAS
                                </p>
                            </li>
                            <li className='text-slate-300'>
                                <h3 className='text-slate-300 font-medium text-base'>
                                    EKONOMI UMMAT
                                </h3>
                                <p className='text-slate-300 text-lg'>
                                    SETIA BUDI YUNARTO
                                </p>
                            </li>
                            <li className='text-slate-300'>
                                <h3 className='text-slate-300 font-medium text-base'>
                                    WAKAF
                                </h3>
                                <p className='text-slate-300 text-lg'>
                                    FAISAL RIZA BASALAMAH
                                </p>
                            </li>
                            <li className='text-slate-300'>
                                <h3 className='text-slate-300 font-medium text-base'>
                                    IT DEVELOPMENT
                                </h3>
                                <p className='text-slate-300 text-lg'>
                                    UST MUHAMMAD HAMID ALWI, LC
                                </p>
                            </li>
                        </ul>
                    </div>
                    <div className='bg-slate-800  shadow-md border rounded-md p-8'>
                        <h2 className='text-2xl border-b-2 border-primary-500  mb-4 text-primary-500 font-medium'>
                            Media Sosial Kami
                        </h2>

                        <ul className='space-y-4  text-lg'>
                            <li className='text-slate-300 flex items-center space-x-2'>
                                <FaInstagram size={"1.2em"} />
                                <a
                                    href='https://www.instagram.com/isalamkarim'
                                    rel='noreferrer'
                                    target='_blank'
                                    className='text-slate-300'>
                                    isalamkarim
                                </a>
                            </li>
                            <li className='text-slate-300 flex items-center space-x-2'>
                                <FaFacebook size={"1.2em"} />
                                <a
                                    href='https://www.facebook.com/isalamkarim'
                                    rel='noreferrer'
                                    target='_blank'
                                    className='text-slate-300'>
                                    isalamkarim
                                </a>
                            </li>
                            <li className='text-slate-300 flex items-center space-x-2'>
                                <FaTwitter size={"1.2em"} />
                                <a
                                    href='https://twitter.com/isalamkarim'
                                    rel='noreferrer'
                                    target='_blank'
                                    className='text-slate-300'>
                                    isalamkarim
                                </a>
                            </li>
                            <li className='text-slate-300 flex items-center space-x-2'>
                                <FaTelegram size={"1.2em"} />
                                <a
                                    href='t.me/isalamkarim'
                                    rel='noreferrer'
                                    target='_blank'
                                    className='text-slate-300'>
                                    isalamkarim
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className='bg-slate-800  shadow-md border rounded-md p-8'>
                        <h2 className='text-2xl border-b-2 border-primary-500  mb-4 text-primary-500 font-medium'>
                            KONTAK KAMI
                        </h2>

                        <ul className='space-y-4  text-lg'>
                            <li className='text-slate-300'>
                                <h3 className='text-slate-300 text-base font-medium'>
                                    Sekretariat Jenderal
                                </h3>
                                <p className='text-slate-300'>
                                    +62 813 2211 7794
                                </p>
                            </li>
                            <li className='text-slate-300'>
                                <h3 className='text-slate-300 text-base font-medium'>
                                    Keuangan
                                </h3>
                                <p className='text-slate-300'>
                                    +62 811 54 7227
                                </p>
                            </li>
                            <li className='text-slate-300'>
                                <h3 className='text-slate-300 text-base font-medium'>
                                    Wakaf
                                </h3>
                                <p className='text-slate-300'>
                                    +62 811 4606 682
                                </p>
                            </li>
                            <li className='text-slate-300'>
                                <h3 className='text-slate-300 text-base font-medium'>
                                    Manajemen Aset
                                </h3>
                                <p className='text-slate-300'>
                                    +62 812 4282 216
                                </p>
                            </li>
                            <li className='text-slate-300'>
                                <h3 className='text-slate-300 text-base font-medium'>
                                    PUSDIKLAT
                                </h3>
                                <p className='text-slate-300'>
                                    +62 813 2766 0272
                                </p>
                            </li>
                            <li className='text-slate-300'>
                                <h3 className='text-slate-300 text-base font-medium'>
                                    Ekonomi Umat
                                </h3>
                                <p className='text-slate-300'>
                                    +62 0811 310 979
                                </p>
                            </li>
                            <li className='text-slate-300'>
                                <h3 className='text-slate-300 text-base font-medium'>
                                    Dakwah & Sosial
                                </h3>
                                <p className='text-slate-300'>
                                    +62 812 2889 1110
                                </p>
                            </li>
                            <li className='text-slate-300'>
                                <h3 className='text-slate-300 text-base font-medium'>
                                    Email
                                </h3>
                                <p className='text-slate-300'>
                                    admin@i-salam.net
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </Container>
        </Layout>
    );
}
