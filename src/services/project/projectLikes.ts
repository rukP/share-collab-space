
import { supabase } from "@/integrations/supabase/client";
import { RpcFunctionName, RpcParams } from "@/integrations/supabase/rpcTypes";

// Toggle project like status
export const likeProject = async (projectId: string): Promise<{ isLiked: boolean }> => {
  try {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) {
      throw new Error("User must be logged in to like a project");
    }

    // Check if the user has already liked the project
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
      // User has already liked the project, so unlike it
      const { error: deleteError } = await supabase
        .from("project_likes")
        .delete()
        .eq("project_id", projectId)
        .eq("user_id", user.id);

      if (deleteError) {
        throw deleteError;
      }

      // Call RPC function to update like count in the projects table
      const { error: rpcError } = await supabase.rpc<RpcParams['decrement_likes'], any>(
        'decrement_likes' as RpcFunctionName,
        { project_id: projectId }
      );

      if (rpcError) {
        console.error("Error decrementing likes:", rpcError);
      }

      return { isLiked: false };
    } else {
      // User hasn't liked the project yet, so like it
      const { error: insertError } = await supabase
        .from("project_likes")
        .insert([{ project_id: projectId, user_id: user.id }]);

      if (insertError) {
        throw insertError;
      }

      // Call RPC function to update like count in the projects table
      const { error: rpcError } = await supabase.rpc<RpcParams['increment_likes'], any>(
        'increment_likes' as RpcFunctionName,
        { project_id: projectId }
      );

      if (rpcError) {
        console.error("Error incrementing likes:", rpcError);
      }

      return { isLiked: true };
    }
  } catch (error) {
    console.error("Error toggling project like:", error);
    throw error;
  }
};
