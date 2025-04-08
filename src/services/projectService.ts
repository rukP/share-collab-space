
import { supabase } from "@/integrations/supabase/client";
import { hotToast } from "@/components/ui/hot-toast";
import { Check } from "lucide-react";

// Define types for our service
export interface Project {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  team_id: string | null;
  status: 'open' | 'closed' | 'completed' | null;
  likes: number | null;
  created_at: string;
  updated_at: string;
}

export interface JoinRequest {
  id: string;
  project_id: string;
  user_id: string;
  message: string | null;
  status: 'pending' | 'approved' | 'rejected' | null;
  created_at: string;
  updated_at: string;
}

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

// Helper function to create a project
export const createProject = async (
  title: string, 
  description: string, 
  teamId: string, 
  imageUrl?: string
): Promise<Project | null> => {
  try {
    const { data, error } = await supabase
      .from("projects")
      .insert([
        {
          title,
          description,
          team_id: teamId,
          image_url: imageUrl,
          status: 'open',
        },
      ])
      .select()
      .single();

    if (error) {
      throw error;
    }

    hotToast({
      title: "Success",
      description: "Project created successfully!",
      variant: "success",
      icon: <Check className="h-4 w-4 text-green-500" />,
    });

    return data;
  } catch (error: any) {
    hotToast({
      title: "Error",
      description: `Failed to create project: ${error.message}`,
      variant: "destructive",
    });
    console.error("Error creating project:", error);
    return null;
  }
};

// Helper function to like a project
export const likeProject = async (projectId: string): Promise<boolean> => {
  try {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) {
      hotToast({
        title: "Authentication Required",
        description: "Please log in to like projects",
        variant: "destructive",
      });
      return false;
    }

    const { data: existingLike, error: checkError } = await supabase
      .from("project_likes")
      .select("*")
      .eq("project_id", projectId)
      .eq("user_id", user.id)
      .maybeSingle();

    if (checkError) {
      throw checkError;
    }

    if (existingLike) {
      // User already liked the project, so unlike it
      const { error: unlikeError } = await supabase
        .from("project_likes")
        .delete()
        .eq("project_id", projectId)
        .eq("user_id", user.id);

      if (unlikeError) {
        throw unlikeError;
      }

      // Decrement the likes count
      const { error: updateError } = await supabase.rpc('decrement_likes', { project_id: projectId });
      if (updateError) {
        throw updateError;
      }

      return false;
    } else {
      // User hasn't liked the project yet, so like it
      const { error: likeError } = await supabase
        .from("project_likes")
        .insert([
          {
            project_id: projectId,
            user_id: user.id,
          },
        ]);

      if (likeError) {
        throw likeError;
      }

      // Increment the likes count
      const { error: updateError } = await supabase.rpc('increment_likes', { project_id: projectId });
      if (updateError) {
        throw updateError;
      }

      return true;
    }
  } catch (error: any) {
    hotToast({
      title: "Error",
      description: `Failed to update like: ${error.message}`,
      variant: "destructive",
    });
    console.error("Error liking/unliking project:", error);
    return false;
  }
};

// Helper function to check if a user has liked a project
export const hasUserLikedProject = async (projectId: string): Promise<boolean> => {
  try {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) {
      return false;
    }

    const { data, error } = await supabase
      .from("project_likes")
      .select("*")
      .eq("project_id", projectId)
      .eq("user_id", user.id)
      .maybeSingle();

    if (error) {
      throw error;
    }

    return !!data;
  } catch (error: any) {
    console.error("Error checking if user liked project:", error);
    return false;
  }
};

// Helper function to submit a join request
export const submitJoinRequest = async (projectId: string, message: string): Promise<boolean> => {
  try {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) {
      hotToast({
        title: "Authentication Required",
        description: "Please log in to submit a join request",
        variant: "destructive",
      });
      return false;
    }

    const { error } = await supabase
      .from("join_requests")
      .insert([
        {
          project_id: projectId,
          user_id: user.id,
          message,
          status: 'pending',
        },
      ]);

    if (error) {
      throw error;
    }

    hotToast({
      title: "Success",
      description: "Join request submitted successfully!",
      variant: "success",
      icon: <Check className="h-4 w-4 text-green-500" />,
    });

    return true;
  } catch (error: any) {
    hotToast({
      title: "Error",
      description: `Failed to submit join request: ${error.message}`,
      variant: "destructive",
    });
    console.error("Error submitting join request:", error);
    return false;
  }
};
