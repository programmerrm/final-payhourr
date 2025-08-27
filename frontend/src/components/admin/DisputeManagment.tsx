import { useState } from "react";
import { useGetDisputeQuery } from "../../redux/features/dispute/disputeApi";
import { DisputeShow } from "../dialog/DisputeShow";
import { Pagination } from "../pagination/Pagination";
import { ReactIcons } from './../../utils/ReactIcons';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";

export default function DisputeManagment() {
    const navigate = useNavigate();
    const [selected, setSelected] = useState<number | null>(null);
    const [search, setSearch] = useState<string>("");
    const [page, setPage] = useState<number>(1);

    const currentUsername = useSelector((state: RootState) => state.auth.user?.username);

    const { data, isLoading, isError, refetch } = useGetDisputeQuery(
        { search, page },
        { refetchOnMountOrArgChange: true }
    );
    const { LuMessageCircleMore, FaRegEdit } = ReactIcons;

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
        <div className="flex-grow overflow-auto p-2.5 md:px-6 md:py-8 bg-gray-50 rounded-xl shadow-inner">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-700 text-base md:text-2xl font-medium">Dispute History</span>
                </div>
                <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-700 font-medium">Search:</label>
                    <input
                        type="text"
                        value={search}
                        onChange={handleSearchChange}
                        placeholder="Type to search..."
                        className="border border-gray-300 px-4 py-2 rounded-md bg-white shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-[#1C2640] w-full"
                    />
                </div>
            </div>

            <div className="overflow-x-auto rounded-xl shadow-lg bg-white">
                <table className="min-w-full text-sm text-center">
                    <thead className="bg-[#1C2640] text-white text-xs uppercase sticky top-0 z-10">
                        <tr>
                            <th className="px-6 py-4">Photo</th>
                            <th className="px-6 py-4">Username</th>
                            <th className="px-6 py-4">Title</th>
                            <th className="px-6 py-4">Type</th>
                            <th className="px-6 py-4">Join Message</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Update</th>
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
                                    <td className="px-6 py-4 font-medium text-gray-900">
                                        {dispute.raised_by?.image ? (
                                            <img className="w-10 h-10 rounded-full object-cover" src={dispute.raised_by?.image} alt={dispute.raised_by?.username} />
                                        ) : (
                                            <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold mx-auto">
                                                {dispute.raised_by?.username?.[0]?.toUpperCase() || "?"}
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">@{dispute.raised_by?.username || "-"}</td>
                                    <td className="px-6 py-4">{dispute.title}</td>
                                    <td className="px-6 py-4">{dispute.type}</td>
                                    <td className="px-6 py-4 font-bold text-blue-600">
                                        <button
                                            type="button"
                                            onClick={() => navigate(`/dashboard/${currentUsername}/admin/chat/${(dispute.room_name)}/`)}
                                        >
                                            <LuMessageCircleMore className="text-3xl text-green-500" />
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 capitalize">{dispute.status}</td>
                                    <td className="px-6 py-4">
                                        <button
                                            type="button"
                                            onClick={() => handleDisputeShow(dispute.id)}
                                            aria-label={`View dispute ${dispute.id}`}
                                        >
                                            <FaRegEdit className="text-2xl" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} setPage={setPage} />
            {selected !== null && <DisputeShow id={selected} onClose={handleCloseModal} refetch={refetch} />}
        </div>
    );
}
