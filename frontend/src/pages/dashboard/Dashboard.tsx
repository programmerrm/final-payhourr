import { useState } from "react";
import { Outlet } from "react-router-dom";
import { AsideBar } from "../../components/asidebar/AsideBar";
import { TopBar } from "../../components/topbar/TopBar";
import { AnimatePresence } from "framer-motion";

export default function Dashboard() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <section className="bg-gray-100 h-screen">
            <div className="flex h-full w-full flex-nowrap">
                {/* Sidebar always visible on lg and up */}
                <div className="hidden lg:flex">
                    <AsideBar onClose={() => {}} />
                </div>

                {/* AnimatePresence for small screens only */}
                <AnimatePresence>
                    {isSidebarOpen && (
                        <AsideBar onClose={() => setIsSidebarOpen(false)} />
                    )}
                </AnimatePresence>

                <main className="flex-1 py-2.5 px-2.5 md:p-6 md:pt-5 flex flex-col h-full overflow-hidden">
                    <TopBar onMenuClick={() => setIsSidebarOpen(true)} />
                    <Outlet />
                </main>
            </div>
        </section>
    );
}
