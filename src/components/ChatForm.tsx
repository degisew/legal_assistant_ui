import type { FormEvent } from "react";
import "./chatForm.css";

interface ChatFormProps {
  message: string;
  selectedDoc: string | null;
  handleChatSubmit: (e: FormEvent) => void;
  setMessage: (value: string) => void;
}

function ChatForm({
  message,
  selectedDoc,
  handleChatSubmit,
  setMessage,
}: ChatFormProps) {
  return (
    <div className="chat-form">
      <form onSubmit={handleChatSubmit}>
        <div className="chat-input-wrapper">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={`Chat with ${selectedDoc}`}
          />
          <button type="submit" className="send-btn">
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChatForm;
