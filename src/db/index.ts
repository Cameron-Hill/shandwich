import Database from "better-sqlite3";
import { Kysely, SqliteDialect } from "kysely";
import { DB } from "./db";

// Initialize Kysely with SQLite
const db = new Kysely<DB>({
  dialect: new SqliteDialect({
    database: new Database("dev.db"),
  }),
});

process.on("SIGINT", async () => {
  await db.destroy(); // Closes Kysely + better-sqlite3
  process.exit(0);
});

export default db;
