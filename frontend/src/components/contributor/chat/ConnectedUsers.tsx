import React from "react";
import { useGetConnectedUsersWithOutPaginationQuery } from "../../../redux/features/chat/connectedUsers";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";

export const ConnectedUsers: React.FC = () => {
    const navigate = useNavigate();
    const currentUsername = useSelector((state: RootState) => state.auth.user?.username);
    const role = useSelector((state: RootState) => state.auth.user?.role);
    const { data, isLoading, error } = useGetConnectedUsersWithOutPaginationQuery(undefined, { refetchOnMountOrArgChange: true });
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading users</div>;
    const users = data?.results?.[0]?.connected_users ?? [];

    const generateRoomName = (otherUsername: string) => {
        const usernames = [currentUsername, otherUsername].sort();
        return `${usernames[0]}_${usernames[1]}`;
    };

    return (
        <div className="w-full  md:w-auto shrink-0 lg:w-64 bg-white border-l border-gray-200 overflow-y-auto flex flex-col">
            <div className="p-4 border-b shrink-0">
                <h2 className="text-lg font-semibold text-gray-800">Connected {role === "seller" ? "Buyer" : "Seller"}</h2>
            </div>
            <div className="grow overflow-x-hidden scrollbar-hidden space-y-2 p-2">
                {users.map((user: any) => (
                    <button className="w-full text-left bg-gray-300 hover:bg-gray-200 transition-all duration-300 ease-linear rounded-full" onClick={() => navigate(`/dashboard/${currentUsername}/chat/${generateRoomName(user.username)}/`)} type="button" key={user.id}>
                        <div className="flex items-center gap-3 p-4 cursor-pointer">
                            <img src="https://i.pravatar.cc/150?img=8" className="w-10 h-10 rounded-full object-cover shadow" />
                            <div className="flex-1">
                                <div className="flex justify-between">
                                    <h4 className="font-medium text-gray-800">{user.username}</h4>
                                </div>
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
