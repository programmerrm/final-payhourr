import React from "react";
import { DisputeNow } from "./DisputeNow";
import { ReactIcons } from "../../../utils/ReactIcons";
import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";

interface MessageInputProps {
    message: string;
    setMessage: React.Dispatch<React.SetStateAction<string>>;
    handleSend: () => void;
    selectedFile: File | null;
    roomName: string;
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleFileUpload: () => void;
}

export const MessageInput: React.FC<MessageInputProps> = ({
    message,
    setMessage,
    handleSend,
    selectedFile,
    roomName,
    handleFileChange,
}) => {
    const { FaCloudUploadAlt } = ReactIcons;
    const role = useSelector((state: RootState) => state.auth.user?.role);
    return (
        <>
            <div className="flex items-center w-full grow">
                <div className="flex items-center justify-center">
                    <label className="cursor-pointer inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition">
                        <FaCloudUploadAlt className="w-6 h-6 sm:w-7 sm:h-7" />
                        <input
                            type="file"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </label>
                </div>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !selectedFile) {
                            e.preventDefault();
                            handleSend();
                        }
                    }}
                    disabled={!!selectedFile}
                    placeholder="Type a message..."
                    className="flex-1 resize-none border border-gray-300 rounded-2xl px-5 py-2 text-sm appearance-none border-none bg-transparent overflow-y-auto max-h-40 outline-none"
                    style={{ minHeight: "42px" }}
                ></textarea>

                <button
                    onClick={handleSend}
                    disabled={!message.trim() || !!selectedFile}
                    type="submit"
                    className="text-blue-600 hover:text-blue-700 p-2 rounded-full transition"
                    title="Send"
                >
                    <svg className="w-6 h-6 rotate-45" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </button>

                {selectedFile && (
                    <div className="text-sm text-gray-500 mt-2">
                        Selected file: {selectedFile.name}
                    </div>
                )}
            </div>
            {role !== "admin" && (
                <DisputeNow roomName={roomName || ""} />
            )}
        </>
    );
}
