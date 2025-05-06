
import { TeamMember } from "@/services/teamService";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Shield } from "lucide-react";

interface TeamAdminsListProps {
  members: TeamMember[] | undefined;
  isLoading: boolean;
}

export const TeamAdminsList = ({ members, isLoading }: TeamAdminsListProps) => {
  // Filter admins and sort them by name
  const admins = members?.filter(m => m.role === "admin").sort((a, b) => {
    const nameA = a.profile?.name || "";
    const nameB = b.profile?.name || "";
    return nameA.localeCompare(nameB);
  }) || [];

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-amber-500" />
          <h2 className="text-lg font-semibold">Team Admins</h2>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2].map(i => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
            ))}
          </div>
        ) : admins.length > 0 ? (
          <div className="space-y-4">
            {admins.map(admin => (
              <div key={admin.id} className="flex items-center gap-4 p-2 hover:bg-accent/30 rounded-md -mx-2 transition-colors">
                <Avatar className="w-10 h-10 border border-border">
                  <AvatarImage src={admin.profile?.avatar_url || undefined} alt={admin.profile?.name || "Admin"} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {(admin.profile?.name || "User").charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{admin.profile?.name || "User"}</h3>
                  <p className="text-sm text-muted-foreground">Team Admin</p>
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
