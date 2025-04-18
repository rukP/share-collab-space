
import { supabase } from "@/integrations/supabase/client";
import { hotToast } from "@/components/ui/hot-toast";
import { Project } from "./types";

// In-memory cache for projects to reduce database load
const projectCache = new Map<string, { data: Project, timestamp: number }>();
const CACHE_DURATION = 60 * 1000; // 60 seconds

// Helper function to get all projects with improved caching
export const getProjects = async (): Promise<Project[]> => {
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    // Map data to ensure correct typing
    const typedProjects: Project[] = data?.map(project => ({
      ...project,
      status: project.status as 'open' | 'closed' | 'completed'
    })) || [];

    // Update cache with fresh data
    typedProjects.forEach(project => {
      projectCache.set(project.id, { 
        data: project, 
        timestamp: Date.now() 
      });
    });

    return typedProjects;
  } catch (error: any) {
    hotToast({
      title: "Error",
      description: `Failed to fetch projects: ${error.message}`,
      variant: "destructive"
    });
    console.error("Error fetching projects:", error);
    return [];
  }
};

// Helper function to get a project by ID with caching
export const getProjectById = async (id: string): Promise<Project | null> => {
  try {
    // Check cache first
    const cached = projectCache.get(id);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data;
    }

    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw error;
    }

    // Ensure correct typing
    const typedProject: Project = {
      ...data,
      status: data.status as 'open' | 'closed' | 'completed'
    };

    // Update cache
    if (typedProject) {
      projectCache.set(id, { data: typedProject, timestamp: Date.now() });
    }

    return typedProject;
  } catch (error: any) {
    hotToast({
      title: "Error",
      description: `Failed to fetch project: ${error.message}`,
      variant: "destructive"
    });
    console.error("Error fetching project:", error);
    return null;
  }
};

// Helper function to prefetch and cache projects
export const prefetchProjects = async (): Promise<void> => {
  try {
    const projects = await getProjects();
    console.log(`Prefetched ${projects.length} projects`);
  } catch (error) {
    console.error("Error prefetching projects:", error);
  }
};
