import { getDb } from "@/db";

export async function onboardNewUser(id: string, userName: string) {
  const db = getDb();
  const existingUser = await db.selectFrom("user").selectAll().where("provider_id", "=", id).executeTakeFirst();
  if (existingUser) {
    console.log("User already exists:");
    await db.updateTable("user").set({ name: userName }).where("id", "=", existingUser.id).execute();
    console.log("Updated user:", { id: existingUser.id, name: userName });
  } else {
    await getDb().insertInto("user").values({ name: userName, provider_id: id }).execute();
  }
}
