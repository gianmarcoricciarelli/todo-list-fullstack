import { createAsyncThunk } from "@reduxjs/toolkit";
import { Todo } from "../../types";

export const fetchTodos = createAsyncThunk<{ todos: Todo[] }>(
    "todos/fetchTodos",
    async (_, thunkApi) => {
        try {
            const response = await fetch("http://localhost:3000/todos", {
                method: "GET",
            });

            if (response.ok) {
                const todos = await response.json();
                return todos;
            }
        } catch {
            return thunkApi.rejectWithValue(null);
        }
    },
);

export const deleteTodo = createAsyncThunk<number, number>(
    "todos/deleteTodo",
    async (todoId, thunkApi) => {
        try {
            const response = await fetch(
                `http://localhost:3000/todo/${todoId}`,
                { method: "DELETE" },
            );

            if (response.ok) {
                return todoId;
            } else {
                return thunkApi.rejectWithValue(null);
            }
        } catch {
            return thunkApi.rejectWithValue(null);
        }
    },
);
