import { configureStore } from "@reduxjs/toolkit";
import userReducer, { initialState as userState } from "../features/users/userSlice.js";
import tokenReducer, { initialState as tokenState } from "../features/token/tokenSlice.js";
import { refreshToken } from "../features/token/thunks/refreshToken.js";

import { axiosPrivate } from "../api/axios.js";
import { setToken, resetState } from "../features/token/tokenSlice.js";

import { saveState, loadState } from "./localStorage.js";

const logger = (store) => (next) => (action) => { 
    const currentAction = action
    console.log('dispatching', action); 
    next(currentAction); 
};

// const renewToken = (store) => (next) => (action) => {
//     if (action.type.startsWith('test')) {
//         store.dispatch(refreshToken());
//         return
//     } else {
//         return next(action)
//     }
// }

// const decodeToken = (store) => (next) => (action) => {
//     if (action.type !== 'refreshToken/fulfilled') {
//         return next(action)
//     }
//     // const token = store.getState().user?.token;
//     const currentAction = action
//     const token = action.payload;
//     if (token !== null) {
//         const encodedToken = token.split(".")[1];
//         const decoded = JSON.parse(window.atob(encodedToken));
//         if (Date.now() < decoded.exp * 1000) {
//             // store.dispatch(setUserState(true));
//             store.dispatch(setUser(decoded));
//             // store.dispatch(currentAction)
//             // return
//             next(currentAction)
//         }
//     }
//     return next(action);
// };

export const store = configureStore({
    reducer: {
        user: userReducer,
        token: tokenReducer,
    },
    middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware({ serializableCheck: false }),
        logger,
        // renewToken,
    ],
    preloadedState: {
        user: loadState()?.user || userState,
        token: loadState()?.token || tokenState,
    },
});

store.subscribe(() => {
    saveState(store.getState());
});
// if (store.getState().user?.token && store.getState().user?.user === null) {
//     console.log(
//         "\x1b[33m%s\x1b[0m",
//         "store state : ",
//         store.getState().user
//     );
//     // store.dispatch(setUser({name: 'paolo'}))
//     const encodedToken = store.getState().user?.token.split(".")[1];
//     const decoded = JSON.parse(window.atob(encodedToken));
//     if (Date.now() < decoded.exp * 1000) {
//         // store.dispatch(setUserState(true));
//         store.dispatch(setUser(decoded));
//     }
// }

// store.subscribe(() =>{
//     if (store.getState().user.token){
//         saveTokenInLocalStorage(store.getState().user.token);
//     }
// })
