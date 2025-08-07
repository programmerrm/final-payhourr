import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
    useAddDisputeUpdateMutation,
    useGetSingleDisputeQuery,
} from "../../redux/features/dispute/disputeApi";

interface DisputeShowProps {
    id: number;
    onClose: () => void;
    refetch: () => void;
}

export const DisputeShow: React.FC<DisputeShowProps> = ({ id, onClose, refetch }) => {
    const { data, isLoading, isError } = useGetSingleDisputeQuery(id);
    const [addDisputeUpdate, { isLoading: isUpdating }] = useAddDisputeUpdateMutation();
    const [status, setStatus] = useState<string | undefined>(undefined);

    const auth = useSelector((state: any) => state.auth); // adjust as per your auth state
    const isAdmin = auth?.user?.role === "admin" || auth?.user?.is_superuser;

    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    useEffect(() => {
        if (data?.status) {
            setStatus(data.status);
        }
    }, [data]);

    const handleUpdateStatus = async () => {
        try {
            await addDisputeUpdate({ id, status }).unwrap();
            refetch();
            onClose();
        } catch (err) {
            console.error("Failed to update dispute status", err);
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-2 md:p-4"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
        >
            <div
                className="bg-white rounded-2xl shadow-2xl max-w-md w-full sm:max-w-lg md:max-w-xl p-2.5 py-4 md:p-8 relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-2 md:top-4 right-4 text-gray-600 hover:text-gray-900 transition text-3xl font-bold"
                    aria-label="Close modal"
                >
                    &times;
                </button>

                <h2 className="text-base md:text-2xl font-extrabold mb-6 text-gray-900 border-b border-gray-200 pb-4">
                    Dispute Details <span className="text-indigo-600">#{id}</span>
                </h2>

                {isLoading && (
                    <p className="text-center text-gray-500 italic">Loading dispute details...</p>
                )}
                {isError && (
                    <p className="text-center text-red-500 font-semibold">
                        Failed to load dispute details.
                    </p>
                )}

                {data && (
                    <div className="space-y-5 text-gray-700">
                        <div className="flex flex-col sm:flex-row sm:justify-between">
                            <span className="text-sm md:text-lg font-semibold text-gray-900">Room Name:</span>
                            <span className="text-sm md:text-lg mt-1 sm:mt-0">{data.room_name}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between">
                            <span className="text-sm md:text-lg font-semibold text-gray-900">Raised By:</span>
                            <span className="text-sm md:text-lg mt-1 sm:mt-0">{data.raised_by?.username || "N/A"}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between">
                            <span className="text-sm md:text-lg font-semibold text-gray-900">Against User:</span>
                            <span className="text-sm md:text-lg mt-1 sm:mt-0">{data.against_user?.username || "N/A"}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between">
                            <span className="text-sm md:text-lg font-semibold text-gray-900">Subject:</span>
                            <span className="text-sm md:text-lg mt-1 sm:mt-0">{data.subject}</span>
                        </div>
                        <div>
                            <span className="text-sm md:text-lg font-semibold text-gray-900">Description:</span>
                            <p className="text-sm md:text-lg mt-1 whitespace-pre-wrap">{data.description}</p>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between">
                            <span className="text-sm md:text-lg font-semibold text-gray-900">Priority:</span>
                            <span className={`text-sm md:text-lg mt-1 sm:mt-0 capitalize
                                ${data.priority === 'high' ? 'text-red-600 font-bold' :
                                    data.priority === 'medium' ? 'text-yellow-600 font-semibold' :
                                        'text-green-600 font-medium'
                                }
                            `}>
                                {data.priority}
                            </span>
                        </div>

                        {/* ✅ STATUS section with admin dropdown */}
                        <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-2">
                            <span className="text-sm md:text-lg font-semibold text-gray-900">Status:</span>
                            {isAdmin ? (
                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="border rounded px-3 py-1 text-sm"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="completed">Completed</option>
                                    <option value="not_completed">Not Completed</option>
                                </select>
                            ) : (
                                <span className={`capitalize
                                    ${data.status === 'pending' ? 'text-yellow-700' :
                                        data.status === 'completed' ? 'text-green-700 font-semibold' :
                                            'text-red-700 font-semibold'
                                    }
                                `}>
                                    {data.status}
                                </span>
                            )}
                        </div>

                        <div className="flex flex-col sm:flex-row sm:justify-between">
                            <span className="text-sm md:text-lg font-semibold text-gray-900">Created At:</span>
                            <span className="text-sm md:text-lg mt-1 sm:mt-0">{new Date(data.created_at).toLocaleString("en-GB")}</span>
                        </div>

                        {isAdmin && (
                            <div className="mt-6 text-right">
                                <button
                                    onClick={handleUpdateStatus}
                                    disabled={isUpdating}
                                    className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
                                >
                                    {isUpdating ? "Updating..." : "Update Status"}
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
