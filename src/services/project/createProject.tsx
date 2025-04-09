
import { supabase } from "@/integrations/supabase/client";
import { hotToast } from "@/components/ui/hot-toast";
import { Check } from "lucide-react";
import { Project } from "./types";
import { z } from "zod";

// Project validation schema
const projectSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  teamId: z.string().uuid("Team ID must be a valid UUID"),
  imageUrl: z.string().url().optional(),
});

/**
 * Creates a new project in the database
 * 
 * @param title - Project title
 * @param description - Project description
 * @param teamId - Team ID this project belongs to
 * @param imageUrl - Optional project image URL
 * @returns The created project or null if creation failed
 */
export const createProject = async (
  title: string, 
  description: string, 
  teamId: string, 
  imageUrl?: string
): Promise<Project | null> => {
  try {
    // Validate input data with Zod directly
    const validationResult = projectSchema.safeParse({ 
      title, 
      description, 
      teamId, 
      imageUrl 
    });
    
    if (!validationResult.success) {
      throw new Error(validationResult.error.errors[0].message);
    }

    // Throttle protection - prevent rapid project creation
    const timestamp = localStorage.getItem('lastProjectCreation');
    const now = Date.now();
    if (timestamp && now - parseInt(timestamp) < 5000) {
      throw new Error('Please wait a few seconds before creating another project');
    }
    localStorage.setItem('lastProjectCreation', now.toString());

    // Create the project in Supabase
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

    // Show success message
    hotToast({
      title: "Success",
      description: "Project created successfully!",
      variant: "success",
      icon: <Check className="h-4 w-4 text-green-500" />
    });

    // Cast the status to the proper type and return the created project
    return {
      ...data,
      status: data.status as 'open' | 'closed' | 'completed'
    };
  } catch (error: any) {
    // Show error message
    hotToast({
      title: "Error",
      description: `Failed to create project: ${error.message}`,
      variant: "destructive"
    });
    console.error("Error creating project:", error);
    return null;
  }
};
