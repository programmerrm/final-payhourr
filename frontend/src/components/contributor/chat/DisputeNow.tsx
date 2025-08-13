import React, { useState } from "react";
import { DisputeModal } from "./DisputeModal";
import { ReactIcons } from "../../../utils/ReactIcons";

interface DisputeNowProps {
    roomName: string;
}

export const DisputeNow: React.FC<DisputeNowProps> = ({ roomName }) => {
    const [showModal, setShowModal] = useState(false);
    const {IoMdInformationCircle} = ReactIcons;
    return (
        <>
            {/* <button onClick={() => setShowModal(true)} type="button" className="hidden sm:inline-block bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium transition">Dispute</button> */}

            <button onClick={() => setShowModal(true)} type="button" className="shrink-0 text-red-500 hover:text-red-600 p-2 rounded-full transition" title="Dispute">
               <IoMdInformationCircle/>
            </button>

            {showModal && (
                <DisputeModal roomName={roomName} onClose={() => setShowModal(false)} />
            )}
        </>
    );
};
