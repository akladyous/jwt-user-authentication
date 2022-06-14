import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPrivate } from '../../../util/axios'

export const refreshToken = createAsyncThunk(
    "refreshToken",
    async (args, thunkAPI) => {
        try {
            const response = await axiosPrivate.get("/refresh");
            return await response.data;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return thunkAPI.rejectWithValue(error.response.data.error);
        }
    }, {
        type: 'api'
    }
);
