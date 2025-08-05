import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/payourr-white-logo.png";
import { Button } from "../button/Button";
import { useDispatch } from "react-redux";
import { toggleAuthForm, toggleForm } from "../../redux/features/status/statusSlice";
export const Header: React.FC = () => {
    const dispatch = useDispatch();

    const handleLoginClick = () => {
        dispatch(toggleAuthForm());
        dispatch(toggleForm('login'));
    }

    const handleRegisterClick = () => {
        dispatch(toggleAuthForm());
        dispatch(toggleForm('register'));
    }

    return (
        <header className="!absolute py-5 bg-[#001429] rounded-bl-4xl rounded-br-4xl z-[9999]">
            <div className="max-w-screen-2xl container mx-auto px-2.5 lg:px-5 flex items-center justify-between gap-x-5">
                <Link to="/">
                    <img className="w-28 md:w-40" src={Logo} alt="" />
                </Link>
                <div className="flex items-center gap-x-2.5 md:gap-x-4">
                    <Button text="Login" buttonType="button" variant="capitalize text-white text-lg font-medium transition-all duration-500 hover:bg-[#ED1B24] btn-style" handleFunction={handleLoginClick} />
                    <Button text="Register" buttonType="button" variant="capitalize text-white text-lg font-medium bg-[#ED1B24] hover:bg-red-400 btn-style" handleFunction={handleRegisterClick} />
                </div>
            </div>
        </header>
    );
}
