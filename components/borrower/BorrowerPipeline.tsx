import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { BorrowerCard } from "./BorrowerCard";
import { useBorrowerStore } from "@/store/useBorrowerStore";
import { TabValue } from "@/lib/types";
import { getTabLabel } from "@/lib/utils";
import { apiClient } from "@/lib/api";
import { useState } from "react";

export function BorrowerPipeline() {
  const {
    pipeline,
    activeTab,
    activeBorrower,
    setActiveTab,
    setActiveBorrower,
    setLoading,
  } = useBorrowerStore();

  const [radioValue, setRadioValue] = useState("active");

  const handleTabChange = (value: string) => {
    setActiveTab(value as TabValue);
  };

  const handleBorrowerClick = async (borrowerId: string) => {
    try {
      setLoading(true);
      const borrowerDetail = await apiClient.getBorrowerDetail(borrowerId);
      setActiveBorrower(borrowerDetail);
    } catch (error) {
      console.error("Failed to fetch borrower details:", error);
    } finally {
      setLoading(false);
    }
  };

  const getActiveTabBorrowers = () => {
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
  };

  const activeBorrowers = getActiveTabBorrowers();

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>Borrower Pipeline</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className="space-y-4"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="new">
              New ({pipeline?.new.length || 0})
            </TabsTrigger>
            <TabsTrigger value="in_review">
              In Review ({pipeline?.in_review.length || 0})
            </TabsTrigger>
            <TabsTrigger value="approved">
              Approved ({pipeline?.approved.length || 0})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-3">
            {activeBorrowers.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No borrowers in this category
              </p>
            ) : (
              activeBorrowers.map((borrower) => (
                <BorrowerCard
                  key={borrower.id}
                  borrower={borrower}
                  isActive={activeBorrower?.id === borrower.id}
                  onClick={() => handleBorrowerClick(borrower.id)}
                />
              ))
            )}
          </TabsContent>
        </Tabs>

        <div className="mt-6 pt-4 border-t">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            F-SANITISED ACTIVE
          </h4>
          <RadioGroup value={radioValue} onValueChange={setRadioValue}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="active" id="active" />
              <Label htmlFor="active" className="text-sm">
                Active
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="inactive" id="inactive" />
              <Label htmlFor="inactive" className="text-sm">
                Inactive
              </Label>
            </div>
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  );
}
