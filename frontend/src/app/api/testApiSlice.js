import { tokenApiSlice } from "./tokenApiSlice.js";

export const testApiSlice = tokenApiSlice.injectEndpoints({
    endpoints: build => ({
        getUsers: build.query({
            query: (id) => "/test",
            keepUnusedDataFor: 5,
        }),
        setUsers: build.mutation({
            query: (data) => ({
                url: '/test',
                method: 'POST',
                body: { ...data },
            }),
            keepUnusedDataFor: 5
        }),
    }),
});

export const {
    useLazyGetUsersQuery,
    useGetUsersQuery,
    useSetUsersMutation
} = testApiSlice