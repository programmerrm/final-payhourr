import React from "react";
import { useSelector } from "react-redux";
import { AdminDashboard } from "../admin/Dashboard";
import { SellerDashboard } from "../contributor/SellerDashboard";
import { BuyerDashboard } from "../contributor/BuyerDashboard";
import type { RootState } from "../../redux/store";

export const RoleBasedDashboard: React.FC = () => {
    const role = useSelector((state: RootState) => state.auth?.user?.role);

    if (role === "admin") {
        return <AdminDashboard />;
    } else if (role === "seller") {
        return <SellerDashboard />;
    } else if (role === "buyer") {
        return <BuyerDashboard />;
    } else {
        return <div className="text-[#ED1B24]">Unknown role. Please contact support.</div>;
    }
};
