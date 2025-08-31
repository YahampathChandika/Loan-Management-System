import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

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
