
import { supabase } from "@/integrations/supabase/client";
import { hotToast } from "@/components/ui/hot-toast";
import { Check } from "lucide-react";

// Define types for our service
export interface Profile {
  id: string;
  name: string | null;
  course: string | null;
  year: number | null;
  bio: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

// Helper function to get a user profile
export const getUserProfile = async (userId: string): Promise<Profile | null> => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error: any) {
    console.error("Error fetching user profile:", error);
    return null;
  }
};

// Helper function to get the current user's profile
export const getCurrentProfile = async (): Promise<Profile | null> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error: any) {
    console.error("Error fetching current profile:", error);
    return null;
  }
};

// Helper function to update a user profile
export const updateUserProfile = async (
  userId: string,
  updates: Partial<Omit<Profile, 'id' | 'created_at' | 'updated_at'>>
): Promise<Profile | null> => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", userId)
      .select()
      .single();

    if (error) {
      throw error;
    }

    hotToast({
      title: "Success",
      description: "Profile updated successfully!",
      variant: "success",
      icon: <Check className="h-4 w-4 text-green-500" />
    });

    return data;
  } catch (error: any) {
    hotToast({
      title: "Error",
      description: `Failed to update profile: ${error.message}`,
      variant: "destructive"
    });
    console.error("Error updating user profile:", error);
    return null;
  }
};

// Helper function to upload a profile avatar
export const uploadAvatar = async (userId: string, file: File): Promise<string | null> => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${fileName}`;

    // Upload the file to the avatars bucket (bucket already exists from the SQL migration)
    console.log("Uploading avatar file:", filePath);
    const { error: uploadError, data } = await supabase.storage
      .from('avatars')
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
      .from('avatars')
      .getPublicUrl(filePath);

    console.log("Avatar uploaded successfully, public URL:", publicUrl);
    return publicUrl;
  } catch (error: any) {
    hotToast({
      title: "Error",
      description: `Failed to upload avatar: ${error.message}`,
      variant: "destructive"
    });
    console.error("Error uploading avatar:", error);
    return null;
  }
};

// Helper function to check if a user is authenticated
export const isAuthenticated = async (): Promise<boolean> => {
  const { data: { user } } = await supabase.auth.getUser();
  return !!user;
};
