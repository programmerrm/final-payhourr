import React from "react";

interface UserDeleteDialogProps {
    showConfirm: boolean;
    deleting: boolean;
    closeConfirmDialog: () => void;
    handleDeleteConfirm: () => void;
}

export const UserDeleteDialog: React.FC<UserDeleteDialogProps> = ({
    showConfirm,
    deleting,
    closeConfirmDialog,
    handleDeleteConfirm,
}) => {
    if (!showConfirm) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg">
                <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
                <p className="mb-6">Are you sure you want to delete this user?</p>
                <div className="flex justify-end gap-4">
                    <button
                        onClick={closeConfirmDialog}
                        className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                        disabled={deleting}
                    >
                        No
                    </button>
                    <button
                        onClick={handleDeleteConfirm}
                        className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                        disabled={deleting}
                    >
                        {deleting ? "Deleting..." : "Yes"}
                    </button>
                </div>
            </div>
        </div>
    );
}
