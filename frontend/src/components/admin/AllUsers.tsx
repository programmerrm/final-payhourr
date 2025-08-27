import { useState } from "react";
import { useAddUserDeleteMutation, useGetUsersQuery } from "../../redux/features/auth/authApi";
import { ReactIcons } from "../../utils/ReactIcons";
import { UserDeleteDialog } from "../dialog/UserDelete";
import { Pagination } from "../pagination/Pagination";
import { UserShowDialog } from "../dialog/UserShow";
import { toast } from "react-toastify";

export default function AllUsers() {
    const { IoMdEye } = ReactIcons;

    const [search, setSearch] = useState<string>("");
    const [page, setPage] = useState(1);
    const [role, setRole] = useState<string>("");
    const [isVerify, setIsVerify] = useState<boolean | null>(null);
    const [isBlock, setIsBlock] = useState<boolean | null>(null);

    const { data, isError, isLoading, refetch } = useGetUsersQuery(
        { search, page, role, is_verify: isVerify ?? undefined, is_block: isBlock ?? undefined },
        { refetchOnMountOrArgChange: true }
    );

    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
    const [addUserDelete, { isLoading: deleting }] = useAddUserDeleteMutation();

    const [viewUserId, setViewUserId] = useState<number | null>(null);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        setPage(1);
    }

    const totalPages = data?.pagination?.total_pages || 1;
    const currentPage = data?.pagination?.current_page || 1;

    const openConfirmDialog = (userId: number) => {
        setSelectedUserId(userId);
        setShowConfirm(true);
    }

    const closeConfirmDialog = () => {
        setSelectedUserId(null);
        setShowConfirm(false);
    }

    const handleDeleteConfirm = async () => {
        if (selectedUserId === null) return;
        try {
            await addUserDelete(selectedUserId).unwrap();
            closeConfirmDialog();
            toast.success("User deleted successfully");
            refetch();
        } catch (error) {
            alert("Failed to delete user. Please try again.");
            closeConfirmDialog();
        }
    }

    const openViewDialog = (userId: number) => {
        setViewUserId(userId);
    }

    const closeViewDialog = () => {
        setViewUserId(null);
    }

    return (
        <div className="flex-grow overflow-auto p-2.5 md:px-6 md:py-8 bg-gray-50 rounded-xl shadow-inner relative">
            {/* Top bar */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
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
                <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-700 font-medium">Role:</label>
                    <div className="flex gap-2">
                        {["", "seller", "buyer"].map((r) => (
                            <button
                                key={r || "all"}
                                onClick={() => { setRole(r); setPage(1); }}
                                className={`px-3 py-1 rounded-md text-sm font-medium shadow-sm transition relative w-24
                        ${role === r
                                        ? "bg-[#1C2640] text-white border-t-4 border-red-500"
                                        : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"}`}
                            >
                                {r === "" ? "All" : r.charAt(0).toUpperCase() + r.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-700 font-medium">Verify:</label>
                    <div className="flex gap-2">
                        {[
                            { label: "All", value: null },
                            { label: "Verified", value: true },
                            { label: "Unverified", value: false }
                        ].map(({ label, value }) => (
                            <button
                                key={label}
                                onClick={() => { setIsVerify(value); setPage(1); }}
                                className={`px-3 py-1 rounded-md text-sm font-medium shadow-sm transition relative w-24
                        ${isVerify === value
                                        ? "bg-[#1C2640] text-white border-t-4 border-red-500"
                                        : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"}`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-700 font-medium">Status:</label>
                    <div className="flex gap-2">
                        {[
                            { label: "All", value: null },
                            { label: "Active", value: false },
                            { label: "Blocked", value: true }
                        ].map(({ label, value }) => (
                            <button
                                key={label}
                                onClick={() => { setIsBlock(value); setPage(1); }}
                                className={`px-3 py-1 rounded-md text-sm font-medium shadow-sm transition relative w-24
                        ${isBlock === value
                                        ? "bg-[#1C2640] text-white border-t-4 border-red-500"
                                        : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"}`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-xl shadow-lg bg-white">
                <table className="min-w-full text-sm text-center">
                    <thead className="bg-[#1C2640] text-white text-xs uppercase sticky top-0 z-10">
                        <tr>
                            <th className="px-6 py-4">Account Created</th>
                            <th className="px-6 py-4">User ID</th>
                            <th className="px-6 py-4">UserName</th>
                            <th className="px-6 py-4">Email</th>
                            <th className="px-6 py-4">Phone Number</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Verify User</th>
                            <th className="px-6 py-4">Last Login</th>
                            <th className="px-6 py-4">Action</th>
                            <th className="px-6 py-4">View</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-gray-700">
                        {!isError && !isLoading && data?.data?.length > 0 ? (
                            data.data.map((user: any) => {
                                const dateJoined = new Date(user.date_joined).toLocaleDateString(
                                    "en-GB",
                                    {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                    }
                                );
                                const lastLogin = user.last_login
                                    ? new Date(user.last_login).toLocaleTimeString("en-US", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: true,
                                    }) +
                                    " " +
                                    new Date(user.last_login).toLocaleDateString("en-GB", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                    })
                                    : "Never";

                                return (
                                    <tr className="hover:bg-gray-100 transition" key={user.id}>
                                        <td className="px-6 py-4">{dateJoined}</td>
                                        <td className="px-6 py-4 font-medium text-gray-900">
                                            {user.user_id}
                                        </td>
                                        <td className="px-6 py-4">@{user.username}</td>
                                        <td className="px-6 py-4">{user.email}</td>
                                        <td className="px-6 py-4">{user.number}</td>
                                        <td className="px-6 py-4">
                                            <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                                                {user.is_active ? "Active" : "Block"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-bold text-blue-600">
                                            {user.is_verify ? "verify" : "unverified"}
                                        </td>
                                        <td className="px-6 py-4">{lastLogin}</td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => openConfirmDialog(user.id)}
                                                disabled={deleting}
                                                className={`bg-red-600 hover:bg-red-700 text-white text-xs px-4 py-2 rounded shadow ${deleting ? "opacity-50 cursor-not-allowed" : ""
                                                    }`}
                                            >
                                                {deleting ? "Deleting..." : "Delete"}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button type="button" onClick={() => openViewDialog(user.id)}>
                                                <IoMdEye className="text-xl" />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan={10} className="px-6 py-8 text-gray-500 text-center">
                                    {isLoading ? "Loading users..." : "No users found."}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {/* Pagination */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                setPage={setPage}
            />
            <UserDeleteDialog
                showConfirm={showConfirm}
                deleting={deleting}
                closeConfirmDialog={closeConfirmDialog}
                handleDeleteConfirm={handleDeleteConfirm}
            />
            {viewUserId !== null && (
                <UserShowDialog userId={viewUserId} onClose={closeViewDialog} />
            )}
        </div>
    );
}
