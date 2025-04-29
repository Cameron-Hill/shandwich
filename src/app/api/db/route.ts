import { type NextRequest, NextResponse } from "next/server";
import { createSchema, getAllData, seed } from "@/db/init";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const allData = await getAllData();
  return NextResponse.json(allData);
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  console.log("Initializing db...");
  try {
    await createSchema();
  } catch (error) {
    console.error("Error creating schema:", error);
    return new NextResponse("Error creating schema", { status: 500 });
  }

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
