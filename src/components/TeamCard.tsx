
import { Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface TeamCardProps {
  id: string | number;
  name: string;
  description: string;
  members: number;
  openPositions: number;
  createdAt?: string;
}

export const TeamCard = ({ id, name, description, members, openPositions, createdAt }: TeamCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <p className="text-muted-foreground mb-4 line-clamp-2">{description}</p>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Users className="w-4 h-4" />
            {members} {members === 1 ? "member" : "members"}
          </div>
          
          <Link to={`/teams/${id}`}>
            <Button size="sm">View Team</Button>
          </Link>
        </div>
        
        {createdAt && (
          <div className="text-xs text-muted-foreground mt-4">
            Created: {new Date(createdAt).toLocaleDateString()}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
