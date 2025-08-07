import { useState } from "react";
import { useGetPaymentHistoryQuery } from "../../redux/features/payments/paymentsApi";
import { Pagination } from "../pagination/Pagination";

export default function PaymentHistory() {
    const [page, setPage] = useState<number>(1);

    const { data: paymentHistory } = useGetPaymentHistoryQuery({ page }, { refetchOnMountOrArgChange: true });

    const currentPage = page;
    const totalPages = paymentHistory?.pagination?.total_pages || 1;

    return (
        <div>
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
                            <th className="px-6 py-4">Earning (after free)</th>
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
                                    <td className="px-6 py-4 font-bold text-blue-600">{item.amount}</td>
                                    <td className="px-6 py-4 font-bold text-blue-600">
                                        {(parseFloat(item.amount) * 0.98).toFixed(2)}
                                    </td>

                                    <td className="px-6 py-4 capitalize">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${item.status === "pending"
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
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                setPage={setPage}
            />
        </div>
    );
}
