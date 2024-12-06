import { useState } from "react";
import type { Todo } from "../../../types";
import { deleteTodo } from "../../../store/todos/todos.thunks";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";
import { AddTodo } from "../../AddTodo/AddTodo";
import styles from "./Todo.module.scss";

interface ITodo {
    todo: Todo;
}

export function Todo({ todo }: ITodo) {
    const dispatch = useDispatch<AppDispatch>();

    const [editVisible, setEditVisible] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const onMouseLeaveHandler = () => {
        if (editMode) {
            return;
        }

        setEditVisible(false);
    };

    const onEditHandler = () => {
        setEditMode(true);
    };

    const onDeleteHandler = async (todoId: number) => {
        await dispatch(deleteTodo(todoId)).unwrap();
    };

    return (
        <div
            key={todo.id}
            className={styles["todo"]}
            onMouseEnter={() => setEditVisible(true)}
            onMouseLeave={onMouseLeaveHandler}
        >
            {editMode ? (
                <AddTodo todoId={todo.id} onEditEnd={setEditMode} />
            ) : (
                <span>{todo.description}</span>
            )}
            <div className={styles[`todo__icons`]}>
                {editVisible && (
                    <span
                        className={`material-icons ${styles["todo__icons__icon"]}`}
                        onClick={onEditHandler}
                    >
                        edit
                    </span>
                )}
                <span
                    className={`material-icons ${styles["todo__icons__icon"]}`}
                    onClick={() => onDeleteHandler(todo.id)}
                >
                    delete
                </span>
            </div>
        </div>
    );
}
