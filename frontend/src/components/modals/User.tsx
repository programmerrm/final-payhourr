import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useGetUserQuery } from "../../redux/features/auth/authApi";
import type { RootState } from "../../redux/store";

interface Props {
    onClose: () => void;
}

export const User: React.FC<Props> = ({ onClose }) => {
    const userId = useSelector((state: RootState) => state.auth.user?.id);

    const { data: user, isLoading: userLoading } = useGetUserQuery(Number(userId), {
        skip: !userId,
    });

    const [editMode, setEditMode] = useState(false);

    if (!user || userLoading) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-xl p-6 w-full max-w-lg relative max-h-[90vh] overflow-auto">
                <button onClick={onClose} className="absolute top-3 right-3 text-xl">✕</button>

                <h2 className="text-lg font-semibold mb-4">
                    {editMode ? "Edit Profile" : "User Profile"}
                </h2>

                <div className="flex justify-center mb-4">
                    <img
                        src={user.image || "https://via.placeholder.com/100"}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover border"
                    />
                </div>

                {!editMode ? (
                    <div className="space-y-2 text-sm text-gray-700">
                        <p><strong>First Name:</strong> {user.first_name || "-"}</p>
                        <p><strong>Last Name:</strong> {user.last_name || "-"}</p>
                        <p><strong>Phone Number:</strong> {user.number || "-"}</p>
                        <p><strong>Payment Number:</strong> {user.payment_number || "-"}</p>
                        <p><strong>Date of Birth:</strong> {user.date_of_birth || "-"}</p>
                        <p><strong>Gender:</strong> {user.gender || "-"}</p>
                        <p><strong>Address:</strong> {user.address || "-"}</p>
                        <p><strong>Zip Code:</strong> {user.zip_code || "-"}</p>
                        <p><strong>Country:</strong> {user.country || "-"}</p>

                        <button
                            onClick={() => setEditMode(true)}
                            className="mt-4 w-full bg-black text-white py-2.5 rounded hover:bg-gray-900"
                        >
                            Edit
                        </button>
                    </div>
                ) : (
                    <div></div>
                    // <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    //     {/* <input type="text" {...register("image")} placeholder="Image URL" className="input" />
                    //     <input {...register("first_name", { required: true })} placeholder="First Name" className="input" />
                    //     <input {...register("last_name")} placeholder="Last Name" className="input" />
                    //     <input {...register("number")} placeholder="Phone Number" className="input" />
                    //     <input {...register("payment_number")} placeholder="Payment Number" className="input" />
                    //     <input type="date" {...register("date_of_birth")} className="input" />
                    //     <select {...register("gender")} className="input">
                    //         <option value="">Select</option>
                    //         <option value="male">Male</option>
                    //         <option value="female">Female</option>
                    //         <option value="other">Other</option>
                    //     </select>
                    //     <input {...register("address")} placeholder="Address" className="input" />
                    //     <input {...register("zip_code")} placeholder="Zip Code" className="input" />
                    //     <input {...register("country")} placeholder="Country" className="input" />

                    //     <div className="flex justify-between gap-4">
                    //         <button
                    //             type="submit"
                    //             disabled={isUpdating}
                    //             className="w-full bg-black text-white py-2.5 rounded hover:bg-gray-900"
                    //         >
                    //             {isUpdating ? "Updating..." : "Update"}
                    //         </button>
                    //         <button
                    //             type="button"
                    //             onClick={() => setEditMode(false)}
                    //             className="w-full bg-gray-200 text-black py-2.5 rounded hover:bg-gray-300"
                    //         >
                    //             Cancel
                    //         </button>
                    //     </div> */}
                    //     <div>nai kichu</div>
                    // </form>
                )}
            </div>
        </div>
    );
};
