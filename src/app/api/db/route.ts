import { NextResponse } from "next/server";
import { createSchema, getAllData, seed } from "@/db/init";

export async function GET(): Promise<NextResponse> {
  const allData = await getAllData();
  return NextResponse.json(allData);
}

export async function POST(): Promise<NextResponse> {
  try {
    console.log("Seeding...");
    await seed();
  } catch (error) {
    console.error("Error seeding database:", error);
    return new NextResponse("Error seeding database", { status: 500 });
  }
  console.log("Seeding completed successfully! 🌱");

  return new NextResponse(`Tables created successfully ✅`);
}
