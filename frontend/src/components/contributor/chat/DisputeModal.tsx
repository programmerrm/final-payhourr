import React from "react";
import { DisputeForm } from "../../forms/DisputeForm";
import { ReactIcons } from "../../../utils/ReactIcons";
import Logo from "../../../assets/images/png-color.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";

interface DisputeModalProps {
    roomName: string;
    onClose: () => void;
}

export const DisputeModal: React.FC<DisputeModalProps> = ({ roomName, onClose }) => {
    const username = useSelector((state: RootState) => state.auth.user?.username);
    const { IoClose } = ReactIcons;
    return (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
            <div className="bg-white rounded-xl w-full max-w-xl p-6 relative shadow-lg overflow-y-auto max-h-[90vh]">
                <button
                    onClick={onClose}
                    className="cursor-pointer absolute top-2 right-2 w-8 h-8 rounded-full bg-black text-white flex justify-center items-center"
                >
                    <IoClose className="text-2xl" />
                </button>
                <div className="flex flex-col flex-wrap justify-center items-center pb-5">
                    <Link className="block w-fit" to={`/dashboard/${username}/`}>
                        <img className="w-40" src={Logo} alt="payhourr" />
                    </Link>
                </div>
                <DisputeForm roomName={roomName} />
            </div>
        </div>
    );
};
