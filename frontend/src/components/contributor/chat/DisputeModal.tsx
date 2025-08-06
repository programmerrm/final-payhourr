import React from "react";
import { DisputeForm } from "../../forms/DisputeForm";

interface DisputeModalProps {
    roomName: string;
    onClose: () => void;
}

export const DisputeModal: React.FC<DisputeModalProps> = ({ roomName, onClose }) => {
    return (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
            <div className="bg-white rounded-xl w-full max-w-lg p-6 relative shadow-lg overflow-y-auto max-h-[90vh]">
                <button
                    onClick={onClose}
                    className="cursor-pointer absolute top-2 right-2 w-8 h-8 rounded-full bg-black text-white flex justify-center items-center"
                >
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="text-2xl" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path d="M400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49z"></path>
                    </svg>
                </button>
                <h2 className="text-3xl font-bold text-center pb-5 text-[#1F2942]">Raise a Dispute</h2>
                <DisputeForm roomName={roomName} />
            </div>
        </div>
    );
};
