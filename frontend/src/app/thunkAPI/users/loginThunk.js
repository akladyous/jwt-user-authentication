import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPrivate } from '../../../util/axios'
import { setToken } from "../../../features/token/tokenSlice.js";


export const userLogin = createAsyncThunk(
    "user/userLogin",
    async (userData, thunkAPI) => {
        const { email, password } = userData;
        const data = JSON.stringify({ email, password })
        try {
            const response = await axiosPrivate.post("users/signin", data);
            thunkAPI.dispatch(setToken(response.data));
            return response.data;
        } catch (error) {
            // localStorage.removeItem('state')
            if (!error.response) {
                throw error;
            }

            return thunkAPI.rejectWithValue(error.response.data.error);
        }
    },
);