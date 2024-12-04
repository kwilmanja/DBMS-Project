import { createSlice } from "@reduxjs/toolkit";
import {
    loginThunk, logoutThunk, registerThunk,
    profileThunk, updateUserThunk, findUserByUsernameThunk,
} from "./auth-thunks.js";




const authSlice = createSlice({
                                  name: "auth",
                                  initialState: { currentUser: null },
                                  reducers: {
                                  },
                                  extraReducers: (builder) => {
                                    builder
                                      .addCase(loginThunk.fulfilled, (state, { payload }) => {
                                        state.currentUser = payload
                                      })
                                      .addCase(logoutThunk.fulfilled, (state) => {
                                        state.currentUser = null
                                      })
                                      .addCase(profileThunk.fulfilled, (state, { payload }) => {
                                        state.currentUser = payload
                                      })
                                      .addCase(profileThunk.rejected, (state) => {
                                        state.currentUser = null
                                      })
                                      .addCase(updateUserThunk.fulfilled, (state, { payload }) => {
                                        state.currentUser = payload
                                      });                                      ;
                                  }
                              });
export default authSlice.reducer;