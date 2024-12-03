import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "./store";
import { useEffect, useState } from "react";
import { fetchTodos } from "./store/todos/todos.thunks";
import { todosSelectors } from "./store/todos/todos.slice";

function App() {
    const [isLoading, setIsLoading] = useState(true);

    const todos = useSelector(todosSelectors.selectAll);
    console.log("App ~ todos:", todos);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const _fetchTodos = async () => {
            setIsLoading(true);
            await dispatch(fetchTodos()).unwrap();
            setIsLoading(false);
        };

        _fetchTodos();
    }, [dispatch]);

    return isLoading ? <p>Loading</p> : <p>Todo App Fullstack</p>;
}

export default App;
