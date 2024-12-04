import {createAsyncThunk} from "@reduxjs/toolkit";
import * as commentsService from "./comments-service";


export const getStoryCommentsThunk = createAsyncThunk(
    "getStoryComments", async (storyId) => {
        return await commentsService.getStoryComments(storyId);
    });

export const createCommentThunk = createAsyncThunk(
    "createComment", async (comment) => {
        return await commentsService.createComment(comment);
    });

export const updateCommentThunk = createAsyncThunk(
    "updateComment", async (comment) => {
        return await commentsService.updateComment(comment);
    });

export const deleteCommentThunk = createAsyncThunk(
    "deleteCommentThunk", async (commentId) => {
        return await commentsService.deleteComment(commentId);
    });

export const createLikeThunk = createAsyncThunk(
    "createLike", async (storyId) => {
        return await commentsService.createLike(storyId);
    });

export const deleteLikeThunk = createAsyncThunk(
    "deleteLike", async (storyId) => {
        return await commentsService.deleteLike(storyId);
    });
