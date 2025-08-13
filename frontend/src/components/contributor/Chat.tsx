import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useWebSocket from "react-use-websocket";
import { v4 as uuidv4 } from "uuid";
import { useAddFileUploadMutation, useGetMessageListQuery } from "../../redux/features/chat/chat";
import type { RootState } from "../../redux/store";
import { MEDIA_URL } from "../../utils/Api";
import { ChatArea } from "./chat/ChatArea";
import { ConnectedUsers } from "./chat/ConnectedUsers";

/* User Type */
export interface UserInfo {
  id: number;
  email?: string;
  username: string;
  image?: string;
}

/* Chat Message Type */
export interface ChatMessage {
  id: string;
  sender: UserInfo;
  receiver: UserInfo;
  message: string;
}

const isFilePath = (text: string) => /^\/?media\/.+/.test(text);

export default function Chat() {
  const { roomName } = useParams<{ roomName: string }>();
  const username = useSelector((state: RootState) => state.auth.user?.username);
  const { data: initialMessages } = useGetMessageListQuery(roomName!, {
    refetchOnMountOrArgChange: true,
  });
  const [addFileUpload] = useAddFileUploadMutation();

  const socketUrl = `ws://127.0.0.1:8000/ws/chat/${roomName}/`;
  const { sendMessage, lastMessage } = useWebSocket(socketUrl, {
    shouldReconnect: () => true,
  });

  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  // container for sender and receiver info keyed by username
  const [participantsInfo, setParticipantsInfo] = useState<{ [username: string]: UserInfo }>({});

  const bottomRef = useRef<HTMLDivElement | null>(null);

  const participants = roomName ? roomName.split("_") : [];
  const receiver = participants.find((p) => p !== username) || "";

  const normalizeUrl = (url: string) =>
    url.startsWith("http")
      ? url
      : `${MEDIA_URL.replace(/\/$/, "")}/${url.replace(/^\//, "")}`;

  const renderUserAvatar = (user: UserInfo) => {
    if (user.image) {
      const imgSrc = user.image.startsWith("http")
        ? user.image
        : normalizeUrl(user.image);
      return (
        <img
          src={imgSrc}
          alt={user.username}
          className="w-8 h-8 rounded-full object-cover"
        />
      );
    } else {
      return (
        <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
          {user.username.charAt(0).toUpperCase()}
        </div>
      );
    }
  };

  const isFileUrl = (text: string) =>
    /^https?:\/\/.+\.(jpg|jpeg|png|gif|mp4|pdf|docx?|xlsx?|pptx?)$/i.test(text);

  useEffect(() => {
    if (initialMessages && Array.isArray(initialMessages)) {
      const newParticipants: { [username: string]: UserInfo } = {};

      const formatted = initialMessages.map((msg: any) => {
        let msgContent = msg.content;
        if (typeof msgContent === "string" && isFilePath(msgContent)) {
          msgContent = normalizeUrl(msgContent);
        }

        // Collect sender and receiver info
        newParticipants[msg.sender.username] = {
          id: msg.sender.id,
          username: msg.sender.username,
          image: msg.sender.image,
          email: msg.sender.email, // add email if available
        };
        newParticipants[msg.receiver.username] = {
          id: msg.receiver.id,
          username: msg.receiver.username,
          image: msg.receiver.image,
          email: msg.receiver.email,
        };

        return {
          id: msg.id || uuidv4(),
          sender: msg.sender,
          receiver: msg.receiver,
          message: msgContent,
        };
      });

      setParticipantsInfo(newParticipants);
      setMessages(formatted);
    }
  }, [initialMessages]);

  useEffect(() => {
    if (lastMessage !== null) {
      try {
        const data: ChatMessage = JSON.parse(lastMessage.data);
        let normalizedMessage = data.message;

        if (typeof normalizedMessage === "string" && isFilePath(normalizedMessage)) {
          normalizedMessage = normalizeUrl(normalizedMessage);
        }

        setMessages((prev) => {
          if (prev.some((msg) => msg.id === data.id)) return prev;
          return [...prev, { ...data, message: normalizedMessage }];
        });

        // Update participants info on new message
        setParticipantsInfo((prev) => ({
          ...prev,
          [data.sender.username]: data.sender,
          [data.receiver.username]: data.receiver,
        }));

      } catch (err) {
        console.error("Invalid WebSocket message:", err);
      }
    }
  }, [lastMessage]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!message.trim() || !username || !receiver) return;

    const newMsg = {
      id: uuidv4(),
      sender: participantsInfo[username] || { username },
      receiver: participantsInfo[receiver] || { username: receiver },
      message: message.trim(),
    };

    sendMessage(JSON.stringify(newMsg));
    setMessages((prev) => [...prev, newMsg as ChatMessage]);
    setMessage("");
  };

  const handleFileUpload = async (file: File) => {
    if (!file || !username || !receiver) return;

    const formData = new FormData();
    formData.append("attachment", file);
    formData.append("receiver", receiver);

    try {
      const response = await addFileUpload(formData).unwrap();
      const fileUrl = response.attachment;
      const fullUrl = normalizeUrl(fileUrl);

      const newMsg = {
        id: uuidv4(),
        sender: participantsInfo[username] || { username },
        receiver: participantsInfo[receiver] || { username: receiver },
        message: fullUrl,
      };

      sendMessage(JSON.stringify(newMsg));
      setMessages((prev) => [...prev, newMsg as ChatMessage]);
      setSelectedFile(null);
    } catch (error) {
      console.error("File upload failed:", error);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
      await handleFileUpload(file);
    }
  };

  return (
    <div className="relative grow overflow-y-auto scrollbar-hidden w-full border border-gray-300 rounded">
      <div className="flex h-full">
        <ChatArea
          messages={messages}
          username={username || ""}
          renderUserAvatar={renderUserAvatar}
          isFileUrl={isFileUrl}
          bottomRef={bottomRef}
          message={message}
          setMessage={setMessage}
          handleSend={handleSend}
          handleFileChange={handleFileChange}
          handleFileUpload={() => {}}
          selectedFile={selectedFile}
          roomName={roomName || ""}
          receiver={receiver}
          participantsInfo={participantsInfo[receiver]}
        />
        <ConnectedUsers />
      </div>
    </div>
  );
}
