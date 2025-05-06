
import { Team, TeamMember } from "@/services/teamService";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TeamAdminsList } from "./TeamAdminsList";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users } from "lucide-react";

interface TeamAboutProps {
  team: Team;
  members: TeamMember[] | undefined;
  isLoading: boolean;
}

export const TeamAbout = ({ team, members, isLoading }: TeamAboutProps) => {
  // Calculate creation date in a more readable format
  const formattedCreationDate = new Date(team.created_at).toLocaleDateString(undefined, { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Team Information */}
      <Card className="md:col-span-2">
        <CardHeader>
          <h2 className="text-xl font-semibold">About the Team</h2>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-base leading-relaxed">
            {team.description || "No team description provided."}
          </p>
          
          <div className="flex flex-wrap gap-4">
            <div className="bg-card/60 p-4 rounded-lg border border-border flex items-center gap-3">
              <Calendar className="w-5 h-5 text-primary/70" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Founded</p>
                <p className="font-medium">{formattedCreationDate}</p>
              </div>
            </div>
            
            <div className="bg-card/60 p-4 rounded-lg border border-border flex items-center gap-3">
              <Users className="w-5 h-5 text-primary/70" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Team Size</p>
                <p className="font-medium">{members?.length || 0} members</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Team Admins */}
      <div className="space-y-6">
        <TeamAdminsList members={members} isLoading={isLoading} />
      </div>
    </div>
  );
};
