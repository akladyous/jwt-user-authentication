import { apiSlice } from './apiSlice.js'

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: build => ({
        login: build.mutation({
            query: (credentials) => ({
                url: '/users/signin',
                method: 'POST',
                body: { ...credentials },
            }),
            keepUnusedDataFor: 5
        }),
        logout: build.mutation ({
            query: () => ({
                url: '/users/signout',
                method: "DELETE"
            }),
            keepUnusedDataFor: 5
        }),
        signup: build.mutation({
            query: (credentials) => ({
                url: '/users/signup',
                method: 'POST',
                body: {...credentials}
            }),
            keepUnusedDataFor: 5
        }),
        updateUser: build.mutation({
            query: (id, credentials) => ({
                url: `users/update/${id}`,
                method: 'PATCH',
                body: {...credentials}
            }),
            keepUnusedDataFor: 5
        }),
        deleteUser: build.mutation({
            query: (id) => ({
                url: `users/del/${id}`,
                method: 'DELETE',
            }),
            keepUnusedDataFor: 5
        })
    })
});

export const {
    useLoginMutation,
    useLogoutMutation,
    useSignupMutation,
    useUpdateUserMutation,
    useDeleteUserMutation
} = authApiSlice;