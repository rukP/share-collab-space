
import { TeamMember } from "@/services/teamService";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface TeamAdminsListProps {
  members: TeamMember[] | undefined;
  isLoading: boolean;
}

export const TeamAdminsList = ({ members, isLoading }: TeamAdminsListProps) => {
  const admins = members?.filter(m => m.role === "admin") || [];

  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-semibold">Team Admins</h2>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="animate-pulse space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10"></div>
              <div className="space-y-2">
                <div className="h-4 w-24 bg-primary/10 rounded"></div>
                <div className="h-3 w-16 bg-primary/5 rounded"></div>
              </div>
            </div>
          </div>
        ) : admins.length > 0 ? (
          <div className="space-y-3">
            {admins.map(admin => (
              <div key={admin.id} className="flex items-center gap-4">
                <Avatar className="w-10 h-10 border border-white/10">
                  <AvatarImage src={admin.profile?.avatar_url || undefined} />
                  <AvatarFallback>
                    {(admin.profile?.name || "User").charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{admin.profile?.name || "User"}</h3>
                  <p className="text-sm text-muted-foreground">{admin.role}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">No team admins found.</p>
        )}
      </CardContent>
    </Card>
  );
};
