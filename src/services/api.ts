// ! Just for test
const token = "" 

export const fetchChatResponse = async (query: string, file_name: string | null) => {
    const res = await fetch("http://127.0.0.1:8000/chat/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
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
        headers: {
            "Authorization": `Bearer ${token}`
          },
        body: formData,
    });

    if (!res.ok) throw new Error("Failed to upload file");
       
    return res.json();
};

export const fetchUserDocuments = async () => {
    const res = await fetch("http://127.0.0.1:8000/documents/", {
        headers: {
            "Authorization": `Bearer ${token}`
        },
    });
    if (!res.ok) throw new Error("Failed to fetch documents");
    return res.json();
};
