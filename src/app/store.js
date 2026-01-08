import { configureStore } from "@reduxjs/toolkit";
import commentReducer from "../features/comments/commentSlice";

export const store = configureStore({
    reducer: {
        comments: commentReducer,
    },
});
