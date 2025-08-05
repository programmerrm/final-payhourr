import { useMatches } from "react-router-dom";
import { RequestForm } from "../forms/requestForm";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";

type RouteHandle = {
    title?: string;
};

export const TopBar: React.FC = () => {
    const role = useSelector((state: RootState) => state.auth.user?.role);
    const matches = useMatches();
    const currentTitle = matches.find((match) => {
        const handle = match.handle as RouteHandle;
        return !!handle?.title;
    })?.handle as RouteHandle | undefined;

    return (
        <div className="flex justify-between items-center mb-6 gap-x-4">
            <h2 className="text-2xl font-bold shrink-0" id="tab-title">
                {currentTitle?.title}
            </h2>
            {(role === "seller" || role === "buyer") && (
                <RequestForm
                    placeholderValue={
                        role === "seller" ? "Enter Buyer ID" : "Enter Seller ID"
                    }
                />
            )}
            <div>
                <button className="w-12 h-12 bg-gray-700 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    Icon
                </button>
            </div>
        </div>
    );
};
