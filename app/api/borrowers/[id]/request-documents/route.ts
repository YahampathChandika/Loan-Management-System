import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    console.log(`Requesting documents for borrower ${id}`);

    return NextResponse.json({
      success: true,
      message: "Documents requested.",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to request documents" },
      { status: 500 }
    );
  }
}
