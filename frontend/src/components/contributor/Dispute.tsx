import React, { useState } from "react";
import { useGetDisputeQuery } from "../../redux/features/dispute/disputeApi";
import { ReactIcons } from "../../utils/ReactIcons";
import { Pagination } from "../pagination/Pagination";
import { DisputeShow } from "../dialog/DisputeShow";

export default function Dispute() {
    const [selected, setSelected] = useState<number | null>(null);
    const [search, setSearch] = useState<string>("");
    const [page, setPage] = useState<number>(1);

    const { data, isLoading, isError } = useGetDisputeQuery(
        { search, page },
        { refetchOnMountOrArgChange: true }
    );
    const { IoMdEye } = ReactIcons;

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        setPage(1);
    };

    const currentPage = page;
    const totalPages = data?.pagination?.total_pages || 1;

    const handleDisputeShow = (id: number) => {
        setSelected(id);
    };

    const handleCloseModal = () => {
        setSelected(null);
    };

    return (
        <div className="flex-grow overflow-auto px-6 py-8 bg-gray-50 rounded-xl shadow-inner">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-700 text-2xl font-medium">Dispute History</span>
                </div>
                <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-700 font-medium">Search:</label>
                    <input
                        type="text"
                        value={search}
                        onChange={handleSearchChange}
                        placeholder="Type to search..."
                        className="border border-gray-300 px-4 py-2 rounded-md bg-white shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-[#1C2640]"
                    />
                </div>
            </div>

            <div className="overflow-x-auto rounded-xl shadow-lg bg-white">
                <table className="min-w-full text-sm text-center">
                    <thead className="bg-[#1C2640] text-white text-xs uppercase sticky top-0 z-10">
                        <tr>
                            <th className="px-6 py-4">Serial</th>
                            <th className="px-6 py-4">User ID</th>
                            <th className="px-6 py-4">Against User</th>
                            <th className="px-6 py-4">Dispute Title</th>
                            <th className="px-6 py-4">Date Create</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">View</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-gray-700">
                        {isLoading && (
                            <tr>
                                <td colSpan={7} className="px-6 py-4 text-center">
                                    Loading...
                                </td>
                            </tr>
                        )}
                        {isError && (
                            <tr>
                                <td colSpan={7} className="px-6 py-4 text-center text-red-500">
                                    Error loading disputes.
                                </td>
                            </tr>
                        )}
                        {!isLoading && data?.data?.length === 0 && (
                            <tr>
                                <td colSpan={7} className="px-6 py-4 text-gray-500">
                                    No disputes found.
                                </td>
                            </tr>
                        )}
                        {!isLoading &&
                            data?.data?.map((dispute: any) => (
                                <tr key={dispute.id} className="hover:bg-gray-100 transition">
                                    <td className="px-6 py-4 font-medium text-gray-900">{dispute.id}</td>
                                    <td className="px-6 py-4">{dispute.raised_by?.user_id || "-"}</td>
                                    <td className="px-6 py-4">@{dispute.against_user?.username || "-"}</td>
                                    <td className="px-6 py-4">{dispute.subject}</td>
                                    <td className="px-6 py-4 font-bold text-blue-600">
                                        {new Date(dispute.created_at).toLocaleDateString("en-GB")}
                                    </td>
                                    <td className="px-6 py-4 capitalize">{dispute.status}</td>
                                    <td className="px-6 py-4">
                                        <button
                                            type="button"
                                            onClick={() => handleDisputeShow(dispute.id)}
                                            aria-label={`View dispute ${dispute.id}`}
                                        >
                                            <IoMdEye className="text-2xl" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>

            <Pagination currentPage={currentPage} totalPages={totalPages} setPage={setPage} />

            {selected !== null && <DisputeShow id={selected} onClose={handleCloseModal} />}
        </div>
    );
}
