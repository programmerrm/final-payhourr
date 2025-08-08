// src/components/layouts/TopBar.tsx

import { useSelector } from "react-redux";
import { useMatches } from "react-router-dom";
import type { RootState } from "../../redux/store";
import { RequestForm } from "../forms/RequestForm";
import { ReactIcons } from "../../utils/ReactIcons";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { User } from "../modals/User";
import { useGetUserQuery } from "../../redux/features/auth/authApi";
import { MEDIA_URL } from "../../utils/Api";

type RouteHandle = {
    title?: string;
};

type TopBarProps = {
    onMenuClick: () => void;
};

export const TopBar: React.FC<TopBarProps> = ({ onMenuClick }) => {
    const role = useSelector((state: RootState) => state.auth.user?.role);
    const userId = useSelector((state: RootState) => state.auth.user?.id);
    const matches = useMatches();
    const [openUserModal, setOpenUserModal] = useState(false);

    const currentTitle = matches.find((match) => {
        const handle = match.handle as RouteHandle;
        return !!handle?.title;
    })?.handle as RouteHandle | undefined;

    const { data: user } = useGetUserQuery(Number(userId), {
        skip: !userId,
    });

    const { AiOutlineMenu, FaCircleUser } = ReactIcons;

    return (
        <>
            <div className="flex flex-wrap justify-between shrink-0 items-center mb-6 gap-2.5 md:gap-4 border-2 py-5 px-5 rounded-[20px] bg-[#1C2640]">
                {/* Menu icon */}
                <button className="lg:hidden text-white text-2xl p-2" type="button" onClick={onMenuClick}>
                    <AiOutlineMenu />
                </button>
                <h2 className="text-sm md:text-base lg:text-2xl font-bold shrink-0 order-1 text-white">
                    {currentTitle?.title}
                </h2>
                {(role === "seller" || role === "buyer") && (
                    <RequestForm
                        placeholderValue={role === "seller" ? "Enter Buyer ID" : "Enter Seller ID"}
                    />
                )}
                <div className="order-2 md:order-last">
                    <button
                        onClick={() => setOpenUserModal(true)}
                        className="w-10 h-10 md:w-12 md:h-12 bg-gray-700 text-white rounded-full flex items-center justify-center text-sm font-medium md:font-semibold"
                    >
                        {user?.image ? (
                            <img className="w-16 h-16 rounded-full" src={`${MEDIA_URL}${user?.image}`} alt={user?.username} />
                        ) : (
                            <FaCircleUser className="text-3xl" />
                        )}
                    </button>
                </div>
            </div>

            {/* AnimatePresence ensures smooth unmount animation */}
            <AnimatePresence>
                {openUserModal && <User onClose={() => setOpenUserModal(false)} />}
            </AnimatePresence>
        </>
    );
};
