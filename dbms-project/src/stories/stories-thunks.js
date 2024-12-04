import {createAsyncThunk} from "@reduxjs/toolkit";
import {
    createPrompt,
    getPromptById,
    getAllPrompts,
    createPassage,
    getPassageById,
    publishStory,
    deleteStory,
    getAllStories,
    getStoryMetadata,
    getStoryPassages
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

export const createPassageThunk = createAsyncThunk(
    'createPassage',
    async (passage) => await createPassage(passage)
)

export const getPassageByIdThunk = createAsyncThunk(
    'getPassageById',
    async (passageId) => await getPassageById(passageId)
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
    'getStoryMetagata',
    async (storyId) => await getStoryMetadata(storyId)
)

export const getStoryPassagesThunk = createAsyncThunk(
    'getStoryPassages',
    async (storyId) => await getStoryPassages(storyId)
)




