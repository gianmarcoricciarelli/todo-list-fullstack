import { useDispatch } from "react-redux";
import { AppDispatch } from "./store";
import { useEffect } from "react";
import { fetchTodos } from "./store/todos/todos.thunks";

function App() {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const _fetchTodos = async () => {
            await dispatch(fetchTodos()).unwrap();
        };

        _fetchTodos();
    }, [dispatch]);

    return <p>Todo App Fullstack</p>;
}

export default App;
