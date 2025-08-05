import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { LoginForm } from "../forms/Login";
import { RegisterForm } from "../forms/Register";

export const LoginRegister: React.FC = () => {
  const isLoginFormShow = useSelector((state: RootState) => state.status.isLoginFormShow);
  const isRegisterFormShow = useSelector((state: RootState) => state.status.isRegisterFormShow);
  return (
    <div className="fixed top-0 left-0 right-0 w-full h-screen bg-black z-[99999] flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center w-full max-w-[95%] sm:max-w-4/5 h-[90%]">
        {isLoginFormShow && <LoginForm />}
        {isRegisterFormShow && <RegisterForm />}
      </div>
    </div>
  );
};
