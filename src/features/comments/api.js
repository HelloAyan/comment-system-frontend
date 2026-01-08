import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/comments";

const getAuthConfig = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

export const fetchCommentsAPI = async (page = 1, limit = 10, sort = "newest") => {
    const res = await axios.get(`${API_URL}?page=${page}&limit=${limit}&sort=${sort}`);
    return res.data.comments;
};

export const addCommentAPI = async (text) => {
    const res = await axios.post(API_URL, { text }, getAuthConfig());
    return res.data;
};

export const deleteCommentAPI = async (id) => {
    const res = await axios.delete(`${API_URL}/${id}`, getAuthConfig());
    return res.data;
};

export const likeCommentAPI = async (id) => {
    const res = await axios.post(`${API_URL}/${id}/like`, {}, getAuthConfig());
    return res.data;
};

export const dislikeCommentAPI = async (id) => {
    const res = await axios.post(`${API_URL}/${id}/dislike`, {}, getAuthConfig());
    return res.data;
};
