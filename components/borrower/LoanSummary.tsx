import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { BorrowerDetail } from "@/lib/types";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { apiClient } from "@/lib/api";
import { useState } from "react";

interface LoanSummaryProps {
  borrower: BorrowerDetail;
}

export function LoanSummary({ borrower }: LoanSummaryProps) {
  const [isEscalating, setIsEscalating] = useState(false);

  const handleEscalate = async () => {
    setIsEscalating(true);
    try {
      const result = await apiClient.escalateToCredit(borrower.id);
      if (result.success) {
        console.log("Escalated to Credit Committee:", result.message);
        // You could add a toast notification here
      }
    } catch (error) {
      console.error("Failed to escalate:", error);
    } finally {
      setIsEscalating(false);
    }
  };

  const summaryItems = [
    { label: "Employment", value: borrower.employment },
    { label: "Income", value: formatCurrency(borrower.income) },
    { label: "Existing Loan", value: formatCurrency(borrower.existing_loan) },
    { label: "Credit Score", value: borrower.credit_score.toString() },
    { label: "Source of Funds", value: borrower.source_of_funds },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        {summaryItems.map((item, index) => (
          <div
            key={index}
            className="flex justify-between py-2 border-b border-border last:border-b-0"
          >
            <span className="text-sm font-medium text-muted-foreground">
              {item.label}
            </span>
            <span className="text-sm text-foreground">{item.value}</span>
          </div>
        ))}
      </div>

      {borrower.risk_signal && borrower.risk_signal !== "None" && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Risk Signal:</strong> {borrower.risk_signal}
          </AlertDescription>
        </Alert>
      )}

      <div className="pt-4">
        <Button
          onClick={handleEscalate}
          disabled={isEscalating}
          className="w-full"
        >
          {isEscalating ? "Escalating..." : "Escalate to Credit Committee"}
        </Button>
      </div>
    </div>
  );
}
