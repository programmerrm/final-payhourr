import { Outlet } from "react-router-dom";
import { AsideBar } from "../../components/asidebar/AsideBar";
import { TopBar } from "../../components/topbar/TopBar";

export default function Dashboard() {
    return (
        <section className="bg-gray-100 h-screen">
            <div className="flex h-full w-full flex-nowrap">
                <AsideBar />
                <main className="flex-1 p-6 flex flex-col h-full overflow-hidden">
                    <TopBar />
                    <Outlet />
                </main>
            </div>
        </section>
    );
}
