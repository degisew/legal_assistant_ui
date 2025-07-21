import { useState, useRef } from "react";
import type { ChatMessage, UserDocs } from "../types/ChatTypes";
import { fetchChatResponse, uploadDocument } from "../services/api";

export const chatLogic = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [message, setMessage] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [selectedDoc, setSelectedDoc] = useState<string | null>(null);
    const [docs, setDocs] = useState<UserDocs[]>([
        { id: 1, name: "legal_doc" },
        { id: 2, name: "Intch_user_agreement" },
    ]);
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
                await uploadDocument(file);
                const newDoc = { id: Date.now().toString(), name: file.name };
                setDocs((prev) => [...prev, newDoc]);
                setFile(null);
                if (fileInputRef.current) fileInputRef.current.value = "";
            } catch (err) {
                console.error("Upload failed", err);
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
