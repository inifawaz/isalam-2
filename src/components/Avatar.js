import React from 'react'
import { HiUserCircle } from 'react-icons/hi2'

const Avatar = ({ size = 10, className, avatar }) => {
    const width = `h-${size}`
    const height = `w-${size}`
    return (
        <div className={`${width} ${height} flex items-center justify-center  overflow-hidden rounded-full ${className}`}>
            {avatar ? (
                <img src={avatar} alt="avatar" className='object-contain' />
            ) : <HiUserCircle className={`h-full w-full text-muted`} />}
        </div>
    )
}

export default Avatar
