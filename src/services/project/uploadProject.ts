
import { supabase } from "@/integrations/supabase/client";
import { hotToast } from "@/components/ui/hot-toast";

/**
 * Upload a project image to Supabase Storage
 * 
 * @param userId - The ID of the user uploading the file
 * @param file - The file to upload
 * @returns A Promise that resolves to the public URL of the uploaded file or null if there was an error
 */
export const uploadProjectImage = async (
  userId: string,
  file: File
): Promise<string | null> => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}-${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    // Upload the file to the projects bucket (bucket already exists from the SQL migration)
    const { error: uploadError } = await supabase.storage
      .from('projects')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      throw uploadError;
    }

    // Get the public URL for the uploaded file
    const { data: { publicUrl } } = supabase.storage
      .from('projects')
      .getPublicUrl(filePath);

    console.log("Project image uploaded successfully, public URL:", publicUrl);
    return publicUrl;
  } catch (error: any) {
    console.error("Error uploading project image:", error);
    hotToast({
      title: "Error",
      description: `Failed to upload image: ${error.message}`,
      variant: "destructive"
    });
    return null;
  }
};

/**
 * Stores a new project in the database
 * 
 * @param title - Project title
 * @param description - Project description
 * @param userId - The ID of the user creating the project
 * @param imageUrl - Optional URL of the project image
 * @param tags - Optional array of tags for the project
 * @returns A Promise that resolves to the created project or null if there was an error
 */
export const createProject = async (
  title: string,
  description: string,
  userId: string,
  imageUrl: string | null,
  tags?: string[]
) => {
  try {
    // Store project directly under the user's ID instead of using it as a team ID
    // This avoids calling the problematic RPC function
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .insert({
        title,
        description,
        team_id: userId, // Direct user ID assignment instead of using RPC lookup
        image_url: imageUrl,
        status: 'open'
      })
      .select()
      .single();

    if (projectError) {
      throw projectError;
    }

    return project;
  } catch (error: any) {
    console.error("Error creating project:", error);
    hotToast({
      title: "Error",
      description: error.message || "Failed to create project",
      variant: "destructive"
    });
    return null;
  }
};
