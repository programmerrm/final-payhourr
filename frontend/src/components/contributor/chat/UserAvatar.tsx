import type { UserInfo } from "../../../types/chat/ChatProps";

export function UserAvatar({ user }: { user: UserInfo }) {
    return user.image ? (
        <img
            src={user.image}
            alt={user.username}
            className="w-8 h-8 rounded-full object-cover"
        />
    ) : (
        <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
            {user.username.charAt(0).toUpperCase()}
        </div>
    );
}
