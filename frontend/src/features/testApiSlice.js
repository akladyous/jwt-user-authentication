import { tokenApiSlice } from "../app/api/tokenApiSlice.js";

export const testApiSlice = tokenApiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => "/test",
            keepUnusedDataFor: 5,
        }),
        
    }),
    
})

export const {
    useGetUsersQuery
} = testApiSlice;