import clsx from "clsx";
import { useField } from "formik";
const Input = ({ type = 'text', label, required, labelRequired, className, width = 'w-full', messages = [], ...props }) => {

    const [field, meta] = useField(props);
    const numberInputOnWheelPreventChange = (e) => {
        // Prevent the input value change
        e.target.blur();

        // Prevent the page/container scrolling
        e.stopPropagation();

        // Refocus immediately, on the next tick (after the current function is done)
        setTimeout(() => {
            e.target.focus();
        }, 0);
    };
    return (
        <div className="mb-4">
            {label && (
                <label className={clsx({
                    'block font-medium text-sm mb-1 text-gray-700': true,
                    'after:content-["*"] after:ml-0.5 after:text-red-500': labelRequired
                })} htmlFor={props.name || props.id}>{label}</label>
            )}

            <input onWheel={numberInputOnWheelPreventChange} type={type} className={clsx(width, className, {
                'rounded-md  shadow-sm border-gray-300 disabled:bg-dark-200 placeholder:text-dark-300  focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50': true,
                width: width,
                className: className
            })} required={required} {...field} {...props} />
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
export default Input;
