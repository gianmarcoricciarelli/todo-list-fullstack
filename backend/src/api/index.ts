import express from "express";
import { Connection } from "mysql2/promise";

export function initApi(connection: Connection) {
  const app = express();

  app.get("/", (_, res) => {
    res.send("Hello World!");
  });

  app.listen(process.env.EXPRESS_PORT, () => {
    console.log(`INFO: Server is running on port ${process.env.EXPRESS_PORT}`);
  });
}
