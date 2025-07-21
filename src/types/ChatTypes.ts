export interface UserDocs {
    id: number;
    name: string;
};

export interface ChatMessage {
    sender: "user" | "bot";
    text: string;
};

