import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useMatches } from "react-router-dom";
import type { RootState } from "../../redux/store";
import { RequestForm } from "../forms/RequestForm";
import { ReactIcons } from "../../utils/ReactIcons";
import { useGetUserQuery } from "../../redux/features/auth/authApi";
import { MEDIA_URL } from "../../utils/Api";
import { NotificationModal } from "../modals/Notification";
import { User } from "../modals/User";
import { AnimatePresence } from "framer-motion";
import { useGetAllNotificationQuery } from "../../redux/features/notification/notificationApi";

type RouteHandle = { title?: string };
type TopBarProps = { onMenuClick: () => void };
type Notification = {
    id: number;
    message: string;
    time: string;
    url?: string;
    from_user: {
        username: string,
    };
};

export const TopBar: React.FC<TopBarProps> = ({ onMenuClick }) => {
    const role = useSelector((state: RootState) => state.auth.user?.role);
    const userId = useSelector((state: RootState) => state.auth.user?.id);
    const matches = useMatches();

    const [openUserModal, setOpenUserModal] = useState(false);
    const [openNotifications, setOpenNotifications] = useState(false);
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const { data: allNotification } = useGetAllNotificationQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });

    const currentTitle = matches.find(
        (match) => (match.handle as RouteHandle)?.title
    )?.handle as RouteHandle | undefined;

    const { data: user } = useGetUserQuery(Number(userId), { skip: !userId });
    const { AiOutlineMenu, FaCircleUser, IoNotifications } = ReactIcons;

    useEffect(() => {
        if (allNotification?.data) {
            const mapped: Notification[] = allNotification.data.map((notif: any) => {
                const dateObj = new Date(notif.created_at);
                return {
                    id: notif.id.toString(),
                    message: notif.message,
                    time: dateObj.toLocaleString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: true,
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                    }),
                    url: notif.url,
                    from_user: notif.from_user,
                };
            });
            setNotifications(mapped);
        }
    }, [allNotification]);

    return (
        <>
            <div className="flex flex-wrap justify-between shrink-0 items-center mb-6 gap-2.5 md:gap-4 border-2 py-5 px-5 rounded-[20px] bg-[#1C2640]">
                <button className="lg:hidden text-white text-2xl p-2" onClick={onMenuClick}>
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
                <div className="order-2 md:order-last flex flex-row flex-wrap items-center gap-x-5">
                    <button
                        onClick={() => setOpenNotifications(true)}
                        className="bg-white p-3 rounded-full relative"
                    >
                        <IoNotifications className="text-2xl" />
                        <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full" />
                    </button>
                    <button
                        onClick={() => setOpenUserModal(true)}
                        className="w-10 h-10 md:w-[50px] md:h-[50px] bg-gray-700 text-white rounded-full flex items-center justify-center text-sm font-medium md:font-semibold"
                    >
                        {user?.data?.image ? (
                            <img
                                className="w-10 h-10 md:w-12 md:h-12 object-cover rounded-full"
                                src={`${MEDIA_URL}${user?.data?.image}`}
                                alt={user?.data?.username}
                            />
                        ) : (
                            <FaCircleUser className="text-3xl" />
                        )}
                    </button>
                </div>
            </div>
            <AnimatePresence>
                {openUserModal && <User onClose={() => setOpenUserModal(false)} />}
                {openNotifications && (
                    <NotificationModal
                        notifications={notifications}
                        onClose={() => setOpenNotifications(false)}
                    />
                )}
            </AnimatePresence>
        </>
    );
}
