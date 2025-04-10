
import { supabase } from "@/integrations/supabase/client";

// Check if the current user has liked a project and get the total count
export const getProjectLikeStatus = async (projectId: string) => {
  try {
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    
    // Get project details for like count
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .select('likes')
      .eq('id', projectId)
      .single();
      
    if (projectError) {
      console.error("Error fetching project likes:", projectError);
      return { count: 0, isLiked: false };
    }
    
    // If not logged in, return like count but not liked
    if (!user) {
      return { count: project?.likes || 0, isLiked: false };
    }
    
    // Check if the user has liked the project
    const { data, error } = await supabase
      .from('project_likes')
      .select('*')
      .eq('project_id', projectId)
      .eq('user_id', user.id)
      .maybeSingle();
      
    if (error) {
      console.error("Error checking like status:", error);
      return { count: project?.likes || 0, isLiked: false };
    }
    
    return {
      count: project?.likes || 0,
      isLiked: !!data
    };
  } catch (error) {
    console.error("Error in getProjectLikeStatus:", error);
    return { count: 0, isLiked: false };
  }
};
