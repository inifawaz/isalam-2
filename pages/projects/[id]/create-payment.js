import React, { useContext, useState } from "react";
import Container from "../../../components/Container";
import Layout from "../../../components/Layout";
import Input from "../../../components/Input";
import { useFormik } from "formik";
import AppContext from "../../../context/AppContext";
import { axios } from "../../../lib/axiosInstance";
import { RadioGroup } from "@headlessui/react";
import { getCookie } from "cookies-next";
import Image from "next/image";
import Button from "../../../components/Button";
import { useRouter } from "next/router";
import Link from "next/link";
import formatToCurreny from "../../../utils/formatToCurreny";
import toast from "react-hot-toast";
import * as yup from "yup";
import Head from "next/head";

export default function Createtransaction({ project, paymentMethods, amount }) {
    const bbb = [
        {
            type: "Credit Card",
            code: ["VC"],
        },
        {
            type: "Virtual Account",
            code: [
                "BC",
                "M2",
                "VA",
                "I1",
                "B1",
                "BT",
                "A1",
                "AG",
                "NC",
                "BR",
                "S1",
            ],
        },
        {
            type: "Ritel",
            code: ["FT", "A2", "IR"],
        },
        {
            type: "E-Wallet",
            code: ["OV", "SA", "LF", "LA", "DA", "SL", "OL"],
        },
        {
            type: "QRIS",
            code: ["SP", "LQ", "NQ"],
        },
        {
            type: "Kredit",
            code: ["DN"],
        },
    ];
    const router = useRouter();
    function classNames(...classes) {
        return classes.filter(Boolean).join(" ");
    }
    const { user, token } = useContext(AppContext);
    const [isLoading, setIsLoading] = useState(false);
    const [isAnonim, setIsAnonim] = useState(false);

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState({
        paymentMethod: "",
        paymentName: "",
        paymentImage: "",
        totalFee: "0",
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            on_behalf: user.full_name,
        },
        validationSchema: yup.object({
            on_behalf: yup.string().required("tidak boleh kosong"),
        }),
    });

    const handleCreateTransation = async (values) => {
        setIsLoading(true);
        const project_id = project.id;

        const paymentMethod = selectedPaymentMethod.paymentMethod;
        console.log(project_id);
        console.log(amount);
        console.log(paymentMethod);

        await axios
            .post(
                "/payments",
                {
                    project_id,
                    given_amount: amount,
                    paymentMethod,
                    on_behalf: formik.values.on_behalf,
                    is_anonim: isAnonim,
                },
                {
                    headers: {
                        Authorization: `Bearer ${getCookie("token")}`,
                    },
                }
            )
            .then((response) => {
                setIsLoading(false);
                // console.log(response);
                window.open(response.data.payment.payment_url, "_blank");
                router.push(
                    `/me/payments/${response.data.payment.merchant_order_id}`
                );
            })
            .catch((error) => {
                toast.error("ada yang salah, coba lagi nanti");
                setIsLoading(false);
                console.log(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };
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
            <Container className={"min-h-screen"}>
                <div className='bg-white shadow-md max-w-xl mx-auto p-6 border'>
                    <div className='mb-4'>
                        <p className='text-primary-600 text-lg font-medium'>
                            {project.name}
                        </p>
                    </div>
                    <div className='shadow-md bg-sky-50 border p-4 rounded-md'>
                        <Input
                            label={"Program Wakaf Ini Atas Nama"}
                            placeholder='nama anda/orang tua anda/orang yang anda sayangi/dll'
                            name='on_behalf'
                            value={formik.values.on_behalf}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.on_behalf &&
                                formik.errors.on_behalf
                            }
                        />

                        <div className=''>
                            <label
                                htmlFor='small-toggle'
                                className='inline-flex relative items-center mb-1 cursor-pointer'>
                                <input
                                    type='checkbox'
                                    className='sr-only peer'
                                    id='small-toggle'
                                    checked={isAnonim}
                                    onChange={() => setIsAnonim(!isAnonim)}
                                />
                                <div
                                    className="w-9 h-5 bg-gray-200 peer-focus:outline-none
                                         peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                <p className='ml-3 text-sm '>
                                    Sembunyikan nama pewakaf
                                </p>
                            </label>
                        </div>
                    </div>
                    <div>
                        <div className='mt-8'>
                            <p className=''>Pilih Metode Pembayaran</p>
                            <RadioGroup
                                className={"flex flex-col space-y-2 divide-y-2"}
                                value={selectedPaymentMethod}
                                onChange={setSelectedPaymentMethod}>
                                {bbb.map((item, index) => {
                                    const code = item.code;
                                    return (
                                        <div key={index} className='py-4'>
                                            <h2 className='text-gray-500 text-sm mb-2'>
                                                {item.type}
                                            </h2>
                                            <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                                                {paymentMethods
                                                    .filter((item) =>
                                                        code.includes(
                                                            item.paymentMethod
                                                        )
                                                    )
                                                    .map((item, index) => (
                                                        <RadioGroup.Option
                                                            key={index}
                                                            value={item}>
                                                            {({ checked }) => (
                                                                <div className='flex flex-col  cursor-pointer items-center '>
                                                                    <div
                                                                        className={classNames(
                                                                            "w-full border-2 p-2 rounded-md",
                                                                            checked
                                                                                ? "border-secondary-500 bg-secondary-50 shadow-md"
                                                                                : ""
                                                                        )}>
                                                                        <div
                                                                            className={classNames(
                                                                                "  w-full h-14  relative  rounded-md",
                                                                                checked
                                                                                    ? ""
                                                                                    : ""
                                                                            )}>
                                                                            <Image
                                                                                src={
                                                                                    item.paymentImage
                                                                                }
                                                                                layout='fill'
                                                                                objectFit='contain'
                                                                                alt='payment image'
                                                                            />
                                                                        </div>
                                                                    </div>

                                                                    <span
                                                                        className={
                                                                            checked
                                                                                ? "text-secondary-500 text-xs"
                                                                                : "text-gray-500 text-xs"
                                                                        }>
                                                                        {
                                                                            item.paymentName
                                                                        }
                                                                    </span>
                                                                </div>
                                                            )}
                                                        </RadioGroup.Option>
                                                    ))}
                                            </div>
                                        </div>
                                    );
                                })}
                                {/* {paymentMethods.map((item, index) => (
                                    <RadioGroup.Option key={index} value={item}>
                                        {({ checked }) => (
                                            <div className='flex flex-col  cursor-pointer items-center '>
                                                <div
                                                    className={classNames(
                                                        "w-full border-2 p-2 rounded-md",
                                                        checked
                                                            ? "border-secondary-500 shadow-md"
                                                            : ""
                                                    )}>
                                                    <div
                                                        className={classNames(
                                                            "  w-full h-14  relative  rounded-md",
                                                            checked ? "" : ""
                                                        )}>
                                                        <Image
                                                            src={
                                                                item.paymentImage
                                                            }
                                                            layout='fill'
                                                            objectFit='contain'
                                                            alt='payment image'
                                                        />
                                                    </div>
                                                </div>

                                                <span
                                                    className={
                                                        checked
                                                            ? "text-secondary-500 text-sm"
                                                            : "text-gray-500 text-sm"
                                                    }>
                                                    {item.paymentName}
                                                </span>
                                            </div>
                                        )}
                                    </RadioGroup.Option>
                                ))} */}
                            </RadioGroup>
                        </div>
                    </div>
                    <div className=' my-8 py-2 border-primary-500 border-y-2 border-dashed '>
                        <div className='flex justify-between'>
                            <p className='text-sm'>Nominal wakaf</p>
                            <p className='text-sm'>{formatToCurreny(amount)}</p>
                        </div>
                        <div className='flex justify-between'>
                            <p className='text-sm'>Biaya pemeliharaan sistem</p>
                            <p className='text-sm'>
                                {formatToCurreny(project.maintenance_fee)}
                            </p>
                        </div>
                        <div className='flex justify-between'>
                            <p className='text-sm'>
                                Biaya Transaksi (
                                {selectedPaymentMethod.paymentName})
                            </p>
                            <p className='text-sm'>
                                {formatToCurreny(
                                    selectedPaymentMethod.totalFee
                                )}
                            </p>
                        </div>
                        <div className='flex justify-between mt-1'>
                            <p className=' font-semibold text-secondary-500'>
                                Total Pembayaran
                            </p>
                            <p className=' font-semibold text-secondary-500'>
                                {formatToCurreny(
                                    parseInt(selectedPaymentMethod.totalFee) +
                                        parseInt(amount) +
                                        parseInt(project.maintenance_fee)
                                )}
                            </p>
                        </div>
                    </div>
                    <Button
                        onClick={handleCreateTransation}
                        color={"secondary"}
                        loading={isLoading}
                        disabled={
                            amount == 0 ||
                            selectedPaymentMethod.totalFee == 0 ||
                            formik.values.on_behalf === ""
                                ? true
                                : false
                        }>
                        Lakukan Pembayaran
                    </Button>
                    <div className='text-center mt-4'>
                        <Link href={`/projects/${project.id}`}>
                            <a className=''>Batal</a>
                        </Link>
                    </div>
                </div>
            </Container>
        </Layout>
    );
}

export async function getServerSideProps({ req, res, query }) {
    let project = [];
    const { id, amount } = query;
    await axios.get(`/projects/${id}`).then((response) => {
        // console.log(response.data.project);
        project = response.data.project;
    });
    let paymentMethods = [];
    await axios
        .post(
            "/getpaymentmethods",
            {
                amount,
                project_id: id,
            },
            {
                headers: {
                    Authorization: `Bearer ${getCookie("token", { req, res })}`,
                },
            }
        )
        .then((response) => {
            // console.log(response);
            paymentMethods = response.data.payment_methods;
        })
        .catch((error) => {
            console.log(error.response);
        });
    console.log(query);
    return {
        props: {
            project,
            paymentMethods,
            amount,
        },
    };
}
