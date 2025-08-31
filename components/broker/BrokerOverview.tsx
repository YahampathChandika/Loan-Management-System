import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Phone, Mail, MessageCircle, X } from "lucide-react";
import { BrokerStats } from "./BrokerStats";
import { OnboardingWorkflow } from "./OnboardingWorkflow";
import { useBorrowerStore } from "@/store/useBorrowerStore";
import { useState } from "react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "call" | "email" | "chat";
  brokerName: string;
}

function ContactModal({
  isOpen,
  onClose,
  type,
  brokerName,
}: ContactModalProps) {
  if (!isOpen) return null;

  const getModalContent = () => {
    switch (type) {
      case "call":
        return {
          title: "Call Broker",
          content: (
            <div className="space-y-4">
              <p>Initiating call to {brokerName}...</p>
              <p className="text-sm text-muted-foreground">
                Phone: +1 (555) 123-4567
              </p>
              <div className="flex space-x-2">
                <Button className="flex-1">Start Call</Button>
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
              </div>
            </div>
          ),
        };
      case "email":
        return {
          title: "Email Broker",
          content: (
            <div className="space-y-4">
              <p>Compose email to {brokerName}</p>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <input
                  id="subject"
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter email subject"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <textarea
                  id="message"
                  className="w-full p-2 border rounded-md h-24"
                  placeholder="Enter your message"
                />
              </div>
              <div className="flex space-x-2">
                <Button className="flex-1">Send Email</Button>
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
              </div>
            </div>
          ),
        };
      case "chat":
        return {
          title: "Chat with Broker",
          content: (
            <div className="space-y-4">
              <p>Starting chat with {brokerName}...</p>
              <div className="border rounded-md p-4 h-32 bg-muted/30">
                <p className="text-sm text-muted-foreground">
                  Chat interface would appear here
                </p>
              </div>
              <div className="flex space-x-2">
                <Button className="flex-1">Open Chat</Button>
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
              </div>
            </div>
          ),
        };
      default:
        return { title: "", content: null };
    }
  };

  const { title, content } = getModalContent();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background border rounded-lg shadow-lg max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        {content}
      </div>
    </div>
  );
}

export function BrokerOverview() {
  const { brokerInfo, workflowSteps } = useBorrowerStore();
  const [aiAssistantEnabled, setAiAssistantEnabled] = useState(true);
  const [contactModal, setContactModal] = useState<{
    isOpen: boolean;
    type: "call" | "email" | "chat" | null;
  }>({
    isOpen: false,
    type: null,
  });

  if (!brokerInfo) {
    return (
      <Card className="h-fit">
        <CardContent className="flex items-center justify-center py-12">
          <p className="text-muted-foreground">Loading broker information...</p>
        </CardContent>
      </Card>
    );
  }

  const handleContactAction = (type: "call" | "email" | "chat") => {
    setContactModal({ isOpen: true, type });
  };

  const closeContactModal = () => {
    setContactModal({ isOpen: false, type: null });
  };

  return (
    <>
      <Card className="h-fit" data-testid="broker-overview">
        <CardHeader>
          <CardTitle>Broker Overview</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold mb-4">{brokerInfo.name}</h3>
            <BrokerStats broker={brokerInfo} />
          </div>

          {/* Desktop Contact Buttons - Segmented Control Style */}
          <div className="flex rounded-lg border overflow-hidden">
            <Button
              variant="ghost"
              size="sm"
              className="flex-1 rounded-none border-r hover:bg-accent"
              onClick={() => handleContactAction("call")}
            >
              <Phone className="w-4 h-4 mr-2" />
              Call
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="flex-1 rounded-none border-r hover:bg-accent"
              onClick={() => handleContactAction("email")}
            >
              <Mail className="w-4 h-4 mr-2" />
              Email
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="flex-1 rounded-none hover:bg-accent"
              onClick={() => handleContactAction("chat")}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat
            </Button>
          </div>

          <Separator />

          {/* Desktop Workflow - Always Visible */}
          {workflowSteps.length > 0 && (
            <>
              <div className="hidden md:block">
                <OnboardingWorkflow steps={workflowSteps} />
              </div>

              {/* Mobile Workflow - Accordion */}
              <div className="md:hidden">
                <Accordion type="single" collapsible>
                  <AccordionItem value="workflow">
                    <AccordionTrigger>Onboarding Workflow</AccordionTrigger>
                    <AccordionContent>
                      <OnboardingWorkflow steps={workflowSteps} />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
              <Separator />
            </>
          )}

          {/* AI Assistant Toggle */}
          <div className="flex items-center space-x-2">
            <Switch
              id="ai-assistant"
              checked={aiAssistantEnabled}
              onCheckedChange={setAiAssistantEnabled}
            />
            <Label htmlFor="ai-assistant" className="text-sm">
              AI Assistant
            </Label>
            {aiAssistantEnabled && (
              <span className="text-xs text-emerald-600 dark:text-emerald-400">
                Active
              </span>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Contact Modal */}
      <ContactModal
        isOpen={contactModal.isOpen}
        onClose={closeContactModal}
        type={contactModal.type!}
        brokerName={brokerInfo.name}
      />
    </>
  );
}
