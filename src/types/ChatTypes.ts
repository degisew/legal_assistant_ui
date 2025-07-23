export interface UserDocs {
    id: number | string;
    file_name: string;
};

export interface ChatMessage {
    sender: "user" | "bot";
    text: string;
};


export interface SignupFormData {
    email: string;
    password: string;
    confirm_password: string;
}

export interface LoginFormData {
    username: string;
    password: string;
}