import React, { ChangeEvent, SetStateAction, useState } from "react";
import styles from "./AddTodo.module.scss";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { addTodo, editTodo } from "../../store/todos/todos.thunks";

interface IAddTodo {
    todoId?: number;
    onEditEnd?: React.Dispatch<SetStateAction<boolean>>;
}

export function AddTodo({ todoId, onEditEnd }: IAddTodo) {
    const dispatch = useDispatch<AppDispatch>();

    const [description, setDescription] = useState("");

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    };

    const onClickHandler = async () => {
        if (!todoId) {
            await dispatch(addTodo(description)).unwrap();
        } else {
            await dispatch(editTodo({ id: todoId, description })).unwrap();
            onEditEnd!(false);
        }

        setDescription("");
    };

    return (
        <div className={styles["add-todo"]}>
            <input
                type="text"
                placeholder="Add a description"
                value={description}
                onChange={onChangeHandler}
            />
            <button onClick={onClickHandler} disabled={!description}>
                <span className={`material-icons ${styles["submit-icon"]}`}>
                    add_circle_outline
                </span>
            </button>
        </div>
    );
}
