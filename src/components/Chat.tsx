import { type ChangeEvent } from "react";
import { chatLogic } from "../hooks/chatLogic";
import ChatForm from "./ChatForm";
import FileUpload from "./FileUpload";
import ChatWindow from "./ChatWindow";
import "./chat.css";

function Chat() {
  const {
    messages,
    message,
    selectedDoc,
    docs,
    fileInputRef,
    setMessage,
    setFile,
    setSelectedDoc,
    handleChatSubmit,
    handleFileUpload,
  } = chatLogic();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const chatStarted = messages.length > 0;

  return (
    <main className="main">
      {!chatStarted ? (
        <>
          <h2>Chat with your documents</h2>
          <ul>
            {docs.map((doc) => (
              <li key={doc.id}>
                <button onClick={() => setSelectedDoc(doc.file_name)}>
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
    </main>
  );
}

export default Chat;
