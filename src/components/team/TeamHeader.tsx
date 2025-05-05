
import { Team } from "@/services/teamService";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, UserPlus, UserMinus } from "lucide-react";

interface TeamHeaderProps {
  team: Team;
  membersCount: number;
  isCurrentUserMember: boolean;
  isJoining: boolean;
  isLeaving: boolean;
  currentUserId: string | null;
  onJoinTeam: () => void;
  onLeaveTeam: () => void;
}

export const TeamHeader = ({
  team,
  membersCount,
  isCurrentUserMember,
  isJoining,
  isLeaving,
  currentUserId,
  onJoinTeam,
  onLeaveTeam
}: TeamHeaderProps) => {
  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
        <h1 className="text-3xl font-bold">{team.name}</h1>
        
        <div className="flex gap-3">
          {currentUserId && (
            isCurrentUserMember ? (
              <Button 
                onClick={onLeaveTeam}
                disabled={isLeaving}
                size="sm"
                variant="outline"
                className="gap-2"
              >
                <UserMinus className="w-4 h-4" />
                {isLeaving ? "Leaving..." : "Leave Team"}
              </Button>
            ) : (
              <Button 
                onClick={onJoinTeam} 
                disabled={isJoining}
                size="sm"
                className="gap-2"
              >
                <UserPlus className="w-4 h-4" />
                {isJoining ? "Joining..." : "Join Team"}
              </Button>
            )
          )}
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        <Badge variant="secondary" className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          Founded: {new Date(team.created_at).toLocaleDateString()}
        </Badge>
        <Badge variant="secondary" className="flex items-center gap-1">
          <Users className="w-3 h-3" />
          {membersCount} members
        </Badge>
      </div>
      
      <p className="text-muted-foreground">{team.description}</p>
    </div>
  );
};
