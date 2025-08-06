import React, { useEffect } from "react";
import { useGetSingleDisputeQuery } from "../../redux/features/dispute/disputeApi";

interface DisputeShowProps {
    id: number;
    onClose: () => void;
}

export const DisputeShow: React.FC<DisputeShowProps> = ({ id, onClose }) => {
    const { data, isLoading, isError } = useGetSingleDisputeQuery(id);

    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
        >
            <div
                className="bg-white rounded-2xl shadow-2xl max-w-md w-full sm:max-w-lg md:max-w-xl p-8 relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition text-3xl font-bold"
                    aria-label="Close modal"
                >
                    &times;
                </button>

                <h2 className="text-3xl font-extrabold mb-6 text-gray-900 border-b border-gray-200 pb-4">
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
                            <span className="font-semibold text-gray-900">Room Name:</span>
                            <span className="mt-1 sm:mt-0">{data.room_name}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between">
                            <span className="font-semibold text-gray-900">Raised By:</span>
                            <span className="mt-1 sm:mt-0">{data.raised_by?.username || "N/A"}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between">
                            <span className="font-semibold text-gray-900">Against User:</span>
                            <span className="mt-1 sm:mt-0">{data.against_user?.username || "N/A"}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between">
                            <span className="font-semibold text-gray-900">Subject:</span>
                            <span className="mt-1 sm:mt-0">{data.subject}</span>
                        </div>
                        <div>
                            <span className="font-semibold text-gray-900">Description:</span>
                            <p className="mt-1 whitespace-pre-wrap">{data.description}</p>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between">
                            <span className="font-semibold text-gray-900">Priority:</span>
                            <span className={`mt-1 sm:mt-0 capitalize
                                ${data.priority === 'high' ? 'text-red-600 font-bold' :
                                    data.priority === 'medium' ? 'text-yellow-600 font-semibold' :
                                        'text-green-600 font-medium'
                                }
                            `}>
                                {data.priority}
                            </span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between">
                            <span className="font-semibold text-gray-900">Status:</span>
                            <span className={`mt-1 sm:mt-0 capitalize
                                ${data.status === 'pending' ? 'text-yellow-700' :
                                    data.status === 'completed' ? 'text-green-700 font-semibold' :
                                        'text-red-700 font-semibold'
                                }
                            `}>
                                {data.status}
                            </span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between">
                            <span className="font-semibold text-gray-900">Created At:</span>
                            <span className="mt-1 sm:mt-0">{new Date(data.created_at).toLocaleString("en-GB")}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
