import { configureStore } from "@reduxjs/toolkit";
import tokenReducer, { initialState as tokenState } from "../features/token/tokenSlice.js";
import { saveState, loadState } from "./localStorage.js";

import { tokenApiSlice } from "../app/api/tokenApiSlice.js";
import testReducer from "../features/testSlice.js";

import userReducer, { initialState as userState } from "../features/users/userSlice.js";
import { authApiSlice } from "../app/api/authApiSlice.js";

export const store = configureStore({
    reducer: {
        user: userReducer,
        token: tokenReducer,
        test: testReducer,
        [tokenApiSlice.reducerPath]: tokenApiSlice.reducer,
        [authApiSlice.reducerPath] : authApiSlice.reducer,
        
    },
    middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware({ serializableCheck: false }).prepend(
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
