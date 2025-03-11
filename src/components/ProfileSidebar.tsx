
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Github, Instagram, Twitter } from "lucide-react";

interface ProfileSidebarProps {
  user: {
    avatar: string;
    name: string;
    course: string;
    year: number;
    bio: string;
    links: {
      github: string;
      instagram: string;
      twitter: string;
    };
  };
}

export const ProfileSidebar = ({ user }: ProfileSidebarProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col items-center mb-6">
          <img 
            src={user.avatar} 
            alt={user.name} 
            className="w-32 h-32 rounded-full object-cover border-4 border-primary/20" 
          />
          <h2 className="text-2xl font-bold mt-4">{user.name}</h2>
          <p className="text-accent font-medium">{user.course}, Year {user.year}</p>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">About</h3>
          <p className="text-muted-foreground">{user.bio}</p>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Links</h3>
          <div className="flex flex-col gap-2">
            <a href={`https://${user.links.github}`} className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
              <Github className="w-4 h-4 mr-2" />
              {user.links.github}
            </a>
            <a href={`https://${user.links.instagram}`} className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
              <Instagram className="w-4 h-4 mr-2" />
              {user.links.instagram}
            </a>
            <a href={`https://${user.links.twitter}`} className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
              <Twitter className="w-4 h-4 mr-2" />
              {user.links.twitter}
            </a>
          </div>
        </div>
        
        <Button className="w-full">
          <Edit className="w-4 h-4 mr-2" />
          Edit Profile
        </Button>
      </CardContent>
    </Card>
  );
};
