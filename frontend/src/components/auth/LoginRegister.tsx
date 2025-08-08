import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { LoginForm } from "../forms/Login";
import { RegisterForm } from "../forms/Register";
import { AnimatePresence, motion } from "framer-motion";

export const LoginRegister: React.FC = () => {
  const isLoginFormShow = useSelector((state: RootState) => state.status.isLoginFormShow);
  const isRegisterFormShow = useSelector((state: RootState) => state.status.isRegisterFormShow);

  const showModal = isLoginFormShow || isRegisterFormShow;

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          key="modal-backdrop"
          className="fixed top-0 left-0 right-0 w-full h-screen bg-black/60 z-[99999] flex flex-col justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <AnimatePresence mode="wait">
            {isLoginFormShow && (
              <motion.div
                key="login-form"
                className="flex flex-col justify-center items-center w-full max-w-[95%] sm:max-w-4/5 h-[90%]"
                initial={{ scale: 0.6, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.6, opacity: 0, y: -50 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <LoginForm />
              </motion.div>
            )}
            {isRegisterFormShow && (
              <motion.div
                key="register-form"
                className="flex flex-col justify-center items-center w-full max-w-[95%] sm:max-w-4/5 h-[90%]"
                initial={{ scale: 0.6, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.6, opacity: 0, y: -50 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <RegisterForm />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
