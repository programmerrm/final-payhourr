import { useState } from "react";
import { DepositeForm } from "../forms/DepositeForm";
import { WithdrawForm } from "../forms/WithdrawForm";
import { useGetBalanceQuery, useGetPaymentHistoryQuery, useGetPaymnetCountsQuery } from "../../redux/features/payments/paymentsApi";
import { Pagination } from "../pagination/Pagination";

export default function MyWallet() {
    const [showDepositModal, setShowDepositModal] = useState(false);
    const [showWithdrawModal, setShowWithdrawModal] = useState(false);
    const [page, setPage] = useState<number>(1);
    const { data: balance } = useGetBalanceQuery(undefined, { refetchOnMountOrArgChange: true });
    const { data: paymentCounts } = useGetPaymnetCountsQuery(undefined, { refetchOnMountOrArgChange: true });
    const { data: paymentHistory } = useGetPaymentHistoryQuery({ page }, { refetchOnMountOrArgChange: true });

    const handleDepositeAmount = () => setShowDepositModal(true);
    const handleWithdrawAmount = () => setShowWithdrawModal(true);

    const closeModal = () => {
        setShowDepositModal(false);
        setShowWithdrawModal(false);
    };

    const currentPage = page;
    const totalPages = paymentHistory?.pagination?.total_pages || 1;

    return (
        <div className=" space-y-5">
            <div className="tab-content flex-grow overflow-auto flex flex-col lg:flex-row gap-6">

                <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 content-start">
                    {/* Balance cards */}
                    <div className="bg-white p-2.5 md:p-3 lg:p-6 border border-gray-300 rounded-2xl shadow-md text-center hover:shadow-xl transition-all duration-300 flex items-center justify-center flex-col">
                        <h2 className="text-base lg:text-xl font-semibold text-gray-800">Available Balance</h2>
                        <p className="mt-2 text-base lg:text-3xl font-extrabold text-blue-600">{balance?.amount}</p>
                    </div>
                    <div className="bg-white p-2.5 md:p-3 lg:p-6 border border-gray-300 rounded-2xl shadow-md text-center hover:shadow-xl transition-all duration-300 flex items-center justify-center flex-col">
                        <h2 className="text-base lg:text-xl font-semibold text-gray-800">Withdraw Total</h2>
                        <p className="mt-2 text-base lg:text-3xl font-extrabold text-yellow-600">{paymentCounts?.withdraw_count}</p>
                    </div>

                    <div className="bg-white p-2.5 md:p-3 lg:p-6 border border-gray-300 rounded-2xl shadow-md text-center hover:shadow-xl transition-all duration-300 flex items-center justify-center flex-col">
                        <h2 className="text-base lg:text-xl font-semibold text-gray-800">Total Deposited</h2>
                        <p className="mt-2 text-base lg:text-3xl font-extrabold text-indigo-600">{paymentCounts?.deposit_count}</p>
                    </div>

                    <div
                        className="bg-white p-2.5 md:p-3 lg:p-6 border border-gray-300 rounded-2xl shadow-md text-center hover:shadow-xl transition-all duration-300 cursor-pointer flex items-center justify-center"
                        onClick={handleDepositeAmount}
                    >
                        <button type="button" className="min-h-12 text-base lg:text-xl font-semibold text-gray-800">
                            Deposit Now
                        </button>
                    </div>
                    <div
                        className="bg-white p-2.5 md:p-3 lg:p-6 border border-gray-300 rounded-2xl shadow-md text-center hover:shadow-xl transition-all duration-300 cursor-pointer flex items-center justify-center"
                        onClick={handleWithdrawAmount}
                    >
                        <button type="button" className="min-h-12 text-base lg:text-xl font-semibold text-gray-800">
                            Withdraw Now
                        </button>
                    </div>
                </div>

                {/* Deposit Modal */}
                {showDepositModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
                            <button
                                onClick={closeModal}
                                className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl font-bold"
                            >
                                ×
                            </button>
                            <h2 className="text-2xl font-semibold mb-4">Deposit Money</h2>
                            <DepositeForm onSuccess={closeModal} />
                        </div>
                    </div>
                )}

                {/* Withdraw Modal */}
                {showWithdrawModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
                            <button
                                onClick={closeModal}
                                className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl font-bold"
                            >
                                ×
                            </button>
                            <h2 className="text-2xl font-semibold mb-4">Withdraw Money</h2>
                            <WithdrawForm onSuccess={closeModal} />
                        </div>
                    </div>
                )}

            </div>

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

        </div>

    );
}
