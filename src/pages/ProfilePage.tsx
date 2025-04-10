
import { Header } from "@/components/Header";
import { ProfileSidebar } from "@/components/ProfileSidebar";
import { ProfileProjects } from "@/components/ProfileProjects";
import { ProfileTeams } from "@/components/ProfileTeams";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { UserPlus } from "lucide-react";
import { useProtectedRoute } from "@/hooks/use-protected-route";
import { Profile, getCurrentProfile } from "@/services/profileService";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const ProfilePage = () => {
  const { isLoading: authLoading } = useProtectedRoute();
  
  // Fetch user profile data
  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: getCurrentProfile,
  });

  // Fetch user's projects
  const { data: projects = [], isLoading: projectsLoading } = useQuery({
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
        author: profile?.name || 'User',
      }));
    },
    enabled: !!profile,
  });

  // Fetch user's teams
  const { data: teams = [], isLoading: teamsLoading } = useQuery({
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
    enabled: !!profile,
  });

  // Check if the profile is incomplete (missing essential information)
  const isProfileIncomplete = !profile || !profile.name || !profile.course || !profile.bio || !profile.avatar_url;

  const isLoading = authLoading || profileLoading;

  if (authLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">My Profile</h2>
          
          {isProfileIncomplete && (
            <Link to="/add-profile">
              <Button className="bg-gradient-to-r from-primary to-purple-500 hover:opacity-90">
                <UserPlus className="w-4 h-4 mr-2" />
                Complete Profile
              </Button>
            </Link>
          )}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <ProfileSidebar profile={profile} isLoading={profileLoading} />
          </div>
          
          <div className="lg:col-span-3">
            <Tabs defaultValue="projects" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="teams">Teams</TabsTrigger>
              </TabsList>
              <TabsContent value="projects">
                {projectsLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[1, 2].map(i => (
                      <Card key={i} className="h-64 animate-pulse bg-primary/5" />
                    ))}
                  </div>
                ) : (
                  <ProfileProjects projects={projects} />
                )}
              </TabsContent>
              <TabsContent value="teams">
                {teamsLoading ? (
                  <div className="space-y-4">
                    {[1, 2].map(i => (
                      <Card key={i} className="h-24 animate-pulse bg-primary/5" />
                    ))}
                  </div>
                ) : (
                  <ProfileTeams teams={teams} />
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
