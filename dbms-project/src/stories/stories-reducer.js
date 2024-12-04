import { createSlice } from "@reduxjs/toolkit";
import {
    createPromptThunk,
    getPromptByIdThunk,
    getAllPromptsThunk,
    createPassageThunk,
    getPassageByIdThunk,
    publishStoryThunk,
    deleteStoryThunk,
    getAllStoriesThunk,
    getStoryMetadataThunk,
    getStoryPassagesThunk
} from "./stories-thunks.js";


const storiesSlice = createSlice({
    name: "stories",
    initialState: { },
    reducers: {},
    extraReducers: (builder) => {
    //   builder
    //     .addCase(loginThunk.fulfilled, (state, { payload }) => {
    //       state.currentUser = payload
    //     });
    }
});
export default storiesSlice.reducer;