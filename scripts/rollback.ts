import { db } from "@/db"; // your kysely DB instance
import { Migrator, FileMigrationProvider } from "kysely";
import path from "path";
import { promises as fs } from "fs";

const migrationDir = path.join(path.dirname(path.dirname(__filename)), "database/migrations");

console.log(`Rollback last migration at ${migrationDir}`);

async function rollbackLatestMigration() {
  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: migrationDir,
    }),
  });

  // Get the list of applied migrations
  const executedMigrations = await migrator.getMigrations();

  const applied = executedMigrations
    .filter((m) => m.executedAt != null)
    .sort((a, b) => b.executedAt!.getTime() - a.executedAt!.getTime());

  if (applied.length === 0) {
    console.log("No migrations have been applied.");
    return;
  }

  const latestMigration = applied[0];
  console.log(`Rolling back: ${latestMigration.name}`);

  const result = await migrator.migrateDown();

  if (result.error) {
    console.error("Rollback failed:", result.error);
    process.exit(1);
  } else {
    console.log(`Successfully rolled back migration: ${latestMigration.name}`);
    process.exit(0);
  }
}

rollbackLatestMigration();
