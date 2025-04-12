
import { Card, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";

interface TeamsProps {
  teams: Array<{
    id: string | number;
    name: string;
    description: string;
    members: number;
    openPositions: number;
    createdAt: string;
  }>;
  isLoading?: boolean;
}

export const ProfileTeams = ({ teams, isLoading }: TeamsProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4">
        {[1, 2].map((i) => (
          <Card key={i} className="mb-4">
            <CardContent className="p-4">
              <div className="animate-pulse space-y-3">
                <div className="h-5 bg-primary/20 rounded w-1/3"></div>
                <div className="h-4 bg-primary/10 rounded w-full"></div>
                <div className="h-4 bg-primary/10 rounded w-1/2"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

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
