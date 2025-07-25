import { v4 as uuidv4 } from "uuid";
import { useState, useRef } from "react";
import type { ChatMessage, UserDocs } from "../types/ChatTypes";
import { fetchChatResponse, store_chat_messages_on_the_backend, uploadDocument } from "../services/api";
interface MesageType {
    message: string,
    sender: "user" | "bot"
    chatInfo: ChatInfo | null
}

interface ChatInfo {
    chatId: string,
    chatName: string | null // TODO: should't be optional
}
//  Helper function for reusability
const store_messages = async ({ message, chatInfo, sender }: MesageType) => {
    try {
        const messageData = {
            message: message,
            timestamp: new Date().toISOString(),
            chatInfo: chatInfo,
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
    const [chatInfo, setChatInfo] = useState<ChatInfo | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [message, setMessage] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [selectedDoc, setSelectedDoc] = useState<string | null>(null);
    const [docs, setDocs] = useState<UserDocs[]>([]);
    const fileInputRef = useRef<HTMLInputElement | null>(null);


    const handleChatSubmit = async (e: React.FormEvent) => {
        let info = chatInfo;
        // We can't use chatInfo directly here b/c 
        // setState is async while doing setChatInfo
        //  TODO: We have to find a way for page refresh as well.
        // TODO: What if user refreshes while they're in the current chat?
        // TODO: Info (may be check the url is in root or has chat id )
        if (!info) {
            console.log("First time!");
            info = {
                chatId: uuidv4(),
                chatName: `Chat with ${selectedDoc}`,
            };
            setChatInfo(info);
        }
        e.preventDefault();
        if (!message.trim()) return;
        const userMessage = message.trim();

        setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
        setMessage("");

        // Store message
        store_messages({ message, chatInfo: info, sender: "user" })

        try {
            // LLM calling
            const bot_message = await fetchChatResponse(userMessage, selectedDoc);
            setMessages((prev) => [...prev, { sender: "bot", text: bot_message }]);
            // Store message
            store_messages({ message: bot_message, chatInfo: info, sender: "bot" })
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
        handleFileUpload
    };
};
