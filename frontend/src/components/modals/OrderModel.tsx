import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGetSingleOrderQuery } from "../../redux/features/orders/ordersApi";

interface OrderModelProps {
    orderId: number | null;
    onClose: () => void;
}

export const OrderModel: React.FC<OrderModelProps> = ({ orderId, onClose }) => {
    const { data, isLoading } = useGetSingleOrderQuery(orderId!, {
        skip: !orderId,
    });

    return (
        <AnimatePresence>
            {orderId && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {/* Modal content */}
                    <motion.div
                        className="bg-white rounded-2xl shadow-2xl p-6 max-w-lg w-full"
                        initial={{ scale: 0.8, opacity: 0, y: 50 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.8, opacity: 0, y: 50 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold text-gray-800">
                                Order Details
                            </h2>
                            <button
                                onClick={onClose}
                                className="text-gray-500 hover:text-gray-700 text-xl"
                            >
                                ✕
                            </button>
                        </div>

                        {isLoading ? (
                            <p className="text-center text-gray-500">Loading...</p>
                        ) : data ? (
                            <div className="space-y-2 text-gray-700">
                                <p><span className="font-medium">Order ID:</span> {data?.data.order_id}</p>
                                <p><span className="font-medium">Title:</span> {data?.data.title}</p>
                                <p><span className="font-medium">Amount:</span> ${data?.data.amount}</p>
                                <p><span className="font-medium">Sender:</span> @{data?.data.sender.username}</p>
                                <p><span className="font-medium">Receiver:</span> @{data?.data.receiver.username}</p>
                                <p><span className="font-medium">Status:</span> {data?.data.status}</p>
                                <p><span className="font-medium">Approved:</span> {data?.data.is_approved ? "Yes" : "No"}</p>
                            </div>
                        ) : (
                            <p className="text-center text-gray-500">No data found.</p>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
