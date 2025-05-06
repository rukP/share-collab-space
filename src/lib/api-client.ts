
import { mockAuth } from "@/data/mockDataStore";

// Create a dummy API client to replace the real one
const apiClient = {
  // Generic fetch method that returns mock data
  async fetch<T>(path: string, options?: RequestInit): Promise<T> {
    console.log(`Mock API Request: ${path}`, options);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Return empty object as mock response
    return {} as T;
  },

  // Helper to get current user session (using mock auth)
  async getSession() {
    return { data: { session: mockAuth.session } };
  },

  // Helper to check if user is authenticated
  async isAuthenticated(): Promise<boolean> {
    return true; // Always authenticated in mock mode
  }
};

export default apiClient;
