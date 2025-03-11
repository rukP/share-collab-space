
import { Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface TeamCardProps {
  id: number;
  name: string;
  description: string;
  members: number;
  openPositions: number;
}

export const TeamCard = ({ id, name, description, members }: TeamCardProps) => {
  return (
    <Card key={id} className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        <div className="flex justify-between text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Users className="w-4 h-4" />
            {members} members
          </div>
          <Button size="sm">View Team</Button>
        </div>
      </CardContent>
    </Card>
  );
};
