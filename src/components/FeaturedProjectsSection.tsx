
import { ProjectCard } from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// Using the same featured projects from the original file
const FEATURED_PROJECTS = [
  {
    id: 1,
    title: "Interactive Art Installation",
    description: "A dynamic light installation responding to viewer movement",
    imageUrl: "https://picsum.photos/seed/1/800/600",
    likes: 24,
    author: "Alice Chen"
  },
  {
    id: 2,
    title: "Sustainable Fashion Collection",
    description: "Exploring eco-friendly materials in contemporary fashion",
    imageUrl: "https://picsum.photos/seed/2/800/600",
    likes: 18,
    author: "James Wilson"
  },
  {
    id: 3,
    title: "Digital Typography Experiment",
    description: "Playing with variable fonts and animation",
    imageUrl: "https://picsum.photos/seed/3/800/600",
    likes: 32,
    author: "Sarah Park"
  }
];

export const FeaturedProjectsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-accent/5 to-background">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold">Featured Projects</h2>
          <Link to="/projects">
            <Button variant="outline" className="rounded-full">
              View All <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURED_PROJECTS.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};
