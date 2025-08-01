import React from "react";
import { LoginForm } from "../forms/Login";
import { RegisterForm } from "../forms/Register";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";

export const LoginRegister: React.FC = () => {
    const isLoginFormShow = useSelector((state: RootState) => state.status.isLoginFormShow);
    const isRegisterFormShow = useSelector((state: RootState) => state.status.isRegisterFormShow);
    return (
        <div className="fixed top-0 left-0 right-0 w-full h-screen bg-black z-[99999] flex flex-col flex-wrap justify-center items-center">
            <div className="flex flex-col flex-wrap justify-center items-center w-4/5 h-[90%]">
                {isLoginFormShow && <LoginForm />}
                {isRegisterFormShow && <RegisterForm />}
            </div>
        </div>
    );
}
