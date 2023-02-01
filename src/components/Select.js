import clsx from "clsx";
import { useField } from "formik";

const Select = ({ label, labelRequired, width = 'w-full', messages = [], ...props }) => {
    const [field, meta] = useField(props);
    return (
        <div className="mb-4">
            <label className={clsx({
                'block font-medium text-sm mb-1 text-gray-700': true,
                'after:content-["*"] after:ml-0.5 after:text-red-500': labelRequired
            })} htmlFor={props.name}>{label}</label>
            <select className={clsx(width, {
                'rounded-md  shadow-sm border-gray-300  focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50': true,
                width: width
            })} {...field} {...props} />
            {meta.touched && meta.error ? (
                <p className="text-sm mt-1 text-danger-600">{meta.error}</p>
            ) : null}
            {messages.length > 0 && (
                <>
                    {messages.map((message, index) => (
                        <p
                            className={`text-sm mt-1 text-danger-600`}
                            key={index}>
                            {message}
                        </p>
                    ))}
                </>
            )}
        </div>
    );
};

export default Select
