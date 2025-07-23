import { useState, useRef } from "react";
import type { ChatMessage, UserDocs } from "../types/ChatTypes";
import { fetchChatResponse, uploadDocument } from "../services/api";

export const chatLogic = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [message, setMessage] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [selectedDoc, setSelectedDoc] = useState<string | null>(null);
    const [docs, setDocs] = useState<UserDocs[]>([]);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleChatSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;
        const userMessage = message.trim();

        setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
        setMessage("");

        try {
            const data = await fetchChatResponse(userMessage, selectedDoc);
            setMessages((prev) => [...prev, { sender: "bot", text: data }]);
        } catch (err) {
            setMessages((prev) => [
                ...prev,
                { sender: "bot", text: "Error: could not connect to backend." },
            ]);
        }
    };

    const handleFileUpload = async () => {
        if (file) {
            try {
                const res = await uploadDocument(file);
                console.log(res);
                
                const newDoc: UserDocs = { id: res.id, file_name: res.file_name };
                setDocs((prev) => [...prev, newDoc]);
                setFile(null);
                fileInputRef.current && (fileInputRef.current.value = "");
            } catch (err) {
                console.error("File Upload failed", err);
            }
        }
    };

    return {
        messages,
        message,
        selectedDoc,
        docs,
        fileInputRef,
        setMessage,
        setFile,
        setSelectedDoc,
        setDocs,
        handleChatSubmit,
        handleFileUpload,
    };
};
