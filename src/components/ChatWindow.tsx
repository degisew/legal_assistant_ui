import type { ChatMessage } from "../types/ChatTypes";
import "./chatWindow.css";

interface ChatWindowProps {
  messages: ChatMessage[];
}

function ChatWindow({ messages }: ChatWindowProps) {
  console.log("Chat winow msg", messages);
  
  return (
    <div className="chat-window">
      {messages.map((msg, index) => (
        <div key={index} className={msg.sender === "user" ? "user" : "bot"}>
          <div className="message">
            <strong>{msg.sender === "user" ? "You" : "Bot"}:</strong> {msg.text}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ChatWindow;
