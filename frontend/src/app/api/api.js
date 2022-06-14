import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:4000/api"
})


export const api = createApi({
    reducerPath: 'API',
    baseQuery: baseQuery,
    tagTypes: ['users'],
    endpoints : (build) => ({})
});

