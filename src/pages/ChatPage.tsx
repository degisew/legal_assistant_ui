import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import ChatForm from "../components/ChatForm";
import { chatLogic } from "../hooks/chatLogic";
import ChatWindow from "../components/ChatWindow";
import FileUpload from "../components//FileUpload";
import { getChatHistoryMessages, fetchUserDocuments } from "../services/api";
import "./chatpage.css";

function ChatPage() {
  const {
    messages,
    setMessages,
    message,
    selectedDoc,
    setSelectedDoc,
    docs,
    setDocs,
    fileInputRef,
    setMessage,
    setFile,
    handleChatSubmit,
    handleFileUpload,
  } = chatLogic();

  const { chatId } = useParams();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const fetchChatHistoryMesaages = async () => {
    try {
      if (!chatId) {
        console.log("Empty chat id:", chatId);
        return;
      }
      const res = await getChatHistoryMessages(chatId);
      setMessages(res);
    } catch (error) {
      console.error("Failed to fetch chat history messages", error);
    }
  };

  const getUserDocuments = async () => {
    try {
      const res = await fetchUserDocuments();
      setDocs(res);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchChatHistoryMesaages();
  }, [chatId]);

  useEffect(() => {
    getUserDocuments();
  }, []);

  return (
    <main className="chat-page">
      <Sidebar setSelectedDoc={setSelectedDoc} />
      <div className="chat-area">
        <div className="chat-main">
          {!chatId ? (
            <>
              <h2>Chat with your documents</h2>
              <ul>
                {docs.map((doc) => (
                  <li key={doc.id}>
                    <button
                      onClick={() => {
                        setSelectedDoc(doc.file_name);
                      }}
                    >
                      {doc.file_name}
                    </button>
                  </li>
                ))}
              </ul>
              <FileUpload
                fileInputRef={fileInputRef}
                fileChangeHandler={handleFileChange}
                fileUploadHandler={handleFileUpload}
              />
              {selectedDoc && (
                <ChatForm
                  message={message}
                  selectedDoc={selectedDoc}
                  handleChatSubmit={handleChatSubmit}
                  setMessage={setMessage}
                />
              )}
            </>
          ) : (
            <div className="chat-window-container">
              <ChatWindow messages={messages} />
              <ChatForm
                message={message}
                selectedDoc={selectedDoc}
                handleChatSubmit={handleChatSubmit}
                setMessage={setMessage}
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default ChatPage;
