// lib/borrower-utils.ts
import { BorrowerPipeline, Borrower, TabValue } from "./types";

export function getActiveTabBorrowers(
  pipeline: BorrowerPipeline | null,
  activeTab: TabValue
): Borrower[] {
  if (!pipeline) return [];

  switch (activeTab) {
    case "new":
      return pipeline.new;
    case "in_review":
      return pipeline.in_review;
    case "approved":
      return pipeline.approved;
    default:
      return [];
  }
}

export function getFilteredBorrowers(
  borrowers: Borrower[],
  searchTerm: string,
  isActive: boolean
): Borrower[] {
  let filtered = borrowers;

  // Apply search filter
  if (searchTerm.trim()) {
    const term = searchTerm.toLowerCase();
    filtered = filtered.filter(
      (borrower) =>
        borrower.name.toLowerCase().includes(term) ||
        borrower.loan_type.toLowerCase().includes(term) ||
        borrower.status.toLowerCase().includes(term)
    );
  }

  // Apply active/inactive filter (for demo purposes, "inactive" shows empty results)
  if (!isActive) {
    filtered = [];
  }

  return filtered;
}
