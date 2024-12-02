import express from "express";
import { Connection, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import bodyParser from "body-parser";
import morgan from "morgan";

export function initApi(connection: Connection) {
    const app = express();

    app.use(bodyParser.json());
    app.use(morgan("dev"));

    app.get("/todos", async (_, res) => {
        const [rows] = await connection.query<RowDataPacket[]>(
            "select * from todos;",
        );

        res.status(200).json({ todos: rows });
    });

    app.post("/todo", async (req, res) => {
        const [result] = await connection.query<ResultSetHeader>(
            "insert into todos (creation_date, description) values (?, ?)",
            [req.body.creation_date, req.body.description],
        );

        res.status(201).json({ id: result.insertId });
    });

    app.put("/todo/:todoId", async (req, res) => {
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
