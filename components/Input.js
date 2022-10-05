import React from "react";

export default function Input({
    label,
    type,
    name,
    value,
    onClick,
    onChange,
    onBlur,
    disabled,
    error,
    placeholder,
    accept,
}) {
    return (
        <label className='block relative mb-4'>
            <span className='text-gray-500 tracking-wider '>{label}</span>
            <input
                accept={accept}
                type={type}
                name={name}
                value={value}
                onClick={onClick}
                onChange={onChange}
                onBlur={onBlur}
                disabled={disabled}
                placeholder={placeholder}
                className={`
                    ${label ? "mt-1" : ""}
                    disabled:bg-gray-100
                    text-gray-600
                    tracking-wider
                    block
                    w-full
                    rounded-md
                    border-gray-300
                    shadow-sm
                    placeholder:text-gray-300
                    focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50
                    `}
            />
            {error && (
                <small className='absolute text-warning-400'>{error}</small>
            )}
        </label>
    );
}

Input.defaultProps = {
    type: "text",
    disabled: false,
};
