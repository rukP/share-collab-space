
import { Team, TeamMember } from "@/services/teamService";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TeamAdminsList } from "./TeamAdminsList";

interface TeamAboutProps {
  team: Team;
  members: TeamMember[] | undefined;
  isLoading: boolean;
}

export const TeamAbout = ({ team, members, isLoading }: TeamAboutProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Team Information */}
      <Card className="md:col-span-2">
        <CardHeader>
          <h2 className="text-xl font-semibold">About the Team</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            {team.description || "No team description provided."}
          </p>
          
          <div className="bg-card/50 p-4 rounded-lg border border-border">
            <h3 className="text-sm font-medium mb-2">Team Details</h3>
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-muted-foreground">Created</dt>
                <dd className="font-medium mt-1">{new Date(team.created_at).toLocaleDateString()}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Members</dt>
                <dd className="font-medium mt-1">{members?.length || 0}</dd>
              </div>
            </dl>
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
