import { useSelector } from "react-redux";
import { todosSelectors } from "../../store/todos/todos.slice";
import styles from "./TodoList.module.scss";

export function TodoList() {
    const todos = useSelector(todosSelectors.selectAll);

    const onDeleteHandler = () => {
        console.log("delete");
    };

    return (
        <>
            {todos.map((todo) => (
                <div key={todo.id} className={styles["todo"]}>
                    <span>{todo.description}</span>
                    <span
                        className={`material-icons ${styles["todo__delete-icon"]}`}
                        onClick={onDeleteHandler}
                    >
                        delete
                    </span>
                </div>
            ))}
        </>
    );
}
