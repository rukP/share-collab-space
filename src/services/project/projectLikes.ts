
import { supabase } from "@/integrations/supabase/client";

// Check if a user has liked a project
export const checkProjectLike = async (projectId: string): Promise<boolean> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    const { data, error } = await supabase
      .from('project_likes')
      .select('*')
      .eq('project_id', projectId)
      .eq('user_id', user.id)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error("Error checking project like:", error);
      return false;
    }

    return !!data;
  } catch (error) {
    console.error("Error checking project like:", error);
    return false;
  }
};

// Toggle like/unlike a project
export const toggleProjectLike = async (projectId: string): Promise<boolean> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    // Check if already liked
    const isLiked = await checkProjectLike(projectId);

    if (isLiked) {
      // Unlike the project
      const { error } = await supabase
        .from('project_likes')
        .delete()
        .eq('project_id', projectId)
        .eq('user_id', user.id);

      if (error) {
        console.error("Error unliking project:", error);
        return false;
      }

      // Call RPC function to update like count in the projects table
      await supabase.rpc('decrement_likes', { 
        project_id: projectId 
      });
    } else {
      // Like the project
      const { error } = await supabase
        .from('project_likes')
        .insert({ project_id: projectId, user_id: user.id });

      if (error) {
        console.error("Error liking project:", error);
        return false;
      }

      // Call RPC function to update like count in the projects table
      await supabase.rpc('increment_likes', { 
        project_id: projectId 
      });
    }

    return true;
  } catch (error) {
    console.error("Error toggling project like:", error);
    return false;
  }
};

// Get the number of likes for a project
export const getProjectLikes = async (projectId: string): Promise<number> => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('likes')
      .eq('id', projectId)
      .single();

    if (error) {
      console.error("Error fetching project likes:", error);
      return 0;
    }

    return data.likes || 0;
  } catch (error) {
    console.error("Error fetching project likes:", error);
    return 0;
  }
};

// Re-export the toggleProjectLike as likeProject to maintain compatibility
export const likeProject = toggleProjectLike;
