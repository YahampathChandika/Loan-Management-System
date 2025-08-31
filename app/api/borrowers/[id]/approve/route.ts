import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    console.log(`Approving loan for borrower ${id}`);

    return NextResponse.json({
      success: true,
      message: "Loan approved.",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to approve loan" },
      { status: 500 }
    );
  }
}
