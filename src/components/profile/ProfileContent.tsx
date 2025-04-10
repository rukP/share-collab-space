
import { ProfileSidebar } from "@/components/ProfileSidebar";
import { ProfileProjects } from "@/components/ProfileProjects";
import { ProfileTeams } from "@/components/ProfileTeams";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Profile } from "@/services/profileService";

interface ProfileContentProps {
  profile: Profile | null;
  isProfileLoading: boolean;
  projects: Array<{
    id: string | number;
    title: string;
    description: string;
    imageUrl: string;
    likes: number;
    author: string;
  }>;
  isProjectsLoading: boolean;
  teams: Array<{
    id: string | number;
    name: string;
    description: string;
    members: number;
    openPositions: number;
    createdAt: string;
  }>;
  isTeamsLoading: boolean;
}

export const ProfileContent = ({
  profile,
  isProfileLoading,
  projects,
  isProjectsLoading,
  teams,
  isTeamsLoading
}: ProfileContentProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-1">
        <ProfileSidebar profile={profile} isLoading={isProfileLoading} />
      </div>
      
      <div className="lg:col-span-3">
        <Tabs defaultValue="projects" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="teams">Teams</TabsTrigger>
          </TabsList>
          <TabsContent value="projects">
            {isProjectsLoading ? (
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
            {isTeamsLoading ? (
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
  );
};
