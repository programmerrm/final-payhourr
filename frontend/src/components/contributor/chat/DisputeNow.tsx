import React, { useState } from "react";
import { DisputeModal } from "./DisputeModal";
import { ReactIcons } from "../../../utils/ReactIcons";

interface DisputeNowProps {
    roomName: string;
}

export const DisputeNow: React.FC<DisputeNowProps> = ({ roomName }) => {
    const [showModal, setShowModal] = useState(false);
    const {MdSyncProblem} = ReactIcons;
    return (
        <>
            <button onClick={() => setShowModal(true)} type="button" className="shrink-0 text-red-500 hover:text-red-600 p-2 rounded-full transition" title="Dispute">
               <MdSyncProblem className="text-2xl" />
            </button>
            {showModal && (
                <DisputeModal roomName={roomName} onClose={() => setShowModal(false)} />
            )}
        </>
    );
};
