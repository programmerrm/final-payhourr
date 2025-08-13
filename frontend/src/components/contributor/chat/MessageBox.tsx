import React from "react";
import type { ChatMessage, UserInfo } from "../Chat";

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
    return (
        <div className="flex-grow overflow-y-auto scrollbar-hidden bg-white p-2 md:p-4 rounded-lg mb-4 space-y-2 md:space-y-6">
            {messages.length === 0 ? (
                <li className="text-center text-gray-500">No messages yet</li>
            ) : (
                messages.map((msg) => {
                    const isOwnMessage = msg.sender.username === username;
                    const isImage = msg.message.match(/\.(jpg|jpeg|png|gif)$/i);
                    const isVideo = msg.message.match(/\.(mp4)$/i);
                    const isPdf = msg.message.match(/\.(pdf)$/i);
                    const isOtherFile = isFileUrl(msg.message) && !isImage && !isVideo && !isPdf;

                    return (
                        <div
                            key={msg.id}
                            className={`flex items-end ${isOwnMessage ? "justify-end ml-auto" : "justify-start"} gap-1 md:gap-3 max-w-lg`}
                        >
                            {!isOwnMessage && renderUserAvatar(msg.sender)}

                            {/** Message Content */}
                            <div
                                className={`${
                                    isOwnMessage
                                        ? "items-end"
                                        : "items-start"
                                } flex flex-col gap-1`}
                            >
                                {isImage && (
                                    <div className="rounded-2xl shadow max-w-xs overflow-hidden">
                                        <img
                                            src={msg.message}
                                            alt="Image"
                                            className="w-full h-auto rounded-2xl"
                                        />
                                    </div>
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
                                        className={`p-3 rounded-2xl shadow text-sm max-w-xs ${
                                            isOwnMessage
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
                                        className={`p-3 rounded-2xl shadow text-sm max-w-xs ${
                                            isOwnMessage
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
                                    <div
                                        className={`p-3 rounded-2xl shadow text-sm max-w-xs ${
                                            isOwnMessage
                                                ? "bg-blue-600 text-white rounded-br-none"
                                                : "bg-gray-200 text-gray-900 rounded-bl-none"
                                        }`}
                                    >
                                        {msg.message}
                                    </div>
                                )}
                            </div>

                            {isOwnMessage && renderUserAvatar(msg.sender)}
                        </div>
                    );
                })
            )}

            {/* Scroll to Bottom Ref */}
            <div ref={bottomRef} />
        </div>
    );
};
