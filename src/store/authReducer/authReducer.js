import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authServices from '../../services/authServices';

const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    isLoading: false,
    error: null,
};

export const login = createAsyncThunk(
    "authentication/auth/login",
    async (values, { rejectWithValue }) => {
        try {
            const data = await authServices.login(values);
            localStorage.setItem("user", JSON.stringify(data));
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const registers = createAsyncThunk(
    "authentication/auth/register",
    async (values, { rejectWithValue }) => {
        try {
            const data = await authServices.registers(values);
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const authReducer = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem("user");
            state.user = null;

        },
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, { payload }) => {
            state.user = payload;
        });
    },
});

export const { logout } = authReducer.actions;

export default authReducer.reducer;
