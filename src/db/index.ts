import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";
import { DB } from "@/db/schema"; // your generated types or manual schema

console.log(`Initializing database connection at ${process.env.DATABASE_URL}...`);

export const db = new Kysely<DB>({
  dialect: new PostgresDialect({
    pool: new Pool({
      connectionString: process.env.DATABASE_URL,
    }),
  }),
});

process.on("SIGINT", async () => {
  await db.destroy(); // Closes Kysely + better-sqlite3
  process.exit(0);
});

export default db;
