
import { Header } from "@/components/Header";
import { ProjectCard } from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Users, Search } from "lucide-react";
import { Link } from "react-router-dom";

// Temporary mock data - using just a few featured projects
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

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero section */}
      <section className="bg-gradient-to-b from-primary/20 to-background py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Showcase Your Creative Projects</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            A platform for RCA students to share work, find collaborators, and discover inspiring projects.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/share-project">
              <Button size="lg">
                Share Your Project
              </Button>
            </Link>
            <Link to="/projects">
              <Button variant="outline" size="lg">
                Explore Projects
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Features section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Platform Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg shadow-sm border">
              <div className="bg-primary/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Zap className="text-primary w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Share Projects</h3>
              <p className="text-muted-foreground mb-4">
                Document and showcase your work to peers and potential collaborators.
              </p>
              <Link to="/share-project" className="text-primary inline-flex items-center">
                Share a Project <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
            
            <div className="bg-card p-6 rounded-lg shadow-sm border">
              <div className="bg-primary/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Users className="text-primary w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Form Teams</h3>
              <p className="text-muted-foreground mb-4">
                Create or join teams to collaborate on ambitious interdisciplinary projects.
              </p>
              <Link to="/teams" className="text-primary inline-flex items-center">
                Find Teams <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
            
            <div className="bg-card p-6 rounded-lg shadow-sm border">
              <div className="bg-primary/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Search className="text-primary w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Discover Work</h3>
              <p className="text-muted-foreground mb-4">
                Explore projects from students across different programs and departments.
              </p>
              <Link to="/search" className="text-primary inline-flex items-center">
                Search Projects <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured projects section */}
      <section className="py-16 bg-accent/10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Projects</h2>
            <Link to="/projects">
              <Button variant="outline">
                View All <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURED_PROJECTS.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
