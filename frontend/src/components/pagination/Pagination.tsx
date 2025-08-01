import React from "react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, setPage }) => {
    if (totalPages <= 1) return null;

    return (
        <div className="mt-6 flex flex-col md:flex-row md:justify-between md:items-center gap-3 text-sm text-gray-700">
            <div>
                Showing page {currentPage} of {totalPages}
            </div>
            <div className="flex gap-1">
                <button
                    className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-200"
                    onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Prev
                </button>
                {[...Array(totalPages)].map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setPage(i + 1)}
                        className={`px-3 py-1 border rounded ${currentPage === i + 1
                                ? "bg-[#1C2640] text-white shadow"
                                : "border-gray-300 hover:bg-gray-200"
                            }`}
                    >
                        {i + 1}
                    </button>
                ))}
                <button
                    className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-200"
                    onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};
