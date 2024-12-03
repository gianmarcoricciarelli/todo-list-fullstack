import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { fetchTodos } from "./todos.thunks";

const todosEntityAdapater = createEntityAdapter();

export const todosSlice = createSlice({
    name: "todos",
    initialState: todosEntityAdapater.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTodos.fulfilled, (state, action) => {
            const { payload } = action;

            todosEntityAdapater.addMany(state, payload.todos);
        });
    },
});

export const todosSelectors = {
    ...todosEntityAdapater.getSelectors(),
};
