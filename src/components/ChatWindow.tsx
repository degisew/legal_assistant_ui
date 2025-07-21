import type { ChatMessage } from "../types/ChatTypes";

interface ChatWindowProps {
  messages: ChatMessage[];
}

function ChatWindow({ messages }: ChatWindowProps) {
  return (
    <div className="chat-window">
      {messages.map((msg, index) => (
        <div key={index} className={msg.sender === "user" ? "you" : "i"}>
          <strong>{msg.sender === "user" ? "You" : "Bot"}:</strong> {msg.text}
        </div>
      ))}
    </div>
  );
}

export default ChatWindow;
