import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPrivate } from '../../../util/axios'

export const userSignUp = createAsyncThunk(
    "user/userSignUp",
    async (userData, { rejectWithValue }) => {
        const { email, password } = userData;
        const data = JSON.stringify({ email, password });
        try {
            const response = await axiosPrivate.post("users/signup", data);
            return response.data;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.response.data.error);
        }
    }
);