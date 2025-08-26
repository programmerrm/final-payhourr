import React from "react";
import { useGetAllTransactionQuery } from "../../redux/features/payments/paymentsApi";
import { useGetSellerDashboardInfoQuery } from "../../redux/features/dashboard/dashboardApi";

export const SellerDashboard: React.FC = () => {
    const { data: sellerData } = useGetSellerDashboardInfoQuery(undefined, { refetchOnMountOrArgChange: true });
    const { data } = useGetAllTransactionQuery({ search: '', page: 1 }, { refetchOnMountOrArgChange: true });
    return (
        <div className="tab-content flex-grow overflow-y-scroll lg:overflow-hidden scrollbar-hidden">
            <div className="flex flex-col lg:flex-row gap-6 lg:h-full">
                <div className="grow grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] xl:grid-cols-[repeat(auto-fit,_minmax(260px,_1fr))] gap-5 overflow-y-auto scrollbar-hidden content-stretch">
                    <div className="bg-white py-14 px-5 border border-gray-300 rounded-2xl shadow-md text-center hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center">
                        <h2 className="text-lg lg:text-2xl font-semibold text-gray-800">Total Balance</h2>
                        <p className="mt-2 text-base lg:text-xl font-extrabold text-blue-600">{sellerData?.total_balance || 0}</p>
                    </div>
                    <div className="bg-white py-14 px-5 border border-gray-300 rounded-2xl shadow-md text-center hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center">
                        <h2 className="text-lg lg:text-2xl font-semibold text-gray-800">Total Earning</h2>
                        <p className="mt-2 text-base lg:text-xl font-extrabold text-blue-600">{sellerData?.total_earned || 0}</p>
                    </div>
                    <div className="bg-white py-14 px-5 border border-gray-300 rounded-2xl shadow-md text-center hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center">
                        <h2 className="text-lg lg:text-2xl font-semibold text-gray-800">Total Orders</h2>
                        <p className="mt-2 text-base lg:text-xl font-extrabold text-red-600">{sellerData?.total_orders || 0}</p>
                    </div>
                    <div className="bg-white py-14 px-5 border border-gray-300 rounded-2xl shadow-md text-center hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center">
                        <h2 className="text-lg lg:text-2xl font-semibold text-gray-800">Pending Orders</h2>
                        <p className="mt-2 text-base lg:text-xl font-extrabold text-purple-600">{sellerData?.pending_orders || 0}</p>
                    </div>
                    <div className="bg-white py-14 px-5 border border-gray-300 rounded-2xl shadow-md text-center hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center">
                        <h2 className="text-lg lg:text-2xl font-semibold text-gray-800">Completed Orders</h2>
                        <p className="mt-2 text-base lg:text-xl font-extrabold text-green-600">{sellerData?.completed_orders || 0}</p>
                    </div>
                    <div className="bg-white py-14 px-5 border border-gray-300 rounded-2xl shadow-md text-center hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center">
                        <h2 className="text-lg lg:text-2xl font-semibold text-gray-800">Cancelled Orders</h2>
                        <p className="mt-2 text-base lg:text-xl font-extrabold text-gray-600">{sellerData?.cancelled_orders || 0}</p>
                    </div>
                    <div className="bg-white py-14 px-5 border border-gray-300 rounded-2xl shadow-md text-center hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center">
                        <h2 className="text-lg lg:text-2xl font-semibold text-gray-800">Total Transactions</h2>
                        <p className="mt-2 text-base lg:text-xl font-extrabold text-green-600">{sellerData?.total_transactions || 0}</p>
                    </div>
                    <div className="bg-white py-14 px-5 border border-gray-300 rounded-2xl shadow-md text-center hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center">
                        <h2 className="text-lg lg:text-2xl font-semibold text-gray-800">My Connected Buyer</h2>
                        <p className="mt-2 text-base lg:text-xl font-extrabold text-yellow-600">{sellerData?.connected_buyers || 0}</p>
                    </div>
                    <div className="bg-white py-14 px-5 border border-gray-300 rounded-2xl shadow-md text-center hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center">
                        <h2 className="text-lg lg:text-2xl font-semibold text-gray-800">Total Dispute</h2>
                        <p className="mt-2 text-base lg:text-xl font-extrabold text-indigo-600">{sellerData?.total_disputes || 0}</p>
                    </div>
                </div>
                <div className="w-auto border border-gray-300 rounded-2xl shadow-md bg-white shrink-0 flex flex-col overflow-scroll scrollbar-hidden">
                    <h2 className="p-4 border-b border-gray-300 text-xl font-bold text-center text-black bg-gray-100 rounded-t-2xl">Network Updates</h2>
                    <div className="grid grid-cols-4 text-center divide-x divide-gray-300 bg-white font-semibold text-sm text-gray-700">
                        <div className="p-3 text-nowrap">Time</div>
                        <div className="p-3 text-nowrap">User</div>
                        <div className="p-3 text-nowrap">Type</div>
                        <div className="p-3 text-nowrap">BDT</div>
                    </div>
                    {data?.data?.length > 0 ? (
                        data.data.map((txn: any, index: number) => (
                            <div
                                key={index}
                                className="grid grid-cols-4 text-center divide-x divide-gray-200 border-t border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition"
                            >
                                <p className="p-3 text-nowrap">
                                    {new Date(txn.created_at).toLocaleTimeString([], {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </p>
                                <p className="p-3 text-nowrap">@{txn.user.username}</p>
                                <p className="p-3 text-nowrap">{txn.type}</p>
                                <p className="p-3 text-nowrap">{txn.amount}৳</p>
                            </div>
                        ))
                    ) : (
                        <div className="p-3 text-center text-sm text-gray-500">
                            No network updates found.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
