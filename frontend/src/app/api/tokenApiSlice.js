import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { resetState } from '../../features/users/userSlice.js';
import { verifyJWT } from '../../util/verifyJWT'
import { setToken } from '../../features/token/tokenSlice.js';
import { userSignOut } from '../thunkAPI/usersThunkAPI'
// import { refreshToken as accessToken } from '../../features/token/thunks/refreshToken.js';

const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:4000/api",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const token = getState().token.token
        if (token) {
            headers.set('authorization', `Bearer ${token}`)
        }
        return headers
    },
});

const refreshToken = async (args, api, extraOptions) => {
    let token = api.getState().token.token;
    const decoded = verifyJWT(token);
    // if (!decoded) {
    //     try {
    //         await api.dispatch(accessToken()).unwrap();
    //     } 
    //     catch (error){
    //         await api.dispatch(userSignOut());
    //         await api.dispatch(resetState());
    //         return { error: error };
    //     }
    // }

    if (decoded) {
        let response = await baseQuery(args ,api, extraOptions);
        return response;
    } 

    const response = await baseQuery("/refresh", api, extraOptions);
    if (response?.error?.originalStatus === 401){
        await api.dispatch(userSignOut());
        await api.dispatch(resetState());
        return { error: {
            status: 401,
            statusText: "Token Expired",
            data: "Authentication failed, please login again",
        } };
    }
    if (response?.data) {
        await api.dispatch(setToken(response.data));
    }

    let result = await baseQuery(args, api, extraOptions);
    console.log('result : ', result)
    return result;
};

const baseQueryReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.originalStatus === 403) {
        const accessToken = await baseQuery("/refresh", api, extraOptions);
        if (accessToken?.data) {
            // const user = api.getState().auth.user;
            await api.dispatch(setToken(accessToken.data));
            result = await baseQuery(args, api, extraOptions);
        } else {
            await api.dispatch(userSignOut());
            await api.dispatch(resetState());
        }
    };
    return result;
};

export const tokenApiSlice = createApi({
    reducerPath: 'tokenAPI',
    baseQuery: refreshToken,
    endpoints: builder => ({})
})