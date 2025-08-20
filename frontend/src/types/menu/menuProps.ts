import type { ReactNode } from "react";

export type MenuItemProps = {
    id: number;
    name: string;
    path: string;
    icon?: ReactNode;
};
