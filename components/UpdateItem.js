import React from "react";

export default function UpdateItem({ data }) {
    return (
        <li className='mb-8 relative prose'>
            <div className='h-3 w-3 absolute -left-[6.1px] top-1.5  rounded-full bg-primary-400'></div>
            <div className='ml-4'>
                <time className='font-medium text-primary-600'>
                    {data.created_at}
                </time>
                <div
                    className='prose'
                    dangerouslySetInnerHTML={{
                        __html: data.content,
                    }}></div>
            </div>
        </li>
    );
}
