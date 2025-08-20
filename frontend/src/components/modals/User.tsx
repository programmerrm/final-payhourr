import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetUserQuery } from "../../redux/features/auth/authApi";
import type { RootState } from "../../redux/store";
import { logout } from "../../redux/features/auth/authSlice";
import { ReactIcons } from "../../utils/ReactIcons";
import { MEDIA_URL } from "../../utils/Api";
import { motion } from "framer-motion";

interface Props {
    onClose: () => void;
}

export const User: React.FC<Props> = ({ onClose }) => {
    const userId = useSelector((state: RootState) => state.auth.user?.id);
    const { data: userData, isLoading: userLoading } = useGetUserQuery(Number(userId), {
        skip: !userId,
    });

    const user = userData?.data;
    const dispatch = useDispatch();
    const { FaCircleUser } = ReactIcons;

    const handleLogout = () => dispatch(logout());

    if (!user || userLoading) return null;

    return (
        <motion.div
            key="user-backdrop"
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                key="user-card"
                className="bg-white rounded-2xl shadow-2xl w-full max-w-xl relative overflow-hidden"
                initial={{ scale: 0.8, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: -50 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            >
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-xl text-gray-600 hover:text-black transition"
                >
                    ✕
                </button>

                <div className="p-6">
                    <h2 className="text-2xl font-semibold text-center mb-4">User Profile</h2>
                    <div className="flex justify-center mb-6">
                        {user.image ? (
                            <img
                                className="w-32 h-32 object-cover rounded-full border-4 border-gray-200 shadow-md"
                                src={`${MEDIA_URL}${user.image}`}
                                alt={user.first_name}
                            />
                        ) : (
                            <FaCircleUser className="text-8xl text-gray-400" />
                        )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-sm">
                        <p><strong>User ID:</strong> {user.user_id || "-"}</p>
                        <p><strong>Username:</strong> {user.username || "-"}</p>
                        <p><strong>Email:</strong> {user.email || "-"}</p>
                        <p><strong>First Name:</strong> {user.first_name || "-"}</p>
                        <p><strong>Last Name:</strong> {user.last_name || "-"}</p>
                        <p><strong>Phone:</strong> {user.number || "-"}</p>
                        <p><strong>Payment Number:</strong> {user.payment_number || "-"}</p>
                        <p><strong>DOB:</strong> {user.date_of_birth || "-"}</p>
                        <p><strong>Gender:</strong> {user.gender || "-"}</p>
                        <p><strong>Address:</strong> {user.address || "-"}</p>
                        <p><strong>Zip Code:</strong> {user.zip_code || "-"}</p>
                        <p><strong>Country:</strong> {user.country || "-"}</p>
                        <p><strong>Role:</strong> {user.role || "-"}</p>
                        <p><strong>Terms:</strong> {user.terms_accept ? "Yes" : "No"}</p>
                        <p><strong>Verified:</strong> {user.is_verify ? "Yes" : "No"}</p>
                        <p><strong>Active:</strong> {user.is_active ? "Yes" : "No"}</p>
                        <p><strong>Blocked:</strong> {user.is_block ? "Yes" : "No"}</p>
                        <p><strong>Joined:</strong> {new Date(user.date_joined).toLocaleString()}</p>
                        <p>
                            <strong>NID Front:</strong><br />
                            {user.nid_front_side ? (
                                <a
                                    href={`${MEDIA_URL}${user.nid_front_side}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 underline"
                                >
                                    View
                                </a>
                            ) : "-"}
                        </p>
                        <p>
                            <strong>NID Back:</strong><br />
                            {user.nid_back_side ? (
                                <a
                                    href={`${MEDIA_URL}${user.nid_back_side}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 underline"
                                >
                                    View
                                </a>
                            ) : "-"}
                        </p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="mt-6 w-full bg-black text-white py-3 rounded-full hover:bg-gray-900 transition"
                    >
                        Logout
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}
