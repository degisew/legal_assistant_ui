import { useRef, useState, type ChangeEvent } from "react";
import type { UserDocs, ChatMessage } from "../types/ChatTypes";

function Chat() {
  const [docs, setDocs] = useState<UserDocs[]>([
    { id: 1, name: "legal_doc" },
    { id: 2, name: "Intch_user_agreement" },
  ]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [message, setMessage] = useState<string>("");
  const [chatStarted, setChatStarted] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage = message.trim();

    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setMessage("");
    setChatStarted(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/chat/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: userMessage,
          file_name: selectedDoc,
        }),
      });

      const data = await res.json();
      console.log(data);

      // 2. Show bot reply
      setMessages((prev) => [...prev, { sender: "bot", text: data }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Error: could not connect to backend." },
      ]);
    }
  };

  const handleUpload = () => {
    if (file) {
      // TODO: Upload file logic here (call your API)
      const newDoc = { id: Date.now().toString(), name: file.name };
      setDocs((prev) => [...prev, newDoc]);
      setFile(null);
      fileInputRef.current && (fileInputRef.current.value = "");
    }
  };
  return (
    <main className="chat_container">
      {!chatStarted ? (
        <>
          <h2>Chat with your documents</h2>
          <ul>
            {docs.map((doc) => (
              <li key={doc.id}>
                <button
                  onClick={() => {
                    setSelectedDoc(doc.name);
                  }}
                >
                  {doc.name}
                </button>
              </li>
            ))}
          </ul>
          <div>
            <input
              type="file"
              ref={fileInputRef}
              id="file_input"
              onChange={handleFileChange}
            />
            <button onClick={handleUpload}>Upload</button>
          </div>
          {selectedDoc && (
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
          )}
        </>
      ) : (
        <div className="chat-fullscreen">
          <h3>Chatting with {selectedDoc}</h3>
          <div className="chat-window">
            {messages.map((msg, index) => (
              <div key={index} className={msg.sender === "user" ? "you" : "i"}>
                <strong>{msg.sender === "user" ? "You" : "I"}:</strong>{" "}
                {msg.text}
              </div>
            ))}
          </div>
          <form onSubmit={handleChatSubmit}>
            <div className="chat-input-wrapper">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
              />
              <button type="submit" className="send-btn">
                Send
              </button>
            </div>
          </form>
        </div>
      )}
    </main>
  );
}

export default Chat;
