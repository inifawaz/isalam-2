import Image from "next/image";
import React from "react";
import { HiUserCircle } from "react-icons/hi";
import formatToCurreny from "../utils/formatToCurreny";

export default function PewakafItem({ data }) {
    return (
        <div className='flex items-center py-2 space-x-2'>
            <div>
                {data.avatar_url ? (
                    <div className='relative h-10 w-10 rounded-full overflow-hidden '>
                        <Image
                            src={data.avatar_url}
                            layout='fill'
                            alt='avatar'
                        />
                    </div>
                ) : (
                    <HiUserCircle className='h-10 w-10 text-gray-300' />
                )}
            </div>
            <div>
                <p className='text-sm leading-none'>{data.name}</p>
                <div className='flex items-center space-x-2'>
                    <p className='text-secondary-500 text-sm'>
                        {formatToCurreny(data.given_amount)}
                    </p>

                    <div className='h-1 w-1 rounded-full bg-gray-400 '></div>
                    <time className='text-sm leading-none text-gray-400'>
                        {data.paid_at}
                    </time>
                </div>
            </div>
        </div>
    );
}
