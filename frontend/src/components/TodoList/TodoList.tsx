import { useDispatch, useSelector } from "react-redux";
import { todosSelectors } from "../../store/todos/todos.slice";
import styles from "./TodoList.module.scss";
import { AppDispatch } from "../../store";
import { deleteTodo } from "../../store/todos/todos.thunks";

export function TodoList() {
    const dispatch = useDispatch<AppDispatch>();
    const todos = useSelector(todosSelectors.selectAll);

    const onDeleteHandler = async (todoId: number) => {
        await dispatch(deleteTodo(todoId)).unwrap();
    };

    return (
        <>
            {todos.map((todo) => (
                <div key={todo.id} className={styles["todo"]}>
                    <span>{todo.description}</span>
                    <span
                        className={`material-icons ${styles["todo__delete-icon"]}`}
                        onClick={() => onDeleteHandler(todo.id)}
                    >
                        delete
                    </span>
                </div>
            ))}
        </>
    );
}
