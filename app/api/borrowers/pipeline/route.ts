import { NextResponse } from "next/server";
import { mockPipelineData } from "@/data/mock-data";

export async function GET() {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100));

    return NextResponse.json(mockPipelineData);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch pipeline data" },
      { status: 500 }
    );
  }
}
