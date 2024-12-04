import { createSlice } from "@reduxjs/toolkit";
import { getStoryCommentsThunk, updateCommentThunk } from "./comment-thunks";


const commentSlice = createSlice({
                                  name: "comments",
                                  initialState: {comments: []},
                                  reducers: {
                                  },
                                  extraReducers: (builder) => {
                                    builder
                                      .addCase(getStoryCommentsThunk.fulfilled, (state, { payload }) => {
                                        state.comments = payload
                                      });  
                                  }
                              });
export default commentSlice.reducer;