import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    console.log(`Escalating borrower ${id} to Credit Committee`);

    return NextResponse.json({
      success: true,
      message: "Escalated to Credit Committee.",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to escalate to credit committee" },
      { status: 500 }
    );
  }
}
