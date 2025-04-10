
import { ProjectCard } from "@/components/ProjectCard";

interface ProjectsProps {
  projects: Array<{
    id: string | number;
    title: string;
    description: string;
    imageUrl: string;
    likes: number;
    author: string;
  }>;
}

export const ProfileProjects = ({ projects }: ProjectsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {projects.map((project) => (
        <ProjectCard key={project.id} {...project} />
      ))}
      {projects.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No projects shared yet.
        </div>
      )}
    </div>
  );
};
