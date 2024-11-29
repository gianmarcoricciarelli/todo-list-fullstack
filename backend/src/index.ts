import "dotenv/config";
import { initDbConnection } from "./db";
import { initApi } from "./api";
import { Connection } from "mysql2/promise";

async function initBackendApp() {
  try {
    const connection = await initDbConnection();
    initApi(connection as Connection);
  } catch (error) {
    console.log(error);
  }
}

initBackendApp();
