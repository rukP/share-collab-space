
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Profile, getCurrentProfile } from "@/services/profileService";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";

export const useProfile = () => {
  const queryClient = useQueryClient();
  
  // Set up auth state listener to invalidate queries when auth changes
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      queryClient.invalidateQueries({ queryKey: ['userProjects'] });
      queryClient.invalidateQueries({ queryKey: ['userTeams'] });
    });

    return () => subscription.unsubscribe();
  }, [queryClient]);

  // Fetch user profile data
  const profileQuery = useQuery({
    queryKey: ['profile'],
    queryFn: getCurrentProfile,
  });

  // Fetch user's projects
  const projectsQuery = useQuery({
    queryKey: ['userProjects'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];
      
      // Get projects where user is on the team
      const { data, error } = await supabase
        .from('projects')
        .select('id, title, description, image_url, likes, status, created_at, team_id')
        .eq('team_id', user.id)
        .order('created_at', { ascending: false });
        
      if (error) {
        console.error("Error fetching projects:", error);
        return [];
      }
      
      return data.map(project => ({
        id: project.id,
        title: project.title,
        description: project.description,
        imageUrl: project.image_url || "https://picsum.photos/seed/project/800/600",
        likes: project.likes || 0,
        author: profileQuery.data?.name || 'User',
        status: project.status as "open" | "closed" | "completed",
        createdAt: project.created_at
      }));
    },
    enabled: !!profileQuery.data,
  });

  // Fetch user's teams
  const teamsQuery = useQuery({
    queryKey: ['userTeams'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];
      
      // Get teams where user is a member
      const { data: memberData, error: memberError } = await supabase
        .from('team_members')
        .select('team_id')
        .eq('user_id', user.id);
        
      if (memberError) {
        console.error("Error fetching team memberships:", memberError);
        return [];
      }
      
      if (!memberData.length) return [];
      
      // Get team details
      const teamIds = memberData.map(membership => membership.team_id);
      const { data, error } = await supabase
        .from('teams')
        .select('id, name, description, created_at')
        .in('id', teamIds);
        
      if (error) {
        console.error("Error fetching teams:", error);
        return [];
      }
      
      return data.map(team => ({
        id: team.id,
        name: team.name,
        description: team.description,
        members: 0, // Could fetch this with a separate query if needed
        openPositions: 0, // Could fetch this with a separate query if needed
        createdAt: team.created_at,
      }));
    },
    enabled: !!profileQuery.data,
  });

  // Check if the profile is incomplete
  const isProfileIncomplete = !profileQuery.data || 
    !profileQuery.data.name || 
    !profileQuery.data.course || 
    !profileQuery.data.bio || 
    !profileQuery.data.avatar_url;

  // Provide method to refresh profile data
  const refreshProfile = () => {
    queryClient.invalidateQueries({ queryKey: ['profile'] });
    queryClient.invalidateQueries({ queryKey: ['userProjects'] });
    queryClient.invalidateQueries({ queryKey: ['userTeams'] });
  };

  return {
    profile: profileQuery.data,
    isProfileLoading: profileQuery.isLoading,
    projects: projectsQuery.data || [],
    isProjectsLoading: projectsQuery.isLoading,
    teams: teamsQuery.data || [],
    isTeamsLoading: teamsQuery.isLoading,
    isProfileIncomplete,
    refreshProfile
  };
};
