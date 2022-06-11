import { createSlice } from "@reduxjs/toolkit";
import { refreshToken } from './thunks/refreshToken.js'
import { testAction } from "./thunks/testAction.js";

export const initialState = {
    token: null,
    status: false,
}

export const tokenSlice = createSlice({
    name: "token",
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.status = true;
            state.token = action.payload;
        },
        resetState: () => {
            return { ...initialState };
        },
        testAction: (state, action) => {
            console.log('testAction payload ', action.payload);
        }
    },
    extraReducers(builder) {
        builder
        .addCase(refreshToken.fulfilled, (state, action) => {
            state.token = action.payload;
            state.status = "succeeded";
        })
        .addCase(refreshToken.rejected, (state, action) => {
            // return { ...initialState, error:  { message: action.payload} };
            state.status = false;
            state.token = null;
        })
            .addCase(testAction.fulfilled, (state, action) => {
            console.log('accessToken.fulfilled : ', action.payload);
        })
        .addCase(testAction.rejected, (state, action) => {
            // console.log('tokenSlice -> accessToken.rejected : ', action.payload);
        })
    }
});

export default tokenSlice.reducer;
export const tokenState = (state) => state;
export const { setToken, resetState } =tokenSlice.actions;
