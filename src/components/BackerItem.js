import formatToCurreny from '@/functions/formatToCurreny'
import React from 'react'

const BackerItem = ({ data }) => {
    const convertDate = (value) => {
        const date = new Date(value?.toString())
        const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
        const month = date.getMonth() + 1
        const year = date.getFullYear()
        const hour = date.getHours()
        const minute = date.getMinutes()
        return (day + '/' + (month < 10 ? "0" + month : month) + '/' + year + ' ' + (hour < 10 ? "0" + hour : hour) + ':' + (minute < 10 ? "0" + minute : minute))
    }
    return (
        <div className='py-4'>
            <div className='flex justify-between items-center'>
                <p className='text-dark-500 text-sm'>{data.is_anonim ? 'Hamba Alloh' : data.on_behalf} </p>
                <span className='text-dark-500 text-xs'>{convertDate(data.created_at)}</span>
            </div>
            <p className='text-success-500 text-sm font-semibold'>{formatToCurreny(data.amount)} </p>
        </div>
    )
}

export default BackerItem
