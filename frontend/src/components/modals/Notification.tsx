import React from "react";
import { motion } from "framer-motion";
import { ReactIcons } from "../../utils/ReactIcons";
import { Link } from "react-router-dom";

type Notification = {
    id: number;
    message: string;
    time: string;
    url?: string;
    from_user: {
        username: string,
    };
};

type NotificationModalProps = {
    notifications: Notification[];
    onClose: () => void;
};

export const NotificationModal: React.FC<NotificationModalProps> = ({
    notifications,
    onClose,
}) => {
    const { IoClose, IoNotifications } = ReactIcons;

    console.log('notifications : ', notifications);

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-end bg-black/30 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, y: -50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -50, scale: 0.95 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="w-full max-w-sm mt-30 mr-6 bg-white shadow-2xl rounded-2xl overflow-hidden"
            >
                <div className="flex justify-between items-center p-4 border-b border-gray-200">
                    <h2 className="text-lg font-bold text-gray-800">Notifications</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-600 hover:text-red-500 transition"
                    >
                        <IoClose className="text-2xl" />
                    </button>
                </div>
                <div className="max-h-[450px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-hidden">
                    {notifications.length > 0 ? (
                        notifications.map((notif) => (
                            <Link
                                key={notif.id}
                                to={notif.url || "#"}
                                state={{ search: notif.from_user?.username || "" }}
                                onClick={onClose}
                                className="flex items-center p-4 m-2 rounded-xl border transition duration-150 ease-in-out hover:shadow-lg hover:bg-gray-50 bg-white border-gray-200"
                            >
                                <div className="flex-shrink-0 mr-4">
                                    <IoNotifications className="text-2xl text-gray-500" />
                                </div>
                                <div className="flex-1 flex flex-col justify-center">
                                    <p className="text-gray-800 font-medium">{notif.message}</p>
                                    <span className="text-xs text-gray-400 mt-1">{notif.time}</span>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="p-6 text-center text-gray-500 text-sm">
                            No notifications yet 🚀
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};
