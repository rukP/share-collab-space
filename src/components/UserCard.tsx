
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface UserCardProps {
  id: number;
  name: string;
  course: string;
  avatar: string;
}

export const UserCard = ({ id, name, course, avatar }: UserCardProps) => {
  return (
    <Card key={id} className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-6 flex items-center gap-4">
        <img 
          src={avatar} 
          alt={name} 
          className="w-16 h-16 rounded-full object-cover" 
        />
        <div>
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-muted-foreground text-sm">{course}</p>
          <Button variant="outline" size="sm" className="mt-2">View Profile</Button>
        </div>
      </CardContent>
    </Card>
  );
};
