import { createSlice } from "@reduxjs/toolkit";
import { refreshToken } from "../../app/thunkAPI/tokenThunkAPI.jsx";
import { testAction } from '../../app/thunkAPI/test/testAction.js'


export const initialState = {
    token: null,
    status: "idle", // idle | loading | succeeded | failed
}

export const tokenSlice = createSlice({
    name: "token",
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.status = "fulfilled";
            state.token = action.payload;
        },
        resetState: (state) => {
            state.status = "idle"
            return { ...initialState };
        },
        // testAction: (state, action) => {
        //     console.log('testAction payload ', action.payload);
        // }
    },
    extraReducers(builder) {
        builder
        .addCase(refreshToken.pending, (state, action) =>{
            state.status = "pending";
            state.token = action.payload;
        })
        .addCase(refreshToken.fulfilled, (state, action) => {
            state.token = action.payload;
            state.status = "fulfilled";
        })
        .addCase(refreshToken.rejected, (state, action) => {
            state.status = "rejected";
            state.token = null;
        })
        .addCase(testAction.pending, (state, action) =>{
            state.status = "pending";
        })
        .addCase(testAction.fulfilled, (state, action) => {
            state.status = "fulfilled";
            // console.log('accessToken.fulfilled : ', action.payload);
        })
        .addCase(testAction.rejected, (state, action) => {
            state.status = "rejected";
            // console.log('tokenSlice -> accessToken.rejected : ', action.payload);
        })
    }
});

export default tokenSlice.reducer;
export const tokenState = (state) => state.token;
export const { setToken, resetState } =tokenSlice.actions;
