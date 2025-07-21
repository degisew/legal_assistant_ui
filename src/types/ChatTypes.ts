export interface UserDocs {
    id: number | string;
    name: string;
};

export interface ChatMessage {
    sender: "user" | "bot";
    text: string;
};

