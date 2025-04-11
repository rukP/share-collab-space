
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileProjects } from "@/components/ProfileProjects";
import { ProfileSidebar } from "@/components/ProfileSidebar";
import { ProfileTeams } from "@/components/ProfileTeams";

interface ProfileContentProps {
  profile: any;
  isProfileLoading: boolean;
  projects: any[];
  isProjectsLoading: boolean;
  teams: any[];
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
  const [activeTab, setActiveTab] = useState("projects");

  return (
    <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-1">
        <ProfileSidebar profile={profile} isLoading={isProfileLoading} />
      </div>
      
      <div className="lg:col-span-3">
        <Tabs defaultValue="projects" onValueChange={setActiveTab} value={activeTab}>
          <TabsList className="mb-6 bg-card">
            <TabsTrigger value="projects" className="flex-1 relative">
              Projects
              {projects.length > 0 && (
                <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary">
                  {projects.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="teams" className="flex-1 relative">
              Teams
              {teams.length > 0 && (
                <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary">
                  {teams.length}
                </span>
              )}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="projects">
            <ProfileProjects 
              projects={projects} 
              isLoading={isProjectsLoading} 
            />
          </TabsContent>
          
          <TabsContent value="teams">
            <ProfileTeams 
              teams={teams} 
              isLoading={isTeamsLoading}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
