
import { supabase } from "@/integrations/supabase/client";
import { hotToast } from "@/components/ui/hot-toast";
import { Check } from "lucide-react";
import { Project } from "./types";
import { validateData, projectSchema } from "@/lib/validation";

// Helper function to create a project
export const createProject = async (
  title: string, 
  description: string, 
  teamId: string, 
  imageUrl?: string
): Promise<Project | null> => {
  try {
    // Validate input data
    const validation = validateData(projectSchema, { title, description, teamId, imageUrl });
    if (!validation.success) {
      throw new Error(validation.error);
    }

    // Debounce and throttle protection
    const timestamp = localStorage.getItem('lastProjectCreation');
    const now = Date.now();
    if (timestamp && now - parseInt(timestamp) < 5000) {
      throw new Error('Please wait a few seconds before creating another project');
    }
    localStorage.setItem('lastProjectCreation', now.toString());

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
      icon: <Check className="h-4 w-4 text-green-500" />
    });

    // Cast the status to the proper type
    return {
      ...data,
      status: data.status as 'open' | 'closed' | 'completed'
    };
  } catch (error: any) {
    hotToast({
      title: "Error",
      description: `Failed to create project: ${error.message}`,
      variant: "destructive"
    });
    console.error("Error creating project:", error);
    return null;
  }
};
