import { db } from "@/db";

export async function onboardNewUser(id: string, userName: string) {
  await db.insertInto("user").values({ name: userName, provider_id: id }).execute();
}
