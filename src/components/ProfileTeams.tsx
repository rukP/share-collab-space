
import { Card, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";

interface TeamsProps {
  teams: Array<{
    id: number;
    name: string;
    description: string;
    members: number;
    openPositions: number;
    createdAt: string;
  }>;
}

export const ProfileTeams = ({ teams }: TeamsProps) => {
  return (
    <>
      {teams.map((team) => (
        <Card key={team.id} className="mb-4">
          <CardContent className="p-4">
            <h3 className="text-xl font-semibold">{team.name}</h3>
            <p className="text-muted-foreground">{team.description}</p>
            <div className="flex mt-2 text-sm">
              <div className="flex items-center gap-1 text-muted-foreground">
                <Users className="w-4 h-4" />
                {team.members} members
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      {teams.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          Not a member of any teams yet.
        </div>
      )}
    </>
  );
};
