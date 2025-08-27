import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGetUserQuery } from "../../redux/features/auth/authApi";
import { useAdminUpdateUserMutation } from "../../redux/features/user/userApi";
import { MEDIA_URL } from "../../utils/Api";
import { toast } from "react-toastify";

interface UserShowDialogProps {
    userId: number;
    onClose: () => void;
}

export const UserShowDialog: React.FC<UserShowDialogProps> = ({ userId, onClose, }) => {
    const { data: userData, isLoading, isError, refetch } = useGetUserQuery(userId);
    const [adminUpdateUser, { isLoading: isUpdating }] = useAdminUpdateUserMutation();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const user = userData?.data;

    const handleToggleVerify = async () => {
        try {
            await adminUpdateUser({ id: userId, is_verify: !user.is_verify }).unwrap();
            refetch();
            toast.success(
                `User ${user.is_verify ? "unverified" : "verified"} successfully`
            );
        } catch (error) {
            toast.error("Failed to update verification");
        }
    };

    const handleToggleActive = async () => {
        try {
            await adminUpdateUser({ id: userId, is_active: !user.is_active }).unwrap();
            refetch();
            toast.success(
                `User ${user.is_active ? "deactivated" : "activated"} successfully`
            );
        } catch (error) {
            toast.error("Failed to update status");
        }
    };

    const handleToggleBlock = async () => {
        try {
            await adminUpdateUser({ id: userId, is_block: !user.is_block }).unwrap();
            refetch();
            toast.success(
                `User ${user.is_block ? "unblocked" : "blocked"} successfully`
            );
        } catch (error) {
            toast.error("Failed to update block status");
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full relative overflow-auto max-h-[80vh] p-6 sm:p-8">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-3xl font-bold"
                    aria-label="Close"
                >
                    ✕
                </button>

                {isLoading && (
                    <p className="text-center text-gray-600">Loading user details...</p>
                )}
                {isError && (
                    <p className="text-center text-red-600">Failed to load user data.</p>
                )}

                {user && (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-semibold text-gray-900 text-center">
                            User Details
                        </h2>

                        <div className="flex justify-center">
                            {user.image ? (
                                <img
                                    src={`${MEDIA_URL}${user.image}`}
                                    alt={`${user.username}'s avatar`}
                                    className="w-28 h-28 rounded-full object-cover border-2 border-indigo-500 shadow-md"
                                />
                            ) : (
                                <div className="w-28 h-28 rounded-full border-2 border-gray-300 flex items-center justify-center">
                                    <span className="text-gray-400">No Image</span>
                                </div>
                            )}
                            
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
                            <div>
                                <span className="font-semibold">Username:</span> @{user.username}
                            </div>
                            <div>
                                <span className="font-semibold">Email:</span> {user.email}
                            </div>
                            <div>
                                <span className="font-semibold">Phone Number:</span>{" "}
                                {user.number || "N/A"}
                            </div>
                            <div>
                                <span className="font-semibold">Payment Number:</span>{" "}
                                {user.payment_number || "N/A"}
                            </div>
                            <div>
                                <span className="font-semibold">First Name:</span>{" "}
                                {user.first_name || "N/A"}
                            </div>
                            <div>
                                <span className="font-semibold">Last Name:</span>{" "}
                                {user.last_name || "N/A"}
                            </div>
                            <div>
                                <span className="font-semibold">Date of Birth:</span>{" "}
                                {user.date_of_birth
                                    ? new Date(user.date_of_birth).toLocaleDateString()
                                    : "N/A"}
                            </div>
                            <div>
                                <span className="font-semibold">Gender:</span>{" "}
                                {user.gender || "N/A"}
                            </div>
                            <div>
                                <span className="font-semibold">Address:</span>{" "}
                                {user.address || "N/A"}
                            </div>
                            <div>
                                <span className="font-semibold">Zip Code:</span>{" "}
                                {user.zip_code || "N/A"}
                            </div>
                            <div>
                                <span className="font-semibold">Country:</span>{" "}
                                {user.country || "N/A"}
                            </div>
                            <div>
                                <span className="font-semibold">Role:</span> {user.role}
                            </div>
                            <div>
                                <span className="font-semibold">Terms Accepted:</span>{" "}
                                {user.terms_accept ? "Yes" : "No"}
                            </div>
                            <div>
                                <span className="font-semibold">Verified:</span>{" "}
                                {user.is_verify ? "Yes" : "No"}
                            </div>
                            <div>
                                <span className="font-semibold">Status:</span>{" "}
                                {user.is_active ? "Active" : "Inactive"}
                            </div>
                            <div>
                                <span className="font-semibold">Blocked:</span>{" "}
                                {user.is_block ? "Yes" : "No"}
                            </div>
                            <div>
                                <span className="font-semibold">Date Joined:</span>{" "}
                                {new Date(user.date_joined).toLocaleDateString("en-GB", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                })}
                            </div>
                            <div>
                                <span className="font-semibold">Last Login:</span>{" "}
                                {user.last_login
                                    ? new Date(user.last_login).toLocaleString("en-GB", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })
                                    : "Never"}
                            </div>
                        </div>
                        <div className="mt-6">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                                NID Images
                            </h3>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                                {user.nid_front_side && (
                                    <div
                                        className="border border-gray-300 rounded-lg p-4 shadow-sm w-60 text-center bg-gray-50 cursor-pointer hover:shadow-lg transition"
                                        onClick={() =>
                                            setSelectedImage(`${MEDIA_URL}${user.nid_front_side}`)
                                        }
                                    >
                                        <img
                                            src={`${MEDIA_URL}${user.nid_front_side}`}
                                            alt="NID Front Side"
                                            className="w-full h-auto rounded-md object-contain"
                                        />
                                        <p className="mt-2 text-gray-700 font-medium">Front Side</p>
                                    </div>
                                )}
                                {user.nid_back_side && (
                                    <div
                                        className="border border-gray-300 rounded-lg p-4 shadow-sm w-60 text-center bg-gray-50 cursor-pointer hover:shadow-lg transition"
                                        onClick={() =>
                                            setSelectedImage(`${MEDIA_URL}${user.nid_back_side}`)
                                        }
                                    >
                                        <img
                                            src={`${MEDIA_URL}${user.nid_back_side}`}
                                            alt="NID Back Side"
                                            className="w-full h-auto rounded-md object-contain"
                                        />
                                        <p className="mt-2 text-gray-700 font-medium">Back Side</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex justify-center items-center gap-4 mt-6">
                            <button
                                className={`text-white ${user.is_verify
                                    ? "bg-orange-600 hover:bg-orange-700"
                                    : "bg-green-600 hover:bg-green-700"
                                    } py-2.5 px-6 rounded shadow`}
                                type="button"
                                onClick={handleToggleVerify}
                                disabled={isUpdating}
                            >
                                {isUpdating
                                    ? "Processing..."
                                    : user.is_verify
                                        ? "Unverify User"
                                        : "Verify User"}
                            </button>
                            <button
                                className={`text-white ${user.is_active
                                    ? "bg-yellow-600 hover:bg-yellow-700"
                                    : "bg-blue-600 hover:bg-blue-700"
                                    } py-2.5 px-6 rounded shadow`}
                                type="button"
                                onClick={handleToggleActive}
                                disabled={isUpdating}
                            >
                                {isUpdating
                                    ? "Processing..."
                                    : user.is_active
                                        ? "Deactivate User"
                                        : "Activate User"}
                            </button>
                            <button
                                className={`text-white ${user.is_block
                                    ? "bg-red-600 hover:bg-red-700"
                                    : "bg-gray-600 hover:bg-gray-700"
                                    } py-2.5 px-6 rounded shadow`}
                                type="button"
                                onClick={handleToggleBlock}
                                disabled={isUpdating}
                            >
                                {isUpdating
                                    ? "Processing..."
                                    : user.is_block
                                        ? "Unblock User"
                                        : "Block User"}
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[9999]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.div
                            className="relative"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <img
                                src={selectedImage}
                                alt="Full View"
                                className="max-w-[90vw] max-h-[90vh] rounded-lg shadow-lg"
                            />
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="absolute top-2 right-2 text-white bg-black bg-opacity-50 rounded-full px-3 py-1 text-lg hover:bg-opacity-80"
                            >
                                ✕
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
