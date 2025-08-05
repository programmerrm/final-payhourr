import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useWebSocket from "react-use-websocket";
import { v4 as uuidv4 } from "uuid";
import { useAddFileUploadMutation, useGetMessageListQuery } from "../../redux/features/chat/chat";
import type { RootState } from "../../redux/store";
import { MEDIA_URL } from "../../utils/Api";

/* User Type */
interface UserInfo {
    id: number;
    email: string;
    username: string;
    image?: string;
}

/* Chat Message Type */
interface ChatMessage {
    id: string;
    sender: UserInfo;
    receiver: UserInfo;
    message: string;
}

const isFilePath = (text: string) => /^\/?media\/.+/.test(text);

export default function Chat() {
    const { roomName } = useParams<{ roomName: string }>();
    const username = useSelector((state: RootState) => state.auth.user?.username);
    const { data: initialMessages } = useGetMessageListQuery(roomName!, {
        refetchOnMountOrArgChange: true,
    });
    const [addFileUpload] = useAddFileUploadMutation();

    const socketUrl = `ws://127.0.0.1:8000/ws/chat/${roomName}/`;
    const { sendMessage, lastMessage } = useWebSocket(socketUrl, {
        shouldReconnect: () => true,
    });

    const [message, setMessage] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const bottomRef = useRef<HTMLDivElement | null>(null);

    const participants = roomName ? roomName.split("_") : [];
    const receiver = participants.find((p) => p !== username) || "";

    const normalizeUrl = (url: string) =>
        url.startsWith("http")
            ? url
            : `${MEDIA_URL.replace(/\/$/, "")}/${url.replace(/^\//, "")}`;

    // Helper to render user avatar or first letter fallback
    const renderUserAvatar = (user: UserInfo) => {
        if (user.image) {
            const imgSrc = user.image.startsWith("http") ? user.image : normalizeUrl(user.image);
            return (
                <img
                    src={imgSrc}
                    alt={user.username}
                    className="w-8 h-8 rounded-full object-cover"
                />
            );
        } else {
            return (
                <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                    {user.username.charAt(0).toUpperCase()}
                </div>
            );
        }
    };

    useEffect(() => {
        if (initialMessages && Array.isArray(initialMessages)) {
            const formatted = initialMessages.map((msg: any) => {
                let msgContent = msg.content;
                if (typeof msgContent === "string" && isFilePath(msgContent) && !msgContent.startsWith("http")) {
                    msgContent = normalizeUrl(msgContent);
                }

                return {
                    id: msg.id || uuidv4(),
                    sender: msg.sender,
                    receiver: msg.receiver,
                    message: msgContent,
                };
            });
            setMessages(formatted);
        }
    }, [initialMessages]);

    useEffect(() => {
        if (lastMessage !== null) {
            try {
                const data: ChatMessage = JSON.parse(lastMessage.data);
                let normalizedMessage = data.message;

                if (typeof normalizedMessage === "string" && isFilePath(normalizedMessage) && !normalizedMessage.startsWith("http")) {
                    normalizedMessage = normalizeUrl(normalizedMessage);
                }

                setMessages((prev) => {
                    if (prev.some((msg) => msg.id === data.id)) return prev;
                    return [...prev, { ...data, message: normalizedMessage }];
                });
            } catch (err) {
                console.error("Invalid WebSocket message:", err);
            }
        }
    }, [lastMessage]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = () => {
        if (!message.trim() || !username || !receiver) return;

        const newMsg = {
            id: uuidv4(),
            sender: { username },
            receiver: { username: receiver },
            message: message.trim(),
        };

        sendMessage(JSON.stringify(newMsg));
        setMessages((prev) => [...prev, newMsg as ChatMessage]);
        setMessage("");
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleFileUpload = async () => {
        if (!selectedFile || !username || !receiver) return;

        const formData = new FormData();
        formData.append("attachment", selectedFile);
        formData.append("receiver", receiver);

        try {
            const response = await addFileUpload(formData).unwrap();
            const fileUrl = response.attachment;
            const fullUrl = normalizeUrl(fileUrl);

            const newMsg = {
                id: uuidv4(),
                sender: { username },
                receiver: { username: receiver },
                message: fullUrl,
            };

            sendMessage(JSON.stringify(newMsg));
            setMessages((prev) => [...prev, newMsg as ChatMessage]);
            setSelectedFile(null);
        } catch (error) {
            console.error("File upload failed:", error);
        }
    };

    const isFileUrl = (text: string) =>
        /^https?:\/\/.+\.(jpg|jpeg|png|gif|mp4|pdf|docx?|xlsx?|pptx?)$/i.test(text);

    return (
        <div className="relative h-screen w-full border-2 border-black/80 rounded">
            <div className="grid grid-cols-[70%_30%] h-full">
                {/* Chat Area */}
                <div className="w-full h-full px-5 py-5 flex flex-col overflow-scroll">
                    <div className="flex-grow overflow-y-auto bg-white p-4 rounded-lg mb-4">
                        {messages.length === 0 ? (
                            <li className="text-center text-gray-500">No messages yet</li>
                        ) : (
                            messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`mb-2 flex ${msg.sender.username === username ? "justify-end" : "justify-start"}`}
                                >
                                    <div className="flex items-center gap-2">
                                        {/* Show avatar only for other users */}
                                        {msg.sender.username !== username && renderUserAvatar(msg.sender)}

                                        <div
                                            className={`px-4 py-2 rounded-xl ${msg.sender.username === username
                                                ? "bg-blue-600 text-white"
                                                : "bg-gray-200"
                                                }`}
                                        >
                                            
                                            {isFileUrl(msg.message) ? (
                                                msg.message.match(/\.(jpg|jpeg|png|gif)$/i) ? (
                                                    <img src={msg.message} alt="attachment" className="max-w-xs rounded" />
                                                ) : msg.message.match(/\.(mp4)$/i) ? (
                                                    <video controls className="max-w-xs rounded">
                                                        <source src={msg.message} type="video/mp4" />
                                                        Your browser does not support the video tag.
                                                    </video>
                                                ) : msg.message.match(/\.(pdf)$/i) ? (
                                                    <a href={msg.message} target="_blank" rel="noopener noreferrer" className="text-white underline">
                                                        View PDF
                                                    </a>
                                                ) : (
                                                    <a href={msg.message} target="_blank" rel="noopener noreferrer" className="text-white underline">
                                                        Download File
                                                    </a>
                                                )
                                            ) : (
                                                msg.message
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                        {/* Invisible div for scroll target */}
                        <div ref={bottomRef} />
                    </div>

                    {/* Message Input */}
                    <div className="flex items-center gap-3">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1 border border-gray-300 rounded-xl px-4 py-2 focus:outline-none"
                            onKeyDown={(e) => {
                                if (e.key === "Enter") handleSend();
                            }}
                            disabled={!!selectedFile}
                        />
                        <button
                            onClick={handleSend}
                            className="bg-gray-900 text-white px-4 py-2 rounded-xl"
                            disabled={!message.trim() || !!selectedFile}
                        >
                            Send
                        </button>
                    </div>

                    {/* File Upload */}
                    <div className="flex items-center gap-3 mt-3">
                        <input type="file" onChange={handleFileChange} />
                        <button
                            onClick={handleFileUpload}
                            className="bg-green-600 text-white px-4 py-2 rounded-xl"
                            disabled={!selectedFile}
                        >
                            Upload File
                        </button>
                    </div>
                    <div>
                        <button type="button">
                            Dispute Now
                        </button>
                    </div>
                </div>

                {/* Connected Users */}
                <div className="w-full h-full px-5 py-5 border-l-2 border-black/80">
                    <h3 className="text-xl font-semibold text-center mb-4">Connected Users</h3>
                    <div className="space-y-3">
                        {participants.map((p, idx) => {
                            const userObj: UserInfo = {
                                id: idx, 
                                email: "",
                                username: p,
                            };

                            return (
                                <div
                                    key={idx}
                                    className="flex items-center gap-3 bg-gray-200 rounded-full px-4 py-2"
                                >
                                    {renderUserAvatar(userObj)}
                                    <span>{p === username ? "You" : p}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </div>
    );
}
