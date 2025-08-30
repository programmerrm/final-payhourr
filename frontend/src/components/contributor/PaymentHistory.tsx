import { useState, useEffect } from "react";
import { useGetPaymentHistoryQuery } from "../../redux/features/payments/paymentsApi";
import { Pagination } from "../pagination/Pagination";
import { motion, AnimatePresence } from "framer-motion";
import dayjs from "dayjs";

export default function PaymentHistory() {
    const [page, setPage] = useState<number>(1);
    const [status, setStatus] = useState<string>("");
    const [openDate, setOpenDate] = useState<boolean>(false);
    const [selectedDate, setSelectedDate] = useState<string>("Today");
    const [startDate, setStartDate] = useState<string>();
    const [endDate, setEndDate] = useState<string>();
    
    useEffect(() => {
        const today = dayjs();
        switch (selectedDate) {
            case "Today":
                setStartDate(today.format("YYYY-MM-DD"));
                setEndDate(today.format("YYYY-MM-DD"));
                break;
            case "Last 7 days":
                setStartDate(today.subtract(7, "day").format("YYYY-MM-DD"));
                setEndDate(today.format("YYYY-MM-DD"));
                break;
            case "Last month":
                setStartDate(today.subtract(1, "month").format("YYYY-MM-DD"));
                setEndDate(today.format("YYYY-MM-DD"));
                break;
            case "Last 3 months":
                setStartDate(today.subtract(3, "month").format("YYYY-MM-DD"));
                setEndDate(today.format("YYYY-MM-DD"));
                break;
            case "Last 6 months":
                setStartDate(today.subtract(6, "month").format("YYYY-MM-DD"));
                setEndDate(today.format("YYYY-MM-DD"));
                break;
            case "Last year":
                setStartDate(today.subtract(1, "year").format("YYYY-MM-DD"));
                setEndDate(today.format("YYYY-MM-DD"));
                break;
            default:
                setStartDate(undefined);
                setEndDate(undefined);
        }
        setPage(1);
    }, [selectedDate]);

    const { data: paymentHistory } = useGetPaymentHistoryQuery(
        { page, status, start_date: startDate, end_date: endDate },
        { refetchOnMountOrArgChange: true }
    );

    const currentPage = page;
    const totalPages = paymentHistory?.pagination?.total_pages || 1;

    const dateOptions = [
        "Today",
        "Last 7 days",
        "Last month",
        "Last 3 months",
        "Last 6 months",
        "Last year",
    ];

    return (
        <div className="flex-grow overflow-auto p-2.5 md:px-6 md:py-8 bg-gray-50 rounded-xl shadow-inner relative">
            {/* Top bar */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                {/* Status filter */}
                <div className="flex gap-2 flex-wrap">
                    {["", "pending", "approved", "rejected"].map((s) => (
                        <button
                            key={s || "all"}
                            onClick={() => { setStatus(s); setPage(1); }}
                            className={`py-2 rounded-md text-sm font-medium shadow-sm transition relative w-36
                                ${status === s
                                    ? "bg-[#1C2640] text-white border-t-6 border-red-500"
                                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
                                }`}
                        >
                            {s === "" ? "All" : s.charAt(0).toUpperCase() + s.slice(1)}
                        </button>
                    ))}
                </div>
                {/* Date dropdown */}
                <div className="relative w-48">
                    <button
                        onClick={() => setOpenDate(!openDate)}
                        className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 flex justify-between items-center shadow-sm hover:border-[#1C2640] focus:outline-none focus:ring-2 focus:ring-[#1C2640]"
                    >
                        <span>{selectedDate}</span>
                        <span className={`transform transition-transform ${openDate ? "rotate-180" : "rotate-0"}`}>
                            ▼
                        </span>
                    </button>
                    <AnimatePresence>
                        {openDate && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="absolute w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1 z-50 overflow-hidden"
                            >
                                {dateOptions.map((option) => (
                                    <motion.div
                                        key={option}
                                        onClick={() => { setSelectedDate(option); setOpenDate(false); }}
                                        whileHover={{ scale: 1.05, backgroundColor: "#f0f4ff" }}
                                        className="px-4 py-2 cursor-pointer text-gray-700 hover:bg-blue-50 transition"
                                    >
                                        {option}
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
            {/* Table */}
            <div className="overflow-x-auto rounded-xl shadow-lg bg-white w-full">
                <table className="min-w-full text-sm text-center">
                    <thead className="bg-[#1C2640] text-white text-xs uppercase sticky top-0 z-10">
                        <tr>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4">User ID</th>
                            <th className="px-6 py-4">Username</th>
                            <th className="px-6 py-4">Email</th>
                            <th className="px-6 py-4">Type</th>
                            <th className="px-6 py-4">Amount</th>
                            <th className="px-6 py-4">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-gray-700">
                        {paymentHistory?.data?.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="px-6 py-4 text-gray-500">
                                    No payment history found.
                                </td>
                            </tr>
                        ) : (
                            paymentHistory?.data?.map((item: any) => (
                                <tr key={item.id} className="hover:bg-gray-100 transition">
                                    <td className="px-6 py-4">{new Date(item.created_at).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 font-medium text-gray-900">{item.user.user_id}</td>
                                    <td className="px-6 py-4">@{item.user.username}</td>
                                    <td className="px-6 py-4">{item.user.email}</td>
                                    <td className="px-6 py-4 capitalize">{item.type}</td>
                                    <td className="px-6 py-4 font-bold text-blue-600">$ {item.amount}</td>
                                    <td className="px-6 py-4 capitalize">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                item.status === "pending"
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : item.status === "approved"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                            }`}
                                        >
                                            {item.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
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
        </div>
    );
}
