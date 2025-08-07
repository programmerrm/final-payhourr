import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import type { RootState } from "../../../redux/store";
import { useAddFileUploadMutation, useGetMessageListQuery } from "../../../redux/features/chat/chat";
import useWebSocket from "react-use-websocket";
import { useEffect, useRef, useState } from "react";
import { MEDIA_URL } from "../../../utils/Api";
import { v4 as uuidv4 } from "uuid";
import { AdminChatArea } from "./AdminChatArea";

/* User Type */
export interface UserInfo {
    id: number;
    email: string;
    username: string;
    image?: string;
}

/* Chat Message Type */
export interface ChatMessage {
    id: string;
    sender: UserInfo;
    receiver: UserInfo;
    message: string;
}

const isFilePath = (text: string) => /^\/?media\/.+/.test(text);

export default function AdminChat() {
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

    const renderUserAvatar = (user: UserInfo) => {
        if (user.image) {
            const imgSrc = user.image.startsWith("http")
                ? user.image
                : normalizeUrl(user.image);
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

    const isFileUrl = (text: string) =>
        /^https?:\/\/.+\.(jpg|jpeg|png|gif|mp4|pdf|docx?|xlsx?|pptx?)$/i.test(text);

    useEffect(() => {
        if (initialMessages && Array.isArray(initialMessages)) {
            const formatted = initialMessages.map((msg: any) => {
                let msgContent = msg.content;
                if (
                    typeof msgContent === "string" &&
                    isFilePath(msgContent) &&
                    !msgContent.startsWith("http")
                ) {
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

                if (
                    typeof normalizedMessage === "string" &&
                    isFilePath(normalizedMessage) &&
                    !normalizedMessage.startsWith("http")
                ) {
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
    return (
        <div className="relative grow overflow-y-auto scrollbar-hidden w-full border-2 border-black/80 rounded">
            <div className="grid grid-cols-[70%_30%] h-full">
                <AdminChatArea
                    messages={messages}
                    username={username || ""}
                    renderUserAvatar={renderUserAvatar}
                    isFileUrl={isFileUrl}
                    bottomRef={bottomRef}
                    message={message}
                    setMessage={setMessage}
                    handleSend={handleSend}
                    handleFileChange={handleFileChange}
                    handleFileUpload={handleFileUpload}
                    selectedFile={selectedFile}
                    roomName={roomName || ""}
                    receiver={receiver}
                />
                <div>
                    <h2>user</h2>
                </div>
            </div>
        </div>
    );
}
