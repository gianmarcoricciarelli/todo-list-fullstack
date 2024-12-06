import { useDispatch } from "react-redux";
import { AppDispatch } from "./store";
import { useEffect, useState } from "react";
import { fetchTodos } from "./store/todos/todos.thunks";
import styles from "./App.module.scss";
import { TodoList } from "./components/TodoList/TodoList";
import { AddTodo } from "./components/AddTodo/AddTodo";

function App() {
    const [isLoading, setIsLoading] = useState(true);

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const _fetchTodos = async () => {
            setIsLoading(true);
            await dispatch(fetchTodos()).unwrap();
            setIsLoading(false);
        };

        _fetchTodos();
    }, [dispatch]);

    return (
        <div className={styles["app"]}>
            <div className={styles["app__todos-container"]}>
                {isLoading ? (
                    <p>Loading</p>
                ) : (
                    <>
                        <AddTodo />
                        <TodoList />
                    </>
                )}
            </div>
        </div>
    );
}

export default App;
