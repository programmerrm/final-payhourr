import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Pagination } from "../pagination/Pagination";
import {
    useAddConnectionRequestDeleteMutation,
    useGetConnectionRequesQuery,
    useAddConnectionRequestUserListMutation
} from "../../redux/features/chat/connectionRequests";
import { MEDIA_URL } from "../../utils/Api";
import { toast } from "react-toastify";
import { AgainstUserModel } from "../modals/AgainstUserModel";

type User = {
    id: number;
    user_id: string;
    username: string;
    email: string;
    image: string;
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
    const location = useLocation();
    const state = location.state as { search?: string };

    const [search, setSearch] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

    const { data, refetch } = useGetConnectionRequesQuery(
        { search: search || state?.search || "", page },
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

    const handleDelete = async (userId: string) => {
        try {
            await addConnectionRequestDelete({ user_id: userId }).unwrap();
            refetch();
            toast.success("Connection request successfully deleted!");
        } catch (error: any) {
            const errorData = error?.data;
            const errors = errorData?.errors;
            if (errors && typeof errors === 'object') {
                const firstKey = Object.keys(errors)[0];
                const firstErrorMessage = errors[firstKey]?.[0];
                toast.error(firstErrorMessage);
            } else {
                toast.error('No structured errors found.');
            }
        }
    };

    const handleAdd = async (userId: string) => {
        try {
            await addConnectionRequestUserList({ user_id: userId }).unwrap();
            refetch();
            toast.success("Connection request successfully sent!");
        } catch (error: any) {
            const errorData = error?.data;
            const errors = errorData?.errors;
            if (errors && typeof errors === 'object') {
                const firstKey = Object.keys(errors)[0];
                const firstErrorMessage = errors[firstKey]?.[0];
                toast.error(firstErrorMessage);
            } else {
                toast.error('No structured errors found.');
            }
        }
    };

    return (
        <div className="flex-grow overflow-auto p-2.5 md:px-6 md:py-8 bg-gray-50 rounded-xl shadow-inner">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div className="text-base md:text-2xl font-medium text-gray-700">
                    My Incoming Connection Requests
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
                            <th className="px-6 py-4">User ID</th>
                            <th className="px-6 py-4">Username</th>
                            <th className="px-6 py-4">Email</th>
                            <th className="px-6 py-4">Phone Number</th>
                            <th className="px-6 py-4">Status</th>
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
                            senders.map(({ id, user }) => (
                                <tr key={`${id}-${user.id}`} className="hover:bg-gray-100 transition">
                                    <td className="px-6 py-4 cursor-pointer" onClick={() => setSelectedUserId(user.id)}>
                                        {user.image ? (
                                            <img
                                                src={`${MEDIA_URL}${user.image}`}
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
                                    <td className="px-6 py-4">***********@gmail.com</td>
                                    <td className="px-6 py-4">+8801*********</td>
                                    <td className="px-6 py-4 font-bold text-gray-400 capitalize">Offline</td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => handleAdd(user.user_id)}
                                            className="text-white bg-green-700 py-2.5 px-5 rounded hover:underline"
                                        >
                                            Accept
                                        </button>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => handleDelete(user.user_id)}
                                            className="text-white bg-red-700 py-2.5 px-5 rounded hover:underline"
                                        >
                                            Reject
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} setPage={setPage} />

            {/* Modal for selected user */}
            {selectedUserId && (
                <div className="flex items-center justify-center bg-gray-50">
                    <AgainstUserModel
                        userId={selectedUserId}
                        onClose={() => setSelectedUserId(null)}
                    />
                </div>
            )}
        </div>
    );
}
