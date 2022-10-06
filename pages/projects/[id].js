import { RadioGroup, Tab } from "@headlessui/react";
import Image from "next/image";
import React, { useContext, useEffect, useRef, useState } from "react";
import Container from "../../components/Container";
import Layout from "../../components/Layout";
import ProjectItem from "../../components/ProjectItem";
import { axios } from "../../lib/axiosInstance";

import {
    HiOutlineLocationMarker,
    HiOutlineTag,
    HiOutlineUserGroup,
    HiUserCircle,
} from "react-icons/hi";
import PewakafItem from "../../components/PewakafItem";
import UpdateItem from "../../components/UpdateItem";
import { BiTimer } from "react-icons/bi";
import AppContext from "../../context/AppContext";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as yup from "yup";
import { number } from "yup/lib/locale";
import PageLoading from "../../components/PageLoading";
import Button from "../../components/Button";
import { data } from "autoprefixer";
import formatToCurreny from "../../utils/formatToCurreny";
import Link from "next/link";
import toast from "react-hot-toast";

export default function ProjectDetail({
    project,
    information,
    backers,
    reports,
}) {
    const { pageLoading, setPageLoading, dialogLogin, setDialogLogin } =
        useContext(AppContext);
    const [isLoading, setIsLoading] = useState(false);
    const elamount = useRef(null);
    const { user, token } = useContext(AppContext);

    const [choiceAmount, setChoiceAmount] = useState("");
    const selisih = project.target_amount - project.collected_amount;
    console.log(selisih);
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            amount: choiceAmount,
        },
        validationSchema: yup.object({
            amount: yup
                .number("harap isi dengan angka")
                // .max(
                //     selisih,
                //     `tidak boleh melebihi ${formatToCurreny(selisih)}`
                // )
                .required("silahkan isi nominal wakaf anda"),
        }),
    });
    const router = useRouter();
    function classNames(...classes) {
        return classes.filter(Boolean).join(" ");
    }
    const [tabs, setTabs] = useState([
        {
            name: "Pewakaf",
            total: backers.length,
        },
        {
            name: "Informasi",
            total: information.length,
        },
        {
            name: "Laporan",
            total: reports.length,
        },
    ]);
    const handleBtnWakafSekarang = () => {
        // if (formik.errors.amount) return;

        // if (formik.values.amount == "") {
        //     elamount.current.scrollIntoView({
        //         behavior: "smooth",
        //         block: "center",
        //     });
        // }
        if (!user && !token) {
            // router.push("/login");
            toast.error("harap login terlebih dahulu");
            setDialogLogin(true);
        } else {
            // if (formik.errors.amount) return;
            if (formik.values.amount) setIsLoading(true);

            if (formik.values.amount == "") {
                elamount.current.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                });
            }
            if (formik.values.amount) {
                router.push(
                    `/projects/${project.id}/create-payment?amount=${formik.values.amount}`
                );
            }
        }
    };

    useEffect(() => {
        setPageLoading(false);
    }, []);

    return (
        <Layout>
            <Container className={"grid md:grid-cols-5 gap-8"}>
                <div className='col-span-3 h-fit'>
                    <div>
                        <ProjectItem
                            href={`/projects/${project.id}`}
                            data={project}
                        />
                        <div
                            className='p-4 bg-white border prose w-full shadow-md'
                            dangerouslySetInnerHTML={{
                                __html: project.description,
                            }}></div>
                    </div>
                    <Tab.Group
                        className='  bg-white shadow-md border'
                        as={"div"}>
                        <Tab.List
                            className={
                                "border-b bg-primary-50 z-10 sticky top-[58px]"
                            }>
                            {tabs.map((item, index) => (
                                <Tab
                                    key={index}
                                    className={({ selected }) =>
                                        classNames(
                                            " text-sm font-medium  py-3 md:px-6 px-4 focus:outline-none ",
                                            selected
                                                ? "border-b-2  text-primary-500 border-primary-500"
                                                : "text-gray-400"
                                        )
                                    }>
                                    {item.name}
                                    {item.total > 0 ? (
                                        <span className='text-xs bg-warning-500 px-2 ml-4 py-1 text-white rounded-sm'>
                                            {item.total}
                                        </span>
                                    ) : null}
                                </Tab>
                            ))}
                        </Tab.List>
                        <Tab.Panels className={"md:p-6 p-4"}>
                            <Tab.Panel className={"flex flex-col divide-y-2"}>
                                {backers.map((item, index) => (
                                    <PewakafItem key={index} data={item} />
                                ))}
                            </Tab.Panel>
                            <Tab.Panel>
                                <ol className='border-l relative  border-gray-300'>
                                    {information.map((item, index) => (
                                        <UpdateItem key={index} data={item} />
                                    ))}
                                </ol>
                            </Tab.Panel>
                            <Tab.Panel>
                                <ol className='border-l relative  border-gray-300'>
                                    {reports.map((item, index) => (
                                        <UpdateItem key={index} data={item} />
                                    ))}
                                </ol>
                            </Tab.Panel>
                        </Tab.Panels>
                    </Tab.Group>
                    {project.is_ended == 1 ? (
                        <div>
                            <Link href='/projects'>
                                <a className='block py-2 text-sm bg-primary-500 text-white rounded-md text-center mt-4'>
                                    Lihat Program Lainnya
                                </a>
                            </Link>
                        </div>
                    ) : (
                        <>
                            <div ref={elamount} className={`mt-4 md:pt-0  `}>
                                <p className='text-gray-500 tracking-wider '>
                                    Pilih Nominal Wakaf
                                </p>
                                <RadioGroup
                                    className={"flex flex-wrap"}
                                    value={formik.values.amount}
                                    onChange={setChoiceAmount}>
                                    {project.choice_given_amount.map(
                                        (item, index) => (
                                            <RadioGroup.Option
                                                key={index}
                                                value={item}>
                                                {({ checked }) => (
                                                    <button
                                                        className={classNames(
                                                            "text-xs py-1 px-3 mr-2 mt-2  ring-1 ring-gray-300",
                                                            checked
                                                                ? "bg-secondary-500 text-white"
                                                                : "bg-gray-100"
                                                        )}>
                                                        {formatToCurreny(item)}
                                                    </button>
                                                )}
                                            </RadioGroup.Option>
                                        )
                                    )}
                                </RadioGroup>
                                <label className='relative block mt-4'>
                                    <span className='absolute inset-y-0 text-sm left-0 flex items-center pl-3 text-gray-700'>
                                        Rp
                                    </span>
                                    <input
                                        name='amount'
                                        type='number'
                                        value={formik.values.amount}
                                        onChange={formik.handleChange}
                                        className='placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-gray-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-secondary-300 focus:ring-secondary-200 focus:ring sm:text-sm text-sm focus:ring-opacity-50'
                                        placeholder='atau masukkan nominal wakaf disini'
                                    />
                                    {formik.errors.amount && (
                                        <small className='absolute text-warning-500'>
                                            {formik.errors.amount}
                                        </small>
                                    )}
                                </label>
                            </div>
                            <div className='  md:static sticky bottom-0 z-10    py-4 md:py-6'>
                                <Button
                                    color={"secondary"}
                                    loading={isLoading}
                                    onClick={handleBtnWakafSekarang}>
                                    {!user && !token
                                        ? "Masuk Untuk Mulai Berwakaf"
                                        : "Wakaf Sekarang"}
                                </Button>
                            </div>
                        </>
                    )}
                </div>
                <div className='col-span-2 hidden md:block'>
                    <div className='p-4 md:p-6 sticky top-[58px] bg-white border shadow-md'>
                        <div className='flex space-x-4 items-center mb-2'>
                            <div className='flex items-center space-x-1'>
                                <HiOutlineTag className='text-gray-400' />
                                <p className='text-xs text-gray-400'>
                                    {project.category}
                                </p>
                            </div>
                            <div className='flex items-center space-x-1'>
                                <HiOutlineLocationMarker className='text-gray-400' />
                                <p className='text-xs text-gray-400'>
                                    {project.location}
                                </p>
                            </div>
                        </div>
                        <h1 className='text-primary-600 my-1 text-lg font-medium'>
                            {project.name}
                        </h1>
                        <div className='flex justify-between items-center'>
                            <div>
                                <p className='text-xs text-gray-400 leading-none'>
                                    Terkumpul{" "}
                                    {project.is_target == 1 ? (
                                        <span>
                                            {project.percent_collected_amount}%
                                        </span>
                                    ) : null}
                                </p>
                                <p className='text-sm text-emerald-500'>
                                    {formatToCurreny(project.collected_amount)}
                                </p>
                            </div>
                            {project.is_target == 1 ? (
                                <div>
                                    <p className='text-xs text-gray-400 leading-none text-right'>
                                        Target
                                    </p>
                                    <p className='text-sm text-primary-600'>
                                        {formatToCurreny(project.target_amount)}
                                    </p>
                                </div>
                            ) : null}
                        </div>
                        <div
                            className={`h-1 rounded-full ${
                                project.is_target === "1" ? "bg-gray-200" : null
                            } mt-1`}>
                            {project.is_target === "1" ? (
                                <div
                                    className='h-1 rounded-full bg-emerald-500'
                                    style={{
                                        width: `${
                                            project.percent_collected_amount >
                                            100
                                                ? "100%"
                                                : project.percent_collected_amount +
                                                  "%"
                                        }`,
                                    }}></div>
                            ) : null}
                        </div>
                        <div className='flex justify-between items-center mt-2'>
                            <div className='flex items-center space-x-1'>
                                <HiOutlineUserGroup className='text-gray-400' />
                                <p className='text-xs text-gray-400'>
                                    {project.total_backers} Pewakaf
                                </p>
                            </div>
                            {project.is_limited_time == 1 ? (
                                <div className='flex items-center space-x-1'>
                                    <BiTimer
                                        size={"1.2em"}
                                        className='text-gray-400'
                                    />
                                    <p className='text-xs text-gray-400'>
                                        {project.days_left} hari lagi
                                    </p>
                                </div>
                            ) : null}
                        </div>
                        {project.is_ended == 1 ? (
                            <div>
                                <Link href='/projects'>
                                    <a className='block py-2 text-sm bg-primary-500 text-white rounded-md text-center mt-4'>
                                        Lihat Program Lainnya
                                    </a>
                                </Link>
                            </div>
                        ) : (
                            <>
                                <div className='mt-4 mb-4'>
                                    <p className='text-gray-500 tracking-wider '>
                                        Pilih Nominal Wakaf
                                    </p>
                                    <RadioGroup
                                        className={"flex flex-wrap"}
                                        value={formik.values.amount}
                                        onChange={setChoiceAmount}>
                                        {project.choice_given_amount.map(
                                            (item, index) => (
                                                <RadioGroup.Option
                                                    key={index}
                                                    value={item}>
                                                    {({ checked }) => (
                                                        <button
                                                            className={classNames(
                                                                "text-xs py-1 px-3 mr-2 mt-2  ring-1 ring-gray-300",
                                                                checked
                                                                    ? "bg-secondary-500 text-white"
                                                                    : "bg-gray-100"
                                                            )}>
                                                            {formatToCurreny(
                                                                item
                                                            )}
                                                        </button>
                                                    )}
                                                </RadioGroup.Option>
                                            )
                                        )}
                                    </RadioGroup>
                                    <label className='relative block mt-4'>
                                        <span className='absolute inset-y-0 text-sm left-0 flex items-center pl-3 text-gray-700'>
                                            Rp
                                        </span>
                                        <input
                                            name='amount'
                                            type='number'
                                            value={formik.values.amount}
                                            onChange={formik.handleChange}
                                            className='placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-gray-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-secondary-300 focus:ring-secondary-200 focus:ring sm:text-sm text-sm focus:ring-opacity-50'
                                            placeholder='atau masukkan nominal wakaf disini'
                                        />
                                    </label>
                                </div>

                                <Button
                                    color={"secondary"}
                                    loading={isLoading}
                                    onClick={handleBtnWakafSekarang}>
                                    {!user && !token
                                        ? "Masuk Untuk Mulai Berwakaf"
                                        : "Wakaf Sekarang"}
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </Container>
        </Layout>
    );
}

export async function getServerSideProps(ctx) {
    let project = [];
    let information = [];
    let reports = [];
    let backers = [];
    const { id } = ctx.query;
    await axios.get(`/projects/${id}`).then((response) => {
        project = response.data.project;
        information = response.data.information;
        reports = response.data.reports;
        backers = response.data.backers;
    });

    return {
        props: {
            project,
            information,
            reports,
            backers,
        },
    };
}
