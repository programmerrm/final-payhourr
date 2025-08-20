import type { MessageListProps } from "../../../types/chat/ChatProps";

export function MessageList({
    messages,
    username,
    renderUserAvatar,
    isFileUrl,
    bottomRef,
}: MessageListProps) {
    return (
        <div className="flex-1 overflow-y-auto p-3">
            {messages.map((msg) => (
                <div
                    key={msg.id}
                    className={`flex ${msg.sender.username === username ? "justify-end" : "justify-start"}`}
                >
                    <div className="flex items-center space-x-2">
                        {msg.sender.username !== username && renderUserAvatar(msg.sender)}
                        <div className="p-2 rounded bg-gray-200 max-w-xs break-words">
                            {isFileUrl(msg.message) ? (
                                msg.message.match(/\.(jpg|jpeg|png|gif)$/i) ? (
                                    <img
                                        src={msg.message}
                                        alt="attachment"
                                        className="w-40 rounded"
                                    />
                                ) : (
                                    <a
                                        href={msg.message}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 underline"
                                    >
                                        Download File
                                    </a>
                                )
                            ) : (
                                <p>{msg.message}</p>
                            )}
                        </div>
                    </div>
                </div>
            ))}
            <div ref={bottomRef} />
        </div>
    );
}
