import React from "react";

export const AdminDashboard: React.FC = () => {
    return (
        <div className="tab-content flex-grow overflow-auto flex flex-col lg:flex-row gap-6">
            <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 content-start">
                <div className="bg-white p-2.5 md:p-3 lg:p-6 border border-gray-300 rounded-2xl shadow-md text-center hover:shadow-xl transition-all duration-300 flex items-center justify-center flex-col">
                    <h2 className="text-base lg:text-xl font-semibold text-gray-800">Total Spent</h2>
                    <p className="mt-2 text-base lg:text-3xl font-extrabold text-blue-600">15,400</p>
                </div>
                <div className="bg-white p-2.5 md:p-3 lg:p-6 border border-gray-300 rounded-2xl shadow-md text-center hover:shadow-xl transition-all duration-300 flex items-center justify-center flex-col">
                    <h2 className="text-base lg:text-xl font-semibold text-gray-800">Total Earned</h2>
                    <p className="mt-2 text-base lg:text-3xl font-extrabold text-green-600">12,800</p>
                </div>
                <div className="bg-white p-2.5 md:p-3 lg:p-6 border border-gray-300 rounded-2xl shadow-md text-center hover:shadow-xl transition-all duration-300 flex items-center justify-center flex-col">
                    <h2 className="text-base lg:text-xl font-semibold text-gray-800">Pending</h2>
                    <p className="mt-2 text-base lg:text-3xl font-extrabold text-yellow-600">3,200</p>
                </div>
                <div className="bg-white p-2.5 md:p-3 lg:p-6 border border-gray-300 rounded-2xl shadow-md text-center hover:shadow-xl transition-all duration-300 flex items-center justify-center flex-col">
                    <h2 className="text-base lg:text-xl font-semibold text-gray-800">Refunded</h2>
                    <p className="mt-2 text-base lg:text-3xl font-extrabold text-red-600">600</p>
                </div>
                <div className="bg-white p-2.5 md:p-3 lg:p-6 border border-gray-300 rounded-2xl shadow-md text-center hover:shadow-xl transition-all duration-300 flex items-center justify-center flex-col">
                    <h2 className="text-base lg:text-xl font-semibold text-gray-800">Total Orders</h2>
                    <p className="mt-2 text-base lg:text-3xl font-extrabold text-indigo-600">84</p>
                </div>
                <div className="bg-white p-2.5 md:p-3 lg:p-6 border border-gray-300 rounded-2xl shadow-md text-center hover:shadow-xl transition-all duration-300 flex items-center justify-center flex-col">
                    <h2 className="text-base lg:text-xl font-semibold text-gray-800">New Users</h2>
                    <p className="mt-2 text-base lg:text-3xl font-extrabold text-purple-600">29</p>
                </div>
            </div>
            
            <div className="w-full lg:w-[30%] border border-gray-300 rounded-2xl shadow-md bg-white shrink-0 flex flex-col">
                <h2 className="p-4 border-b border-gray-300 text-base lg:text-xl font-bold text-center text-black bg-gray-100 rounded-t-2xl">Network Updates</h2>
                <div className="grid grid-cols-3 text-center divide-x divide-gray-300 bg-white font-semibold text-sm text-gray-700">
                    <div className="p-3">Time</div>
                    <div className="p-3">User</div>
                    <div className="p-3">BDT</div>
                </div>

                <div className="grid grid-cols-3 text-center divide-x divide-gray-200 border-t border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition">
                    <div className="p-3">10:15 AM</div>
                    <div className="p-3 whitespace-normal break-words">@rahim</div>
                    <div className="p-3">1200৳</div>
                </div>
                <div className="grid grid-cols-3 text-center divide-x divide-gray-200 border-t border-b border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition">
                    <div className="p-3">11:40 AM</div>
                    <div className="p-3 whitespace-normal break-words">@sajid</div>
                    <div className="p-3">230৳</div>
                </div>
            </div>
        </div>
    );
}
