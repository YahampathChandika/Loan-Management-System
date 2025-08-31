import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { BorrowerDetail } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { apiClient } from "@/lib/api";
import { useState } from "react";

interface LoanSummaryProps {
  borrower: BorrowerDetail;
  onToast: (
    type: "success" | "error" | "info",
    title: string,
    message?: string
  ) => void;
}

export function LoanSummary({ borrower, onToast }: LoanSummaryProps) {
  const [isEscalating, setIsEscalating] = useState(false);

  const handleEscalate = async () => {
    setIsEscalating(true);
    try {
      const result = await apiClient.escalateToCredit(borrower.id);
      if (result.success) {
        onToast("success", "Escalated Successfully", result.message);
      } else {
        onToast("error", "Escalation Failed", "Please try again later");
      }
    } catch (error) {
      console.error("Failed to escalate:", error);
      onToast(
        "error",
        "Escalation Failed",
        "Unable to escalate to Credit Committee. Please try again."
      );
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

  // Calculate debt-to-income ratio
  const debtToIncomeRatio = (
    ((borrower.existing_loan + borrower.loan_amount) / borrower.income) *
    100
  ).toFixed(1);
  const isHighDebtRatio = parseFloat(debtToIncomeRatio) > 40;

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

        {/* Additional calculated fields */}
        <div className="flex justify-between py-2 border-b border-border">
          <span className="text-sm font-medium text-muted-foreground">
            Debt-to-Income Ratio
          </span>
          <span
            className={`text-sm font-medium ${
              isHighDebtRatio ? "text-destructive" : "text-foreground"
            }`}
          >
            {debtToIncomeRatio}%
          </span>
        </div>
      </div>

      {/* Risk Signals */}
      {borrower.risk_signal && borrower.risk_signal !== "None" && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Risk Signal:</strong> {borrower.risk_signal}
          </AlertDescription>
        </Alert>
      )}

      {/* High debt ratio warning */}
      {isHighDebtRatio && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>High Debt-to-Income Ratio:</strong> {debtToIncomeRatio}%
            exceeds recommended threshold of 40%
          </AlertDescription>
        </Alert>
      )}

      {/* Credit score assessment */}
      {borrower.credit_score < 650 && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Low Credit Score:</strong> Score of {borrower.credit_score}{" "}
            is below preferred minimum of 650
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
