import React from "react";
import { MessageBox } from "./MessageBox";
import { MessageInput } from "./MessageInput";
import { Profile } from "./Profile";
import type { ChatMessage, UserInfo } from "../../../types/chat/ChatProps";

interface ChatAreaProps {
    messages: ChatMessage[];
    username: string;
    renderUserAvatar: (user: UserInfo) => React.ReactNode;
    isFileUrl: (text: string) => boolean;
    bottomRef: React.RefObject<HTMLDivElement>;
    message: string;
    setMessage: React.Dispatch<React.SetStateAction<string>>;
    handleSend: () => void;
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleFileUpload: () => void;
    selectedFile: File | null;
    roomName: string;
    receiver: string;
    participantsInfo: UserInfo;
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
    participantsInfo,
}) => {
    return (
        <div className="w-full h-full grow p-2.5 md:px-5 md:py-5 flex flex-col space-y-2 md:space-y-4 overflow-scroll scrollbar-hidden">
            <Profile receiverUsername={receiver} participantsInfo={participantsInfo} />
            <MessageBox
                messages={messages}
                username={username}
                renderUserAvatar={renderUserAvatar}
                isFileUrl={isFileUrl}
                bottomRef={bottomRef}
            />
            <div className="bg-white border border-gray-200 px-3 rounded-4xl">
                <div className="flex items-center justify-between gap-2 sm:gap-3">
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
