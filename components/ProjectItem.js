import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";

import {
    HiOutlineLocationMarker,
    HiOutlineUserGroup,
    HiOutlineTag,
} from "react-icons/hi";
import { BiTimer } from "react-icons/bi";
import AppContext from "../context/AppContext";
import formatToCurreny from "../utils/formatToCurreny";

export default function ProjectItem({ data, href }) {
    const { setPageLoading } = useContext(AppContext);
    const classNames = (...classes) => {
        return classes.filter(Boolean).join(" ");
    };

    return (
        <Link href={`${href}`}>
            <div
                onClick={() => setPageLoading(true)}
                className=' h-fit cursor-pointer  transition-all'>
                {data.featured_image_url ? (
                    <div className='relative shadow-md aspect-square'>
                        {data.is_shown == 0 && (
                            <div className='absolute py-4 inset-x-0 top-220 z-10 flex items-center justify-center bg-black/50'>
                                <p className='text-white text-2xl'>
                                    Disembunyikan
                                </p>
                            </div>
                        )}

                        {data.is_ended == 1 && (
                            <div className='absolute inset-0 z-10 flex items-center justify-center bg-black/50'>
                                <p className='text-white text-2xl'>selesai</p>
                            </div>
                        )}

                        <Image
                            src={data.featured_image_url}
                            layout='fill'
                            alt='project image'
                        />
                    </div>
                ) : (
                    <div className='relative bg-gray-800 shadow-md aspect-square'></div>
                )}

                <div className='p-4 bg-white border shadow-md'>
                    <div className='flex space-x-4 items-center'>
                        <div className='flex items-center space-x-1'>
                            <HiOutlineTag className='text-gray-400' />
                            <p className='text-xs text-gray-400'>
                                {data.category}
                            </p>
                        </div>
                        <div className='flex items-center space-x-1'>
                            <HiOutlineLocationMarker className='text-gray-400' />
                            <p className='text-xs text-gray-400'>
                                {data.location}
                            </p>
                        </div>
                    </div>
                    <h1 className='text-primary-600 my-1 text-lg font-medium line-clamp-2'>
                        {data.name}
                    </h1>
                    <div className='flex justify-between items-center'>
                        <div>
                            <p className='text-xs text-gray-400 leading-none'>
                                Terkumpul{" "}
                                {data.is_target == 1 ? (
                                    <span>
                                        {data.percent_collected_amount}%
                                    </span>
                                ) : null}
                            </p>
                            <p className='text-sm text-emerald-500'>
                                {formatToCurreny(data.collected_amount)}
                            </p>
                        </div>
                        {data.is_target == 1 ? (
                            <div>
                                <p className='text-xs text-gray-400 leading-none text-right'>
                                    Target
                                </p>
                                <p className='text-sm text-primary-600'>
                                    {formatToCurreny(data.target_amount)}
                                </p>
                            </div>
                        ) : null}
                    </div>
                    <div
                        className={`h-1 rounded-full ${
                            data.is_target == 1 ? "bg-gray-200" : null
                        } mt-1`}>
                        {data.is_target == 1 ? (
                            <div
                                className='h-1 rounded-full bg-emerald-500'
                                style={{
                                    width: `${
                                        data.percent_collected_amount > 100
                                            ? "100%"
                                            : data.percent_collected_amount +
                                              "%"
                                    }`,
                                }}></div>
                        ) : null}
                    </div>
                    <div className='flex justify-between items-center mt-2'>
                        <div className='flex items-center space-x-1'>
                            <HiOutlineUserGroup className='text-gray-400' />
                            <p className='text-xs text-gray-400'>
                                {data.total_backers} Pewakaf
                            </p>
                        </div>
                        {data.is_limited_time == 1 ? (
                            <div className='flex items-center space-x-1'>
                                <BiTimer
                                    size={"1.2em"}
                                    className='text-gray-400'
                                />
                                <p className='text-xs text-gray-400'>
                                    {data.days_left} hari lagi
                                </p>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </Link>
    );
}
