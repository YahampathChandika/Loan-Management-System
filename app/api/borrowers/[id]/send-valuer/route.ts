import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 400));

    console.log(`Sending borrower ${id} to valuer`);

    return NextResponse.json({
      success: true,
      message: "Valuer notified.",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send to valuer" },
      { status: 500 }
    );
  }
}
