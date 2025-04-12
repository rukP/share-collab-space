
import { supabase } from "@/integrations/supabase/client";
import { hotToast } from "@/components/ui/hot-toast";
import { RpcFunctionName, RpcParams } from "@/integrations/supabase/rpcTypes";

/**
 * Function to toggle a like on a project
 * 
 * @param projectId - The ID of the project to toggle like for
 * @returns A boolean indicating whether the operation was successful
 */
export const likeProject = async (projectId: string): Promise<boolean> => {
  try {
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('You must be logged in to like a project');
    }
    
    // Check if user has already liked this project
    const { data: existingLike, error: checkError } = await supabase
      .from('project_likes')
      .select('*')
      .eq('project_id', projectId)
      .eq('user_id', user.id)
      .maybeSingle();
      
    if (checkError) {
      throw checkError;
    }
    
    // Perform either like or unlike based on current state
    if (existingLike) {
      // User already liked - remove like
      const { error: unlikeError } = await supabase
        .from('project_likes')
        .delete()
        .eq('id', existingLike.id);
        
      if (unlikeError) {
        throw unlikeError;
      }
      
      // Call RPC function to decrement like count in projects table
      await callLikeFunction('decrement_likes', projectId);
      
      return true;
    } else {
      // User hasn't liked - add like
      const { error: likeError } = await supabase
        .from('project_likes')
        .insert({
          project_id: projectId,
          user_id: user.id,
        });
        
      if (likeError) {
        throw likeError;
      }
      
      // Call RPC function to increment like count in projects table
      await callLikeFunction('increment_likes', projectId);
      
      return true;
    }
  } catch (error: any) {
    console.error("Error toggling project like:", error);
    hotToast({
      title: "Error",
      description: error.message || "Failed to like project",
      variant: "destructive"
    });
    return false;
  }
};

/**
 * Helper function to call like-related functions in Supabase
 */
const callLikeFunction = async (
  functionName: 'increment_likes' | 'decrement_likes',
  projectId: string
): Promise<void> => {
  try {
    const { error } = await supabase.rpc(functionName, {
      p_project_id: projectId
    } as RpcParams[typeof functionName]);
    
    if (error) {
      throw error;
    }
  } catch (error: any) {
    console.error(`Error calling ${functionName}:`, error);
    throw error;
  }
};
