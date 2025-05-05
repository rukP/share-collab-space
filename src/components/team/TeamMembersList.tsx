
import { TeamMember } from "@/services/teamService";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

interface TeamMembersListProps {
  members: TeamMember[] | undefined;
  isLoading: boolean;
}

export const TeamMembersList = ({ members, isLoading }: TeamMembersListProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map(i => (
          <Card key={i} className="hover:shadow-md transition-all">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 animate-pulse"></div>
              <div className="flex-1 space-y-2 animate-pulse">
                <div className="h-4 bg-primary/10 rounded w-1/3"></div>
                <div className="h-3 bg-primary/5 rounded w-1/4"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!members || members.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No members in this team yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {members.map(member => (
        <Card key={member.id} className="hover:shadow-md transition-all">
          <CardContent className="p-4 flex items-center gap-4">
            <Avatar className="w-12 h-12 border border-white/10">
              <AvatarImage src={member.profile?.avatar_url || undefined} />
              <AvatarFallback>
                {(member.profile?.name || "User").charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-medium">{member.profile?.name || "User"}</h3>
              <p className="text-sm text-muted-foreground">{member.role}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
