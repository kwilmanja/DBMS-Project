import {createAsyncThunk} from "@reduxjs/toolkit";
import * as authService from "./auth-service";

export const loginThunk = createAsyncThunk(
    "auth/login", async (credentials) => {
        return await authService.login(credentials);
    }
);

export const profileThunk = createAsyncThunk(
    "auth/profile", async () => {
        return await authService.profile();
    });


export const logoutThunk = createAsyncThunk(
    "auth/logout", async () => {
        return await authService.logout();
    });


export const updateUserThunk = createAsyncThunk(
    "auth/updateUser", async (user) => {
        await authService.updateUser(user);
        return user;
    });

export const registerThunk = createAsyncThunk(
    "auth/register", async (credentials) => {
        return await authService.register(credentials);
    }
);

export const findUserByUsernameThunk = createAsyncThunk(
    "users/findUserByUsername", async (username) => {
        return await authService.findUserByUsername(username);
    }
);

export const findAllUsersThunk = createAsyncThunk(
    "users/findAllUsers", async () => {
        return await authService.findAllUsers();
    }
);

