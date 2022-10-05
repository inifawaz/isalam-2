import React from "react";

export default function Container({ children, className }) {
    return (
        <div className={`max-w-5xl mx-auto p-3 ${className}`}>{children}</div>
    );
}
