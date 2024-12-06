import axios from "axios";

const COMMENTS_URL = process.env.REACT_APP_API_URL + `/comments`;
const LIKES_URL = process.env.REACT_APP_API_URL + `/likes`

const api = axios.create({ withCredentials: true });

export const getStoryComments = async (storyId) => {
    const response = await api.get(`${COMMENTS_URL}/${storyId}`);
    return response.data;
};

export const createComment = async (comment) => {
    const response = await api.post(`${COMMENTS_URL}/create`, comment);
    return response.data;
};

export const updateComment = async (comment) => {
    const response = await api.put(`${COMMENTS_URL}/update`, comment);
    return response.data;
};

export const deleteComment = async (commentId) => {
    const response = await api.delete(`${COMMENTS_URL}/delete/${commentId}`);
    return response.data;
};

export const getStoryLikes = async (storyId) => {
    const response = await api.get(`${LIKES_URL}/${storyId}`)
    return response.data;
}

export const createLike = async (storyId) => {
    const response = await api.post(`${LIKES_URL}/create/${storyId}`);
    return response.data;
};

export const deleteLike = async (storyId) => {
    const response = await api.delete(`${LIKES_URL}/delete/${storyId}`);
    return response.data;
};
