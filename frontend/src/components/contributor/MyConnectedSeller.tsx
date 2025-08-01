export default function MyConnectedSeller() {
    return (
        <div className="flex-grow overflow-auto px-6 py-8 bg-gray-50 rounded-xl shadow-inner">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-700 text-2xl font-medium">My Connected Buyer List</span>
                </div>
                <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-700 font-medium">Search:</label>
                    <input
                        type="text"
                        id="search"
                        placeholder="Type to search..."
                        className="border border-gray-300 px-4 py-2 rounded-md bg-white shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-[#1C2640]"
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
                            <th className="px-6 py-4">Paymnet</th>
                            <th className="px-6 py-4">Dispute</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-gray-700">
                        <tr className="hover:bg-gray-100 transition">
                            <td className="px-6 py-4">21 Jun 2025</td>
                            <td className="px-6 py-4 font-medium text-gray-900">S12345</td>
                            <td className="px-6 py-4">@rahim</td>
                            <td className="px-6 py-4">rahim5480@example.com</td>
                            <td className="px-6 py-4">01844787252</td>
                            <td className="px-6 py-4 font-bold text-blue-600">৳154,874</td>
                            <td className="px-6 py-4">48</td>
                            <td className="px-6 py-4">Today 05:45PM</td>
                        </tr>
                        <tr className="hover:bg-gray-100 transition">
                            <td className="px-6 py-4">21 Jun 2025</td>
                            <td className="px-6 py-4 font-medium text-gray-900">S12345</td>
                            <td className="px-6 py-4">@rahim</td>
                            <td className="px-6 py-4">rahim5480@example.com</td>
                            <td className="px-6 py-4">01844787252</td>
                            <td className="px-6 py-4 font-bold text-blue-600">৳154,874</td>
                            <td className="px-6 py-4">48</td>
                            <td className="px-6 py-4">Today 05:45PM</td>
                        </tr>
                        <tr className="hover:bg-gray-100 transition">
                            <td className="px-6 py-4">21 Jun 2025</td>
                            <td className="px-6 py-4 font-medium text-gray-900">S12345</td>
                            <td className="px-6 py-4">@rahim</td>
                            <td className="px-6 py-4">rahim5480@example.com</td>
                            <td className="px-6 py-4">01844787252</td>
                            <td className="px-6 py-4 font-bold text-blue-600">৳154,874</td>
                            <td className="px-6 py-4">48</td>
                            <td className="px-6 py-4">Today 05:45PM</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="mt-6 flex flex-col md:flex-row md:justify-between md:items-center gap-3 text-sm text-gray-700">
                <div>Showing 1 to 10 of 50 entries</div>
                <div className="flex gap-1">
                    <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-200">Prev</button>
                    <button className="px-3 py-1 border border-gray-300 rounded bg-[#1C2640] text-white shadow">1</button>
                    <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-200">2</button>
                    <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-200">3</button>
                    <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-200">Next</button>
                </div>
            </div>

        </div>
    );
}