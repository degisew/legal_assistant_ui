import Chat from "../components/Chat";
import Sidebar from "../components/Sidebar";
import "./chatpage.css";
import { useParams } from "react-router-dom";
import ChatWindow from "../components/ChatWindow";
import ChatForm from "../components/ChatForm";
import { chatLogic } from "../hooks/chatLogic";
import { getChatHistoryMessages } from "../services/api";
import { useEffect } from "react";

function ChatPage() {
  const { message, messages, selectedDoc, setMessage, setMessages, handleChatSubmit } = chatLogic();
  const { chatId } = useParams();
  
  const fetchChatHistoryMesaages = async () => {
    try {
      if (!chatId) {
        console.log("Empty chat id:", chatId);
        return;
        
      }
      console.log("AAA");
      
      const res = await getChatHistoryMessages(chatId);
      setMessages(res);
    } catch (error) {
      console.error("Failed to fetch chat history messages", error);
    }
  };

  useEffect(() => {
    console.log("CHAT MESSAGES");
    
    fetchChatHistoryMesaages();
  }, []);

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
            messages={messages}
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