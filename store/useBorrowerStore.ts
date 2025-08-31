import { create } from "zustand";
import {
  BorrowerPipeline,
  BorrowerDetail,
  BrokerInfo,
  TabValue,
} from "@/lib/types";

interface BorrowerStore {
  // State
  pipeline: BorrowerPipeline | null;
  activeBorrower: BorrowerDetail | null;
  brokerInfo: BrokerInfo | null;
  activeTab: TabValue;
  workflowSteps: string[];
  isLoading: boolean;
  error: string | null;

  // Actions
  setPipeline: (pipeline: BorrowerPipeline) => void;
  setActiveBorrower: (borrower: BorrowerDetail | null) => void;
  setBrokerInfo: (broker: BrokerInfo) => void;
  setActiveTab: (tab: TabValue) => void;
  setWorkflowSteps: (steps: string[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // Computed
  getActiveTabBorrowers: () => any[];
}

export const useBorrowerStore = create<BorrowerStore>((set, get) => ({
  // Initial state
  pipeline: null,
  activeBorrower: null,
  brokerInfo: null,
  activeTab: "new",
  workflowSteps: [],
  isLoading: false,
  error: null,

  // Actions
  setPipeline: (pipeline) => set({ pipeline }),

  setActiveBorrower: (borrower) => set({ activeBorrower: borrower }),

  setBrokerInfo: (broker) => set({ brokerInfo: broker }),

  setActiveTab: (tab) => set({ activeTab: tab }),

  setWorkflowSteps: (steps) => set({ workflowSteps: steps }),

  setLoading: (loading) => set({ isLoading: loading }),

  setError: (error) => set({ error }),

  // Computed values
  getActiveTabBorrowers: () => {
    const { pipeline, activeTab } = get();
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
  },
}));
