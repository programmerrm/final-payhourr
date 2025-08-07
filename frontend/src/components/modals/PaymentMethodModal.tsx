import React, { useState } from "react";
import { ReactIcons } from "../../utils/ReactIcons";
import { useAddPaymentMethodDeleteMutation } from "../../redux/features/payments/paymentsApi";
import { toast } from "react-toastify";
import { ManualPaymentReleaseOptionEditForm } from "../forms/ManualPaymentReleaseOptionEditForm";

interface PaymentMethodModalProps {
    method: any;
    onClose: () => void;
    refetch: () => void;
}

export const PaymentMethodModal: React.FC<PaymentMethodModalProps> = ({ method, onClose, refetch }) => {
    const { IoMdClose } = ReactIcons;
    const [addPaymentMethodDelete] = useAddPaymentMethodDeleteMutation();
    const [isEditing, setIsEditing] = useState(false);

    const handleMethodDelete = async (id: number) => {
        try {
            await addPaymentMethodDelete(id).unwrap();
            toast.success("Payment method deleted successfully");
            onClose();
            refetch();
        } catch (error: any) {
            console.error(error.message);
            toast.error("Failed to delete payment method");
        }
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    // Function to close the edit form mode
    const closeEditForm = () => setIsEditing(false);

    return (
        <div
            className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center"
            onClick={onClose}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="relative bg-white rounded-2xl shadow-lg p-6 w-full max-w-md space-y-4"
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
                >
                    <IoMdClose size={22} />
                </button>

                {!isEditing ? (
                    <>
                        {/* Display Mode */}
                        <h2 className="text-2xl font-semibold text-center text-blue-600">Payment Method Details</h2>
                        <div className="space-y-2">
                            <p><strong>Method:</strong> {method.name}</p>
                            <p><strong>Number:</strong> {method.number}</p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-between gap-4 pt-4">
                            <button
                                className="flex-1 bg-yellow-500 text-white px-4 py-2 rounded-xl hover:bg-yellow-600"
                                onClick={handleEditClick}
                            >
                                Edit
                            </button>
                            <button
                                className="flex-1 bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600"
                                onClick={() => handleMethodDelete(method.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </>
                ) : (
                    <ManualPaymentReleaseOptionEditForm
                        method={method}
                        closeForm={closeEditForm}
                        refetch={refetch}
                    />
                )}
            </div>
        </div>
    );
};
