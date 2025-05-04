import { getDb } from "@/db";

export async function onboardNewUser(id: string, userName: string) {
  await getDb().insertInto("user").values({ name: userName, provider_id: id }).execute();
}
