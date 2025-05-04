import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";
import { DB } from "@/db/schema"; // your generated types or manual schema
import * as dotenv from "dotenv";
dotenv.config();

console.log(`Initializing database connection at ${process.env.DATABASE_URL}...`);

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined. Is the .env file loaded?");
}

let _db: Kysely<DB> | null = null;

export function getDb(): Kysely<DB> {
  if (!_db) {
    _db = new Kysely<DB>({
      dialect: new PostgresDialect({
        pool: new Pool({
          connectionString: process.env.DATABASE_URL,
        }),
      }),
    });

    // Handle graceful shutdown
    process.on("SIGINT", async () => {
      await _db!.destroy(); // Closes Kysely + better-sqlite3
      process.exit(0);
    });
  }
  return _db;
}
