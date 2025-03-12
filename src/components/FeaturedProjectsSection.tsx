
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
    <section className="py-20 bg-gradient-to-b from-accent/5 to-background relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute top-40 -left-20 w-60 h-60 bg-accent/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-gradient">Featured Projects</h2>
          <Link to="/projects">
            <Button variant="outline" className="rounded-full border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10">
              View All <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURED_PROJECTS.map((project, index) => (
            <div key={project.id} className="transform transition-all duration-300" 
                 style={{ animationDelay: `${index * 150}ms` }}>
              <ProjectCard {...project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
