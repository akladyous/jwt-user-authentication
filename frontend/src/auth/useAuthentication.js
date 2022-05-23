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
            localStorage.setItem("token", response.data);
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
            localStorage.setItem("token", response.data);
            return response.data;
        } catch (error) {
            console.log("error from axios : ", error);
            // throw new Error(error.response.data.error);
            // thunkAPI.rejectWithValue('test value')
            return rejectWithValue(error.response.data.error);
        }
    }
);

export const userSignOut = createAsyncThunk(
    "user/userSignOut",
    async (_, { rejectWithValue }) => {
        const config = {
            method: "delete",
            url: "http://localhost:4000/api/users/signout",
            headers: { "Content-type": "application/json" },
            withCredentials: true,
        };
        try {
            const response = await axios(config);
            localStorage.removeItem("token");
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const setToken = createAsyncThunk(
    'user/setToken',
    (_token, { rejectWithValue}) => {
        try {
            localStorage.setItem(_token);
            return _token
        } catch (err) {
            // throw new Error('token error')
            return rejectWithValue(err)
        }
    }
);
export const getToken = createAsyncThunk(
    'user/getToken',
    ( { rejectWithValue }) =>{
        try {
            const token = localStorage.getItem('token')
            return token
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);


