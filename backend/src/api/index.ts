import express from "express";
import { Connection } from "mysql2/promise";

export function initApi(connection: Connection) {
    const app = express();

    app.get("/", async (_, res) => {
        const [rows] = await connection.query("select * from Users");

        res.send(JSON.stringify(rows));
    });

    app.listen(process.env.EXPRESS_PORT, () => {
        console.log(
            `INFO: Server is running on port ${process.env.EXPRESS_PORT}`,
        );
    });
}
