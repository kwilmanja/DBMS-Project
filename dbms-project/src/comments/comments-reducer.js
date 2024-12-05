import { createSlice } from "@reduxjs/toolkit";
import {
  getStoryCommentsThunk,
  updateCommentThunk,
  getStoryLikesThunk,
  createLikeThunk,
  deleteLikeThunk
} from "./comment-thunks";
import { deleteLike } from "./comments-service";


const commentSlice = createSlice({
  name: "comments",
  initialState: { comments: [] },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStoryCommentsThunk.fulfilled, (state, { payload }) => {
        state.comments = payload
      });
  }
});

const likesSlice = createSlice({
  name: "likes",
  initialState: { likes: [] },
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(getStoryLikesThunk.fulfilled, (state, { payload }) => {
        state.likes = payload;
      });
  }
});

export const commentsReducer = commentSlice.reducer;
export const likesReducer = likesSlice.reducer;