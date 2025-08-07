// src/components/layouts/TopBar.tsx
import { useSelector } from "react-redux";
import { useMatches } from "react-router-dom";
import type { RootState } from "../../redux/store";
import { RequestForm } from "../forms/RequestForm";
import { ReactIcons } from "../../utils/ReactIcons";
import { useState } from "react";
import { User } from "../modals/User";

type RouteHandle = {
    title?: string;
};

export const TopBar: React.FC = () => {
    const role = useSelector((state: RootState) => state.auth.user?.role);
    const matches = useMatches();
    const [openUserModal, setOpenUserModal] = useState(false);

    const currentTitle = matches.find((match) => {
        const handle = match.handle as RouteHandle;
        return !!handle?.title;
    })?.handle as RouteHandle | undefined;

    const { AiOutlineMenu } = ReactIcons;

    return (
        <div className="flex flex-wrap justify-between shrink-0 items-center mb-6 gap-2.5 md:gap-4">
            <button className="lg:hidden" type="button">
                <AiOutlineMenu />
            </button>
            <h2 className="text-sm md:text-base lg:text-2xl font-bold shrink-0 order-1" id="tab-title">
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
                    Icon
                </button>
            </div>

            {/* Modal */}
            {openUserModal && <User onClose={() => setOpenUserModal(false)} />}
        </div>
    );
};
