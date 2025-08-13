import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";
import { CreateOfferForm } from "../../forms/CreateOfferForm";
import { RatingForm } from "../../forms/RatingForm";
import { useGetReciverOrderQuery } from "../../../redux/features/orders/ordersApi";
import type { UserInfo } from "../Chat";

interface ProfileProps {
    receiverUsername: string;
    participantsInfo: UserInfo;
}

export const Profile: React.FC<ProfileProps> = ({ receiverUsername, participantsInfo }) => {
    const [showModal, setShowModal] = useState({
        rating: false,
        offer: false,
    });

    const { data: reciverOrder } = useGetReciverOrderQuery(undefined, { refetchOnMountOrArgChange: true });
    const auth = useSelector((state: RootState) => state.auth.user);

    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    // countdown calculation
    useEffect(() => {
        if (!reciverOrder?.data?.delivery_time) return;

        const deliveryTime = new Date(reciverOrder.data.delivery_time).getTime();

        const timer = setInterval(() => {
            const now = new Date().getTime();
            const diff = deliveryTime - now;

            if (diff <= 0) {
                clearInterval(timer);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            } else {
                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((diff % (1000 * 60)) / 1000);
                setTimeLeft({ days, hours, minutes, seconds });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [reciverOrder]);

    const openRating = () => setShowModal((prev) => ({ ...prev, rating: true }));
    const closeRating = () => setShowModal((prev) => ({ ...prev, rating: false }));
    const openOffer = () => setShowModal((prev) => ({ ...prev, offer: true }));
    const closeOffer = () => setShowModal((prev) => ({ ...prev, offer: false }));

    console.log('reciver order : ', reciverOrder);

    return (
        <div className="flex shrink-0 gap-6 sm:flex-row justify-between pl-4 items-center overflow-hidden rounded-full bg-gray-300">
            <div className="flex gap-2 items-center py-3">
                <div className="size-8 md:size-14 relative ">
                    <div className="absolute w-4 h-4 rounded-full bg-green-500 bottom-0 right-0 z-10 border-2 border-white"></div>
                    <img src="https://i.pravatar.cc/150?img=8" className="w-full h-full object-cover rounded-full" />
                </div>
                <div>
                    <h2 className="text-sm md:text-lg leading-none capitalize font-semibold text-gray-800">{auth?.username}</h2>
                    <span className="text-xs leading-none">Active</span>
                </div>
            </div>

            <div className="flex flex-row flex-wrap items-center gap-x-5">
                <div>
                    <div className="flex items-center gap-2.5">
                        <div className="p-2 bg-gray-600 rounded-md text-white font-bold text-md">{timeLeft.days}</div>
                        <div className="text-gray-600 font-bold text-md">:</div>
                        <div className="p-2 bg-gray-600 rounded-md text-white font-bold text-md">{timeLeft.hours}</div>
                        <div className="text-gray-600 font-bold text-md">:</div>
                        <div className="p-2 bg-gray-600 rounded-md text-white font-bold text-md">{timeLeft.minutes}</div>
                        <div className="text-gray-600 font-bold text-md">:</div>
                        <div className="p-2 bg-gray-600 rounded-md text-white font-bold text-md">{timeLeft.seconds}</div>
                    </div>
                </div>

                <div className="flex flex-col gap-1 md:gap-2">
                    {auth?.role === "seller" ? (
                        <button onClick={openRating} className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">
                            Rating Now
                        </button>
                    ) : (
                        <>
                            <button
                                type="button"
                                disabled={reciverOrder?.data?.status === "pending"}
                                className={`text-xs md:text-base px-4 pr-5 py-2 md:py-2.5 rounded transition ${reciverOrder?.data?.status === "pending"
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-green-600 hover:bg-green-700 text-white"
                                    }`}
                                onClick={openOffer}
                            >
                                Create Offer
                            </button>

                            <button
                                onClick={openRating}
                                className="text-xs md:text-base bg-indigo-600 text-white px-4 pr-5 py-2 md:py-2.5 rounded hover:bg-indigo-700 transition"
                                disabled={
                                    reciverOrder?.data?.status === "pending" ||
                                    reciverOrder?.data?.status === "cancel"
                                }
                            >
                                Rating Now
                            </button>

                        </>
                    )}
                </div>
            </div>
            {showModal.offer && <CreateOfferForm
                onClose={closeOffer}
                participantsInfo={{
                    ...participantsInfo,
                    email: participantsInfo.email || "",
                }}
            />
            }
            {showModal.rating && <RatingForm onClose={closeRating} receiverUsername={receiverUsername} />}
        </div>
    );
};
