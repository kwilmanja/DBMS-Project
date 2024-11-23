import {createAsyncThunk} from "@reduxjs/toolkit";
import {
    findFollow,
    findFollowed,
    findFollower,
    followUser,
    unfollowUser
} from "./follows-service.js";

export const followUserThunk = createAsyncThunk(
    'followUser',
    async (username) => await followUser(username)
)

export const unfollowUserThunk = createAsyncThunk(
    'unfollowUser',
    async (username) => await unfollowUser(username)
)

export const findFollowerThunk = createAsyncThunk(
    'findFollower',
    async (username) => await findFollower(username)
)

export const findFollowedThunk = createAsyncThunk(
    'findFollowed',
    async (username) => await findFollowed(username)
)

// export const findFollowThunk = createAsyncThunk(
//     'findFollow',
//     async (follower, followed) =>
//         await findFollow(follower, followed)
// )