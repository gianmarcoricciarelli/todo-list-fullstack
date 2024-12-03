import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { addTodo, deleteTodo, fetchTodos } from "./todos.thunks";
import { RooState } from "..";
import { Todo } from "../../types";

const todosEntityAdapater = createEntityAdapter<Todo>();

export const todosSlice = createSlice({
    name: "todos",
    initialState: todosEntityAdapater.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTodos.fulfilled, (state, action) => {
            const { payload } = action;

            todosEntityAdapater.addMany(state, payload.todos);
        });
        builder.addCase(addTodo.fulfilled, (state, action) => {
            const { payload: newTodo } = action;

            todosEntityAdapater.addOne(state, newTodo);
        });
        builder.addCase(deleteTodo.fulfilled, (state, action) => {
            const { payload: todoId } = action;

            todosEntityAdapater.removeOne(state, todoId);
        });
    },
});

export const todosSelectors = {
    ...todosEntityAdapater.getSelectors((state: RooState) => state.todos),
};
