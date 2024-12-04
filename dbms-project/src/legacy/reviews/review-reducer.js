import { createSlice } from "@reduxjs/toolkit";
import {
    createReviewThunk,
    deleteReviewThunk,
    findAllReviewsThunk,
    findReviewsFromTrailIDThunk,
    findReviewsFromUsernameThunk,
    findReviewThunk,
    updateReviewThunk
} from "./review-thunks.js";


const reviewSlice = createSlice({
                                  name: "reviews",
                                  initialState: {listedReviews: [], singleReview: null },
                                  reducers: {
                                      [createReviewThunk.fulfilled]: (state, { payload }) => {
                                          state.listedReviews.unshift(payload);
                                      },
                                      [findReviewThunk.fulfilled]: (state, { payload }) => {
                                          state.singleReview = payload;
                                      },
                                      [updateReviewThunk.fulfilled]: (state, { payload }) => {
                                          console.log(payload);
                                          state.listedReviews = state.listedReviews.map(
                                              (review) => {
                                                  if(review._id === payload._id){
                                                      return payload;
                                                  } else{
                                                      return review;
                                                  }
                                              }
                                          );
                                      },
                                      [deleteReviewThunk.fulfilled]: (state, { payload }) => {
                                          state.listedReviews = state.listedReviews.filter(
                                              review => review._id !== payload
                                          );
                                      },
                                      [findReviewsFromTrailIDThunk.fulfilled]: (state, { payload }) => {
                                          state.listedReviews = payload.reverse();
                                      },
                                      [findReviewsFromUsernameThunk.fulfilled]: (state, { payload }) => {
                                          state.listedReviews = payload;
                                      },
                                      [findAllReviewsThunk.fulfilled]: (state, { payload }) => {
                                          state.listedReviews = payload;
                                      },



                                  },
                              });
export default reviewSlice.reducer;