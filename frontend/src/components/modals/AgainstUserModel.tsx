import type React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGetUserQuery } from "../../redux/features/auth/authApi";

type Props = {
    userId: number;
    onClose: () => void;
};

export const AgainstUserModel: React.FC<Props> = ({ userId, onClose }) => {
    const { data: userData } = useGetUserQuery(userId);

    const user = userData?.data;

    return (
        <AnimatePresence>
            {userId && (
                <motion.div
                    className="w-full h-full block"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="bg-white rounded-2xl shadow-xl py-10 px-5 w-[800px] relative"
                        initial={{ scale: 0.8, opacity: 0, y: -30 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.8, opacity: 0, y: 30 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                        >
                            ✕
                        </button>

                        {/* Content */}
                        <h2 className="text-xl font-bold mb-4 text-gray-800">User Details</h2>
                        <div className="flex flex-col flex-wrap gap-y-1.5">
                            <p>username: @{user?.username}</p>
                            <p>first name : {user?.first_name}</p>
                            <p>last name : {user?.last_name}</p>
                            <p>role : {user?.role}</p>
                            <p>rating : {user?.rating || 0}</p>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
