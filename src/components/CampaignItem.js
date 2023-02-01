import Link from 'next/link';
import React from 'react';
import Card from './Card';
import Thumbnail from './Thumbnail';
import { BiPurchaseTag, BiTimer, BiBullseye, BiGroup } from 'react-icons/bi';
import formatToCurreny from '@/functions/formatToCurreny';

const CampaignItem = ({ data, forAdmin }) => {
    return (
        <Link href={`${forAdmin ? '/admin' : ''}/campaigns/${data.id}`}>
            <Card padding='p-0 flex  flex-col '>
                <Thumbnail data={data} />
                <div className='p-4 grow  h-fit flex-col'>
                    <div className='flex  items-center flex-wrap'>
                        {data.category && (
                            <div className='mr-2 mt-1 flex items-center space-x-1'>
                                <BiPurchaseTag className='h-4 w-4 text-brand-600' />
                                <p className='text-dark-400 text-xs font-semibold'>{data.category}</p>
                            </div>
                        )}
                        {data.is_limited_time && (
                            <div className='mr-2 mt-1  flex items-center space-x-1'>
                                <BiTimer className='h-4 w-4 text-brand-600' />
                                <p className='text-dark-400 text-xs font-semibold'>{data.days_left}</p>
                            </div>
                        )}


                    </div>
                    <div className=''>

                        <h1 className='text-brand-600 my-2 font-semibold  line-clamp-2'>{data.title}</h1>

                    </div>
                    <div className='my-2'>

                        <div>
                            <div className='text-xs text-dark-400 font-semibold'>Dana Terkumpul {data.percent && data.percent}</div>
                            <div className=' font-semibold text-success-500'>{formatToCurreny(data.total_amount)}</div>
                        </div>
                        <div className='h-2 rounded-full overflow-hidden bg-dark-100 shadow-inner mt-1'>

                            <div className={`h-2 rounded-full shadow bg-success-500`} style={{
                                width: data.percent ? data.percent > 100 ? '100%' : data.percent : 0
                            }}></div>
                        </div>
                    </div>
                    <div>
                        <div className=' mr-2 mt-1  flex items-center space-x-1'>
                            <BiGroup className='h-4 w-4 text-success-500' />
                            <p className='text-success-500 text-xs font-semibold'>{data.backers.length > 0 ? data.backers.length + ' Pewakaf' : 'Belum ada pewakaf'} </p>
                        </div>
                        {data.is_target ? (
                            <div className=' mr-2 mt-1  flex items-center space-x-1'>
                                <BiBullseye className='h-4 w-4 text-brand-600' />
                                <p className='text-dark-400 text-xs font-semibold'>{formatToCurreny(data.target_amount)}</p>
                            </div>
                        ) : (
                            <div className=' mr-2 mt-1  flex items-center space-x-1'>
                                <BiBullseye className='h-4 w-4 text-brand-600' />
                                <p className='text-dark-400 text-xs font-semibold'>Tidak ada target</p>
                            </div>)
                        }
                        {data.is_limited_time ? (
                            <div className='mr-2 mt-1  flex items-center space-x-1'>
                                <BiTimer className='h-4 w-4 text-brand-600' />
                                <p className='text-dark-400 text-xs font-semibold'>{data.start_date} - {data.end_date}</p>
                            </div>
                        ) : (
                            <div className='mr-2 mt-1  flex items-center space-x-1'>
                                <BiTimer className='h-4 w-4 text-brand-600' />
                                <p className='text-dark-400 text-xs font-semibold'>Tidak terbatas waktu</p>
                            </div>
                        )}
                    </div>
                </div>
            </Card>
        </Link>

    );
};

export default CampaignItem;
