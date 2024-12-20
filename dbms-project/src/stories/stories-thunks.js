import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    createPrompt,
    getPromptById,
    getAllPrompts,
    getAllGenres,
    createPassage,
    getPassageById,
    publishStory,
    deleteStory,
    getAllStories,
    getStoryMetadata,
    getStoryPassages,
    getAllStoriesByPromptId,
    getNextPassages,
    getAllThemes
} from "./stories-service.js";


export const createPromptThunk = createAsyncThunk(
    'createPrompt',
    async (prompt) => await createPrompt(prompt)
)

export const getPromptByIdThunk = createAsyncThunk(
    'getPromptById',
    async (promptId) => await getPromptById(promptId)
)

export const getAllPromptsThunk = createAsyncThunk(
    'getAllPrompts',
    async () => await getAllPrompts()
)

export const getAllGenresThunk = createAsyncThunk(
    'getAllGenres',
    async () => await getAllGenres()
)

export const createPassageThunk = createAsyncThunk(
    'createPassage',
    async (passage) => await createPassage(passage)
)

export const getPassageByIdThunk = createAsyncThunk(
    'getPassageById',
    async (passageId) => await getPassageById(passageId)
)

export const getNextPassagesThunk = createAsyncThunk(
    'getNextPassages',
    async (body) => await getNextPassages(body)
)

export const publishStoryThunk = createAsyncThunk(
    'publishStory',
    async (story) => await publishStory(story)
)

export const deleteStoryThunk = createAsyncThunk(
    'deleteStory',
    async (storyId) => await deleteStory(storyId)
)

export const getAllStoriesThunk = createAsyncThunk(
    'getAllStories',
    async () => await getAllStories()
)

export const getStoryMetadataThunk = createAsyncThunk(
    'getStoryMetadata',
    async (storyId) => await getStoryMetadata(storyId)
)

export const getStoryPassagesThunk = createAsyncThunk(
    'getStoryPassages',
    async (storyId) => await getStoryPassages(storyId)
)

export const getAllStoriesByPromptIdThunk = createAsyncThunk(
    'getAllStoriesByPromptId',
    async (promptId) => await getAllStoriesByPromptId(promptId)
)

export const getAllThemesThunk = createAsyncThunk(
    'getAllThemes',
    async () => await getAllThemes()
)

