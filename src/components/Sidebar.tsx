import "./sidebar.css";
import { Link } from "react-router-dom";

function Sidebar() {
  const chatList = [
    { chatId: 1, chatName: "First chat" },
    { chatId: 2, chatName: "Second chat" },
    { chatId: 3, chatName: "Third chat" },
  ];

  return (
    <div className="sidebar-container">
      <h2>Side Bar</h2> <hr />
      <div className="chat-list">
        <ul>
          {chatList.map((chat) => (
            <li key={chat.chatId}>
              <Link to={`/chat/${chat.chatId}`}>{chat.chatName}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
