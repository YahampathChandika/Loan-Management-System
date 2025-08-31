import {
  BorrowerPipeline,
  BorrowerDetail,
  BrokerInfo,
  ApiResponse,
} from "./types";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";

class ApiClient {
  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    try {
      const response = await fetch(`${baseUrl}/api${endpoint}`, {
        headers: {
          "Content-Type": "application/json",
          ...options?.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("API request error:", error);
      throw error;
    }
  }

  async getBorrowerPipeline(): Promise<BorrowerPipeline> {
    return this.request<BorrowerPipeline>("/borrowers/pipeline");
  }

  async getBorrowerDetail(id: string): Promise<BorrowerDetail> {
    return this.request<BorrowerDetail>(`/borrowers/${id}`);
  }

  async requestDocuments(id: string): Promise<ApiResponse<null>> {
    return this.request<ApiResponse<null>>(
      `/borrowers/${id}/request-documents`,
      {
        method: "POST",
      }
    );
  }

  async sendToValuer(id: string): Promise<ApiResponse<null>> {
    return this.request<ApiResponse<null>>(`/borrowers/${id}/send-valuer`, {
      method: "POST",
    });
  }

  async approveLoan(id: string): Promise<ApiResponse<null>> {
    return this.request<ApiResponse<null>>(`/borrowers/${id}/approve`, {
      method: "POST",
    });
  }

  async escalateToCredit(id: string): Promise<ApiResponse<null>> {
    return this.request<ApiResponse<null>>(`/borrowers/${id}/escalate`, {
      method: "POST",
    });
  }

  async getBrokerInfo(id: string): Promise<BrokerInfo> {
    return this.request<BrokerInfo>(`/broker/${id}`);
  }

  async getOnboardingWorkflow(): Promise<{ steps: string[] }> {
    return this.request<{ steps: string[] }>("/onboarding/workflow");
  }
}

export const apiClient = new ApiClient();
