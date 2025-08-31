import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { BorrowerCard } from "./BorrowerCard";
import { useBorrowerStore } from "@/store/useBorrowerStore";
import { TabValue } from "@/lib/types";
import { apiClient } from "@/lib/api";
import {
  getActiveTabBorrowers,
  getFilteredBorrowers,
} from "../../lib/borrower-utils";
import { useMemo } from "react";

export function BorrowerPipeline() {
  const {
    pipeline,
    activeTab,
    activeBorrower,
    isActive,
    searchTerm,
    setActiveTab,
    setActiveBorrower,
    setLoading,
    setIsActive,
  } = useBorrowerStore();

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

  const handleRadioChange = (value: string) => {
    setIsActive(value === "active");
  };

  // Use useMemo to prevent unnecessary re-calculations
  const activeTabBorrowers = useMemo(
    () => getActiveTabBorrowers(pipeline, activeTab),
    [pipeline, activeTab]
  );

  const filteredBorrowers = useMemo(
    () => getFilteredBorrowers(activeTabBorrowers, searchTerm, isActive),
    [activeTabBorrowers, searchTerm, isActive]
  );

  const getTabCount = (tabValue: TabValue) => {
    if (!pipeline) return 0;
    switch (tabValue) {
      case "new":
        return pipeline.new.length;
      case "in_review":
        return pipeline.in_review.length;
      case "approved":
        return pipeline.approved.length;
      default:
        return 0;
    }
  };

  const renderEmptyState = () => {
    if (!isActive) {
      return (
        <p className="text-center text-muted-foreground py-8">
          No inactive borrowers to display
        </p>
      );
    }

    if (searchTerm.trim()) {
      return (
        <div className="text-center text-muted-foreground py-8 space-y-2">
          <p>No borrowers found for &ldquo;{searchTerm}&ldquo;</p>
          <p className="text-xs">Try adjusting your search terms</p>
        </div>
      );
    }

    return (
      <p className="text-center text-muted-foreground py-8">
        No borrowers in this category
      </p>
    );
  };

  return (
    <Card className="h-fit" data-testid="borrower-pipeline">
      <CardHeader>
        <CardTitle>Borrower Pipeline</CardTitle>
        {searchTerm && (
          <p className="text-sm text-muted-foreground">
            Searching for: &ldquo;{searchTerm}&ldquo;
          </p>
        )}
      </CardHeader>
      <CardContent>
        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className="space-y-4"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="new" className="text-xs md:text-sm">
              New ({getTabCount("new")})
            </TabsTrigger>
            <TabsTrigger value="in_review" className="text-xs md:text-sm">
              In Review ({getTabCount("in_review")})
            </TabsTrigger>
            <TabsTrigger value="approved" className="text-xs md:text-sm">
              Approved ({getTabCount("approved")})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-3">
            {filteredBorrowers.length === 0
              ? renderEmptyState()
              : filteredBorrowers.map((borrower) => (
                  <BorrowerCard
                    key={borrower.id}
                    borrower={borrower}
                    isActive={activeBorrower?.id === borrower.id}
                    onClick={() => handleBorrowerClick(borrower.id)}
                  />
                ))}
          </TabsContent>
        </Tabs>

        <div className="mt-6 pt-4 border-t">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            F-SANITISED ACTIVE
          </h4>
          <RadioGroup
            value={isActive ? "active" : "inactive"}
            onValueChange={handleRadioChange}
          >
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
