import React from 'react'
import { HiPhoto } from 'react-icons/hi2'

const Thumbnail = ({ data }) => {
    return (
        <div className='relative  aspect-square  overflow-hidden shadow bg-amber-50 flex items-center justify-center'>

            {data?.is_completed && (
                <div className='absolute z-10  bg-black/60 text-center py-2 font-semibold text-white inset-0 flex items-center justify-center'>
                    <div className='border-2 border-white py-2 px-4'>
                        Berakhir
                    </div>
                </div>
            )}
            {data?.is_hidden && (
                <div className='absolute  bg-black/50 text-center py-2 font-semibold text-white inset-x-0 top-0 flex items-center justify-center'>
                    <div className='border-2 text-sm border-white py-1 px-2'>
                        Disembunyikan
                    </div>
                </div>
            )}
            {data?.is_selected && (
                <div className='absolute  bg-black/50 text-center py-2 font-semibold text-white inset-x-0 bottom-0 flex items-center justify-center'>
                    <div className='border-2 border-white text-sm py-1 px-2'>
                        Pilihan
                    </div>
                </div>
            )}
            {data?.featured_image_url ? (
                <img src={data.featured_image_url} alt="Fetured Image" className='object-contain shadow' />
            ) : <HiPhoto className='h-20 w-20 text-gray-400' />}
        </div>
    )
}

export default Thumbnail
