
import { supabase } from "@/integrations/supabase/client";

// Get the total number of likes for a project
export const getProjectLikes = async (projectId: string): Promise<number> => {
  try {
    const { count, error } = await supabase
      .from("project_likes")
      .select("*", { count: 'exact' })
      .eq("project_id", projectId);

    if (error) {
      console.error("Error fetching project likes:", error);
      return 0;
    }

    return count || 0;
  } catch (error) {
    console.error("Error fetching project likes:", error);
    return 0;
  }
};

// Get project like status for the current user
export const getProjectLikeStatus = async (projectId: string): Promise<{
  count: number;
  isLiked: boolean;
}> => {
  try {
    // Get total likes count
    const { count, error: countError } = await supabase
      .from("project_likes")
      .select("*", { count: 'exact' })
      .eq("project_id", projectId);

    if (countError) {
      throw countError;
    }

    // Check if current user has liked the project
    const isLiked = await hasUserLikedProject(projectId);

    return {
      count: count || 0,
      isLiked
    };
  } catch (error) {
    console.error("Error fetching project like status:", error);
    return {
      count: 0,
      isLiked: false
    };
  }
};

// Helper function to check if a user has liked a project
const hasUserLikedProject = async (projectId: string): Promise<boolean> => {
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
  } catch (error) {
    console.error("Error checking if user liked project:", error);
    return false;
  }
};
