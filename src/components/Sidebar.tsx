import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getChatHistories } from "../services/api";
import "./sidebar.css";

interface ChatListType {
  id: string;
  chat_name: string;
}

interface SidebarProps {
  setSelectedDoc: (selectedDoc: string) => void;
}

function Sidebar({ setSelectedDoc }: SidebarProps) {
  const [chatList, setChatList] = useState<ChatListType[]>([]);

  const fetchChatHistory = async () => {
    try {
      const res = await getChatHistories();
      setChatList(res);
    } catch (error) {
      console.error("Failed to fetch chat histories", error);
    }
  };

  useEffect(() => {
    fetchChatHistory();
  }, []); // Runs on page load

  console.log(chatList);

  return (
    <div className="sidebar-container">
      <h2>Chats</h2>
      <hr />
      <aside className="chat-history">
        <Link
          key={"new-chat"}
          to={"/chat"}
          className="new-chat"
          onClick={() => setSelectedDoc("")}
        >
          Start New Chat
        </Link>
        {chatList.map((chat) => (
          <Link
            key={chat.id}
            to={`/chat/${chat.id}`}
            className="chat-item"
            onClick={() => setSelectedDoc(chat.chat_name)}
          >
            {chat.chat_name}
          </Link>
        ))}
      </aside>
    </div>
  );
}

export default Sidebar;
