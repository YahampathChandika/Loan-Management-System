import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { BorrowerDetail } from "@/lib/types";
import { apiClient } from "@/lib/api";
import { useState } from "react";

interface AIExplainabilityProps {
  borrower: BorrowerDetail;
}

export function AIExplainability({ borrower }: AIExplainabilityProps) {
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});

  const handleAction = async (action: string, borrowerId: string) => {
    setIsLoading((prev) => ({ ...prev, [action]: true }));

    try {
      let result;
      switch (action) {
        case "request-documents":
          result = await apiClient.requestDocuments(borrowerId);
          break;
        case "send-valuer":
          result = await apiClient.sendToValuer(borrowerId);
          break;
        case "approve":
          result = await apiClient.approveLoan(borrowerId);
          break;
        default:
          throw new Error("Unknown action");
      }

      if (result.success) {
        console.log(`${action} completed:`, result.message);
        // You could add a toast notification here
      }
    } catch (error) {
      console.error(`Failed to ${action}:`, error);
    } finally {
      setIsLoading((prev) => ({ ...prev, [action]: false }));
    }
  };

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="ai-explainability">
        <AccordionTrigger className="text-left">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            <span>AI Explainability</span>
            {borrower.ai_flags.length > 0 && (
              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-destructive/10 text-destructive">
                {borrower.ai_flags.length} issues
              </span>
            )}
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4">
            {borrower.ai_flags.length > 0 ? (
              <div className="space-y-3">
                <h4 className="font-medium text-destructive">
                  Detected Issues:
                </h4>
                {borrower.ai_flags.map((flag, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-2 p-3 bg-destructive/5 rounded-lg border border-destructive/20"
                  >
                    <AlertTriangle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-destructive">{flag}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                <p className="text-sm text-emerald-700 dark:text-emerald-400">
                  No AI flags detected for this borrower.
                </p>
              </div>
            )}

            <div className="flex flex-wrap gap-2 pt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleAction("request-documents", borrower.id)}
                disabled={isLoading["request-documents"]}
              >
                {isLoading["request-documents"]
                  ? "Requesting..."
                  : "Request Documents"}
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => handleAction("send-valuer", borrower.id)}
                disabled={isLoading["send-valuer"]}
              >
                {isLoading["send-valuer"] ? "Sending..." : "Send to Valuer"}
              </Button>

              <Button
                size="sm"
                onClick={() => handleAction("approve", borrower.id)}
                disabled={isLoading["approve"] || borrower.ai_flags.length > 0}
              >
                {isLoading["approve"] ? "Approving..." : "Approve"}
              </Button>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
