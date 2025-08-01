import React from "react"
import type { FieldProps } from "../../types/field/FieldProps";

export const Field: React.FC<FieldProps> = ({ label, children, htmlFor, error }) => {
    const getChildId = (children: any) => {
        const child = React.Children.only(children);
        return child?.props?.id;
    };
    const id = htmlFor || getChildId(children);
    return (
        <React.Fragment>
            {label && (
                <label className="text-sm md:text-base font-medium" htmlFor={id}>
                    {label}
                </label>
            )}
            {children}
            {error?.message && (
                <p className="text-red-500 font-medium text-sm" role="alert">
                    {error.message}
                </p>
            )}
        </React.Fragment>
    );
}
