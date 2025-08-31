import { BorrowerPipeline, BorrowerDetail, BrokerInfo } from "@/lib/types";

export const mockPipelineData: BorrowerPipeline = {
  new: [
    {
      id: "1",
      name: "Sarah Dunn",
      loan_type: "Home Loan",
      amount: 300000,
      status: "Renew",
    },
    {
      id: "3",
      name: "Lisa Carter",
      loan_type: "Home Loan",
      amount: 450000,
      status: "New",
    },
  ],
  in_review: [
    {
      id: "2",
      name: "Alan Matthews",
      loan_type: "Personal Loan",
      amount: 20000,
      status: "In Review",
    },
  ],
  approved: [],
};

export const mockBorrowerDetails: Record<string, BorrowerDetail> = {
  "1": {
    id: "1",
    name: "Sarah Dunn",
    email: "sarah.dunn@example.com",
    phone: "(355)123-4557",
    loan_amount: 300000,
    status: "In Review",
    employment: "At Tech Company",
    income: 120000,
    existing_loan: 240000,
    credit_score: 720,
    source_of_funds: "Declared",
    risk_signal: "Missing Source of Funds declaration",
    ai_flags: [
      "Income Inconsistent with Bank statements",
      "High Debt-to-Income Ratio detected",
    ],
  },
  "2": {
    id: "2",
    name: "Alan Matthews",
    email: "alan.matthews@example.com",
    phone: "(355)987-6543",
    loan_amount: 20000,
    status: "In Review",
    employment: "Self Employed",
    income: 85000,
    existing_loan: 0,
    credit_score: 680,
    source_of_funds: "Savings",
    risk_signal: "Self-employed income verification required",
    ai_flags: ["Irregular income pattern detected"],
  },
  "3": {
    id: "3",
    name: "Lisa Carter",
    email: "lisa.carter@example.com",
    phone: "(355)555-7890",
    loan_amount: 450000,
    status: "New",
    employment: "Senior Manager",
    income: 150000,
    existing_loan: 180000,
    credit_score: 750,
    source_of_funds: "Salary + Bonus",
    risk_signal: "None",
    ai_flags: [],
  },
};

export const mockBrokerInfo: BrokerInfo = {
  name: "Robert Turner",
  deals: 16,
  approval_rate: "75%",
  pending: 7660,
};

export const mockWorkflowSteps = [
  "Deal Intake",
  "IDV & Credit Check",
  "Document Upload",
  "AI Validation",
  "Credit Committee",
  "Approval & Docs",
  "Funder Syndication",
];
