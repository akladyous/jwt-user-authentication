import { axiosPrivate } from '../../../util/axios'
import { createAsyncThunk } from "@reduxjs/toolkit";
import { resetState } from '../../../features/token/tokenSlice.js';

export const userSignOut = createAsyncThunk(
    "user/userSignOut",
    async (args, thunkAPI) => {
        try {
            const response = await axiosPrivate.delete("users/signout");
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


