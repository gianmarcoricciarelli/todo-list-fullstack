import { createAsyncThunk } from "@reduxjs/toolkit";

interface Todo {
    id: number;
    description: string;
    isDone: number;
}

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
