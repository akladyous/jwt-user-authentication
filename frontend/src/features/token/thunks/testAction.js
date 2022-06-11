import { createAsyncThunk } from "@reduxjs/toolkit";
import { requestInterceptor } from "../../../api/requestInterceptor.js";

export const testAction = createAsyncThunk(
    "testAction", 
    async (args, thunkAPI) => {
    const accessToken = thunkAPI.getState().token.token;
        try {
        const response = await requestInterceptor(accessToken).get("/test");
        // console.log('testAction thunk response : ', response.data)
        return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
        
        return thunkAPI.rejectWithValue(error);
    }


})