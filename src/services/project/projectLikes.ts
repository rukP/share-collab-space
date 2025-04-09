
import { supabase } from "@/integrations/supabase/client";
import { hotToast } from "@/components/ui/hot-toast";

// Helper function to like a project
export const likeProject = async (projectId: string): Promise<boolean> => {
  try {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) {
      hotToast({
        title: "Authentication Required",
        description: "Please log in to like projects",
        variant: "destructive"
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

      // Decrement the likes count using RPC
      const { error: updateError } = await supabase.rpc(
        'decrement_likes', 
        { project_id: projectId }
      );
      
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

      // Increment the likes count using RPC
      const { error: updateError } = await supabase.rpc(
        'increment_likes', 
        { project_id: projectId }
      );
      
      if (updateError) {
        throw updateError;
      }

      return true;
    }
  } catch (error: any) {
    hotToast({
      title: "Error",
      description: `Failed to update like: ${error.message}`,
      variant: "destructive"
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
