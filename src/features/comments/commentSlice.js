import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "./api";

// Async thunks
export const fetchComments = createAsyncThunk(
    "comments/fetchComments",
    async (params, { rejectWithValue }) => {
        try {
            return await api.fetchCommentsAPI(params?.page, params?.limit, params?.sort);
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

export const addComment = createAsyncThunk(
    "comments/addComment",
    async (text, { rejectWithValue }) => {
        try {
            return await api.addCommentAPI(text);
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

export const deleteComment = createAsyncThunk(
    "comments/deleteComment",
    async (id, { rejectWithValue }) => {
        try {
            await api.deleteCommentAPI(id);
            return id;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

export const likeComment = createAsyncThunk(
    "comments/likeComment",
    async (id, { rejectWithValue }) => {
        try {
            return await api.likeCommentAPI(id);
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

export const dislikeComment = createAsyncThunk(
    "comments/dislikeComment",
    async (id, { rejectWithValue }) => {
        try {
            return await api.dislikeCommentAPI(id);
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

const commentSlice = createSlice({
    name: "comments",
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchComments.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(fetchComments.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
            .addCase(fetchComments.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
            .addCase(addComment.fulfilled, (state, action) => { state.items.unshift(action.payload); })
            .addCase(deleteComment.fulfilled, (state, action) => { state.items = state.items.filter(c => c._id !== action.payload); })
            .addCase(likeComment.fulfilled, (state, action) => {
                const index = state.items.findIndex(c => c._id === action.payload._id);
                if (index !== -1) state.items[index] = action.payload;
            })
            .addCase(dislikeComment.fulfilled, (state, action) => {
                const index = state.items.findIndex(c => c._id === action.payload._id);
                if (index !== -1) state.items[index] = action.payload;
            });
    },
});

export default commentSlice.reducer;
