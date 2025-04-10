
import { useQuery } from "@tanstack/react-query";
import { Profile, getCurrentProfile } from "@/services/profileService";
import { supabase } from "@/integrations/supabase/client";

export const useProfile = () => {
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
      
      const { data, error } = await supabase
        .from('projects')
        .select('id, title, description, image_url, likes')
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
        imageUrl: project.image_url,
        likes: project.likes,
        author: profileQuery.data?.name || 'User',
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

  return {
    profile: profileQuery.data,
    isProfileLoading: profileQuery.isLoading,
    projects: projectsQuery.data || [],
    isProjectsLoading: projectsQuery.isLoading,
    teams: teamsQuery.data || [],
    isTeamsLoading: teamsQuery.isLoading,
    isProfileIncomplete
  };
};
