import { useState } from "react";
import { Outlet } from "react-router-dom";
import { AsideBar } from "../../components/asidebar/AsideBar";
import { TopBar } from "../../components/topbar/TopBar";
import { AnimatePresence, motion } from "framer-motion";

export default function Dashboard() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    return (
        <section className="bg-gray-100 h-screen">
            <div className="flex h-full w-full flex-nowrap">
                <div className="hidden lg:flex">
                    <AsideBar onClose={() => {}} isDesktop={true} />
                </div>
                <AnimatePresence>
                    {isSidebarOpen && (
                        <motion.div
                          className="fixed inset-0 z-40 flex lg:hidden"
                        >
                          <motion.div
                            className="absolute inset-0 bg-black/40"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsSidebarOpen(false)}
                          />
                          <AsideBar
                            onClose={() => setIsSidebarOpen(false)}
                            isDesktop={false}
                          />
                        </motion.div>
                    )}
                </AnimatePresence>
                <main className="flex-1 py-2.5 px-2.5 md:p-6 md:pt-5 flex flex-col h-full overflow-x-hidden">
                    <TopBar onMenuClick={() => setIsSidebarOpen(true)} />
                    <Outlet />
                </main>
            </div>
        </section>
    );
}
