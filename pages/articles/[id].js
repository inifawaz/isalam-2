import React from "react";
import { HiOutlineTag } from "react-icons/hi";
import Container from "../../components/Container";
import Layout from "../../components/Layout";
import { axios } from "../../lib/axiosInstance";
import Image from "next/image";
import Link from "next/link";

export default function ArticleDetails({ article }) {
    return (
        <Layout>
            <Container>
                <div className='max-w-2xl w-full mx-auto bg-white shadow-md rounded-md border'>
                    <div className=' h-fit flex flex-col   transition-all'>
                        <div className='relative  shadow-md aspect-square'>
                            <Image
                                src={article.featured_image_url}
                                layout='fill'
                                alt='project image'
                            />
                        </div>
                        <div className='p-4 grow '>
                            <div className='flex space-x-4 justify-between items-center'>
                                <div className='flex items-center  space-x-1'>
                                    <HiOutlineTag className='text-gray-400' />
                                    <p className='text-xs text-gray-400'>
                                        {article.topic}
                                    </p>
                                </div>
                                <time className='text-xs text-gray-400'>
                                    {article.created_at}
                                </time>
                            </div>
                            <div
                                className=' prose  w-full '
                                dangerouslySetInnerHTML={{
                                    __html: article.content,
                                }}></div>
                        </div>
                    </div>
                </div>
                <div className='  max-w-2xl w-full mx-auto mt-4'>
                    <Link href={`/articles`}>
                        <a className='block py-2 px-2 rounded text-center text-sm bg-primary-500 text-white'>
                            Kembali
                        </a>
                    </Link>
                </div>
            </Container>
        </Layout>
    );
}

export async function getServerSideProps(ctx) {
    let article = {};
    const { id } = ctx.query;
    await axios.get(`/articles/${id}`).then((response) => {
        article = response.data.article;
    });

    return {
        props: {
            article,
        },
    };
}
