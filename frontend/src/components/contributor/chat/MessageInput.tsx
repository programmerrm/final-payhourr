import React from "react";
import { DisputeNow } from "./DisputeNow";

interface MessageInputProps {
    message: string;
    setMessage: React.Dispatch<React.SetStateAction<string>>;
    handleSend: () => void;
    selectedFile: File | null;
    roomName: string;
}

export const MessageInput: React.FC<MessageInputProps> = ({
    message,
    setMessage,
    handleSend,
    selectedFile,
    roomName,
}) => {
    return (
        <>
            <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") handleSend();
                }}
                disabled={!!selectedFile}
                placeholder="Type a message..."

                className="flex-1 resize-none border border-gray-300 rounded-2xl px-5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 overflow-y-auto max-h-40 bg-gray-50"

                style={{ minHeight: "42px" }}

            ></textarea>
            <DisputeNow roomName={roomName || ""} />
            <button onClick={handleSend} disabled={!message.trim() || !!selectedFile} type="submit" className="hidden sm:inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-sm font-medium transition">Send</button>
            <button onClick={handleSend} disabled={!message.trim() || !!selectedFile} type="submit" className="sm:hidden text-blue-600 hover:text-blue-700 p-2 rounded-full transition" title="Send">
                <svg className="w-6 h-6 rotate-45" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
            </button>
        </>
    );
};






