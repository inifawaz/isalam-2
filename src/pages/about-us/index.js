import Container from '@/components/Container'
import AppLayout from '@/components/Layouts/AppLayout'
import React from 'react'

const AboutUs = () => {
    return (
        <Container>
            <div className='space-y-8'>


                <div className='grid lg:grid-cols-2 gap-8'>
                    <div className='p-6 rounded-md shadow bg-white '>
                        <h1 className='text-xl font-bold text-amber-600'>TENTANG KAMI</h1>
                        <div className='space-y-4 text-gray-500'>
                            <p>Kemandirian ekonomi serta keamanan dan ketahanan ideologi merupakan bagian dari pilar utama tegaknya sebuah negeri.</p>
                            <p>Sudah menjadi tanggung jawab kita bersama
                                untuk mengembangkan potensi ditengah ummat
                                Islam dalam negeri ini serta menampilkan
                                langkah-langkah baru yang menjamin
                                kemakmuran dan kesejahteraan masyarakat.</p>
                            <p>Alhamdulillah, Yayasan Inisiator Salam Kariim
                                (disingkat I-SALAM) yang disahkan oleh Kementerian
                                Hukum dan Hak Asasi Manusia dengan surat
                                keputusan nomor AHU-0001429.AH.01.04.Tahun 2021,
                                hadir dengan segenap keyakinan dan optimisme,
                                serta kemampuan sumber daya yang berkualitas untuk memenuhi kebutuhan pengembangan potensi aset ummat dalam skala nasional
                                sehingga diharapkan memberi hasil yang terbaik bagi masyarakat.
                            </p>
                            <p>Manajemen Yayasan I-SALAM memiliki jaringan yang luas dikenal baik di dalam dan luar
                                negeri dan berpotensi untuk menjalin kerjasama strategis di berbagai bidang.
                                I-Salam adalah amalan jariah yang diharapkan terus bermanfaat dan mengalir pahalanya
                                hingga hari kiamat pada segala kegiatan yang dijalankannya.
                                Semoga Allah menjadikan I-SALAM ini sebagai wadah yang mengantar kepada
                                peradaban islami yang selalu menebarkan dan membuka pintu kebaikan yang luas bagi
                                para mitra serta membawa keberkahan bagi seluruh masyarakat.</p>
                        </div>
                    </div>
                    <div className='space-y-8 flex flex-col'>
                        <div className='p-6 rounded-md shadow h-fit bg-white'>
                            <h1 className='text-xl font-bold text-amber-600'>VISI KAMI</h1>
                            <div className='space-y-4 text-gray-500'>
                                <p>Menjadi Lembaga Islam yang
                                    unggul, amanah dan profesional
                                    dalam mengembangkan potensi
                                    keummatan secara nasional yang
                                    bermanfaat bagi Umat Islam
                                    dalam bidang Dakwah, Sosial,
                                    Pendidikan, Ekonomi, dan
                                    Pengembangan Aset dengan
                                    berlandaskan Al-Qur'an dan AsSunnah sesuai pemahaman Para
                                    Salaf</p>
                            </div>
                        </div>
                        <div className='p-6 rounded-md grow shadow h-fit bg-white'>
                            <h1 className='text-xl font-bold text-amber-600'>MISI KAMI</h1>
                            <div className='space-y-4 text-gray-500'>
                                <ul className='list-decimal'>
                                    <li className='ml-6'>Mendirikan pusat pendidikan dan
                                        pelatihan (pusdiklat) yang unggul
                                        dalam mewadahi penyelenggaraan
                                        pendidikan dan pelatihan formal
                                        maupun informal.</li>
                                    <li className='ml-6'>Menyelenggarakan program
                                        dakwah dan aktifitas sosial yang
                                        menyentuh seluruh lapisan
                                        masyarakat melalui berbagai
                                        media.</li>
                                    <li className='ml-6'>Memberdayakan potensi ekonomi
                                        umat dengan menggalakkan
                                        investasi sesuai syariat,
                                        pemberdayaan wakaf yang
                                        akuntabel serta menanamkan dan
                                        menghidupkan kewirausahaan di
                                        berbagai sektor untuk
                                        kesejahteraan umat Islam </li>
                                    <li className='ml-6'>Membangun dan Mengelola Aset
                                        untuk kepentingan Umat Islam
                                        baik sarana prasarana ibadah,
                                        pendidikan, dakwah, ekonomi serta
                                        sosial kemasyarakatan </li>

                                </ul>
                            </div>
                        </div>
                    </div>


                </div>
                <div className='p-6 rounded-md grow shadow h-fit bg-white'>
                    <h1 className='text-xl font-bold text-amber-600 mb-2'>PROGRAM & JASA</h1>
                    <div className='grid lg:grid-cols-2  gap-8 text-gray-500'>
                        <div className='p-6 rounded-md bg-slate-800 text-slate-300  border shadow '>
                            Program Pendidikan & Pelatihan
                            baik formal maupun informal,
                            sebagai andil untuk
                            mencerdaskan ummat
                            dengan metode praktis, mudah
                            diserap dan mendalam

                        </div>
                        <div className='p-6 rounded-md bg-slate-800 text-slate-300 border shadow'>
                            Program Kegiatan Dakwah dan
                            Sosial, dengan bekerjasama
                            dengan instansi pemerintah
                            atau lembaga-lembaga yang
                            terafiliasi baik dalam maupun
                            luar negeri
                        </div>
                        <div className='p-6 rounded-md bg-slate-800 text-slate-300 border shadow'>
                            Program Pemberdayaan
                            Ekonomi Umat dengan
                            mengoptimalisasi instrument
                            Wakaf, Zakat, Infaq dan
                            Shadaqah serta investasi pada
                            proyek-proyek strategis dan
                            produktif
                        </div>
                        <div className='p-6 rounded-md bg-slate-800 text-slate-300 border shadow'>
                            Pengembangan & Pengelolaan
                            Aset baik untuk sarana prasarana
                            ibadah, pendidikan, dakwah,
                            sosial, dan asset yang digerakkan
                            untuk pengembangan ekonomi
                            umat baik dalam skala kecil
                            maupun besar.
                        </div>
                    </div>
                </div>
            </div>
        </Container>

    )
}

AboutUs.getLayout = function getLayout(page) {
    return <AppLayout>{page}</AppLayout>
}

export default AboutUs
