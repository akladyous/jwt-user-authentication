import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const userLogin = createAsyncThunk(
    "user/userLogin",
    async (userData, { rejectWithValue }) => {

        const { email, password } = userData;
        const config = {
            method: "post",
            url: "http://localhost:4000/api/users/signin",
            headers: { "Content-type": "application/json" },
            data: JSON.stringify({ email, password }),
            withCredentials: true,
        };
        try {
            const response = await axios(config);
            return response.data;
        } catch (error) {
            console.log("error from axios : ", error);
            return rejectWithValue(error.response.data.error);
        }
    }
);

export const userSignUp = createAsyncThunk(
    "user/userSignUp",
    async (userData, { rejectWithValue }) => {
        // console.log("thunkAPI : ", thunkAPI);
        const { email, password } = userData;
        const config = {
            method: "post",
            url: "http://localhost:4000/api/users/signup",
            headers: { "Content-type": "application/json" },
            data: JSON.stringify({ email, password }),
            withCredentials: true,
        };
        try {
            const response = await axios(config);
            // console.log("response from axios : ", response);
            return response.data;
        } catch (error) {
            console.log("error from axios : ", error);
            // throw new Error(error.response.data.error);
            // thunkAPI.rejectWithValue('test value')
            return rejectWithValue(error.response.data.error);
        }
    }
);

export const userSignOut = createAsyncThunk("user/userSignOut", async () => {
    try {
        // await signOut('auth');
    } catch (error) {
        // throw new Error(handleErrors(error));
    }
});
