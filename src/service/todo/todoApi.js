import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiKey = "https://upahar-35ee6-default-rtdb.firebaseio.com/";

export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({ baseUrl: apiKey }),
  tagTypes: ['Todo'],
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: (userId) => `todolist/${userId}.json`,
      transformResponse: (response) => {
        return Object.keys(response).map((key) => ({
          mid: key,
          ...response[key],
        }));
      },
      providesTags: ['Todo'],
    }),
    addTodo: builder.mutation({
      query: ({ userId, ...todo }) => ({
        url: `todolist/${userId}.json`,
        method: 'POST',
        body: todo,
      }),
      invalidatesTags: ['Todo'],
    }),
    updateTodo: builder.mutation({
      query: ({ userId, mid, ...todo }) => ({
        url: `todolist/${userId}/${mid}.json`,
        method: 'PUT',
        body: todo,
      }),
      invalidatesTags: ['Todo'],
    }),
    deleteTodo: builder.mutation({
      query: ({ userId, mid }) => ({
        url: `todolist/${userId}/${mid}.json`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Todo'],
    }),
    getUserDetails: builder.query({
      query: (userId) => `users/${userId}.json`,
    }),
  }),
});

export const { useGetTodosQuery, useAddTodoMutation, useUpdateTodoMutation, useDeleteTodoMutation, useGetUserDetailsQuery } = todoApi;
