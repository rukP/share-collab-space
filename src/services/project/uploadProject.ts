
import { supabase } from "@/integrations/supabase/client";
import { hotToast } from "@/components/ui/hot-toast";
import { Check } from "lucide-react";
import { Project } from "./types";

export interface ProjectUploadData {
  title: string;
  description: string;
  teamId: string;
  imageUrl?: string | null;
  tags?: string[];
}

export const uploadProjectImage = async (file: File, userId: string): Promise<string | null> => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}-${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    // Check if the projects bucket exists, if not create it
    const { data: buckets } = await supabase.storage.listBuckets();
    const projectsBucketExists = buckets?.some(bucket => bucket.name === 'projects');
    
    if (!projectsBucketExists) {
      console.log("Creating projects bucket");
      const { error: createBucketError } = await supabase.storage.createBucket('projects', {
        public: true,
        fileSizeLimit: 10485760, // 10MB
      });
      
      if (createBucketError) {
        console.error("Error creating projects bucket:", createBucketError);
        throw createBucketError;
      }
    }

    // Upload the file to the projects bucket
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

export const createProject = async (
  projectData: ProjectUploadData,
  imageFile: File | null
): Promise<Project | null> => {
  try {
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new Error('You must be logged in to share a project');
    }

    // Upload image if provided
    let imageUrl = projectData.imageUrl || null;
    if (imageFile) {
      imageUrl = await uploadProjectImage(imageFile, user.id);
      if (!imageUrl) {
        throw new Error('Failed to upload image');
      }
    }

    // Store project in database
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .insert({
        title: projectData.title,
        description: projectData.description,
        team_id: projectData.teamId || user.id,
        image_url: imageUrl,
        status: 'open',
        // Store tags as metadata in the description for now
        // In a real app, you'd create a separate tags table
      })
      .select()
      .single();

    if (projectError) {
      throw projectError;
    }

    hotToast({
      title: "Success!",
      description: "Your project has been shared with the community.",
      variant: "success",
      icon: <Check className="h-4 w-4 text-green-500" />
    });
    
    // Cast the status to the proper type and return the created project
    return {
      ...project,
      status: project.status as 'open' | 'closed' | 'completed'
    };
  } catch (error: any) {
    console.error("Error creating project:", error);
    hotToast({
      title: "Error",
      description: error.message || "Failed to share project",
      variant: "destructive"
    });
    return null;
  }
};
