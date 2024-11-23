import { createSlice } from "@reduxjs/toolkit";
import {
    loginThunk, logoutThunk, registerThunk,
    profileThunk, updateUserThunk, findUserByUsernameThunk,
} from "./auth-thunks.js";




const authSlice = createSlice({
                                  name: "auth",
                                  initialState: { currentUser: null },
                                  reducers: {
                                      [loginThunk.fulfilled]: (state, { payload }) => {
                                          state.currentUser = payload;
                                      },
                                      [logoutThunk.fulfilled]: (state) => {
                                          state.currentUser = null;
                                      },
                                      [profileThunk.fulfilled]: (state, { payload }) => {
                                          state.currentUser = payload;
                                      },
                                      [profileThunk.rejected]: (state, { payload }) => {
                                          state.currentUser = null;
                                      },
                                      [updateUserThunk.fulfilled]: (state, { payload }) => {
                                          state.currentUser = payload;
                                      },
                                      [registerThunk.fulfilled]: (state, { payload }) => {
                                          state.currentUser = payload;
                                      },


                                  },
                              });
export default authSlice.reducer;