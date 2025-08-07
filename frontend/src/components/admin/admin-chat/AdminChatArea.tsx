import React from "react";
import type { ChatMessage, UserInfo } from "./AdminChat";
import { AdminProfile } from "./AdminProfile";
import { AdminMessageBox } from "./AdminMessageBox";
import { MessageInput } from "../../contributor/chat/MessageInput";

interface ChatAreaProps {
    messages: ChatMessage[];
    username: string;
    renderUserAvatar: (user: UserInfo) => React.ReactNode;
    isFileUrl: (text: string) => boolean;
    bottomRef: React.RefObject<HTMLDivElement | null>;
    message: string;
    setMessage: React.Dispatch<React.SetStateAction<string>>;
    handleSend: () => void;
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleFileUpload: () => void;
    selectedFile: File | null;
    roomName: string;
    receiver: string;
}

export const AdminChatArea: React.FC<ChatAreaProps> = ({
    messages,
    username,
    renderUserAvatar,
    isFileUrl,
    bottomRef,
    message,
    setMessage,
    handleSend,
    selectedFile,
    roomName,
    receiver,
    handleFileChange,
    handleFileUpload,
}) => {
    console.log('receiver : ', receiver);
    return (
        <div className="w-full h-full grow p-2.5 md:px-5 md:py-5 flex flex-col space-y-2 md:space-y-4 overflow-scroll scrollbar-hidden">
            <AdminProfile />
            <AdminMessageBox
                messages={messages}
                username={username}
                renderUserAvatar={renderUserAvatar}
                isFileUrl={isFileUrl}
                bottomRef={bottomRef}
            />
            <div className="bg-white p-3 border-t border-gray-200">
                <div className="flex items-end gap-2 sm:gap-3">
                    <MessageInput
                        roomName={roomName}
                        message={message}
                        setMessage={setMessage}
                        handleSend={handleSend}
                        selectedFile={selectedFile}
                        handleFileChange={handleFileChange}
                        handleFileUpload={handleFileUpload}
                    />

                </div>
            </div>
        </div>
    );
};
