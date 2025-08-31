import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AIExplainability } from "./AIExplainability";
import { LoanSummary } from "./LoanSummary";
import { useBorrowerStore } from "@/store/useBorrowerStore";
import { formatCurrency, getStatusColor } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface BorrowerDetailProps {
  onToast: (
    type: "success" | "error" | "info",
    title: string,
    message?: string
  ) => void;
}

export function BorrowerDetail({ onToast }: BorrowerDetailProps) {
  const { activeBorrower, isLoading } = useBorrowerStore();

  if (isLoading) {
    return (
      <Card className="h-fit" data-testid="borrower-detail">
        <CardContent className="flex items-center justify-center py-12">
          <div className="flex items-center space-x-2">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            <span className="text-muted-foreground">
              Loading borrower details...
            </span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!activeBorrower) {
    return (
      <Card className="h-fit" data-testid="borrower-detail">
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center space-y-2">
            <p className="text-muted-foreground">
              Select a borrower to view details
            </p>
            <p className="text-sm text-muted-foreground">
              Click on any borrower from the pipeline to get started
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-fit" data-testid="borrower-detail" data-loaded={!!activeBorrower}>
      <CardHeader>
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-xl">{activeBorrower.name}</CardTitle>
              <div className="space-y-1 mt-2">
                <p className="text-sm text-muted-foreground">
                  {activeBorrower.email}
                </p>
                <p className="text-sm text-muted-foreground">
                  {activeBorrower.phone}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">
                {formatCurrency(activeBorrower.loan_amount)}
              </p>
              <Badge
                variant="outline"
                className={`mt-2 ${getStatusColor(activeBorrower.status)}`}
              >
                {activeBorrower.status}
              </Badge>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="text-center p-2 bg-muted/30 rounded-md">
              <p className="text-xs text-muted-foreground">Credit Score</p>
              <p
                className={`font-semibold ${
                  activeBorrower.credit_score >= 720
                    ? "text-emerald-600"
                    : activeBorrower.credit_score >= 650
                    ? "text-amber-600"
                    : "text-red-600"
                }`}
              >
                {activeBorrower.credit_score}
              </p>
            </div>
            <div className="text-center p-2 bg-muted/30 rounded-md">
              <p className="text-xs text-muted-foreground">AI Flags</p>
              <p
                className={`font-semibold ${
                  activeBorrower.ai_flags.length === 0
                    ? "text-emerald-600"
                    : "text-red-600"
                }`}
              >
                {activeBorrower.ai_flags.length}
              </p>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <AIExplainability borrower={activeBorrower} onToast={onToast} />

        <Separator />

        <div>
          <h3 className="font-semibold mb-4">Loan Summary</h3>
          <LoanSummary borrower={activeBorrower} onToast={onToast} />
        </div>
      </CardContent>
    </Card>
  );
}
