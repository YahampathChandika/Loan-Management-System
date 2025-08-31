import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Borrower } from "@/lib/types";
import { formatCurrency, getStatusColor } from "@/lib/utils";

interface BorrowerCardProps {
  borrower: Borrower;
  isActive?: boolean;
  onClick?: () => void;
}

export function BorrowerCard({
  borrower,
  isActive = false,
  onClick,
}: BorrowerCardProps) {
  return (
    <Card
      className={`p-4 cursor-pointer transition-all hover:shadow-md ${
        isActive ? "ring-2 ring-primary bg-accent" : "hover:bg-accent/50"
      }`}
      onClick={onClick}
    >
      <div className="space-y-2">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold">{borrower.name}</h3>
            <p className="text-sm text-muted-foreground">
              {borrower.loan_type}
            </p>
          </div>
          <div className="text-right">
            <p className="font-semibold">{formatCurrency(borrower.amount)}</p>
          </div>
        </div>

        <div className="flex justify-end">
          <Badge variant="outline" className={getStatusColor(borrower.status)}>
            {borrower.status}
          </Badge>
        </div>
      </div>
    </Card>
  );
}
