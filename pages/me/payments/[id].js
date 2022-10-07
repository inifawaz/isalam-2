import { getCookie } from "cookies-next";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { BiChevronDown, BiTimer } from "react-icons/bi";
import Container from "../../../components/Container";
import Layout from "../../../components/Layout";
import { axios } from "../../../lib/axiosInstance";
import { toast } from "react-hot-toast";
import formatToCurreny from "../../../utils/formatToCurreny";
import { Disclosure } from "@headlessui/react";
import Link from "next/link";

export default function PaymentDetails({ payment }) {
    const classNames = (...classes) => classes.filter(Boolean).join(" ");
    const howToPay = [
        {
            paymentName: "BRI VA",
            data: [
                {
                    via: "BRIMO",
                    steps: [
                        "Lakukan log in pada aplikasi BRI Mobile (Android/Iphone)",
                        "Pilih Menu BRIVA",
                        "Pilih Pembayaran Baru",
                        "Masukan Nomor VA yang tertera pada halaman konfirmasi",
                        "Masukan PIN BRIMO Anda",
                        "Validasi pembayaran anda",
                        "Pembayaran Selesai",
                    ],
                },
                {
                    via: "BRI INTERNET BANKING",
                    steps: [
                        "Lakukan log in pada website Internet Banking BRI (ib.bri.co.id)",
                        "Pilih menu Pembayaran (Scroll ke bawah)",
                        "Pilih BRIVA",
                        "Pilih Rekening",
                        "Masukkan Nomor VA yang tertera pada halaman konfirmasi dan Pilih Kirim",
                        "Masukan password Internet Banking BRI/BRIMO",
                        "Klik permintaan mToken",
                        "Masukan mToken Internet Banking BRI dan Klik kirim",
                        "Pembayaran Selesai",
                    ],
                },
                {
                    via: "ATM BRI",
                    steps: [
                        "Masukkan Kartu ATM BRI dan PIN",
                        "Pilih menu LAINNYA",
                        "Pilih menu PEMBAYARAN/PEMBELIAN",
                        "Pilih menu PEMBAYARAN/PEMBELIAN LAIN",
                        "Pilih menu BRIVA",
                        "Masukkan nomor VA yang tertera pada halaman konfirmasi dan tekan BENAR",
                        "Konfirmasi pembayaran dengan menekan Ya",
                        "Pembayaran Selesai",
                    ],
                },
                {
                    via: "ATM BERSAMA / ATM PRIMA",
                    steps: [
                        "Pilih Transaksi lainnya",
                        "Pilih Transaksi lainnya",
                        "Pilih Transfer ke Bank Lain",
                        "Masukkan kode Bank Rakyat Indonesia/BRI 002 dan 16 Digit nomor Virtual Account",
                        "Masukkan Nominal Transfer seusai tagihan atau kewajiban Anda. pastikan nominal sesuai",
                        "Konfirmasi rincian Anda akan tampil di layar, cek dan tekan 'Ya' untuk melanjutkan",
                        "Transaksi Berhasil",
                    ],
                },
            ],
        },
        {
            paymentName: "MAYBANK VA",
            data: [
                {
                    via: "ATM May Bank",
                    steps: [
                        "Masukkan kartu ATM Maybank & PIN.",
                        "Pilih Menu Pembayaran/Top Up Pulsa.",
                        "Plih Menu Virtual Account.",
                        "Masukkan nomor 7828XXXXXXXXXXXX (16 angka kode Virtual account) dan Jumlah Nominal Pembayaran",
                        "Konfirmasi Validasi Pembayaran (Pastikan Nominal dan informasi sesuai).",
                        "Simpan struk transaksi sebagai bukti pembayaran.",
                    ],
                },
                {
                    via: "ATM Bersama",
                    steps: [
                        "Pada Menu utama, pilih Transaksi Lainnya.",
                        "Pilih Transfer.",
                        "Pilih Antar Bank Online.",
                        "Masukkan nomor 016 7828XXXXXXXXXXXX (kode 016 (kode bank Maybank) dan 16 angka kode Virtual account).",
                        "Masukkan jumlah pembayaran sesuai tagihan",
                        "Akan muncul rincian pembayaran Anda. Jika sudah benar, klik 'Ya' untuk melanjutkan.",
                    ],
                },
                {
                    via: "Maybank2u Internet Banking (Online Banking)",
                    steps: [
                        "Login ke website Maybank Personal Internet Banking (M2U).",
                        "Di halaman Transfer",
                        "Pilih Maybank Virtual Account.",
                        "Pilih rekening sumber dana, masukkan nomor virtual account dan jumlah yang harus dibayar.",
                        "Akan muncul layar konfirmasi, masukkan SMS token (TAC).",
                    ],
                },
                {
                    via: "ATM BCA / Jaringan ATM Prima",
                    steps: [
                        "Pada Menu utama, Pilih Transaksi Lainnya.",
                        "Pilih Transfer.",
                        "Pilih Transfer.",
                        "Masukkan kode 016 untuk MAY BANK lalu tekan Benar.",
                        "Masukkan kode 016 untuk MAY BANK lalu tekan Benar.",
                        "Masukkan 7828XXXXXXXXXXXX ( 16 kode virtual account pembayaran) lalu tekan Benar.",
                        "Akan muncul rincian pembayaran Anda. Jika sudah benar, klik 'Ya' untuk melanjutkan.",
                    ],
                },
            ],
        },
        {
            paymentName: "RETAIL",
            data: [
                {
                    via: "Alfamart, Pos Indonesia, Dan-dan, Lawson, dan Pegadaian",
                    steps: [
                        "Alfamart, Pos Indonesia, Dan-dan, Lawson, dan Pegadaian",
                        "Datang ke Gerai retail ( Alfamart, Kantor Pos, Pegadaian, dan (dan-dan)).",
                        "Informasikan kepada kasir akan melakukan 'Pembayaran Telkom/indihome/Finpay'. ( Jika kasir menanyakan jenis Pembayaran Telkom, pilih pembayaran untuk Telepon Rumah, atau Indihome atau Finpay )",
                        "Tunjukkan dan berikan Kode Pembayaran ke Kasir.",
                        "Lakukan pembayaran sesuai nominal yang diinformasikan dan tunggu proses selesai.",
                        "Minta dan simpan struk sebagai bukti pembayaran.",
                        "Pembayaran anda akan langsung terdeteksi secara otomatis.",
                    ],
                },
            ],
        },
        {
            paymentName: "PERMATA VA",
            data: [
                {
                    via: "ATM Mandiri/Jaringan ATM Bersama",
                    steps: [
                        "Pada Menu utama, pilih Transaksi Lainnya.",
                        "Pilih Transfer.",
                        "Pilih Antar Bank Online.",
                        "Masukkan nomor 013 868001XXXXXXXXXX (kode 013 (kode bank) dan 16 angka kode Virtual account).",
                        "Masukkan jumlah pembayaran sesuai tagihan",
                        "Akan muncul rincian pembayaran Anda. Jika sudah benar, klik 'Ya' untuk melanjutkan.",
                    ],
                },
                {
                    via: "ATM BCA/Jaringan ATM PRIMA",
                    steps: [
                        "Pada Menu utama, Pilih Transaksi Lainnya.",
                        "Pilih Transfer.",
                        "Pilih Ke Rek Bank Lain.",
                        "Masukkan kode 013 untuk PERMATA lalu tekan Benar.",
                        "Masukkan jumlah tagihan yang akan Anda bayar secara lengkap.",
                        "Masukkan 868001XXXXXXXXXX ( 16 kode virtual account pembayaran) lalu tekan Benar.",
                        "Akan muncul rincian pembayaran Anda. Jika sudah benar, klik 'Ya' untuk melanjutkan.",
                    ],
                },
                {
                    via: "ATM Permata",
                    steps: [
                        "Pilih menu TRANSAKSI LAINNYA",
                        "Pilih menu PEMBAYARAN",
                        "Pilih menu PEMBAYARAN LAINNYA",
                        "Pilih menu VIRTUAL ACCOUNT",
                        "Masukkan nomor VIRTUAL ACCOUNT yang tertera pada halaman konfirmasi, dan tekan BENAR",
                        "Pilih rekening yang menjadi sumber dana yang akan didebet, lalu tekan YA untuk konfirmasi transaksi",
                    ],
                },
                {
                    via: "Permata Net",
                    steps: [
                        "Buka website PermataNet: https://new.permatanet.com",
                        "Masukkan user ID & Password",
                        "Pilih Pembayaran Tagihan",
                        "Pilih Virtual Account",
                        "Masukkan 16 digit nomor Virtual Account yang tertera pada halaman konfirmasi (868001XXXXXXXXXX)",
                        "Masukkan nominal pembayaran sesuai dengan yang ditagihkan",
                        "Muncul Konfirmasi pembayaran",
                        "Masukkan otentikasi transaksi/token",
                        "Transaksi selesai",
                    ],
                },
                {
                    via: "Permata Mobile",
                    steps: [
                        "Buka aplikasi PermataMobile Internet (Android/iPhone)",
                        "Masukkan User ID & Password",
                        "Pilih Pembayaran Tagihan",
                        "Pilih Virtual Account",
                        "Masukkan 16 digit nomor Virtual Account yang tertera pada halaman konfirmasi (868001XXXXXXXXXX)",
                        "Masukkan nominal pembayaran sesuai dengan yang ditagihkan",
                        "Muncul Konfirmasi pembayaran",
                        "Masukkan otentikasi transaksi/token",
                        "Transaksi selesai",
                    ],
                },
            ],
        },
        {
            paymentName: "CIMB NIAGA VA",
            data: [
                {
                    via: "ATM CIMB Niaga",
                    steps: [
                        "Masukkan kartu ATM dan PIN kartu CIMB Anda",
                        "Pilih Menu Transfer > Rekening CIMB Niaga Rekening Ponsel Lain > Rekening CIMB Niaga Lain",
                        "Masukkan jumlah pembayaran sesuai dengan tagihan",
                        "Masukkan kode virtual account pada kolom rekening penerima",
                        "Ikuti instruksi untuk menyelesaikan transaksi",
                    ],
                },
                {
                    via: "Go Mobile",
                    steps: [
                        "Login ke Go-Mobile",
                        "Pilih menu Transfer > Rekening Ponsel / CIMB Niaga",
                        "Pilih rekening sumber anda: CASA atau Rekening Ponsel",
                        "Pilih rekening tujuan : CASA",
                        "Masukkan kode virtual account pada kolom nomor rekening penerima",
                        "Masukkan jumlah pembayaran sesuai dengan tagihan",
                        "Ikuti instruksi untuk menyelesaikan transaksi",
                    ],
                },
                {
                    via: " CIMB Virtual Account dengan CIMB Clicks",
                    steps: [
                        "Login ke CIMB clicks",
                        "Pilih menu Bayar Tagihan / Pay Bills",
                        "Pilih Rekening Sumber / Source Account dan Jenis Pembayaran / Payment Type > Virtual Account",
                        "Masukkan nomor virtual account 11990XXXXXXXXXXX",
                        "Nomor, nama virtual account dan jumlah billing ditampilkan pada layar",
                        "Masukkan 6 digit mPIN dan tekan tombol Submit",
                        "Konfirmasi pembayaran ditampilkan pada layar",
                    ],
                },
                {
                    via: "CIMB Virtual Account dengan Internet Banking Bank Lain",
                    steps: [
                        "Login ke internet banking",
                        "Pilih menu transfer ke Bank Lain Online",
                        "Pilih bank tujuan Bank CIMB Niaga (kode bank: 022)",
                        "Pilih bank tujuan Bank CIMB Niaga (kode bank: 022)",
                        "Masukkan jumlah pembayaran sesuai tagihan",
                        "Nomor, nama virtual account dan jumlah billing ditampilkan pada layar",
                        "Ikuti instruksi untuk menyelesaikan transaksi",
                        "Konfirmasi pembayaran ditampilkan pada layar",
                    ],
                },
                {
                    via: "ATM Bersama / Prima",
                    steps: [
                        "Pada Menu utama, pilih Transaksi Lainnya.",
                        "Pilih Transfer.",
                        "Pilih Antar Bank Online.",
                        "Masukkan nomor Virtual Account (kode bank 022 dan kode Virtual account).",
                        "Masukkan jumlah tagihan yang akan Anda bayar secara lengkap. Pembayaran dengan jumlah yang tidak akan otomatis ditolak.",
                        "Pada halaman konfirmasi transfer akan muncul jumlah yang dibayarkan & nomor rekening tujuan. Jika informasinya telah tekan tombol Benar.",
                    ],
                },
            ],
        },
        {
            paymentName: "BNI VA",
            data: [
                {
                    via: "Ibank Personal (Internet Banking)",
                    steps: [
                        "Akses ibank.bni.co.id",
                        "Masukkan User ID dan password",
                        "Klik menu Transfer, lalu pilih 'Virtual Account Billing'.",
                        "Kemudian masukan nomor Virtual Account Anda (contoh: 98886699xxxxxxxx) yang hendak dibayarkan. Lalu pilih rekening debet yang akan digunakan. Kemudian tekan 'Lanjut'",
                        "Kemudin tagihan yang harus dibayarkan akan muncul pada layar konfirmasi.",
                        "Kemudin tagihan yang harus dibayarkan akan muncul pada layar konfirmasi.",
                        "Pembayaran Anda telah berhasil",
                        "Simpan bukti transaksi",
                    ],
                },
                {
                    via: "mobile banking BNI",
                    steps: [
                        "Akses BNI Mobile Banking",
                        "Masukkan user ID dan password.",
                        "Pilih menu 'Transfer'.",
                        "Pilih menu 'Virtual Account Billing' kemudian pilih rekening debet.",
                        "Masukkan nomor Virtual Account Anda (contoh:98886699xxxxxxxx) pada menu 'input baru'.",
                        "Tagihan yang harus dibayarkan akan muncul pada layar konfirmasi.",
                        "Konfirmasi transaksi dan masukkan Password Transaksi.",
                        "Pembayaran Anda Telah Berhasil.",
                        "Simpan bukti transaksi",
                    ],
                },
                {
                    via: "ATM Prima",
                    steps: [
                        "ATM Prima",
                        "ATM Prima",
                        "ATM Prima",
                        "Masukkan kode bank BNI (009) dan 16 Digit Nomor Virtual Account (contoh:98886699xxxxxxxx).",
                        "Masukkan nominal transfer sesuai tagihan atau kewajiban Anda. pastikan nominal sesuai",
                        "Konfirmasi rincian Anda akan tampil di layar, cek dan tekan 'Ya' untuk melanjutkan.",
                        "Transaksi Berhasil.",
                    ],
                },
                {
                    via: "ATM Bersama",
                    steps: [
                        "Masukkan kartu ke mesin ATM Bersama",
                        "Pilih 'Transaksi Lainnya'.",
                        "Pilih menu 'Transfer'.",
                        "Pilih menu 'Transfer'.",
                        "Masukkan kode bank BNI (009) dan 16 Digit Nomor Virtual Account (contoh:98886699xxxxxxxx).",
                        "Masukkan nominal transfer sesuai tagihan atau kewajiban Anda. pastikan nominal sesuai",
                        "Masukkan nominal transfer sesuai tagihan atau kewajiban Anda. pastikan nominal sesuai",
                        "Transaksi Berhasil.",
                    ],
                },
                {
                    via: "ATM BNI",
                    steps: [
                        "Masukkan Kartu Anda.",
                        "Pilih Bahasa.",
                        "Masukkan PIN ATM Anda.",
                        "Masukkan PIN ATM Anda.",
                        "Pilih 'Transfer'.",
                        "Pilih Jenis rekening yang akan Anda gunakan (Contoh: 'Dari Rekening Tabungan').",
                        "Pilih 'Virtual Account Billing'.",
                        "Masukkan nomor Virtual Account Anda (contoh:98886699xxxxxxxx).",
                        "Tagihan yang harus dibayarkan akan muncul pada layar konfirmasi.",
                        "Konfirmasi, apabila telah sesuai, lanjutkan transaksi.",
                        "Konfirmasi, apabila telah sesuai, lanjutkan transaksi.",
                    ],
                },
            ],
        },
    ];
    const vaNumber = useRef(null);
    const dueDate = new Date(payment.created_at);
    const [timer, setTimer] = useState("00:00:00");

    dueDate.setMinutes(dueDate.getMinutes() + 60 * 24);

    const countDownTimer = () => {
        setInterval(function () {
            var now = new Date().getTime();
            var remainingTime = dueDate - now;
            const second = 1000;

            const minute = second * 60;

            const hour = minute * 60;

            const day = hour * 24;

            const daysLeft = Math.trunc(remainingTime / day);

            const hoursLeft = Math.trunc((remainingTime % day) / hour);

            const minutesLeft = Math.trunc((remainingTime % hour) / minute);

            const secondsLeft = Math.trunc((remainingTime % minute) / second);
            setTimer(
                `${hoursLeft < 10 ? "0" + hoursLeft : hoursLeft}:${
                    minutesLeft < 10 ? "0" + minutesLeft : minutesLeft
                }:${secondsLeft < 10 ? "0" + secondsLeft : secondsLeft}`
            );
        }, 1000);
    };

    useEffect(() => {
        countDownTimer();
    }, []);

    return (
        <Layout>
            <Container>
                <div className='max-w-sm w-full mx-auto shadow-md border p-6'>
                    <div className='flex py-2 justify-center items-center space-x-1 '>
                        <BiTimer size={"1.5em"} className='text-primary-500' />
                        <p className='text-warning-500 font-medium'>{timer}</p>
                    </div>
                    <div className='  divide-y-2  '>
                        <div className='flex py-4 items-center justify-between'>
                            <p>{payment.payment_name}</p>
                            <div className='w-14 h-8  relative  rounded-md '>
                                <Image
                                    src={payment.payment_image_url}
                                    layout='fill'
                                    objectFit='contain'
                                    alt='payment image'
                                />
                            </div>
                        </div>
                        <div className='py-4'>
                            <p className='text-sm'>Nomer VA</p>
                            <div className='flex items-center justify-between'>
                                <p
                                    ref={vaNumber}
                                    className='text-xl text-primary-500 font-bold'>
                                    {payment.va_number}
                                </p>
                                {/* <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(
                                            vaNumber.current.innerText
                                        );
                                        toast.success(
                                            "nomer va berhasil disalin"
                                        );
                                    }}
                                    className='py-1 px-2 rounded-md text-sm bg-secondary-500 text-white'>
                                    salin
                                </button> */}
                            </div>
                        </div>
                        <div className='py-4'>
                            <Disclosure>
                                {({ open }) => (
                                    <>
                                        <Disclosure.Button
                                            className={
                                                "flex items-center py-1 px-2 w-full justify-between"
                                            }>
                                            <p className='text-sm'>
                                                Cara Pembayaran
                                            </p>

                                            <BiChevronDown
                                                size={"1.5em"}
                                                className={classNames(
                                                    "text-secondary-500 transition-all",
                                                    open
                                                        ? "rotate-180 transform"
                                                        : ""
                                                )}
                                            />
                                        </Disclosure.Button>
                                        <Disclosure.Panel
                                            as='div'
                                            className={
                                                "divide-y-2 divide-slate-400"
                                            }>
                                            {howToPay
                                                .filter(
                                                    (item) =>
                                                        item.paymentName ===
                                                        payment.payment_name
                                                )
                                                .map((item, index) =>
                                                    item.data.map(
                                                        (item, index) => (
                                                            <Disclosure
                                                                key={index}
                                                                as='div'
                                                                className='block '>
                                                                {({ open }) => (
                                                                    <>
                                                                        <Disclosure.Button
                                                                            className={
                                                                                "flex items-center bg-gray-200   p-1 px-2 w-full justify-between"
                                                                            }>
                                                                            <p className='text-xs   text-gray-600'>
                                                                                {
                                                                                    item.via
                                                                                }
                                                                            </p>

                                                                            <BiChevronDown
                                                                                size={
                                                                                    "1.5em"
                                                                                }
                                                                                className={classNames(
                                                                                    "text-secondary-500 transition-all",
                                                                                    open
                                                                                        ? "rotate-180 transform"
                                                                                        : ""
                                                                                )}
                                                                            />
                                                                        </Disclosure.Button>
                                                                        <Disclosure.Panel>
                                                                            <ul className='list-decimal p-2 bg-slate-50 '>
                                                                                {item.steps.map(
                                                                                    (
                                                                                        item,
                                                                                        index
                                                                                    ) => (
                                                                                        <li
                                                                                            key={
                                                                                                index
                                                                                            }
                                                                                            className='text-sm ml-4 text-gray-500'>
                                                                                            {
                                                                                                item
                                                                                            }
                                                                                        </li>
                                                                                    )
                                                                                )}
                                                                            </ul>
                                                                        </Disclosure.Panel>
                                                                    </>
                                                                )}
                                                            </Disclosure>
                                                        )
                                                    )
                                                )}
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                        </div>
                        <div className='  py-4   '>
                            <div>
                                <h2 className='text-gray-400  font-medium mb-1'>
                                    {payment.name}
                                </h2>
                            </div>
                            <div className='flex justify-between'>
                                <p className='text-sm'>Nominal wakaf</p>
                                <p className='text-sm'>
                                    {formatToCurreny(payment.given_amount)}
                                </p>
                            </div>
                            <div className='flex justify-between'>
                                <p className='text-sm'>
                                    Biaya pemeliharaan sistem
                                </p>
                                <p className='text-sm'>
                                    {formatToCurreny(payment.maintenance_fee)}
                                </p>
                            </div>
                            <div className='flex justify-between'>
                                <p className='text-sm'>
                                    Biaya Transaksi ({payment.payment_name})
                                </p>
                                <p className='text-sm'>
                                    {formatToCurreny(payment.payment_fee)}
                                </p>
                            </div>
                            <div className='flex justify-between mt-4'>
                                <p className='  font-medium text-secondary-500'>
                                    Total Pembayaran
                                </p>
                                <p className='  font-medium text-secondary-500'>
                                    {formatToCurreny(payment.total_amount)}
                                </p>
                            </div>
                            <Link href='/me/dashboard'>
                                <a className='block text-center py-2 mt-8 bg-primary-500 text-white rounded-md'>
                                    Kembali
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </Container>
        </Layout>
    );
}

export async function getServerSideProps({ query, req, res }) {
    let payment = {};
    const { id } = query;
    await axios
        .get(`/me/payments/${id}`, {
            headers: {
                Authorization: `Bearer ${getCookie("token", { req, res })}`,
            },
        })
        .then((response) => {
            payment = response.data.payment;
        });

    return {
        props: {
            payment,
        },
    };
}
