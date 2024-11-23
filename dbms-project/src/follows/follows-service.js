import axios from "axios";

const FOLLOWS_API = 'http://localhost:4000/api/follows';

const api = axios.create({withCredentials: true});

export const followUser = async (followedUsername) => {
    const response = await api.post(`${FOLLOWS_API}/${followedUsername}`);
    return response.data;
}

export const unfollowUser = async (unfollowedUsername) => {
    const response = await api.delete(`${FOLLOWS_API}/${unfollowedUsername}`);
    return response.data;
}

export const findFollower = async (username) => {
    const response = await api.post(`${FOLLOWS_API}/follower/${username}`);
    return response.data;
}

export const findFollowed = async (username) => {
    const response = await api.post(`${FOLLOWS_API}/followed/${username}`);
    return response.data;
}

// export const findFollow = async (follower, followed) => {
//     const response = await api.post(`${FOLLOWS_API}/follow`, {
//         follower: follower,
//         followed: followed
//     });
//     return response.data;
// };

