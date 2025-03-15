
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface SidebarProject {
  id: number;
  title: string;
  imageUrl: string;
  author: string;
}

interface ProjectSidebarProps {
  creator: {
    name: string;
    avatar: string;
    course: string;
  };
  team: {
    name: string;
  };
  relatedProjects: SidebarProject[];
}

export const ProjectSidebar = ({ creator, team, relatedProjects }: ProjectSidebarProps) => {
  return (
    <div>
      <Card className="mb-6">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">About the Creator</h3>
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={creator.avatar} alt={creator.name} />
              <AvatarFallback>{creator.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{creator.name}</p>
              <p className="text-sm text-muted-foreground">{creator.course}</p>
            </div>
          </div>
          <Button variant="outline" className="w-full">View Profile</Button>
        </CardContent>
      </Card>
      
      <Card className="mb-6">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Project Team</h3>
          <div className="mb-4">
            <p className="font-medium">{team.name}</p>
            <p className="text-sm text-muted-foreground mb-4">Collaborative design team</p>
            <Button variant="outline" className="w-full">View Team</Button>
          </div>
        </CardContent>
      </Card>
      
      <h3 className="text-lg font-semibold mb-4">Related Projects</h3>
      <div className="space-y-4">
        {relatedProjects.map(related => (
          <Card key={related.id} className="overflow-hidden hover:shadow-md transition-all">
            <CardContent className="p-4">
              <div className="aspect-video mb-3 overflow-hidden rounded-md">
                <img 
                  src={related.imageUrl} 
                  alt={related.title} 
                  className="w-full h-full object-cover transition-transform hover:scale-105" 
                />
              </div>
              <h4 className="font-medium">{related.title}</h4>
              <p className="text-sm text-muted-foreground">By {related.author}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
