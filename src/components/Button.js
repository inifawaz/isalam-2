import clsx from "clsx"
import Loader from "./Loader"

const Button = ({ type = 'submit', className, btn = 'btn-brand', children, width = 'w-24', isLoading = false, ...props }) => (
    <button
        type={type}
        className={clsx(className, width, btn, {
            className: className,
            btn: btn,
            width: width
        })}
        {...props}
    >
        {isLoading ? <Loader /> : children}


    </button >
)

export default Button
