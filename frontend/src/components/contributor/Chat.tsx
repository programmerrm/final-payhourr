import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useWebSocket from "react-use-websocket";
import type { RootState } from "../../redux/store";

export default function Chat() {
    const { roomName } = useParams<{ roomName: string }>();
    if (!roomName) {
        return <div>Invalid room name</div>;
    }

    const socketUrl = `ws://127.0.0.1:8000/ws/chat/${roomName}/`;

    const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<any[]>([]); // Optional: define proper type later

    const username = useSelector((state: RootState) => state.auth.user?.username);
    const participants = roomName.split("__");
    const receiver = participants.find((p) => p !== username);

    // WebSocket message receive handler
    useEffect(() => {
        if (lastMessage !== null) {
            try {
                const data = JSON.parse(lastMessage.data);
                setMessages((prev) => [...prev, data]);
            } catch (err) {
                console.error("Failed to parse message", err);
            }
        }
    }, [lastMessage]);

    // WebSocket status logger
    useEffect(() => {
        if (readyState === 1) console.log("✅ WebSocket Connected");
        else console.log("⚠️ WebSocket Disconnected");
    }, [readyState]);

    // Send message handler
    const handleSend = () => {
        if (!message.trim() || !username || !receiver) return;

        const msgObj = {
            sender: username,
            receiver: receiver,
            message: message.trim(),
        };

        sendMessage(JSON.stringify(msgObj));

        // Optimistic update
        setMessages((prev) => [...prev, msgObj]);
        setMessage("");
    };

    return (
        <div className="relative h-screen w-full border-2 border-black/80 rounded">
            <div className="grid grid-cols-[70%_30%] h-full">
                {/* Chat messages area */}
                <div className="w-full h-full px-5 py-5 flex flex-col">
                    <div className="flex-grow overflow-y-auto bg-white p-4 rounded-lg mb-4">
                        {messages.length === 0 ? (
                            <li className="text-center text-gray-500">No messages yet</li>
                        ) : (
                            messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={`mb-2 flex ${msg.sender === username ? "justify-end" : "justify-start"
                                        }`}
                                >
                                    <div
                                        className={`px-4 py-2 rounded-xl ${msg.sender === username
                                            ? "bg-blue-600 text-white"
                                            : "bg-gray-200"
                                            }`}
                                    >
                                        <strong>{msg.sender === username ? "me" : msg.sender}:</strong>{" "}
                                        {msg.message}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Input and send button */}
                    <div className="flex items-center gap-3">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1 border border-gray-300 rounded-xl px-4 py-2 focus:outline-none"
                            onKeyDown={(e) => {
                                if (e.key === "Enter") handleSend();
                            }}
                        />
                        <button
                            onClick={handleSend}
                            className="bg-gray-900 text-white px-4 py-2 rounded-xl"
                        >
                            Send
                        </button>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="w-full h-full px-5 py-5 border-l-2 border-black/80">
                    <h3 className="text-xl font-semibold text-center mb-4">
                        Connected Users
                    </h3>
                    <div className="space-y-3">
                        {participants.map((p, idx) => (
                            <div
                                key={idx}
                                className="flex items-center justify-between bg-gray-200 rounded-full px-4 py-2"
                            >
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 bg-green-500 rounded-full" />
                                    <span>{p === username ? "You" : p}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
