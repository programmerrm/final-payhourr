// components/dialog/DepositItemEdit.tsx

import React, { useState } from "react";
import { useAddDepositUpdateMutation } from "../../redux/features/payments/paymentsApi";

interface Props {
    open: boolean;
    onClose: () => void;
    deposit: any;
    refetch: () => void;
}

export const DepositItemEdit: React.FC<Props> = ({ open, onClose, deposit, refetch }) => {
    const [status, setStatus] = useState(deposit?.status || "");
    const [updateDeposit, { isLoading }] = useAddDepositUpdateMutation();

    const handleSubmit = async () => {
        await updateDeposit({ id: deposit.id, status });
        onClose();
        refetch();
    };

    if (!open || !deposit) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-[90%] max-w-md shadow-xl">
                <h2 className="text-xl font-semibold mb-4">Deposit Details</h2>

                <div className="space-y-2 text-sm text-gray-700">
                    <div><strong>User ID:</strong> {deposit.user?.user_id}</div>
                    <div><strong>Username:</strong> {deposit.user?.username}</div>
                    <div><strong>Amount:</strong> ৳ {deposit.amount}</div>
                    <div><strong>Receiver:</strong> {deposit.receiver_number}</div>
                    <div><strong>Txn ID:</strong> {deposit.txr_number}</div>
                    <div><strong>Created:</strong> {new Date(deposit.created_at).toLocaleString()}</div>
                    <div><strong>Status:</strong></div>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                    >
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </div>

                <div className="flex justify-end mt-4 gap-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                        disabled={isLoading}
                    >
                        {isLoading ? "Saving..." : "Update Status"}
                    </button>
                </div>
            </div>
        </div>
    );
};
