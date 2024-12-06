import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "./store";
import { useEffect, useState } from "react";
import { fetchTodos } from "./store/todos/todos.thunks";
import styles from "./App.module.scss";
import { TodoList } from "./components/TodoList/TodoList";
import { AddTodo } from "./components/AddTodo/AddTodo";
import { todosSelectors } from "./store/todos/todos.slice";

function App() {
    const [isLoading, setIsLoading] = useState(true);

    const dispatch = useDispatch<AppDispatch>();

    const todos = useSelector(todosSelectors.selectAll);

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
                        {todos.length > 0 ? (
                            <TodoList />
                        ) : (
                            <div
                                className={
                                    styles["app__todos-container__no-todos"]
                                }
                            >
                                <p>Add a Todo</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default App;
