import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginAPI, registerAPI } from "./authAPI";
import toast from "react-hot-toast";

// ------------------- Thunks -------------------

// Login
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const data = await loginAPI(email, password);
            toast.success("Login successful!");
            return data;
        } catch (err) {
            toast.error(err.response?.data?.message || "Login failed");
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

// Register
export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async ({ name, email, password }, { rejectWithValue }) => {
        try {
            const data = await registerAPI(name, email, password);
            toast.success("Account created successfully!");
            return data;
        } catch (err) {
            toast.error(err.response?.data?.message || "Registration failed");
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

// ------------------- Initial State -------------------

const initialState = {
    user: (() => {
        try {
            const stored = localStorage.getItem("user");
            return stored ? JSON.parse(stored) : null;
        } catch {
            return null;
        }
    })(),
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
};

// ------------------- Slice -------------------

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            toast.success("Logged out successfully!");
        },
    },
    extraReducers: (builder) => {
        builder
            // -------- Login --------
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;

                // Ensure plain object
                const plainUser = JSON.parse(JSON.stringify(action.payload.user));
                state.user = plainUser;
                state.token = action.payload.token;

                // Save safely in localStorage
                localStorage.setItem("token", action.payload.token);
                localStorage.setItem("user", JSON.stringify(plainUser));
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // -------- Register --------
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;

                // Ensure plain object
                const plainUser = JSON.parse(JSON.stringify(action.payload.user));
                state.user = plainUser;
                state.token = action.payload.token;

                localStorage.setItem("token", action.payload.token);
                localStorage.setItem("user", JSON.stringify(plainUser));
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
