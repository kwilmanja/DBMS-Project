import axios from "axios";

const PROMPT_API = process.env.REACT_APP_API_URL + `/prompt`;
const PASSAGE_API = process.env.REACT_APP_API_URL + `/passage`;
const STORY_API = process.env.REACT_APP_API_URL + `/story`;
 
const api = axios.create({ withCredentials: true });

export const createPrompt = async (prompt) => {
    const response = await api.post(`${PROMPT_API}/create`, prompt);
    return response.data;
}

export const getPromptById = async (promptId) => {
    const response = await api.get(`${PROMPT_API}/info/${promptId}`);
    return response.data;
}

export const getAllPrompts = async () => {
    const response = await api.get(`${PROMPT_API}/all`);
    return response.data;
}

export const getAllGenres = async () => {
    const response = await api.get(`${PROMPT_API}/genres`);
    return response.data;
}

export const createPassage = async (passage) => {
    const response = await api.post(`${PASSAGE_API}/create`, passage);
    return response.data;
}

export const getPassageById = async (passageId) => {
    const response = await api.get(`${PASSAGE_API}/info/${passageId}`);
    return response.data;
}

export const getNextPassages = async (body) => {
    const response = await api.post(`${PASSAGE_API}/next`, body);
    return response.data;
}

export const publishStory = async (story) => {
    const response = await api.post(`${STORY_API}/publish`, story);
    return response.data;
}

export const deleteStory = async (storyId) => {
    const response = await api.delete(`${STORY_API}/delete/${storyId}`);
    return response.data;
}

export const getAllStories = async () => {
    const response = await api.get(`${STORY_API}/all`);
    return response.data;
}

export const getStoryMetadata = async (storyId) => {
    const response = await api.get(`${STORY_API}/info/metadata/${storyId}`);
    return response.data;
}

export const getStoryPassages = async (storyId) => {
    const response = await api.get(`${STORY_API}/info/passages/${storyId}`);
    return response.data;
}

export const getAllStoriesByPromptId = async (promptId) => {
    const response = await api.get(`${STORY_API}/all/prompt/${promptId}`);
    return response.data;
}

export const getAllThemes = async () => {
    const response = await api.get(`${STORY_API}/themes`);
    return response.data;
}