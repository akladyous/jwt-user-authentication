import { axiosPrivate} from "../api/axios.js";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setToken, resetState } from "../features/token/tokenSlice.js";

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
    }, {
        type: "api",
        test: "test"
    }
);

export const userSignUp = createAsyncThunk(
    "user/userSignUp",
    async (userData, { rejectWithValue }) => {
        const { email, password } = userData;
        const data = JSON.stringify({ email, password });
        try {
            const response = await axiosPrivate.post("users/signup", data);
            // localStorage.setItem("token", response.data);
            return response.data;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            // console.log("error from axios : ", error);
            // throw new Error(error.response.data.error);
            // thunkAPI.rejectWithValue('test value')
            return rejectWithValue(error.response.data.error);
        }
    }
);

export const userSignOut = createAsyncThunk(
    "user/userSignOut",
    async (args, thunkAPI) => {
        try {
            const response = await axiosPrivate.delete("users/signout");
            // localStorage.removeItem("state");
            thunkAPI.dispatch(resetState());
            return response.data;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);


