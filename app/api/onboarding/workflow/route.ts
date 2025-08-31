import { NextResponse } from "next/server";
import { mockWorkflowSteps } from "@/data/mock-data";

export async function GET() {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100));

    return NextResponse.json({
      steps: mockWorkflowSteps,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch workflow steps" },
      { status: 500 }
    );
  }
}
