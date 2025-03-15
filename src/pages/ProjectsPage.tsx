
import { Header } from "@/components/Header";
import { ProjectCard } from "@/components/ProjectCard";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Filter, Zap, CheckCircle, XCircle, Clock } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Temporary mock data - extended with more projects and status
const MOCK_PROJECTS = [
  {
    id: 1,
    title: "Interactive Art Installation",
    description: "A dynamic light installation responding to viewer movement",
    imageUrl: "https://picsum.photos/seed/1/800/600",
    likes: 24,
    author: "Alice Chen",
    status: "open"
  },
  {
    id: 2,
    title: "Sustainable Fashion Collection",
    description: "Exploring eco-friendly materials in contemporary fashion",
    imageUrl: "https://picsum.photos/seed/2/800/600",
    likes: 18,
    author: "James Wilson",
    status: "closed"
  },
  {
    id: 3,
    title: "Digital Typography Experiment",
    description: "Playing with variable fonts and animation",
    imageUrl: "https://picsum.photos/seed/3/800/600",
    likes: 32,
    author: "Sarah Park",
    status: "completed"
  },
  {
    id: 4,
    title: "Architectural Model Series",
    description: "Miniature architectural models exploring spatial relationships",
    imageUrl: "https://picsum.photos/seed/4/800/600",
    likes: 42,
    author: "Michael Robinson",
    status: "open"
  },
  {
    id: 5,
    title: "Experimental Photography",
    description: "Series exploring texture and light through macro photography",
    imageUrl: "https://picsum.photos/seed/5/800/600",
    likes: 37,
    author: "Emma Johnson",
    status: "closed"
  },
  {
    id: 6,
    title: "Mixed Media Sculptures",
    description: "Sculptures created from found objects and recycled materials",
    imageUrl: "https://picsum.photos/seed/6/800/600",
    likes: 29,
    author: "Thomas Lee",
    status: "open"
  }
];

const ProjectsPage = () => {
  const [filter, setFilter] = useState<'popular' | 'recent'>('popular');
  const [statusFilter, setStatusFilter] = useState<string>("all");
  
  // Filter projects based on status first
  const filteredByStatus = statusFilter === "all" 
    ? MOCK_PROJECTS 
    : MOCK_PROJECTS.filter(project => project.status === statusFilter);
  
  // Then sort the filtered projects
  const sortedProjects = [...filteredByStatus].sort((a, b) => 
    filter === 'popular' ? b.likes - a.likes : b.id - a.id
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Explore Projects</h2>
          <div className="flex gap-4 items-center">
            {/* Status filter */}
            <div className="flex items-center">
              <Select 
                value={statusFilter} 
                onValueChange={setStatusFilter}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    <span className="flex items-center">
                      <Filter className="w-4 h-4 mr-2" />
                      All Statuses
                    </span>
                  </SelectItem>
                  <SelectItem value="open">
                    <span className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                      Open to Join
                    </span>
                  </SelectItem>
                  <SelectItem value="closed">
                    <span className="flex items-center">
                      <XCircle className="w-4 h-4 mr-2 text-yellow-500" />
                      Team Full
                    </span>
                  </SelectItem>
                  <SelectItem value="completed">
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-blue-500" />
                      Completed
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Popular/Recent toggle */}
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
        </div>
        
        {sortedProjects.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-xl">No projects found matching your filter criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProjects.map((project) => (
              <ProjectCard 
                key={project.id} 
                {...project} 
                status={project.status as "open" | "closed" | "completed"}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ProjectsPage;
