import { deleteCookie, getCookie } from "cookies-next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import AdminNav from "../../components/AdminNav";
import Container from "../../components/Container";
import Layout from "../../components/Layout";
import AppContext from "../../context/AppContext";
import { axios } from "../../lib/axiosInstance";
import formatToCurreny from "../../utils/formatToCurreny";

export default function Dashboard({ data }) {
    return (
        <Layout>
            <Container className={"flex space-x-8"}>
                <AdminNav />
                <div className='grid md:grid-cols-3 gap-4'>
                    <div className='p-4 h-fit shadow-md border'>
                        <p className='text-sm'>
                            Program Yang
                            <br /> Ditampilkan
                        </p>
                        <p className='text-xl font-medium'>
                            {data.projects_shown ?? 0}
                        </p>
                    </div>
                    <div className='p-4 h-fit shadow-md border'>
                        <p className='text-sm'>Program Yang Disembunyikan </p>
                        <p className='text-xl font-medium'>
                            {data.projects_hidden ?? 0}
                        </p>
                    </div>
                    <div className='p-4 h-fit shadow-md border'>
                        <p className='text-sm'>Total Dana yang Dikumpulkan</p>
                        <p className='text-xl font-medium'>
                            {formatToCurreny(data.collected_amount ?? 0)}
                        </p>
                    </div>
                </div>
            </Container>
        </Layout>
    );
}

export async function getServerSideProps({ req, res }) {
    let data = [];
    await axios
        .get("/admin/dashboard", {
            headers: {
                Authorization: `Bearer ${getCookie("token", { req, res })}`,
            },
        })
        .then((response) => {
            data = response.data;
        });

    return {
        props: {
            data,
        },
    };
}
