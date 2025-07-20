import { useState, type ChangeEvent } from "react";


type UserDocs = {
  id: number;
  name: string;
};

function Chat() {
  const [docs, setDocs] = useState<UserDocs[]>([
    { id: 1, name: "legal_doc" },
    { id: 2, name: "Intch_user_agreement" },
  ]);

  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      // Optional: upload the file here
    }
  };

  const handleUpload = () => {
    if (file) {
      // TODO: Upload file logic here (call your API)
      const newDoc = { id: Date.now().toString(), name: file.name };
      setDocs((prev) => [...prev, newDoc]);
      setFile(null);
    }
  };

  return (
    <main className="chat_container">
      <h2>Chat with your documents</h2>
      <ul>
        {docs.map((doc) => (
          <li key={doc.id}>
            <button onClick={() => setSelectedDoc(doc.name)}>{doc.name}</button>
          </li>
        ))}
      </ul>
      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
      </div>
      <input type="text" />

      <div className="selected_doc">{selectedDoc}</div>
    </main>
  );
}

export default Chat;
