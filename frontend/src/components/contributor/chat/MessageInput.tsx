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
    const { FaCloudUploadAlt,IoMdSend } = ReactIcons;
    const role = useSelector((state: RootState) => state.auth.user?.role);
    return (
        <>
            <div className="flex items-center w-full grow">
                <div className="flex items-center justify-center">
                    <label className="cursor-pointer inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition relative">
                        <FaCloudUploadAlt className="w-6 h-6 sm:w-7 sm:h-7" />
                        <input
                            type="file"
                            className="hidden opacity-0 absolute w-full h-full"
                            onChange={handleFileChange}
                        />
                    </label>
                </div>
                <input 
                    type="text"
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
                />
                <button
                    onClick={handleSend}
                    disabled={!message.trim() || !!selectedFile}
                    type="submit"
                    className="text-blue-600 hover:text-blue-700 p-2 rounded-full transition"
                    title="Send"
                >
                   <IoMdSend className="text-2xl" />
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
