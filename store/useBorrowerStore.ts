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
  searchTerm: string;
  isActive: boolean; // for radio group filter

  // Actions
  setPipeline: (pipeline: BorrowerPipeline) => void;
  setActiveBorrower: (borrower: BorrowerDetail | null) => void;
  setBrokerInfo: (broker: BrokerInfo) => void;
  setActiveTab: (tab: TabValue) => void;
  setWorkflowSteps: (steps: string[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSearchTerm: (term: string) => void;
  setIsActive: (active: boolean) => void;
}

export const useBorrowerStore = create<BorrowerStore>((set) => ({
  // Initial state
  pipeline: null,
  activeBorrower: null,
  brokerInfo: null,
  activeTab: "new",
  workflowSteps: [],
  isLoading: false,
  error: null,
  searchTerm: "",
  isActive: true,

  // Actions
  setPipeline: (pipeline) => set({ pipeline }),
  setActiveBorrower: (borrower) => set({ activeBorrower: borrower }),
  setBrokerInfo: (broker) => set({ brokerInfo: broker }),
  setActiveTab: (tab) => set({ activeTab: tab }),
  setWorkflowSteps: (steps) => set({ workflowSteps: steps }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  setSearchTerm: (term) => set({ searchTerm: term }),
  setIsActive: (active) => set({ isActive: active }),
}));
