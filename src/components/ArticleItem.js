import Link from 'next/link'
import React from 'react'
import { BiPurchaseTag } from 'react-icons/bi'
import Card from './Card'
import Thumbnail from './Thumbnail'

const ArticleItem = ({ data, forAdmin }) => {
    return (
        <Link href={`${forAdmin ? '/admin' : ''}/articles/${data.id}`}>
            <Card padding='p-0 flex h-full flex-col group'>
                <Thumbnail data={data} />
                <div className='p-4 grow flex justify-end h-fit flex-col'>
                    <div>
                        {data.category && (
                            <div className='mr-2 mt-1 flex items-center space-x-1'>
                                <BiPurchaseTag className='h-4 w-4 text-brand-600' />
                                <p className='text-dark-400 text-xs font-semibold'>{data.category}</p>
                            </div>
                        )}
                    </div>
                    <div>

                        <h1 className='text-brand-700 font-semibold text-lg line-clamp-2'>{data.title}</h1>
                        <p className='line-clamp-3 text-dark-600 mt-2 prose-sm prose-slate  prose' dangerouslySetInnerHTML={{
                            __html: data.content
                        }}></p>
                    </div>
                </div>
            </Card>
        </Link>

    )
}

export default ArticleItem
