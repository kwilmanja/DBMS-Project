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
    getStoryPassagesThunk,
    getNextPassagesThunk
} from "./stories-thunks.js";


const storiesSlice = createSlice({
    name: "stories",
    initialState: {prompt: {}, nextPassages: []},
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getPromptByIdThunk.fulfilled, (state, { payload }) => {
          state.prompt = payload;
          state.prompt.text = state.prompt.description;
        })
        .addCase(getNextPassagesThunk.fulfilled, (state, { payload }) => {
          state.nextPassages = payload;
        })
        ;
    }
});
export default storiesSlice.reducer;
