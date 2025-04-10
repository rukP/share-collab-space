
import { supabase } from "@/integrations/supabase/client";
import { RpcFunctionName, RpcParams } from "@/integrations/supabase/rpcTypes";
import { Project } from "./types";

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
export const toggleProjectLike = async (projectId: string, isLiked: boolean): Promise<boolean> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

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
      const { error: rpcError } = await supabase.rpc(
        'decrement_likes' as RpcFunctionName,
        { project_id: projectId } as RpcParams['decrement_likes']
      );

      if (rpcError) {
        console.error("Error updating project like count:", rpcError);
      }
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
      const { error: rpcError } = await supabase.rpc(
        'increment_likes' as RpcFunctionName,
        { project_id: projectId } as RpcParams['increment_likes']
      );

      if (rpcError) {
        console.error("Error updating project like count:", rpcError);
      }
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
