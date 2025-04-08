
import { supabase } from "@/integrations/supabase/client";

// Create a reusable API client to centralize request handling
const apiClient = {
  // Generic fetch method with proper error handling
  async fetch<T>(path: string, options?: RequestInit): Promise<T> {
    try {
      const response = await fetch(path, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`API request failed: ${path}`, error);
      throw error;
    }
  },

  // Helper to get current user session
  async getSession() {
    return await supabase.auth.getSession();
  },

  // Helper to check if user is authenticated
  async isAuthenticated(): Promise<boolean> {
    const { data } = await this.getSession();
    return !!data.session;
  }
};

export default apiClient;
