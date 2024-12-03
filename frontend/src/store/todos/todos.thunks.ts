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
