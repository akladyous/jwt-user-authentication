import {
    createSlice,
    isPending,
    isRejected,
    isFulfilled,
} from "@reduxjs/toolkit";
import {
    userLogin,
    userSignOut,
    userSignUp,
} from "../../auth/useAuthentication.js";

const initialState = {
    isAuthenticated: false,
    user: null,
    status: "idle", // idle | loading | succeeded | failed
    error: {},
    message: "",
    token: localStorage.getItem('token') || null
};

const isPendingAction = isPending(userLogin, userSignOut, userSignUp);
const isRejectedAction = isRejected(userLogin, userSignOut, userSignUp);
const isFulfilledAction = isFulfilled(userLogin, userSignOut, userSignUp);

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        getToken: (state, action) => {
            state.token = localStorage.get('token')
        },
        setToken: (state, action) => {
            state.token = localStorage.setItem("token", action.payload);
        },
        setUserStatus: (state, action) => {
            state.isAuthenticated = action.payload;
        },
        setUser: (state, action) => {
            state.user = {
                id: action.payload.uid,
                email: action.payload.email,
                photoUrl: action.payload.photoURL,
                phoneNumber: action.payload.phoneNumber,
                lastLoginAt: action.payload.metadata.lastLoginAt,
            };
        },
        setMessage: (state, action) => {
            state.message = action.payload;
        },
        resetMessage: (state) => {
            state.message = "";
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        resetError: (state) => {
            state.error = "";
        },
        resetState: () => {
            return { ...initialState };
        },
    },
    extraReducers(builder) {
        builder
            .addCase(userLogin.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.error = "";
                state.message = "Login successfullt completed";
                state.user = { ...action.payload };
            })
            .addCase(userLogin.rejected, (state) => {
                state.isAuthenticated = false;
            })
            .addCase(userSignOut.fulfilled, (state) => {
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(userSignUp.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.message = "Account successfully created";
                state.user = action.payload;
                state.error = {};
                state.token = action.payload;
                localStorage.setItem("token", action.payload);
            })
            .addMatcher(isPendingAction, (state) => {
                state.status = "loading";
            })
            .addMatcher(isFulfilledAction, (state) => {
                state.status = "succeeded";
            })
            .addMatcher(isRejectedAction, (state, action) => {
                state.status = "failed";
                // state.error = action.error.message;
                state.error = {...action.payload};
                console.log("action rejection: ", action)
            });
    },
});
export const userState = (state) => state.user;
export const { setUserStatus, setUser, resetState, setMessage, setError } =
    userSlice.actions;
export default userSlice.reducer;
