import { ChangeEvent, useState } from "react";
import styles from "./AddTodo.module.scss";

export function AddTodo() {
    const [description, setDescription] = useState("");

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    };

    return (
        <div className={styles["add-todo"]}>
            <input
                type="text"
                placeholder="Add a description"
                value={description}
                onChange={onChangeHandler}
            />
            <span
                className={`material-icons ${styles["add-todo__submit-icon"]}`}
            >
                add_circle_outline
            </span>
        </div>
    );
}
