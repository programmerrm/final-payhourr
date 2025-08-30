import { useState } from "react";
import { useGetOrdersQuery } from "../../redux/features/orders/ordersApi";
import { Pagination } from "../pagination/Pagination";
import { OrderModel } from "../modals/OrderModel";

export default function Order() {
    const [search, setSearch] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [status, setStatus] = useState<string>("");
    const [selected, setSelected] = useState<number | null>(null);

    const { data } = useGetOrdersQuery(
        { search, page, status },
        { refetchOnMountOrArgChange: true }
    );

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        setPage(1);
    };

    const currentPage = page;
    const totalPages = data?.pagination?.total_pages || 1;
    const orders = data?.data;

    return (
        <div className="flex-grow overflow-auto p-2.5 md:px-6 md:py-8 bg-gray-50 rounded-xl shadow-inner">
            {/* Top bar */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div className="text-base md:text-2xl font-medium text-gray-700">
                    My Order
                </div>
                <div className="flex flex-row flex-wrap items-center gap-x-8">
                    <div>
                        <div className="flex gap-2">
                            {["", "pending", "completed", "cancelled"].map((s) => (
                                <button
                                    key={s || "all"}
                                    onClick={() => { setStatus(s); setPage(1); }}
                                    className={`py-2 rounded-md text-sm font-medium shadow-sm transition relative w-36 ${status === s
                                            ? "bg-[#1C2640] text-white border-t-6 border-red-500"
                                            : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
                                        }`}
                                >
                                    {s === "" ? "All" : s.charAt(0).toUpperCase() + s.slice(1)}
                                </button>
                            ))}
                        </div>
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

            </div>
            {/* Table */}
            <div className="overflow-x-auto rounded-xl shadow-lg bg-white">
                <table className="min-w-full text-sm text-center">
                    <thead className="bg-[#1C2640] text-white text-xs uppercase sticky top-0 z-10">
                        <tr>
                            <th className="px-6 py-4">Order ID</th>
                            <th className="px-6 py-4">Sender</th>
                            <th className="px-6 py-4">Receiver</th>
                            <th className="px-6 py-4">Title</th>
                            <th className="px-6 py-4">Amount</th>
                            <th className="px-6 py-4">Is Approved</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">View</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-gray-700">
                        {orders && orders.length > 0 ? (
                            orders.map((order: any) => (
                                <tr key={order.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">{order.order_id}</td>
                                    <td className="px-6 py-4">@{order.sender.username}</td>
                                    <td className="px-6 py-4">@{order.receiver.username}</td>
                                    <td className="px-6 py-4">{order.title}</td>
                                    <td className="px-6 py-4">$ {order.amount}</td>
                                    <td className="px-6 py-4">
                                        {order.is_approved ? "Yes" : "No"}
                                    </td>
                                    <td className="px-6 py-4">{order.status}</td>
                                    <td className="px-6 py-4">
                                        <button
                                            className="text-blue-600 hover:underline"
                                            onClick={() => setSelected(order.id)}
                                        >
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={9}
                                    className="px-6 py-4 text-gray-500 text-center"
                                >
                                    No orders found
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
            {/* Order Modal */}
            <OrderModel
                orderId={selected}
                onClose={() => setSelected(null)}
            />
        </div>
    );
}
