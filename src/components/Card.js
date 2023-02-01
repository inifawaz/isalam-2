import clsx from 'clsx'
import React from 'react'

const Card = ({ children, className, padding = 'p-6', bgColor = 'bg-white', core = 'shadow rounded-md border overflow-hidden' }) => {
    return (
        <div className={clsx(core, padding, className, bgColor, {
            core: core,
            className: className,
            bgColor: bgColor,
            padding: padding
        })}>{children}</div>
    )
}

export default Card
