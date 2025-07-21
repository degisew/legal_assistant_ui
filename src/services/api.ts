export const fetchChatResponse = async (query: string, file_name: string | null) => {
    const res = await fetch("http://127.0.0.1:8000/chat/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, file_name }),
    });

    if (!res.ok) throw new Error("Failed to fetch chat response");
    return res.json();
};

export const uploadDocument = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("http://127.0.0.1:8000/upload/", {
        method: "POST",
        body: formData,
    });

    if (!res.ok) throw new Error("Failed to upload file");
    return res.json();
};

export const fetchUserDocuments = async () => {
    const res = await fetch("http://127.0.0.1:8000/documents/");
    if (!res.ok) throw new Error("Failed to fetch documents");
    return res.json();
};
