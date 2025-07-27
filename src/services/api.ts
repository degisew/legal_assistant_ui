export const loginHandler = async (formData: { username: string; password: string }) => {
    // ? FastAPI OAuth2PasswordRequestForm not accepts JSON
    const body = new URLSearchParams();
    body.append("username", formData.username);
    body.append("password", formData.password);
    const res = await fetch("http://127.0.0.1:8000/auth/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString(),
    })
    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.detail || "Login failed.");
    }
    const data = await res.json();
    localStorage.setItem("token", data.access_token)
    console.log(data);
    return data;
}

export const fetchChatResponse = async (query: string, file_name: string | null) => {
    const token = localStorage.getItem("token");
    const res = await fetch("http://127.0.0.1:8000/chat/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ query, file_name }),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.detail || "Failed to fetch chat response");
    }
    return res.json();
};

export const uploadDocument = async (file: File) => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("http://127.0.0.1:8000/upload/", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: formData,
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.detail || "Failed to Upload a file");
    }
    return res.json();
};

export const fetchUserDocuments = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("http://127.0.0.1:8000/documents/", {
        headers: {
            "Authorization": `Bearer ${token}`
        },
    });
    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.detail || "Failed to fetch documents");
    }
    return res.json();
};


export const signupHandler = async (formData: {}) => {
    console.log(formData);

    const res = await fetch("http://127.0.0.1:8000/account/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.detail || "Registration failed.");
    }
    const data = await res.json();
    console.log(data);
    return data;
}

export const store_chat_messages_on_the_backend = async (data: {}) => {
    console.log(data);

    const token = localStorage.getItem("token");

    const res = await fetch("http://127.0.0.1:8000/messages", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.detail || "Failed to Store Messages");
    }
    return res.json();

}

export const createChatSession = async (data: {}) => {
    const token = localStorage.getItem("token");
    const res = await fetch("http://127.0.0.1:8000/chat-session", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.detail || "Failed to create chat session.");
    }
    return res.json();
}


export const getChatHistories = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("http://127.0.0.1:8000/chat-histories", {
        headers: {
            "Authorization": `Bearer ${token}`
        },
    });
    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.detail || "Failed to fetch chat session.");
    }
    return res.json();
}


export const getChatHistoryMessages = async (chatId: string) => {
    const token = localStorage.getItem("token");
    console.log("Chat MEssages");
    
    const res = await fetch(`http://127.0.0.1:8000/${chatId}/messages`, {
        headers: {
            "Authorization": `Bearer ${token}`
        },
    });
    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.detail || "Failed to fetch chat history messages.");
    }
    return res.json();
}
