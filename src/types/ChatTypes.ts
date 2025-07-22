export interface UserDocs {
    id: number | string;
    file_name: string;
};

export interface ChatMessage {
    sender: "user" | "bot";
    text: string;
};

