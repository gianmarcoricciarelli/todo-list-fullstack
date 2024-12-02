import mysql, { ConnectionOptions } from "mysql2/promise";

export async function initDbConnection() {
    const access: ConnectionOptions = {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
    };

    try {
        const connection = await mysql.createConnection(access);

        return connection;
    } catch {
        throw new Error(
            "Error: Something went wrong when connecting to the DB",
        );
    }
}
