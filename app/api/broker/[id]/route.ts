import { NextRequest, NextResponse } from "next/server";
import { mockBrokerInfo } from "@/data/mock-data";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100));

    // For demo purposes, return the same broker info regardless of ID
    return NextResponse.json(mockBrokerInfo);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch broker info" },
      { status: 500 }
    );
  }
}
