import {createAsyncThunk} from "@reduxjs/toolkit";
import {
    createReview,
    deleteReview, findAllReviews,
    findReview,
    findReviewsFromTrailID, findReviewsFromUsername,
    updateReview
} from "./review-service.js";


export const createReviewThunk = createAsyncThunk(
    'createReview',
    async (review) => await createReview(review)
)

export const findReviewThunk = createAsyncThunk(
    'findReview',
    async (reviewID) => await findReview(reviewID)
)

export const updateReviewThunk = createAsyncThunk(
    'updateReview',
    async (review) => await updateReview(review)
)

export const deleteReviewThunk = createAsyncThunk(
    'deleteReview',
    async (reviewID) => await deleteReview(reviewID)
)

export const findReviewsFromTrailIDThunk = createAsyncThunk(
    'findReviewsFromTrailID',
    async (trailID) => await findReviewsFromTrailID(trailID)
)

export const findReviewsFromUsernameThunk = createAsyncThunk(
    'findReviewsFromUsername',
    async (username) => await findReviewsFromUsername(username)
)

export const findAllReviewsThunk = createAsyncThunk(
    'findAllReviews',
    async () => await findAllReviews()
)


