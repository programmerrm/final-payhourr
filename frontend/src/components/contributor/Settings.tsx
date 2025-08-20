import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProfileUpdateForm } from "../forms/ProfileUpdateForm";
import { PasswordChangeForm } from "../forms/PasswordChangeForm";

export default function Settings() {
    const [activeTab, setActiveTab] = useState<"profile" | "password">("profile");

    return (
        <div className="max-w-3xl mx-auto p-5">
            <div className="flex border-b border-gray-300 mb-6">
                <button
                    className={`py-2 px-4 font-medium ${activeTab === "profile"
                            ? "border-b-2 border-blue-500 text-blue-500"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                    onClick={() => setActiveTab("profile")}
                >
                    Profile Update
                </button>
                <button
                    className={`py-2 px-4 font-medium ${activeTab === "password"
                            ? "border-b-2 border-blue-500 text-blue-500"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                    onClick={() => setActiveTab("password")}
                >
                    Password Change
                </button>
            </div>
            <AnimatePresence mode="wait">
                {activeTab === "profile" && (
                    <motion.div
                        key="profile"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="bg-white shadow-lg rounded-xl p-6 mt-6">
                            <h4 className="text-2xl font-semibold text-center mb-6 text-gray-800">User Profile</h4>
                            <ProfileUpdateForm />
                        </div>
                    </motion.div>
                )}
                {activeTab === "password" && (
                    <motion.div
                        key="password"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="bg-white shadow-lg rounded-xl p-6 mt-6">
                            <h4 className="text-2xl font-semibold text-center mb-6 text-gray-800">Change Password</h4>
                            <PasswordChangeForm />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
