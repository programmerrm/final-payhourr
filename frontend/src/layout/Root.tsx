import { useEffect, useState, Suspense } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { LoginRegister } from "../components/auth/LoginRegister";
import { Notification } from "../components/notification/Notification";
import LoadingAnimation from "../assets/loader/logo-loading.gif";

export default function Root() {
    const isAuthFormShow = useSelector((state: RootState) => state.status.isAuthFormShow);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <Notification />
            <section className="relative min-h-screen">
                {isLoading ? (
                    <div className="flex justify-center items-center min-h-screen bg-black/90">
                        <img className="w-96" src={LoadingAnimation} alt="Loading..." />
                    </div>
                ) : (
                    <Suspense>
                        {isAuthFormShow && <LoginRegister />}
                        <Outlet />
                    </Suspense>
                )}
            </section>
        </>
    );
}
