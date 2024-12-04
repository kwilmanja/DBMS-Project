import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./users/auth-reducer.js";
import storiesReducer from "./stories/stories-reducer.js";

const store = configureStore({
                                 reducer: {
                                     auth: authReducer,
                                     stories: storiesReducer,
                                 },
                             });
export default store;