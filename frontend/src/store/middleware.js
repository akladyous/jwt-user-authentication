// import {
//     createListenerMiddleware,
//     isAnyOf,
//     isAsyncThunkAction,
//     isRejectedWithValue,
// } from "@reduxjs/toolkit";


// import { refreshToken } from "../features/token/thunks/refreshToken.js";
// import { setToken } from "../features/token/tokenSlice.js";
// import { testAction } from "../features/token/thunks/testAction.js";





// Add one or more listener entries that look for specific actions.
// They may contain any sync or async logic, similar to thunks.

// const refreshTokenListiner = createListenerMiddleware();
// refreshTokenListiner.startListening({
//     actionCreator: isAsyncThunkAction(testAction),
//     // matcher: isAnyOf(testAction),
//     predicate: function (action) {
//         return true
//     },
//     effect: async (action, listenerApi) => {
//         // listenerApi.cancelActiveListeners();
//         listenerApi.dispatch(refreshToken())
//         listenerApi.unsubscribe()
//     },
// })



// const stack = []
// const renewToken2 = ({dispatch, getState}) => (next) => (action) => {
//     dispatch(refreshToken());
//     next(action)
// };

// const refreshTokenMiddleware = (store) => {
//     const stach = [];
//     return function wrapDispatch(next) {
//         return function (action) {
//             if (action.type.startsWith('test')) {
//                 stach.push(action);
//                 store.dispatch(refreshToken()) ;


//             }
//             else {
//                 return next(action);
//             }
//         }
//     }
// }

// const customMiddleware = ({dispatch, getState}) => (next) => (action) => {
//     if (action.type === "testAction/pending") {
//         stack.push(action);
//         dispatch(async ()=> {
//             await dispatch(refreshToken());
//             const nextAction = stack.pop();
//             dispatch(nextAction);
//         })
//         // const nextAction = stack.pop();
//         // dispatch(nextAction);
//         // next(action)
//     } else {
//         if (action.type.startsWith("refreshToken") && stack.length > 0) {
//             const nextAction = stack.pop();
//             dispatch(nextAction);
//             next(action)
//         }
//         return next(action)
//     }
// }

// const renewToken1 = (store) => (next) => (action) => {
//     console.log('typeof action : ', typeof action);
//     if (action.type.startsWith('test')) {
//         // store.dispatch(refreshToken());
//         const nextAction = { ...action, type: 'refreshToken' }
//         return next();
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