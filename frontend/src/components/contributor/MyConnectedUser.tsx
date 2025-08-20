import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useGetConnectedUsersQuery } from "../../redux/features/chat/connectedUsers";
import type { RootState } from "../../redux/store";
import { ReactIcons } from "../../utils/ReactIcons";
import { Pagination } from "../pagination/Pagination";
import { SOCKET_URL } from "../../utils/Api";
import { DisputeForm } from "../forms/DisputeForm";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../../assets/images/png-color.png";

export default function MyConnectedUser() {
    const [search, setSearch] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
    const [disputeRoom, setDisputeRoom] = useState<string | null>(null); // for modal
    const navigate = useNavigate();

    const role = useSelector((state: RootState) => state.auth.user?.role);
    const currentUsername = useSelector((state: RootState) => state.auth.user?.username);
    
    const { data } = useGetConnectedUsersQuery(
        { search, page },
        { refetchOnMountOrArgChange: true }
    );

    const { LuMessageCircleMore, MdSyncProblem, IoMdClose } = ReactIcons;

    const socketUrl = `${SOCKET_URL}/online-status/`;

    useEffect(() => {
        const ws = new WebSocket(socketUrl);
        ws.onopen = () => console.log("✅ WebSocket connected!");
        ws.onmessage = (event) => {
            try {
                const parsed = JSON.parse(event.data);
                if (parsed.online_users) setOnlineUsers(parsed.online_users);
            } catch (err) {
                console.error("WebSocket message parsing error:", err);
            }
        };
        ws.onclose = () => console.log("❌ WebSocket disconnected!");
        ws.onerror = (err) => console.error("WebSocket error:", err);
        return () => ws.close();
    }, [socketUrl]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        setPage(1);
    };

    const generateRoomName = (otherUsername: string) => {
        const usernames = [currentUsername, otherUsername].sort();
        return `${usernames[0]}_${usernames[1]}`;
    };

    const isUserOnline = (username: string) => onlineUsers.includes(username);

    const openDispute = (roomName: string) => setDisputeRoom(roomName);
    const closeDispute = () => setDisputeRoom(null);

    const currentPage = page;
    const totalPages = data?.pagination?.total_pages || 1;

    return (
        <div className="flex-grow overflow-auto p-2.5 md:px-6 md:py-8 bg-gray-50 rounded-xl shadow-inner">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-700 text-base md:text-2xl font-medium">
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
                            <th className="px-6 py-4">Rating</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Message</th>
                            <th className="px-6 py-4">Payment</th>
                            <th className="px-6 py-4">Dispute</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-gray-700">
                        {data?.data?.[0]?.connected_users?.length ? (
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
                                    <td className="px-6 py-4">
                                        {isUserOnline(user.username) ? (
                                            <span className="text-green-500 font-bold">Online</span>
                                        ) : (
                                            <span className="text-gray-400">Offline</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 font-bold text-blue-600">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                navigate(`/dashboard/${currentUsername}/chat/${generateRoomName(user.username)}/`)
                                            }
                                        >
                                            <LuMessageCircleMore className="text-3xl text-black/60" />
                                        </button>
                                    </td>
                                    <td className="px-6 py-4">48</td>
                                    <td className="px-6 py-4">
                                        <button
                                            type="button"
                                            onClick={() => openDispute(generateRoomName(user.username))}
                                        >
                                            <MdSyncProblem className="text-3xl" />
                                        </button>
                                    </td>
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

            <Pagination currentPage={currentPage} totalPages={totalPages} setPage={setPage} />

            {/* Modal */}
            <AnimatePresence>
                {disputeRoom && (
                    <motion.div
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeDispute}
                    >
                        <motion.div
                            className="bg-white rounded-xl p-6 w-full max-w-2xl relative"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-center items-center pb-8">
                                <Link to={`/dashboard/${currentUsername}/`}>
                                    <img className="w-36" src={Logo} alt="payhourr" />
                                </Link>
                            </div>
                            <button
                                className="flex justify-center items-center absolute top-4 right-4 bg-black/80 text-white rounded-full text-xl font-bold w-8 h-8"
                                onClick={closeDispute}
                            >
                                <IoMdClose className="text-2xl" />
                            </button>
                            <DisputeForm roomName={disputeRoom} />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
