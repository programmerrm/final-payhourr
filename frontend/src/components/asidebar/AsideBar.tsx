import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/features/auth/authSlice";
import type { RootState } from "../../redux/store";
import { AdminMenu, BuyerMenu, SellerMenu } from "./menu";
import Logo from "../../assets/images/payourr-white-logo.png";
import { motion } from "framer-motion";
import { ReactIcons } from "../../utils/ReactIcons";
import type { MenuItemProps } from "../../types/menu/menuProps";

type AsideBarProps = {
    onClose: () => void;
    isDesktop?: boolean;
};

export const AsideBar: React.FC<AsideBarProps> = ({ onClose, isDesktop }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const username = useSelector(
        (state: RootState) => state.auth?.user?.username
    );
    const role = useSelector((state: RootState) => state.auth?.user?.role);

    const { AiOutlineClose, IoIosLogOut } = ReactIcons;

    const menuItems: MenuItemProps[] =
        role === "admin" ? AdminMenu : role === "seller" ? SellerMenu : BuyerMenu;

    const dashboardPath = `/dashboard/${username}`;
    const isActive = (path: string) =>
        path === "" ? pathname === dashboardPath + "/" : pathname.startsWith(dashboardPath + path);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    return (
        <motion.aside
            role="navigation"
            initial={isDesktop ? {} : { x: -300, opacity: 0 }}
            animate={isDesktop ? {} : { x: 0, opacity: 1 }}
            exit={isDesktop ? {} : { x: -300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 z-50 h-full w-64 bg-[#1C2640] text-white p-6 pt-10 overflow-y-auto scrollbar-hidden 
                 lg:static lg:flex lg:flex-col lg:h-full lg:z-auto lg:translate-x-0 lg:opacity-100"
        >
            {!isDesktop && (
                <div className="flex justify-end mb-4">
                    <button
                        onClick={onClose}
                        className="text-white text-2xl"
                    >
                        <AiOutlineClose />
                    </button>
                </div>
            )}
            <div className="mb-8">
                <Link to={`${dashboardPath}/`} onClick={onClose}>
                    <img className="w-44" src={Logo} alt="Payhourr Logo" />
                </Link>
            </div>
            <ul className="space-y-2.5 flex-grow text-sm font-medium w-full">
                {menuItems.map((item) => (
                    <li key={item.id}>
                        <Link
                            to={`${dashboardPath}${item.path}`}
                            onClick={onClose}
                            className={`flex items-center gap-2 px-2.5 py-2.5 rounded-md transition ${isActive(item.path)
                                    ? "bg-white text-black shadow-sm"
                                    : "hover:bg-white hover:text-black"
                                }`}
                        >
                            {item.icon && item.icon}
                            <span>{item.name}</span>
                        </Link>
                    </li>
                ))}

                {/* Logout */}
                <li>
                    <button
                        type="button"
                        onClick={() => {
                            handleLogout();
                            onClose();
                        }}
                        className="flex flex-row flex-wrap items-center gap-x-2.5 w-full text-left px-2.5 py-2.5 rounded-md hover:bg-white hover:text-black transition"
                    >
                        <IoIosLogOut className="text-2xl" />
                        Log Out
                    </button>
                </li>
            </ul>

            <p className="mt-8 text-center text-sm font-medium text-gray-400">
                © Payhourr 2025
            </p>
        </motion.aside>
    );
}
