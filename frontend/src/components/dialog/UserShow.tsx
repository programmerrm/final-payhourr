import React from "react";
import { useGetUserQuery } from "../../redux/features/auth/authApi";
import { useAdminUpdateUserMutation } from "../../redux/features/user/userApi";
import { MEDIA_URL } from "../../utils/Api";
import { toast } from "react-toastify";

interface UserShowDialogProps {
    userId: number;
    onClose: () => void;
}

export const UserShowDialog: React.FC<UserShowDialogProps> = ({
    userId,
    onClose,
}) => {
    const { data: user, isLoading, isError, refetch } = useGetUserQuery(userId);
    const [adminUpdateUser, { isLoading: isUpdating }] = useAdminUpdateUserMutation();

    const handleVerify = async () => {
        try {
            await adminUpdateUser({ id: userId, is_verify: true }).unwrap();
            refetch();
            toast.success('User verify update successfully');
        } catch (error) {
            console.error("Verification failed:", error);
        }
    };

    console.log('user : ', user);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full relative overflow-auto max-h-[80vh] p-6 sm:p-8">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-3xl font-bold"
                    aria-label="Close"
                >
                    &times;
                </button>

                {isLoading && <p className="text-center text-gray-600">Loading user details...</p>}
                {isError && <p className="text-center text-red-600">Failed to load user data.</p>}

                {user && (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-semibold text-gray-900 text-center">User Details</h2>

                        {/* User Image */}
                        <div className="flex justify-center">
                            <img
                                src={`${MEDIA_URL}${user.image}`}
                                alt={`${user.username}'s avatar`}
                                className="w-28 h-28 rounded-full object-cover border-2 border-indigo-500 shadow-md"
                            />
                        </div>

                        {/* User Info */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
                            <div><span className="font-semibold">Username:</span> @{user.username}</div>
                            <div><span className="font-semibold">Email:</span> {user.email}</div>
                            <div><span className="font-semibold">Phone Number:</span> {user.number || "N/A"}</div>
                            <div><span className="font-semibold">Payment Number:</span> {user.payment_number || "N/A"}</div>
                            <div><span className="font-semibold">First Name:</span> {user.first_name || "N/A"}</div>
                            <div><span className="font-semibold">Last Name:</span> {user.last_name || "N/A"}</div>
                            <div><span className="font-semibold">Date of Birth:</span> {user.date_of_birth ? new Date(user.date_of_birth).toLocaleDateString() : "N/A"}</div>
                            <div><span className="font-semibold">Gender:</span> {user.gender || "N/A"}</div>
                            <div><span className="font-semibold">Address:</span> {user.address || "N/A"}</div>
                            <div><span className="font-semibold">Zip Code:</span> {user.zip_code || "N/A"}</div>
                            <div><span className="font-semibold">Country:</span> {user.country || "N/A"}</div>
                            <div><span className="font-semibold">Role:</span> {user.role}</div>
                            <div><span className="font-semibold">Terms Accepted:</span> {user.terms_accept ? "Yes" : "No"}</div>
                            <div><span className="font-semibold">Verified:</span> {user.is_verify ? "Yes" : "No"}</div>
                            <div><span className="font-semibold">Status:</span> {user.is_active ? "Active" : "Blocked"}</div>
                            <div><span className="font-semibold">Blocked:</span> {user.is_block ? "Yes" : "No"}</div>
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

                        {/* NID Images */}
                        <div className="mt-6">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">NID Images</h3>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                                {user.nid_front_side && (
                                    <div className="border border-gray-300 rounded-lg p-4 shadow-sm w-60 text-center bg-gray-50">
                                        <img
                                            src={`${MEDIA_URL}${user.nid_front_side}`}
                                            alt="NID Front Side"
                                            className="w-full h-auto rounded-md object-contain"
                                        />
                                        <p className="mt-2 text-gray-700 font-medium">Front Side</p>
                                    </div>
                                )}
                                {user.nid_back_side && (
                                    <div className="border border-gray-300 rounded-lg p-4 shadow-sm w-60 text-center bg-gray-50">
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

                        {/* Verify Button */}
                        <div className="flex justify-center items-center">
                            <button
                                className={`text-white bg-blue-600 hover:bg-blue-700 py-2.5 px-6 rounded shadow ${user.is_verify ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                                type="button"
                                onClick={handleVerify}
                                disabled={user.is_verify || isUpdating}
                            >
                                {isUpdating ? "Verifying..." : user.is_verify ? "Already Verified" : "Verify User"}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
