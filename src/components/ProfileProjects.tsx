
import { ProjectCard } from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface Project {
  id: string | number;
  title: string;
  description: string;
  imageUrl: string;
  likes: number;
  author: string;
  status?: "open" | "closed" | "completed";
  createdAt?: string;
}

interface ProjectsProps {
  projects: Project[];
  isLoading: boolean;
}

export const ProfileProjects = ({ projects, isLoading }: ProjectsProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2].map((i) => (
          <div key={i} className="bg-muted/30 animate-pulse rounded-lg h-80"></div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">Your Projects</h3>
        <Link to="/share-project">
          <Button variant="outline" className="bg-primary/5 border-primary/20 hover:bg-primary/10">
            <PlusCircle className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </Link>
      </div>

      {projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <ProjectCard 
              key={project.id} 
              {...project} 
              status={project.status || "open"}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border-2 border-dashed border-muted rounded-lg">
          <div className="space-y-3">
            <h4 className="text-lg font-medium">No projects yet</h4>
            <p className="text-muted-foreground">
              Share your first project to showcase your work with the community
            </p>
            <Link to="/share-project">
              <Button className="mt-2 bg-gradient-to-r from-primary to-purple-500 hover:opacity-90">
                <PlusCircle className="w-4 h-4 mr-2" />
                Share Your First Project
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
