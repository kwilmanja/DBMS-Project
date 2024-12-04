import {findFollowedThunk, findFollowerThunk, unfollowUserThunk, followUserThunk,
    findFollowThunk} from "./follows-thunks.js";
import { createSlice } from "@reduxjs/toolkit";


const followsSlice = createSlice({
        name: 'follows',
        initialState: {
            currentFollower: [],
            currentFollowed: []
        },
        reducers: {
            [followUserThunk.fulfilled]: (state, {payload}) => {
                console.log(payload);
                state.currentFollowed.push(payload);
            },
            [unfollowUserThunk.fulfilled]: (state, {payload}) => {
                state.currentFollowed = state.currentFollowed.filter((person) => person !== payload);
            },
            [findFollowerThunk.fulfilled]: (state, {payload}) => {
                const followerNames = payload.map((user) => user.follower);
                state.currentFollower = (followerNames);
            },
            [findFollowedThunk.fulfilled]: (state, {payload}) => {
                const followedNames = payload.map((user) => user.followed);
                state.currentFollowed = (followedNames);
            },
            // [findFollowThunk.fulfilled]: (state, {payload}) => {},
        }
    });

export default followsSlice.reducer;