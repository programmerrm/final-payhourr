import { useState } from "react";
import { useGetPaymentHistoryQuery } from "../../redux/features/payments/paymentsApi";
import { Pagination } from "../pagination/Pagination";
import { ReactIcons } from "../../utils/ReactIcons";
import abbank from "../../assets/payment-method/ab-bank.jpg";
import agranibank from "../../assets/payment-method/agrani-bank.jpg";
import bankasia from "../../assets/payment-method/bank-asia.jpg";
import bk from "../../assets/payment-method/bk.jpg";
import brackbank from "../../assets/payment-method/brack-bank.jpg";
import citybank from "../../assets/payment-method/city-bank.jpg";
import dbbl from "../../assets/payment-method/dbbl.jpg";
import islamibank from "../../assets/payment-method/islami-bank.jpg";
import jamunabnak from "../../assets/payment-method/jamuna-bnak.jpg";
import janatabank from "../../assets/payment-method/janata-bank.jpg";
import ng from "../../assets/payment-method/ng.jpg";
import premiurbank from "../../assets/payment-method/premiur-bank.jpg";
import rk from "../../assets/payment-method/rk.jpg";
import rupalibank from "../../assets/payment-method/rupali-bank.jpg";
import sonalibank from "../../assets/payment-method/sonali-bank.jpg";
import { useGetBuyerDashboardInfoQuery } from "../../redux/features/dashboard/dashboardApi";

export default function MyWallet() {
    const [page, setPage] = useState<number>(1);
    const { data: buyerData } = useGetBuyerDashboardInfoQuery(undefined, { refetchOnMountOrArgChange: true });
    const { data: paymentHistory } = useGetPaymentHistoryQuery({ page }, { refetchOnMountOrArgChange: true });
    const currentPage = page;
    const totalPages = paymentHistory?.pagination?.total_pages || 1;

    const { MdOutlinePayment } = ReactIcons;

    console.log('buyer data : ', buyerData);

    return (
        <div className=" space-y-5">
            <div className="bg-white p-2.5 space-y-2.5">
                <div className="bg-[#C9CCD3] text-center p-2">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1E2841]">My Wallet</h2>
                </div>
                <div className="border border-[#656565] rounded-2xl p-4 pb-0 space-y-2.5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-4 items-start">
                        <div className="border border-[#656565] rounded-2xl overflow-hidden pb-2">
                            <div className="bg-[#1E2841] py-2.5 px-1 text-center">
                                <h3 className="text-white text-lg sm:text-xl font-bold">Available Balance</h3>
                            </div>
                            <div className="p-2 border-b border-b-[#656565] rounded-bl-2xl rounded-br-2xl text-center min-h-[140px] flex items-center justify-center">
                                <p className="text-[#1B253F] text-xl sm:text-2xl md:text-3xl font-bold">{buyerData?.total_balance || 0}/-</p>
                            </div>
                        </div>
                        <div className="border border-[#656565] rounded-2xl overflow-hidden pb-2">
                            <div className="bg-[#1E2841] py-2.5 px-1 text-center">
                                <h3 className="text-white text-lg sm:text-xl font-bold">On Hold</h3>
                            </div>
                            <div className="p-2 border-b border-b-[#656565] rounded-bl-2xl rounded-br-2xl text-center min-h-[140px] flex items-center justify-center">
                                <p className="text-[#1B253F] text-xl sm:text-2xl md:text-3xl font-bold">{buyerData?.total_balance || 0}/-</p>
                            </div>
                        </div>
                        <div className="border border-[#656565] rounded-2xl overflow-hidden pb-2">
                            <div className="bg-[#1E2841] py-2.5 px-1 text-center">
                                <h3 className="text-white text-lg sm:text-xl font-bold">Withdrawn Total</h3>
                            </div>
                            <div className="p-2 border-b border-b-[#656565] rounded-bl-2xl rounded-br-2xl text-center min-h-[140px] flex items-center justify-center">
                                <p className="text-[#1B253F] text-xl sm:text-2xl md:text-3xl font-bold">{buyerData?.total_withdrawn || 0}/-</p>
                            </div>
                        </div>

                        
                        <div className="border border-[#656565] rounded-2xl overflow-hidden pb-2">
                            <div className="bg-[#1E2841] py-2.5 px-1 text-center">
                                <h3 className="text-white text-lg sm:text-xl font-bold">Total Deposited</h3>
                            </div>
                            <div className="p-2 border-b border-b-[#656565] rounded-bl-2xl rounded-br-2xl text-center min-h-[140px] flex items-center justify-center">
                                <p className="text-[#1B253F] text-xl sm:text-2xl md:text-3xl font-bold">{buyerData?.total_deposit || 0}/-</p>
                            </div>
                        </div>

                        <div className="border border-[#656565] rounded-2xl overflow-hidden pb-2 col-span-full">
                            <div className="bg-[#1E2841] py-2.5 px-1 text-center">
                                <h3 className="text-white text-lg sm:text-xl font-bold">
                                    Withdraw Funds
                                </h3>
                            </div>
                            <div className="p-2 border-b border-b-[#656565] rounded-bl-2xl rounded-br-2xl text-center min-h-[140px] flex flex-col gap-4 items-center justify-center">
                                <div className="flex flex-wrap items-center justify-center gap-2">
                                    <img className="w-[90px] h-[50px] object-contain border border-[#656565] p-1" src={abbank} alt="abbank" />
                                    <img className="w-[90px] h-[50px] object-contain border border-[#656565] p-1" src={agranibank} alt="agranibank" />
                                    <img className="w-[90px] h-[50px] object-contain border border-[#656565] p-1" src={bankasia} alt="bankasia" />
                                    <img className="w-[90px] h-[50px] object-contain border border-[#656565] p-1" src={bk} alt="bk" />
                                    <img className="w-[90px] h-[50px] object-contain border border-[#656565] p-1" src={brackbank} alt="brackbank" />
                                    <img className="w-[90px] h-[50px] object-contain border border-[#656565] p-1" src={citybank} alt="citybank" />
                                    <img className="w-[90px] h-[50px] object-contain border border-[#656565] p-1" src={dbbl} alt="dbbl" />
                                    <img className="w-[90px] h-[50px] object-contain border border-[#656565] p-1" src={islamibank} alt="islamibank" />
                                    <img className="w-[90px] h-[50px] object-contain border border-[#656565] p-1" src={jamunabnak} alt="jamunabnak" />
                                    <img className="w-[90px] h-[50px] object-contain border border-[#656565] p-1" src={janatabank} alt="janatabank" />
                                    <img className="w-[90px] h-[50px] object-contain border border-[#656565] p-1" src={ng} alt="ng" />
                                    <img className="w-[90px] h-[50px] object-contain border border-[#656565] p-1" src={premiurbank} alt="premiurbank" />
                                    <img className="w-[90px] h-[50px] object-contain border border-[#656565] p-1" src={rk} alt="rk" />

                                    <img className="w-[90px] h-[50px] object-contain border border-[#656565] p-1" src={rupalibank} alt="rupalibank" />
                                    <img className="w-[90px] h-[50px] object-contain border border-[#656565] p-1" src={sonalibank} alt="sonalibank" />
                                </div>
                                <button className="flex flex-row flex-wrap items-center justify-center gap-x-2.5 text-white text-base sm:text-lg md:text-xl font-semibold py-2 px-4 min-w-[182px] rounded-2xl bg-[#1E2841]">
                                    <MdOutlinePayment className="text-white text-2xl" />
                                    Withdraw
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
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
