
import { supabase } from "@/integrations/supabase/client";
import { hotToast } from "@/components/ui/hot-toast";
import { Check } from "lucide-react";
import { Project } from "./types";

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
