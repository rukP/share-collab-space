
import { supabase } from "@/integrations/supabase/client";
import { hotToast } from "@/components/ui/hot-toast";
import { Heart } from "lucide-react";

// Toggle like status for a project
export const likeProject = async (projectId: string) => {
  try {
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      hotToast({
        title: "Authentication required",
        description: "Please sign in to like projects",
        variant: "warning",
      });
      return { success: false };
    }
    
    // Check if the user has already liked the project
    const { data: existingLike, error: checkError } = await supabase
      .from('project_likes')
      .select('*')
      .eq('project_id', projectId)
      .eq('user_id', user.id)
      .maybeSingle();
      
    if (checkError) {
      console.error("Error checking like status:", checkError);
      return { success: false };
    }
    
    // If like exists, remove it
    if (existingLike) {
      const { error: unlikeError } = await supabase
        .from('project_likes')
        .delete()
        .eq('project_id', projectId)
        .eq('user_id', user.id);
        
      if (unlikeError) {
        console.error("Error unliking project:", unlikeError);
        return { success: false };
      }
      
      // Decrement the project's like count
      const { error: updateError } = await supabase.rpc('decrement_likes', {
        p_project_id: projectId
      });
      
      if (updateError) {
        console.error("Error updating project likes count:", updateError);
      }
      
      hotToast({
        title: "Unliked",
        description: "You have removed your like from this project",
        variant: "default",
      });
      
      return { success: true, action: 'unliked' };
    } 
    // If no like exists, add one
    else {
      const { error: likeError } = await supabase
        .from('project_likes')
        .insert({
          project_id: projectId,
          user_id: user.id
        });
        
      if (likeError) {
        console.error("Error liking project:", likeError);
        return { success: false };
      }
      
      // Increment the project's like count
      const { error: updateError } = await supabase.rpc('increment_likes', {
        p_project_id: projectId
      });
      
      if (updateError) {
        console.error("Error updating project likes count:", updateError);
      }
      
      hotToast({
        title: "Liked!",
        description: "You liked this project",
        variant: "success",
        icon: <Heart className="h-4 w-4 text-red-500 fill-red-500" />
      });
      
      return { success: true, action: 'liked' };
    }
  } catch (error: any) {
    console.error("Error in likeProject:", error);
    hotToast({
      title: "Error",
      description: error.message || "Failed to like/unlike project",
      variant: "destructive",
    });
    return { success: false };
  }
};
