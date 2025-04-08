
import { supabase } from "@/integrations/supabase/client";
import { hotToast } from "@/components/ui/hot-toast";
import { Project } from "./types";

// Helper function to get all projects
export const getProjects = async (): Promise<Project[]> => {
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    return data || [];
  } catch (error: any) {
    hotToast({
      title: "Error",
      description: `Failed to fetch projects: ${error.message}`,
      variant: "destructive",
    });
    console.error("Error fetching projects:", error);
    return [];
  }
};

// Helper function to get a project by ID
export const getProjectById = async (id: string): Promise<Project | null> => {
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error: any) {
    hotToast({
      title: "Error",
      description: `Failed to fetch project: ${error.message}`,
      variant: "destructive",
    });
    console.error("Error fetching project:", error);
    return null;
  }
};
