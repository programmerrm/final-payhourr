import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { LoginRegister } from "../components/auth/LoginRegister";
import { Notification } from "../components/notification/Notification";

export default function Root() {
    const isAuthFormShow = useSelector((state: RootState) => state.status.isAuthFormShow);
    return (
        <Suspense>
            <Notification />
            {isAuthFormShow && <LoginRegister />}
            <Outlet />
        </Suspense>
    );
}
