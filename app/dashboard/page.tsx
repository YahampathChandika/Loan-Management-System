"use client";

import { useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { BorrowerPipeline } from "@/components/borrower/BorrowerPipeline";
import { BorrowerDetail } from "@/components/borrower/BorrowerDetail";
import { BrokerOverview } from "@/components/broker/BrokerOverview";
import { ToastContainer, useToast } from "@/components/ui/toast";
import { useBorrowerStore } from "@/store/useBorrowerStore";
import { apiClient } from "@/lib/api";

export default function DashboardPage() {
  const { setPipeline, setBrokerInfo, setWorkflowSteps, setLoading, setError } =
    useBorrowerStore();

  const { toasts, removeToast, success, error, info } = useToast();

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Load pipeline data
        const pipelineData = await apiClient.getBorrowerPipeline();
        setPipeline(pipelineData);

        // Load broker info (using ID "1" for demo)
        const brokerData = await apiClient.getBrokerInfo("1");
        setBrokerInfo(brokerData);

        // Load workflow steps
        const workflowData = await apiClient.getOnboardingWorkflow();
        setWorkflowSteps(workflowData.steps);
      } catch (err) {
        console.error("Failed to load initial data:", err);
        const errorMessage =
          "Failed to load dashboard data. Please refresh the page.";
        setError(errorMessage);
        error("Loading Failed", errorMessage);
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []); // Empty dependency array - only run once on mount

  const handleToast = (
    type: "success" | "error" | "info",
    title: string,
    message?: string
  ) => {
    switch (type) {
      case "success":
        success(title, message);
        break;
      case "error":
        error(title, message);
        break;
      case "info":
        info(title, message);
        break;
    }
  };

  return (
    <>
      <Layout>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Borrower Pipeline */}
          <div className="lg:col-span-1">
            <BorrowerPipeline />
          </div>

          {/* Middle Panel - Borrower Details */}
          <div className="lg:col-span-1">
            <BorrowerDetail onToast={handleToast} />
          </div>

          {/* Right Panel - Broker Overview */}
          <div className="lg:col-span-1">
            <BrokerOverview />
          </div>
        </div>
      </Layout>

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </>
  );
}
