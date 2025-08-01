import type { ReactElement, ReactNode } from "react";

export interface FieldProps {
    label?: string | ReactNode;
    children: ReactElement<{ id?: string }>;
    htmlFor?: string;
    error?: { message?: string };
};
