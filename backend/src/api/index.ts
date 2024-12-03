import express from "express";
import { Connection, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";

interface Todo extends RowDataPacket {
    id: number;
    description: string;
    is_done: number;
}

export function initApi(connection: Connection) {
    const app = express();

    app.use(cors());
    app.use(bodyParser.json());
    app.use(morgan("dev"));

    app.get("/todos", async (_, res) => {
        const [rows] = await connection.query<Todo[]>("select * from todos;");

        res.status(200).json({
            todos: rows.map((row) => ({
                id: row.id,
                description: row.description,
                isDone: row.is_done,
            })),
        });
    });

    app.post("/todo", async (req, res) => {
        if (!req.body.description) {
            res.status(400).json({
                error: "body is missing description",
            });
        } else {
            const [result] = await connection.query<ResultSetHeader>(
                "insert into todos (description) values (?)",
                [req.body.description],
            );
            res.status(201).json({ id: result.insertId });
        }
    });

    app.put("/todo/:todoId", async (req, res) => {
        if (!req.body.description) {
            res.status(400).json({
                error: "body is missing description",
            });
        } else {
            const [result] = await connection.query<ResultSetHeader>(
                "update todos set description = ? where id = ?",
                [req.body.description, req.params.todoId],
            );

            if (result.affectedRows === 0) {
                res.status(404).json({
                    errorMessage: `No todo found with id ${req.params.todoId}`,
                });
            } else {
                res.status(204).send();
            }
        }
    });

    app.delete("/todo/:todoId", async (req, res) => {
        const [result] = await connection.query<ResultSetHeader>(
            `delete from todos where id = ${req.params.todoId};`,
        );

        if (result.affectedRows === 0) {
            res.status(404).json({
                errorMessage: `No todo found with id ${req.params.todoId}`,
            });
        } else {
            res.status(204).send();
        }
    });

    app.listen(process.env.EXPRESS_PORT, () => {
        console.log(`Server is running on port ${process.env.EXPRESS_PORT}`);
    });
}
