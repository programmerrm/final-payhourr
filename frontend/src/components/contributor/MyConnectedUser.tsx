import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { useGetConnectedUsersQuery } from "../../redux/features/chat/connectedUsers";
import { ReactIcons } from "../../utils/ReactIcons";
import { Pagination } from "../pagination/Pagination";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MyConnectedUser() {
    const [search, setSearch] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const navigate = useNavigate();

    const role = useSelector((state: RootState) => state.auth.user?.role);
    const currentUsername = useSelector((state: RootState) => state.auth.user?.username);
    const { data } = useGetConnectedUsersQuery(
        { search, page },
        { refetchOnMountOrArgChange: true }
    );
    const { LuMessageCircleMore } = ReactIcons;

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        setPage(1);
    };

    const currentPage = page;
    const totalPages = data?.pagination?.total_pages || 1;

    const generateRoomName = (otherUsername: string) => {
        const usernames = [currentUsername, otherUsername].sort();
        return `${usernames[0]}_${usernames[1]}`;
    };

    return (
        <div className="flex-grow overflow-auto px-6 py-8 bg-gray-50 rounded-xl shadow-inner">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-700 text-2xl font-medium">
                        My Connected {role === 'seller' ? 'Buyer' : 'Seller'} List
                    </span>
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
                            <th className="px-6 py-4">Photo</th>
                            <th className="px-6 py-4">User ID</th>
                            <th className="px-6 py-4">Username</th>
                            <th className="px-6 py-4">Rating</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Message</th>
                            <th className="px-6 py-4">Payment</th>
                            <th className="px-6 py-4">Dispute</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-gray-700">
                        {data?.data && data?.data[0]?.connected_users?.length > 0 ? (
                            data.data[0].connected_users.map((user: any) => (
                                <tr key={user.user_id} className="hover:bg-gray-100 transition">
                                    <td className="px-6 py-4">
                                        {user.image ? (
                                            <img
                                                src={user.image}
                                                alt={user.username}
                                                className="w-8 h-8 rounded-full mx-auto"
                                            />
                                        ) : (
                                            <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold mx-auto">
                                                {user?.username?.[0]?.toUpperCase() || "?"}
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-900">{user.user_id}</td>
                                    <td className="px-6 py-4">@{user.username}</td>
                                    <td className="px-6 py-4">5</td>
                                    <td className="px-6 py-4">offline</td>
                                    <td className="px-6 py-4 font-bold text-blue-600">
                                        <button
                                            type="button"
                                            onClick={() => navigate(`/dashboard/${currentUsername}/chat/${generateRoomName(user.username)}/`)}
                                        >
                                            <LuMessageCircleMore className="text-3xl text-black/60" />
                                        </button>
                                    </td>
                                    <td className="px-6 py-4">48</td>
                                    <td className="px-6 py-4">Dispute</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={8} className="px-6 py-4 text-gray-500">
                                    No user found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                setPage={setPage}
            />
        </div>
    );
}
