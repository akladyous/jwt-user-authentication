import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPrivate } from "../../../util/axios.js";
import { verifyJWT } from '../../../util/verifyJWT';
import { refreshToken } from "../../../app/thunkAPI/tokenThunkAPI.jsx";

export const testAction = createAsyncThunk(
    "testAction", 
    async (args, thunkAPI) => {
    
    let token = thunkAPI.getState().token.token;
    try {
        const decoded = verifyJWT(token)
        if (!decoded) {
            const response = await thunkAPI.dispatch(refreshToken());
            token = response.payload;
        } 
        const response = await axiosPrivate.get("/test", { headers: { Authorization: `Bearer ${token}` } });
        console.log('response   : ', response.data)
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        if (error.response) {
            return thunkAPI.rejectWithValue(error.response.data, error.response.status);
        }
        return thunkAPI.rejectWithValue(error);
    }
});