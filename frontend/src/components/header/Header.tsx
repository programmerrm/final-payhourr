import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/payourr-white-logo.png";
import { Button } from "../button/Button";
import { useDispatch, useSelector } from "react-redux";
import { toggleAuthForm, toggleForm } from "../../redux/features/status/statusSlice";
import { ReactIcons } from "../../utils/ReactIcons";
import type { RootState } from "../../redux/store";
import { MEDIA_URL } from "../../utils/Api";
export const Header: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useSelector((state: RootState) => state.auth.user);

    const { FaCircleUser } = ReactIcons;

    const handleLoginClick = () => {
        dispatch(toggleAuthForm());
        dispatch(toggleForm('login'));
    }

    const handleProfileClick = () => {
        if (!auth) {
            handleLoginClick();
            return;
        }
        if (auth) {
            navigate(`/dashboard/${auth.username}/`);
        }
    }

    return (
        <header className="!absolute py-5 bg-[#001429] rounded-bl-4xl rounded-br-4xl z-[9999]">
            <div className="max-w-screen-2xl container mx-auto px-2.5 lg:px-5 flex items-center justify-between gap-x-5">
                <Link to="/">
                    <img className="w-28 md:w-40" src={Logo} alt="" />
                </Link>
                <div className="flex items-center gap-x-2.5 md:gap-x-6">

                    <Button text="Login" buttonType="button" variant="capitalize text-white text-lg font-medium bg-[#ED1B24] hover:bg-red-400 btn-style" handleFunction={handleLoginClick} />
                    <button type="button" onClick={() => handleProfileClick()}>
                        {auth?.image ? (
                            <img className="w-[58px] h-[58px] rounded-full object-cover border-4 border-blue-500" src={`${MEDIA_URL}${auth?.image}`} alt={auth?.username} />
                        ) : (
                            <FaCircleUser className="text-white text-[55px]" />
                        )}
                    </button>
                </div>
            </div>
        </header>
    );
}
