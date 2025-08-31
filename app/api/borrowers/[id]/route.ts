import { NextRequest, NextResponse } from "next/server";
import { mockBorrowerDetails } from "@/data/mock-data";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100));

    const borrower = mockBorrowerDetails[id];

    if (!borrower) {
      return NextResponse.json(
        { error: "Borrower not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(borrower);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch borrower details" },
      { status: 500 }
    );
  }
}
