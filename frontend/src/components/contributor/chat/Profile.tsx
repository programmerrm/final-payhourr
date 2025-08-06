import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";
import { RatingForm } from "../../forms/RatingForm";
import { CreateOfferForm } from "../../forms/CreateOfferForm";

interface ProfileProps {
    receiverUsername: string;
}

export const Profile: React.FC<ProfileProps> = ({ receiverUsername }) => {
    const [showModal, setShowModal] = useState({
        rating: false,
        offer: false,
    });

    const auth = useSelector((state: RootState) => state.auth.user);

    const openRating = () => {
        setShowModal((prev) => ({ ...prev, rating: true }));
    };

    const closeRating = () => {
        setShowModal((prev) => ({ ...prev, rating: false }));
    };

    const openOffer = () => {
        setShowModal((prev) => ({ ...prev, offer: true }));
    };

    const closeOffer = () => {
        setShowModal((prev) => ({ ...prev, offer: false }));
    };

    return (
        <div className="flex flex-col gap-6 sm:flex-row sm:justify-between sm:items-center p-4">
            <div>
                <h2 className="text-2xl font-semibold text-gray-800">{auth?.username}</h2>
            </div>

            <div className="space-x-3">
                {auth?.role === "buyer" ? (
                    <button
                        onClick={openRating}
                        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
                    >
                        Rating Now
                    </button>
                ) : (
                    <>
                        <button
                            type="button"
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                            onClick={openOffer}
                        >
                            Create Offer
                        </button>
                        <button
                            onClick={openRating}
                            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
                        >
                            Rating Now
                        </button>
                    </>
                )}
            </div>

            {showModal.offer && (
                <CreateOfferForm onClose={closeOffer} receiverUsername={receiverUsername} />
            )}

            {showModal.rating && (
                <RatingForm onClose={closeRating} receiverUsername={receiverUsername} />
            )}
        </div>
    );
};
