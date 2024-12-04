import axios from "axios";

const REVIEWS_API = 'http://localhost:4000/api/reviews';

const api = axios.create({withCredentials: true});

export const createReview = async (review) => {
    const response = await api.post(`${REVIEWS_API}/create`, review);
    return response.data;
}

export const findReview = async (reviewID) => {
    const response = await api.post(`${REVIEWS_API}/${reviewID}`);
    return response.data;
}

export const updateReview = async (review) => {
    const response = await api.put(`${REVIEWS_API}/update`, review);
    return response.data;
}

export const deleteReview = async (reviewID) => {
    const response = await api.delete(`${REVIEWS_API}/${reviewID}`);
    return response.data;
}

export const findReviewsFromTrailID = async (trailID) => {
    const response = await api.post(`${REVIEWS_API}/trail/${trailID}`);
    return response.data;
}

export const findReviewsFromUsername = async (username) => {
    const response = await api.post(`${REVIEWS_API}/user/${username}`);
    return response.data;
}

export const findAllReviews = async () => {
    const response = await api.get(`${REVIEWS_API}/all`);
    return response.data;
}


