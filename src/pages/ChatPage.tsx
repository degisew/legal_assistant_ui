import Chat from "../components/Chat";
import Sidebar from "../components/Sidebar";
import "./chatpage.css";
import { useParams } from "react-router-dom";
import ChatWindow from "../components/ChatWindow";
import ChatForm from "../components/ChatForm";
import { chatLogic } from "../hooks/chatLogic";

function ChatPage() {
  const { message, selectedDoc, setMessage, handleChatSubmit } = chatLogic();
  const { chatId } = useParams();
  return (
    <main className="chat-page">
      <Sidebar />
      {!chatId ? (
        <div className="chat-area">
          <Chat />
        </div>
      ) : (
        <div className="chat-window-container">
          <ChatWindow
            messages={[
              { sender: "user", text: "hello" },
              { sender: "bot", text: "hello! How can I help you today?" },
            ]}
          />
          <ChatForm
            message={message}
            selectedDoc={selectedDoc}
            handleChatSubmit={handleChatSubmit}
            setMessage={setMessage}
          />
        </div>
      )}
    </main>
  );
}

export default ChatPage;
