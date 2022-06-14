import { createSlice } from "@reduxjs/toolkit";

const testSlice = createSlice({
    name: "test",
    initialState: { data: null, status: "idle" },
    reducers: {
        setData: (state, action) => {
            state.data = action.payload;
        },
        resetData: (state, action) => {
            state.data = null;
        },
    },
    // extraReducers(builder) {
    //     builder
    //         .addCase(test.fulfilled, (state, action) => {
    //             debugger
    //             state.data = action.payload;
    //             state.status = "succeeded";
    //         })
    //         .addCase(test.rejected, (state, action) => {
    //             debugger
    //             state.data = null;
    //             state.status = "failed";
    //         })

    // }
});

export const { setData, resetData } = testSlice.actions;
export default testSlice.reducer;

export const currentUser = (state) => state.auth.user;
export const currentToken = (state) => state.auth.token;
