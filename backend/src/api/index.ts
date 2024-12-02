import express from "express";
import { Connection } from "mysql2/promise";
import bodyParser from "body-parser";

export function initApi(connection: Connection) {
    const app = express();

    app.use(bodyParser.json());

    app.get("/todos", async (_, res) => {
        const [rows] = await connection.query("select * from todos;");

        res.status(200).json({ todos: rows });
    });

    app.post("/todo", async (req, res) => {
        await connection.query(
            "insert into todos (creation_date, description) values (?, ?)",
            [req.body.creation_date, req.body.description],
        );

        res.status(204).send();
    });

    app.delete("/todo/:todoId", async (req, res) => {
        await connection.query(
            `delete from todos where id = ${req.params.todoId};`,
        );

        res.status(204).send();
    });

    app.listen(process.env.EXPRESS_PORT, () => {
        console.log(
            `INFO: Server is running on port ${process.env.EXPRESS_PORT}`,
        );
    });
}
