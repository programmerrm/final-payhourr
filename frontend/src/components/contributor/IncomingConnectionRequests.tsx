import { useState } from "react";
import { Pagination } from "../pagination/Pagination";
import { 
    useAddConnectionRequestDeleteMutation, 
    useGetConnectionRequesQuery, 
    useAddConnectionRequestUserListMutation 
} from "../../redux/features/chat/connectionRequests";

type User = {
    id: number;
    user_id: string;
    username: string;
    email: string;
    number: string;
    role: string;
    date_joined: string;
};

type TransformedUser = {
    id: number;
    user: User;
    created_at: string;
};

export default function IncomingConnectionRequests() {
    const [search, setSearch] = useState<string>("");
    const [page, setPage] = useState<number>(1);

    const { data, refetch } = useGetConnectionRequesQuery(
        { search, page },
        { refetchOnMountOrArgChange: true }
    );

    const [addConnectionRequestDelete] = useAddConnectionRequestDeleteMutation();
    const [addConnectionRequestUserList] = useAddConnectionRequestUserListMutation();

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        setPage(1);
    };

    const senders: TransformedUser[] =
        data?.data?.senders?.map((user: User) => ({
            id: user.id,
            user,
            created_at: user.date_joined,
        })) || [];

    const currentPage = page;
    const totalPages = data?.pagination?.total_pages || 1;

    // Delete connection request handler
    const handleDelete = async (userId: string) => {
        try {
            await addConnectionRequestDelete({ user_id: userId }).unwrap();
            refetch();
        } catch (err) {
            console.error("Failed to delete connection request:", err);
        }
    };

    // Add connection handler (accept connection)
    const handleAdd = async (userId: string) => {
        try {
            await addConnectionRequestUserList({ user_id: userId }).unwrap();
            refetch();
        } catch (err) {
            console.error("Failed to add connection:", err);
        }
    };

    return (
        <div className="flex-grow overflow-auto px-6 py-8 bg-gray-50 rounded-xl shadow-inner">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div className="text-2xl font-medium text-gray-700">
                    My Incoming Connection Requests
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
                            <th className="px-6 py-4">Account Created</th>
                            <th className="px-6 py-4">User ID</th>
                            <th className="px-6 py-4">Username</th>
                            <th className="px-6 py-4">Email</th>
                            <th className="px-6 py-4">Phone Number</th>
                            <th className="px-6 py-4">Role</th>
                            <th className="px-6 py-4">Add</th>
                            <th className="px-6 py-4">Delete</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-gray-700">
                        {senders.length === 0 ? (
                            <tr>
                                <td colSpan={8} className="px-6 py-4 text-gray-500">
                                    No sender found.
                                </td>
                            </tr>
                        ) : (
                            senders.map(({ id, user, created_at }) => (
                                <tr key={`${id}-${user.id}`} className="hover:bg-gray-100 transition">
                                    <td className="px-6 py-4">{new Date(created_at).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 font-medium text-gray-900">{user.user_id}</td>
                                    <td className="px-6 py-4">@{user.username}</td>
                                    <td className="px-6 py-4">{user.email}</td>
                                    <td className="px-6 py-4">{user.number}</td>
                                    <td className="px-6 py-4 font-bold text-blue-600">{user.role}</td>
                                    <td className="px-6 py-4">
                                        <button 
                                            onClick={() => handleAdd(user.user_id)} 
                                            className="text-blue-600 hover:underline"
                                        >
                                            Add
                                        </button>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button 
                                            onClick={() => handleDelete(user.user_id)} 
                                            className="text-red-600 hover:underline"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
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
