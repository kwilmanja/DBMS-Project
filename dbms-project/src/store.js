import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./users/auth-reducer.js";
import followsReducer from "./follows/follows-reducer.js";
import reviewsReducer from "./reviews/review-reducer.js";
import trailsReducer from "./trails/trail-reducer.js";

const store = configureStore({
                                 reducer: {
                                     auth: authReducer,
                                     follows: followsReducer,
                                     reviews: reviewsReducer,
                                     trails: trailsReducer,
                                 },
                             });
export default store;