
import { supabase } from "@/integrations/supabase/client";
import { hotToast } from "@/components/ui/hot-toast";
import { Check } from "lucide-react";

// Define types for our service
export interface Team {
  id: string;
  name: string;
  description: string | null;
  logo_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface TeamMember {
  id: string;
  team_id: string;
  user_id: string;
  role: string;
  joined_at: string;
  profile?: {
    name: string;
    avatar_url: string | null;
  };
}

// Helper function to get all teams
export const getTeams = async (): Promise<Team[]> => {
  try {
    const { data, error } = await supabase
      .from("teams")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    return data || [];
  } catch (error: any) {
    hotToast({
      title: "Error",
      description: `Failed to fetch teams: ${error.message}`,
      variant: "destructive"
    });
    console.error("Error fetching teams:", error);
    return [];
  }
};

// Helper function to get a team by ID
export const getTeamById = async (id: string): Promise<Team | null> => {
  try {
    const { data, error } = await supabase
      .from("teams")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      throw error;
    }

    return data;
  } catch (error: any) {
    hotToast({
      title: "Error",
      description: `Failed to fetch team: ${error.message}`,
      variant: "destructive"
    });
    console.error("Error fetching team:", error);
    return null;
  }
};

// Helper function to get team members
export const getTeamMembers = async (teamId: string): Promise<TeamMember[]> => {
  try {
    const { data, error } = await supabase
      .from("team_members")
      .select(`
        *,
        profiles:user_id (
          name,
          avatar_url
        )
      `)
      .eq("team_id", teamId);

    if (error) {
      throw error;
    }

    return data || [];
  } catch (error: any) {
    hotToast({
      title: "Error",
      description: `Failed to fetch team members: ${error.message}`,
      variant: "destructive"
    });
    console.error("Error fetching team members:", error);
    return [];
  }
};

// Helper function to join a team
export const joinTeam = async (teamId: string, userId: string, role: string = "member"): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from("team_members")
      .insert([
        {
          team_id: teamId,
          user_id: userId,
          role,
        },
      ]);

    if (error) {
      throw error;
    }

    hotToast({
      title: "Success",
      description: "You have joined the team!",
      variant: "success",
      icon: <Check className="h-4 w-4 text-green-500" />
    });

    return true;
  } catch (error: any) {
    hotToast({
      title: "Error",
      description: `Failed to join team: ${error.message}`,
      variant: "destructive"
    });
    console.error("Error joining team:", error);
    return false;
  }
};

// Helper function to create a team
export const createTeam = async (name: string, description: string, logoUrl?: string | null): Promise<Team | null> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new Error("You must be logged in to create a team");
    }

    const { data, error } = await supabase
      .from("teams")
      .insert([
        {
          name,
          description,
          logo_url: logoUrl,
        },
      ])
      .select()
      .single();

    if (error) {
      throw error;
    }

    // Make the creator an admin of the team
    const { error: memberError } = await supabase
      .from("team_members")
      .insert([
        {
          team_id: data.id,
          user_id: user.id,
          role: "admin",
        },
      ]);

    if (memberError) {
      throw memberError;
    }

    hotToast({
      title: "Success",
      description: "Team created successfully!",
      variant: "success",
      icon: <Check className="h-4 w-4 text-green-500" />
    });

    return data;
  } catch (error: any) {
    hotToast({
      title: "Error",
      description: `Failed to create team: ${error.message}`,
      variant: "destructive"
    });
    console.error("Error creating team:", error);
    return null;
  }
};

// Helper function to upload team logo
export const uploadTeamLogo = async (
  userId: string,
  file: File
): Promise<string | null> => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `team-logo-${userId}-${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    // Upload the file to the teams bucket (created in SQL migration)
    const { error: uploadError, data } = await supabase.storage
      .from('teams')
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
      .from('teams')
      .getPublicUrl(filePath);

    console.log("Team logo uploaded successfully, public URL:", publicUrl);
    return publicUrl;
  } catch (error: any) {
    console.error("Error uploading team logo:", error);
    hotToast({
      title: "Error",
      description: `Failed to upload image: ${error.message}`,
      variant: "destructive"
    });
    return null;
  }
};

// Helper function to leave a team
export const leaveTeam = async (teamId: string, userId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from("team_members")
      .delete()
      .eq("team_id", teamId)
      .eq("user_id", userId);

    if (error) {
      throw error;
    }

    hotToast({
      title: "Success",
      description: "You have left the team",
      variant: "success",
      icon: <Check className="h-4 w-4 text-green-500" />
    });

    return true;
  } catch (error: any) {
    hotToast({
      title: "Error",
      description: `Failed to leave team: ${error.message}`,
      variant: "destructive"
    });
    console.error("Error leaving team:", error);
    return false;
  }
};
