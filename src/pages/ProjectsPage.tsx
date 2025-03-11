
import { Header } from "@/components/Header";
import { ProjectCard } from "@/components/ProjectCard";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Filter, Zap } from "lucide-react";

// Temporary mock data - extended with more projects
const MOCK_PROJECTS = [
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
  },
  {
    id: 4,
    title: "Architectural Model Series",
    description: "Miniature architectural models exploring spatial relationships",
    imageUrl: "https://picsum.photos/seed/4/800/600",
    likes: 42,
    author: "Michael Robinson"
  },
  {
    id: 5,
    title: "Experimental Photography",
    description: "Series exploring texture and light through macro photography",
    imageUrl: "https://picsum.photos/seed/5/800/600",
    likes: 37,
    author: "Emma Johnson"
  },
  {
    id: 6,
    title: "Mixed Media Sculptures",
    description: "Sculptures created from found objects and recycled materials",
    imageUrl: "https://picsum.photos/seed/6/800/600",
    likes: 29,
    author: "Thomas Lee"
  }
];

const ProjectsPage = () => {
  const [filter, setFilter] = useState<'popular' | 'recent'>('popular');
  
  // Sort projects based on the selected filter
  const sortedProjects = [...MOCK_PROJECTS].sort((a, b) => 
    filter === 'popular' ? b.likes - a.likes : b.id - a.id
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Explore Projects</h2>
          <div className="flex gap-2">
            <Button 
              variant={filter === 'popular' ? 'default' : 'outline'} 
              size="sm" 
              onClick={() => setFilter('popular')}
            >
              <Zap className="w-4 h-4 mr-2" />
              Popular
            </Button>
            <Button 
              variant={filter === 'recent' ? 'default' : 'outline'} 
              size="sm" 
              onClick={() => setFilter('recent')}
            >
              <Filter className="w-4 h-4 mr-2" />
              Recent
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProjects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProjectsPage;
