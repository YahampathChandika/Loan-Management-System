import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AIExplainability } from "./AIExplainability";
import { LoanSummary } from "./LoanSummary";
import { useBorrowerStore } from "@/store/useBorrowerStore";
import { formatCurrency, getStatusColor } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export function BorrowerDetail() {
  const { activeBorrower, isLoading } = useBorrowerStore();

  if (isLoading) {
    return (
      <Card className="h-fit">
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  if (!activeBorrower) {
    return (
      <Card className="h-fit">
        <CardContent className="flex items-center justify-center py-12">
          <p className="text-muted-foreground">
            Select a borrower to view details
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-fit">
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
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <AIExplainability borrower={activeBorrower} />

        <Separator />

        <div>
          <h3 className="font-semibold mb-4">Loan Summary</h3>
          <LoanSummary borrower={activeBorrower} />
        </div>
      </CardContent>
    </Card>
  );
}
