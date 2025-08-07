import React, { useState } from "react";
import { DisputeModal } from "./DisputeModal";

interface DisputeNowProps {
    roomName: string;
}

export const DisputeNow: React.FC<DisputeNowProps> = ({ roomName }) => {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            {/* <button onClick={() => setShowModal(true)} type="button" className="hidden sm:inline-block bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium transition">Dispute</button> */}

            <button onClick={() => setShowModal(true)} type="button" className="shrink-0 text-red-500 hover:text-red-600 p-2 rounded-full transition" title="Dispute">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01M21 12c0 4.418-4.03 8-9 8s-9-3.582-9-8 4.03-8 9-8 9 3.582 9 8z" />
                </svg>
            </button>

            {showModal && (
                <DisputeModal roomName={roomName} onClose={() => setShowModal(false)} />
            )}
        </>
    );
};
