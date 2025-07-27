import { useEffect, useState } from "react";
import { getChatHistories } from "../services/api";
import "./sidebar.css";
import { Link } from "react-router-dom";

interface ChatListType {
  id: string;
  chat_name: string;
}
function Sidebar() {
  const [chatList, setChatList] = useState<ChatListType[]>([]);

  const fetchChatHistory = async () => {
    try {
      const res = await getChatHistories(); // your async API call
      setChatList(res);
    } catch (error) {
      console.error("Failed to fetch chat histories", error);
    }
  };

  useEffect(() => {
    fetchChatHistory();
  }, []);

  console.log(chatList);

  return (
    <div className="sidebar-container">
      <h2>Chats</h2>
      <hr />
      <aside className="chat-history">
        <Link key={"new-chat"} to={"/chat"} className="new-chat">Start New Chat</Link>
        {chatList.map((chat) => (
          <Link
            key={chat.id}
            to={`/chat/${chat.id}`}
            className="chat-item"
          >
            {chat.chat_name}
          </Link>
        ))}
      </aside>
    </div>
  );
}

export default Sidebar;
