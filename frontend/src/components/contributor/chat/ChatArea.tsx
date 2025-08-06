import React from "react";
import type { ChatMessage, UserInfo } from "../Chat";
import { FileUpload } from "./FileUpload";
import { MessageBox } from "./MessageBox";
import { MessageInput } from "./MessageInput";
import { Profile } from "./Profile";

interface ChatAreaProps {
    messages: ChatMessage[];
    username: string;
    renderUserAvatar: (user: UserInfo) => JSX.Element;
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

export const ChatArea: React.FC<ChatAreaProps> = ({
    messages,
    username,
    renderUserAvatar,
    isFileUrl,
    bottomRef,
    message,
    setMessage,
    handleSend,
    handleFileChange,
    handleFileUpload,
    selectedFile,
    roomName,
    receiver,
}) => {
    return (
        <div className="w-full h-full px-5 py-5 flex flex-col overflow-scroll scrollbar-hidden">
            <Profile receiverUsername={receiver} />
            <MessageBox
                messages={messages}
                username={username}
                renderUserAvatar={renderUserAvatar}
                isFileUrl={isFileUrl}
                bottomRef={bottomRef}
            />
            <div className="bg-white p-3 border-t border-gray-200">
                <div className="flex items-end gap-2 sm:gap-3">
                    <FileUpload
                        handleFileChange={handleFileChange}
                        handleFileUpload={handleFileUpload}
                        selectedFile={selectedFile}
                    />
                    <MessageInput
                        roomName={roomName}
                        message={message}
                        setMessage={setMessage}
                        handleSend={handleSend}
                        selectedFile={selectedFile}
                    />
                </div>
            </div>

        </div>
    );
};
