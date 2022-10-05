import { Tab } from "@headlessui/react";
import { getCookie } from "cookies-next";
import { useFormik } from "formik";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AdminNav from "../../../components/AdminNav";
import AdminProjectItem from "../../../components/AdminProjectItem";
import Button from "../../../components/Button";
import Container from "../../../components/Container";
import Input from "../../../components/Input";
import Layout from "../../../components/Layout";
import ProjectItem from "../../../components/ProjectItem";
import { axios } from "../../../lib/axiosInstance";
import { useRouter } from "next/router";

export default function Users() {
    const classNames = (...classes) => classes.filter(Boolean).join(" ");
    const formik = useFormik({
        initialValues: {
            full_name: "",
            phone_number: "",
            email: "",
            password: "",
        },
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const handleSubmit = async (values) => {
        setIsLoading(true);
        await axios
            .post("/admin", values, {
                headers: {
                    Authorization: `Bearer ${getCookie("token")}`,
                },
            })
            .then((response) => {
                toast.success(response?.data?.message);
                router.push("/admin/users");
            })
            .catch((error) => {
                toast.error("ada yang salah, coba lagi nanti");
                console.log(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };
    return (
        <Layout>
            <Container className={"flex space-x-8 "}>
                <AdminNav />
                <div className='w-full'>
                    <div className=''>
                        <h1 className='text-2xl font-semibold tracking-wider text-gray-500 mb-2'>
                            Buat Admin Baru
                        </h1>
                        <form onSubmit={formik.handleSubmit}>
                            <Input
                                label={"Nama Lengkap"}
                                name='full_name'
                                value={formik.values.full_name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={
                                    formik.touched.full_name &&
                                    formik.errors.full_name
                                }
                            />
                            <Input
                                label={"Nomer Telepon"}
                                name='phone_number'
                                value={formik.values.phone_number}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={
                                    formik.touched.phone_number &&
                                    formik.errors.phone_number
                                }
                            />
                            <Input
                                label={"Email"}
                                name='email'
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={
                                    formik.touched.email && formik.errors.email
                                }
                            />
                            <Input
                                label={"Password"}
                                name='password'
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={
                                    formik.touched.password &&
                                    formik.errors.password
                                }
                            />

                            <div>
                                <Button loading={isLoading}>
                                    Simpan Perubahan
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </Container>
        </Layout>
    );
}
