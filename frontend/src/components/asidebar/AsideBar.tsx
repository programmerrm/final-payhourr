import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/features/auth/authSlice";
import type { RootState } from "../../redux/store";
import { AdminMenu, BuyerMenu, SellerMenu } from "./menu";
import Logo from "../../assets/images/payourr-white-logo.png";
import { motion } from "framer-motion";
import { ReactIcons } from "../../utils/ReactIcons";

type AsideBarProps = {
    onClose: () => void;
};

export const AsideBar: React.FC<AsideBarProps> = ({ onClose }) => {
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const username = useSelector((state: RootState) => state.auth?.user?.username);
    const role = useSelector((state: RootState) => state.auth?.user?.role);
    const menuItems = role === "admin" ? AdminMenu : role === "seller" ? SellerMenu : BuyerMenu;
    const isActive = (path: string) => pathname.includes(path);
    const { AiOutlineClose } = ReactIcons;

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <motion.aside
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 z-50 h-full w-64 bg-[#1C2640] text-white p-6 pt-10 overflow-y-auto scrollbar-hidden lg:static lg:flex lg:flex-col lg:h-full lg:z-auto lg:translate-x-0 lg:opacity-100"
        >
            {/* Close only on mobile */}
            <div className="lg:hidden flex justify-end mb-4">
                <button onClick={onClose} className="text-white text-2xl">
                    <AiOutlineClose />
                </button>
            </div>

            {/* Logo */}
            <div className="mb-8">
                <Link to={`/dashboard/${username}/`} onClick={onClose}>
                    <img className="w-44" src={Logo} alt="Payhourr Logo" />
                </Link>
            </div>

            {/* Menu */}
            <ul className="space-y-1.5 flex-grow text-sm font-medium w-full">
                {menuItems.map((item) => (
                    <li key={item.id}>
                        <Link
                            to={`/dashboard/${username}${item.path}`}
                            onClick={onClose}
                            className={`block w-full text-left px-2.5 py-2.5 rounded-md transition ${
                                isActive(item.path)
                                    ? "bg-white text-black shadow-sm"
                                    : "hover:bg-white hover:text-black"
                            }`}
                        >
                            {item.name}
                        </Link>
                    </li>
                ))}

                {/* Logout */}
                <li>
                    <button
                        type="button"
                        onClick={() => {
                            handleLogout();
                            onClose(); // close on logout (for mobile)
                        }}
                        className="block w-full text-left px-2.5 py-2.5 rounded-md hover:bg-white hover:text-black transition"
                    >
                        Log Out
                    </button>
                </li>
            </ul>

            <p className="mt-8 text-center text-sm font-medium text-gray-400">© Payhourr 2025</p>
        </motion.aside>
    );
};
