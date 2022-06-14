import { api } from './api.js'

export const authApiSlice = api.injectEndpoints({
    endpoints: build => ({
        login: build.mutation({
            query: (credentials) => ({
                url: '/users/signin',
                method: 'POST',
                body: { ...credentials },
            }),
            keepUnusedDataFor: 5
        }),
        logout: build.query ({
            query: () => '/users/signout',
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
    useLogoutQuery,
    useSignupMutation,
    useUpdateUserMutation,
    useDeleteUserMutation
} = authApiSlice;