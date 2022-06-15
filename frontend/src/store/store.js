import { configureStore } from "@reduxjs/toolkit";
import tokenReducer, { initialState as tokenState } from "../features/token/tokenSlice.js";
import { saveState, loadState } from "./localStorage.js";

import testReducer from "../features/testSlice.js";
import userReducer, { initialState as userState } from "../features/users/userSlice.js";

import { apiSlice } from "../app/api/apiSlice.js";
import { tokenApiSlice } from "../app/api/tokenApiSlice.js";


export const store = configureStore({
    reducer: {
        user: userReducer,
        token: tokenReducer,
        test: testReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
        [tokenApiSlice.reducerPath]: tokenApiSlice.reducer,

        
    },
    middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware({ serializableCheck: false }).prepend(
            apiSlice.middleware,
            tokenApiSlice.middleware
        ),
        // refreshTokenMiddleware,
    ],
    preloadedState: {
        user: loadState()?.user || userState,
        token: loadState()?.token || tokenState,
    },
    devTools: true,
});

store.subscribe(() => {
    saveState(store.getState());
});
