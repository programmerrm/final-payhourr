import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";

export const AdminProfile: React.FC = () => {
    const auth = useSelector((state: RootState) => state.auth.user);
    return (
        <div className="flex shrink-0 gap-6 sm:flex-row justify-between pl-4 items-center overflow-hidden rounded-full bg-gray-300">
            <div className="flex gap-2 items-center">
                <div className="size-8 md:size-14 rounded-full overflow-hidden">
                    <img src="https://i.pravatar.cc/150?img=8" className="w-full h-full rounded-full object-cover" />
                </div>
                <div>
                    <h2 className="text-sm md:text-2xl capitalize font-semibold text-gray-800">{auth?.username}</h2>
                    <span className="text-xs">Active</span>
                </div>
            </div>

            <div className="flex flex-col gap-1 md:gap-2">
                <button
                    type="button"
                    className="text-xs md:text-base bg-green-600 text-white px-4 pr-5 py-2 md:py-2.5 rounded hover:bg-green-700 transition"
                >
                    Exite
                </button>
                <button
                    className="text-xs md:text-base bg-indigo-600 text-white px-4 pr-5 py-2 md:py-2.5 rounded hover:bg-indigo-700 transition"
                >
                    Solved
                </button>
            </div>

            {/* {showModal.offer && (
                <CreateOfferForm onClose={closeOffer} receiverUsername={receiverUsername} />
            )}

            {showModal.rating && (
                <RatingForm onClose={closeRating} receiverUsername={receiverUsername} />
            )} */}
        </div>
    );
}