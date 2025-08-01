import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/features/auth/authSlice";
import type { RootState } from "../../redux/store";
import { AdminMenu, BuyerMenu, SellerMenu } from "./menu";

export const AsideBar: React.FC = () => {
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const username = useSelector((state: RootState) => state.auth?.user?.username);
    const role = useSelector((state: RootState) => state.auth?.user?.role);
    const menuItems = role === 'admin' ? AdminMenu : role === 'seller' ? SellerMenu : BuyerMenu;
    const isActive = (path: string) => pathname.includes(path);

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <aside className="bg-[#1C2640] text-white w-90 p-6 pt-10 shrink-0 h-full flex flex-col relative overflow-auto">
            <ul className="space-y-1.5 flex-grow text-sm font-medium w-full">
                {menuItems.map((item) => (
                    <li className="w-full" key={item.id}>
                        <Link
                            to={`/dashboard/${username}${item.path}`}
                            className={`block w-full text-left px-2.5 py-2.5 rounded-md transition ${isActive(item.path)
                                    ? "bg-white text-black shadow-sm"
                                    : "hover:bg-white hover:text-black"
                                }`}
                        >
                            {item.name}
                        </Link>
                    </li>
                ))}
                <li className="w-full">
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="block w-full text-left px-2.5 py-2.5 rounded-md hover:bg-white hover:text-black transition"
                    >
                        Log Out
                    </button>
                </li>
            </ul>
            <p className="mt-8 text-center text-sm font-medium text-gray-400">© Payhourr 2025</p>
        </aside>
    );
}
