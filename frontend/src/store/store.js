import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/users/userSlice.js"
import { saveTokenInLocalStorage } from "../hooks/localStorage.js";

export const store = configureStore({
    reducer: {
        user: userReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

// store.subscribe(() =>{
//     if (store.getState().user.token){
//         saveTokenInLocalStorage(store.getState().user.token);
//     }
// })