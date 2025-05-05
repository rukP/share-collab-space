
import { useParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Header } from "@/components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTeamDetails } from "@/hooks/use-team-details";
import { TeamHeader } from "@/components/team/TeamHeader";
import { TeamAbout } from "@/components/team/TeamAbout";
import { TeamMembersList } from "@/components/team/TeamMembersList";

const TeamDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();

  const {
    team,
    members,
    isTeamLoading,
    isMembersLoading,
    teamError,
    currentUserId,
    isCurrentUserMember,
    isJoining,
    isLeaving,
    handleJoinTeam,
    handleLeaveTeam
  } = useTeamDetails(id);

  if (isTeamLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-[60vh]">
            <p className="text-lg text-muted-foreground">Loading team details...</p>
          </div>
        </main>
      </div>
    );
  }

  if (teamError || !team) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center h-[60vh]">
            <p className="text-lg text-muted-foreground mb-4">Team not found or error loading team details.</p>
            <Button onClick={() => navigate("/teams")}>
              Back to Teams
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Back button */}
        <Link to="/teams" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Teams
        </Link>
        
        {/* Team Header */}
        <TeamHeader 
          team={team}
          membersCount={members?.length || 0}
          isCurrentUserMember={isCurrentUserMember}
          isJoining={isJoining}
          isLeaving={isLeaving}
          currentUserId={currentUserId}
          onJoinTeam={handleJoinTeam}
          onLeaveTeam={handleLeaveTeam}
        />
        
        {/* Team Content Tabs */}
        <Tabs defaultValue="overview" onValueChange={setActiveTab} className="mb-8">
          <TabsList className="mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview">
            <TeamAbout team={team} members={members} isLoading={isMembersLoading} />
          </TabsContent>
          
          {/* Members Tab */}
          <TabsContent value="members">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Team Members</h2>
              </div>
              
              <TeamMembersList members={members} isLoading={isMembersLoading} />
            </div>
          </TabsContent>
          
          {/* Projects Tab */}
          <TabsContent value="projects">
            <div className="text-center py-8">
              <h2 className="text-xl font-semibold mb-2">Coming Soon</h2>
              <p className="text-muted-foreground">Team projects feature is under development.</p>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default TeamDetailsPage;
