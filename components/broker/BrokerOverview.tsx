import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Phone, Mail, MessageCircle } from "lucide-react";
import { BrokerStats } from "./BrokerStats";
import { OnboardingWorkflow } from "./OnboardingWorkflow";
import { useBorrowerStore } from "@/store/useBorrowerStore";
import { useState } from "react";

export function BrokerOverview() {
  const { brokerInfo, workflowSteps } = useBorrowerStore();
  const [aiAssistantEnabled, setAiAssistantEnabled] = useState(true);

  if (!brokerInfo) {
    return (
      <Card className="h-fit">
        <CardContent className="flex items-center justify-center py-12">
          <p className="text-muted-foreground">Loading broker information...</p>
        </CardContent>
      </Card>
    );
  }

  const handleContactAction = (action: string) => {
    console.log(`${action} broker:`, brokerInfo.name);
    // Here you would implement the actual contact functionality
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>Broker Overview</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div>
          <h3 className="font-semibold mb-4">{brokerInfo.name}</h3>
          <BrokerStats broker={brokerInfo} />
        </div>

        <div className="space-x-2 flex justify-between items-center">
          <Button
            variant="outline"
            size="sm"
            className="w-1/3 "
            onClick={() => handleContactAction("Call")}
          >
            <Phone className="w-4 h-4 mr-2" />
            Call
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="w-1/3 "
            onClick={() => handleContactAction("Email")}
          >
            <Mail className="w-4 h-4 mr-2" />
            Email
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="w-1/3 "
            onClick={() => handleContactAction("Chat")}
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Chat
          </Button>
        </div>

        <Separator />

        {workflowSteps.length > 0 && (
          <>
            <OnboardingWorkflow steps={workflowSteps} />
            <Separator />
          </>
        )}

        <div className="flex items-center space-x-2">
          <Switch
            id="ai-assistant"
            checked={aiAssistantEnabled}
            onCheckedChange={setAiAssistantEnabled}
          />
          <Label htmlFor="ai-assistant" className="text-sm">
            E Ardsassist
          </Label>
        </div>
      </CardContent>
    </Card>
  );
}
