import { useState, useRef } from "react";
import type { ChatMessage, UserDocs } from "../types/ChatTypes";
import { createChatSession, fetchChatResponse, store_chat_messages_on_the_backend, uploadDocument } from "../services/api";
interface MesageType {
    message: string,
    sender: "user" | "bot"
    chat_id: string
}

interface ChatSessionType {
    id: string,
    chat_name: string
}

//  Helper function for reusability
const store_messages = async ({ message, chat_id, sender }: MesageType) => {
    try {
        const messageData = {
            message: message,
            timestamp: new Date().toISOString(),
            chat_id: chat_id,
            sender: sender
        }
        // Store chat message in the backend
        const res = await store_chat_messages_on_the_backend(messageData);
        console.log(res);

    } catch (error) {
        console.log(`Message store Error: ${error}`);

    }
}
export const chatLogic = () => {
    const [chatSession, setChatSession] = useState<ChatSessionType>();
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

        setMessages((prev) => [...prev, { sender: "user", message: userMessage }]);
        setMessage("");
        try {
            let sessionId: string;
            if (!chatSession?.id) {
                const sessionResponse = await createChatSession({ file_name: selectedDoc });
                sessionId = sessionResponse.id;
                setChatSession(sessionResponse);
            } else {
                sessionId = chatSession.id;
            }
            await store_messages({ message, chat_id: sessionId, sender: "user" })
            // LLM calling
            const bot_message = await fetchChatResponse(userMessage, selectedDoc);
            setMessages((prev) => [...prev, { sender: "bot", message: bot_message }]);
            // Store message
            await store_messages({ message: bot_message, chat_id: sessionId, sender: "bot" })
        } catch (err) {
            setMessages((prev) => [
                ...prev,
                { sender: "bot", message: "Error: could not connect to backend." },
            ]);
            console.error("Error in handleChatSubmit:", err);
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
        setMessages,
        message,
        setMessage,
        selectedDoc,
        setSelectedDoc,
        docs,
        setDocs,
        setFile,
        fileInputRef,
        handleChatSubmit,
        handleFileUpload
    };
};
