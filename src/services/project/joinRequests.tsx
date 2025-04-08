
import { supabase } from "@/integrations/supabase/client";
import { hotToast } from "@/components/ui/hot-toast";
import { Check } from "lucide-react";
import { JoinRequest } from "./types";

// Helper function to submit a join request
export const submitJoinRequest = async (projectId: string, message: string): Promise<boolean> => {
  try {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) {
      hotToast({
        title: "Authentication Required",
        description: "Please log in to submit a join request",
        variant: "destructive"
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
      icon: <Check className="h-4 w-4 text-green-500" />
    });

    return true;
  } catch (error: any) {
    hotToast({
      title: "Error",
      description: `Failed to submit join request: ${error.message}`,
      variant: "destructive"
    });
    console.error("Error submitting join request:", error);
    return false;
  }
};
