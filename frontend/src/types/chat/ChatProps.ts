export interface UserInfo {
    id: number;
    username: string;
    email?: string;
    image?: string;
}

export interface ChatMessage {
    id: string;
    sender: UserInfo;
    receiver: UserInfo;
    message: string;
}

export interface MessageInputProps {
    message: string;
    setMessage: (msg: string) => void;
    handleSend: () => void;
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface MessageListProps {
    messages: ChatMessage[];
    username: string;
    renderUserAvatar: (user: UserInfo) => JSX.Element;
    isFileUrl: (text: string) => boolean;
    bottomRef: React.RefObject<HTMLDivElement>;
}
