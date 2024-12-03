import { configureStore } from "@reduxjs/toolkit";
import { todosSlice } from "./todos/todos.slice";

export const store = configureStore({ reducer: { todos: todosSlice.reducer } });

export type RooState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
