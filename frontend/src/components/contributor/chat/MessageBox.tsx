import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ChatMessage, UserInfo } from "../../../types/chat/ChatProps";
import { ReactIcons } from "../../../utils/ReactIcons";
import { toast } from "react-toastify";
import { useAddOrderUpdateMutation } from "../../../redux/features/orders/ordersApi";

interface MessageBoxProps {
    messages: ChatMessage[];
    username: string;
    renderUserAvatar: (user: UserInfo) => React.ReactNode;
    isFileUrl: (text: string) => boolean;
    bottomRef: React.RefObject<HTMLDivElement>;
}

export const MessageBox: React.FC<MessageBoxProps> = ({
    messages,
    username,
    renderUserAvatar,
    isFileUrl,
    bottomRef,
}) => {
    const [selectedMedia, setSelectedMedia] = useState<string | null>(null);
    const closeMedia = () => setSelectedMedia(null);
    const { IoMdClose } = ReactIcons;

    const [addOrderUpdate] = useAddOrderUpdateMutation();

    const handleCancelOrder = async (orderID: any) => {
        try {
            await addOrderUpdate({ id: orderID, is_approved: false }).unwrap();
            toast.success("Order cancelled successfully");
        } catch (error: any) {
            console.log(error);
        }
    }

    const handleAcceptOrder = async (orderID: any) => {
        try {
            await addOrderUpdate({ id: orderID, is_approved: true }).unwrap();
            toast.success("Order approved successfully");
        } catch (error: any) {
            console.log(error);
        }
    }

    return (
        <div className="flex-grow overflow-y-auto scrollbar-hidden bg-white p-2 md:p-4 rounded-lg mb-4 space-y-2 md:space-y-6 relative">
            {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center mt-28 text-gray-500 space-y-4">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/2910/2910769.png"
                        alt="Chat Illustration"
                        className="w-32 h-32 opacity-70"
                    />
                    <h2 className="text-xl font-semibold text-gray-700">
                        Welcome to PayHourr Live Chat!
                    </h2>
                    <p className="text-gray-500 max-w-xs">
                        Start a conversation by sending a message.
                    </p>
                </div>
            ) : (
                messages.map((msg) => {
                    const isOwnMessage = msg.sender.username === username;
                    const isImage = msg.message.match(/\.(jpg|jpeg|png|gif)$/i);
                    const isVideo = msg.message.match(/\.(mp4)$/i);
                    const isPdf = msg.message.match(/\.(pdf)$/i);
                    const isOtherFile =
                        isFileUrl(msg.message) && !isImage && !isVideo && !isPdf;
                    return (
                        <div
                            key={msg.id}
                            className={`flex items-end ${isOwnMessage ? "justify-end ml-auto" : "justify-start"
                                } gap-1 md:gap-3 max-w-lg`}
                        >
                            {!isOwnMessage && renderUserAvatar(msg.sender)}
                            <div
                                className={`${isOwnMessage ? "items-end" : "items-start"
                                    } flex flex-col gap-1`}
                            >
                                {isImage && (
                                    <motion.div
                                        whileHover={{ scale: 1.05, }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="rounded-2xl shadow max-w-xs overflow-hidden cursor-pointer"
                                        onClick={() => setSelectedMedia(msg.message)}
                                    >
                                        <img
                                            src={msg.message}
                                            alt="Image"
                                            className="w-full h-auto rounded-2xl"
                                        />
                                    </motion.div>
                                )}
                                {isVideo && (
                                    <div className="rounded-2xl shadow max-w-xs overflow-hidden">
                                        <video controls className="w-full rounded-2xl">
                                            <source src={msg.message} type="video/mp4" />
                                        </video>
                                    </div>
                                )}
                                {isPdf && (
                                    <div
                                        className={`p-3 rounded-2xl shadow text-sm max-w-xs ${isOwnMessage
                                            ? "bg-blue-600 text-white rounded-br-none"
                                            : "bg-white text-gray-800 rounded-bl-none border border-gray-200"
                                            }`}
                                    >
                                        <p className="mb-2 font-medium">Here’s the PDF:</p>
                                        <a
                                            href={msg.message}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-blue-700 hover:underline shadow-sm transition"
                                        >
                                            📄 View PDF
                                        </a>
                                    </div>
                                )}
                                {isOtherFile && (
                                    <div
                                        className={`p-3 rounded-2xl shadow text-sm max-w-xs ${isOwnMessage
                                            ? "bg-blue-600 text-white rounded-br-none"
                                            : "bg-white text-gray-800 rounded-bl-none border border-gray-200"
                                            }`}
                                    >
                                        <p className="mb-2 font-medium">Attached file:</p>
                                        <a
                                            href={msg.message}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-blue-700 hover:underline shadow-sm transition"
                                        >
                                            📎 Download File
                                        </a>
                                    </div>
                                )}
                                {!isFileUrl(msg.message) && (
                                    msg.message.trim().startsWith("<") ? (
                                        <div
                                            className={`p-4 rounded-2xl shadow-lg max-w-xs w-full ${isOwnMessage ? "bg-blue-600 text-white rounded-br-none" : "bg-gray-100 text-gray-900 rounded-bl-none"}`}
                                        >
                                            <div
                                                className="space-y-2 text-sm md:text-base"
                                                dangerouslySetInnerHTML={{ __html: msg.message }}
                                            />
                                            {isOwnMessage ? (
                                                <button
                                                    className="mt-3 w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                                                    onClick={() => handleCancelOrder(msg?.order?.id)}
                                                >
                                                    Cancel Order
                                                </button>
                                            ) : (
                                                <button
                                                    className="mt-3 w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                                                    onClick={() => handleAcceptOrder(msg?.order?.id)}
                                                >
                                                    Accept Order
                                                </button>
                                            )}
                                        </div>
                                    ) : (
                                        <div
                                            className={`p-3 rounded-2xl shadow text-sm max-w-xs ${isOwnMessage ? "bg-blue-600 text-white rounded-br-none" : "bg-gray-200 text-gray-900 rounded-bl-none"}`}
                                        >
                                            <p>{msg.message}</p>
                                        </div>
                                    )
                                )}
                            </div>
                            {isOwnMessage && renderUserAvatar(msg.sender)}
                        </div>
                    );
                })
            )}
            <div ref={bottomRef} />
            <AnimatePresence>
                {selectedMedia && (
                    <motion.div
                        className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeMedia}
                    >
                        <motion.img
                            src={selectedMedia}
                            alt="Expanded"
                            className="max-h-[90%] max-w-[90%] rounded-xl shadow-lg cursor-pointer"
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                            onClick={(e) => e.stopPropagation()}
                        />
                        <button
                            onClick={closeMedia}
                            className="flex justify-center items-center absolute top-5 right-5 text-white bg-gray-800 rounded-full w-14 h-14 p-2 hover:bg-gray-700 transition"
                        >
                            <IoMdClose className="text-3xl" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
