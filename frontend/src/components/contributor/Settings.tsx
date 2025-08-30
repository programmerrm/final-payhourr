import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProfileUpdateForm } from "../forms/ProfileUpdateForm";
import { PasswordChangeForm } from "../forms/PasswordChangeForm";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { useGetUserQuery } from "../../redux/features/auth/authApi";
import { MEDIA_URL } from "../../utils/Api";
import { DocumentUploadForm } from "../forms/DocumentUploadForm";

export default function Settings() {
    const auth = useSelector((state: RootState) => state.auth);
    const userid = auth?.user?.id;
    const role = auth?.user?.role;
    const [activeTab, setActiveTab] = useState<"account_setting" | "security" | "documents" | "shipping">("account_setting");
    const { data: userData } = useGetUserQuery(userid!);
    const user = userData?.data;

    return (
        <div className="w-full block px-5 h-full">

            <div className="grid grid-cols-[20%_75%] gap-5 w-full h-full">
                <div className="flex flex-col flex-wrap gap-y-2.5 py-2.5 w-full bg-white shadow-sm rounded-2xl">
                    <h3 className="text-lg font-semibold text-gray-800 text-center capitalize"> {role} Profile</h3>
                    <div className="flex flex-col flex-wrap gap-y-1 items-center justify-center border-b border-gray-400 pb-2.5 px-2.5">
                        {user?.image ? (
                            <img className="w-36 h-36 rounded-full object-cover border-2 border-gray-200 cursor-pointer hover:border-blue-500 transition" src={`${MEDIA_URL}${user?.image}`} alt={user?.username} />
                        ) : (
                            <div className="w-36 h-36 rounded-full border-2 border-gray-200 flex items-center justify-center">
                                <span className="text-gray-500">No Image</span>
                            </div>
                        )}
                        <h4 className="font-medium text-black/80">@{user?.username}</h4>
                        <h4 className="font-medium text-xl text-black/80">{user?.first_name} {user?.last_name}</h4>
                        <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>
                </div>

                <div className="flex flex-col flex-wrap w-full h-full">

                    <div>
                        <button
                            className={`py-2 px-4 font-medium ${activeTab === "account_setting"
                                ? "border-b-2 border-blue-500 text-blue-500"
                                : "text-gray-500 hover:text-gray-700"
                                }`}
                            onClick={() => setActiveTab("account_setting")}
                        >
                            Account Setting
                        </button>

                        <button
                            className={`py-2 px-4 font-medium ${activeTab === "security"
                                ? "border-b-2 border-blue-500 text-blue-500"
                                : "text-gray-500 hover:text-gray-700"
                                }`}
                            onClick={() => setActiveTab("security")}
                        >
                            Security
                        </button>

                        <button
                            className={`py-2 px-4 font-medium ${activeTab === "documents"
                                ? "border-b-2 border-blue-500 text-blue-500"
                                : "text-gray-500 hover:text-gray-700"
                                }`}
                            onClick={() => setActiveTab("documents")}
                        >
                            Documents
                        </button>

                        <button
                            className={`py-2 px-4 font-medium ${activeTab === "shipping"
                                ? "border-b-2 border-blue-500 text-blue-500"
                                : "text-gray-500 hover:text-gray-700"
                                }`}
                            onClick={() => setActiveTab("shipping")}
                        >
                            Shiping
                        </button>

                    </div>

                    {/* Famer moton animation */}
                    <AnimatePresence mode="wait">

                        {activeTab === "account_setting" && (
                            <motion.div
                                key="account_setting"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="w-full h-[91.5%] block"
                            >
                                <div className="flex flex-col flex-wrap justify-center items-center bg-white rounded-xl p-6 mt-5 h-full">
                                    <ProfileUpdateForm />
                                </div>
                            </motion.div>
                        )}

                        {activeTab === "security" && (
                            <motion.div
                                key="security"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="w-full h-[91.5%] block"
                            >
                                <div className="flex flex-col flex-wrap justify-center items-center bg-white shadow-lg rounded-xl p-6 mt-5 h-full">
                                    <h4 className="text-2xl font-semibold text-center mb-6 text-gray-800">Change Password</h4>
                                    <PasswordChangeForm />
                                </div>
                            </motion.div>
                        )}

                        {activeTab === "documents" && (
                            <motion.div
                                key="documents"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="w-full h-[91.5%] block"
                            >
                                <div className="flex flex-col flex-wrap justify-center items-center bg-white shadow-lg rounded-xl p-6 mt-5 h-full">
                                    <h4 className="text-2xl font-semibold text-center mb-6 text-gray-800">Documents</h4>
                                    <DocumentUploadForm />
                                </div>
                            </motion.div>
                        )}

                        {activeTab === "shipping" && (
                            <motion.div
                                key="shipping"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className="w-full h-[91.5%] flex justify-center items-center bg-white shadow-lg rounded-xl p-6 mt-5"
                            >
                                <div className="flex flex-col items-center">
                                    <motion.h4
                                        className="text-2xl font-bold text-gray-800 text-center"
                                        initial={{ width: 0 }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: 2, ease: "easeInOut" }}
                                        style={{ overflow: "hidden", whiteSpace: "nowrap", borderRight: "3px solid #1C2640" }}
                                    >
                                        Coming Soon....
                                    </motion.h4>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
