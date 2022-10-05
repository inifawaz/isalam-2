import React from "react";
import Image from "next/image";
import { HiOutlineTag } from "react-icons/hi";

export default function ArticleItem({ data }) {
    return (
        <div>
            <div className='relative w-full h-56'>
                <Image
                    alt='article img'
                    src={data.picture_url}
                    layout='fill'
                    objectFit='cover'
                />
            </div>
            <div className='p-6 shadow-md border'>
                <div className='flex items-center space-x-1'>
                    <HiOutlineTag className='text-gray-400' />
                    <p className='text-xs text-gray-400'>
                        {data.article_category.category}
                    </p>
                </div>
                <h1 className='text-xl text-gray-600'>{data.title}</h1>
                <div>
                    <p>{data.content}</p>
                </div>
            </div>
        </div>
    );
}
