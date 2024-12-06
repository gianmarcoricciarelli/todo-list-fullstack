import { useSelector } from "react-redux";
import { todosSelectors } from "../../store/todos/todos.slice";
import styles from "./TodoList.module.scss";
import { Todo } from "./Todo/Todo";

export function TodoList() {
    const todos = useSelector(todosSelectors.selectAll);

    return (
        <div className={styles["todo-list"]}>
            {todos.map((todo) => (
                <Todo todo={todo} />
            ))}
        </div>
    );
}
