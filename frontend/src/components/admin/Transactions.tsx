import { useState } from "react";
import { useGetAllTransactionQuery } from "../../redux/features/payments/paymentsApi";
import { Pagination } from "../pagination/Pagination";

export default function Transactions() {
    const [search, setSearch] = useState<string>("");
    const [page, setPage] = useState(1);

    const { data } = useGetAllTransactionQuery(
        { search, page },
        { refetchOnMountOrArgChange: true }
    );

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        setPage(1);
    }

    const totalPages = data?.pagination?.total_pages || 1;
    const currentPage = data?.pagination?.current_page || 1;

    console.log('data : ', data);

    return (
        <div className="flex-grow overflow-auto p-2.5 md:px-6 md:py-8 bg-gray-50 rounded-xl shadow-inner">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div className="text-base md:text-2xl font-medium text-gray-700">
                    Transactions
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
                            <th className="px-6 py-4">Created Date</th>
                            <th className="px-6 py-4">User ID</th>
                            <th className="px-6 py-4">Username</th>
                            <th className="px-6 py-4">Requested Amount</th>
                            <th className="px-6 py-4">Payment Method</th>
                            <th className="px-6 py-4">Payment A/C Number</th>
                            <th className="px-6 py-4">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-gray-700">
                        {data?.data?.length > 0 ? (
                            data.data.map((txn: any, index: number) => (
                                <tr key={index}>
                                    <td className="px-6 py-4">
                                        {new Date(txn.created_at).toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4">{txn.user.user_id}</td>
                                    <td className="px-6 py-4">{txn.user.username}</td>
                                    <td className="px-6 py-4">{txn.amount}</td>
                                    <td className="px-6 py-4">
                                        {txn.type === "deposit"
                                            ? txn.payment_option?.name
                                            : txn.method}
                                    </td>
                                    <td className="px-6 py-4">
                                        {txn.type === "deposit"
                                            ? txn.payment_option?.number
                                            : txn.receiver_number}
                                    </td>
                                    <td className="px-6 py-4 capitalize">{txn.status}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={8} className="px-6 py-4 text-gray-500">
                                    No transactions found.
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
