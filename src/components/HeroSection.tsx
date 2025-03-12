
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="bg-gradient-hero py-20 md:py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient leading-tight">
          Showcase Your Creative Projects
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
          A platform for RCA students to share work, find collaborators, and discover inspiring projects from across disciplines.
        </p>
        <div className="flex flex-wrap justify-center gap-5 mb-16">
          <Link to="/share-project">
            <Button size="lg" className="rounded-full px-8 py-6 text-base shadow-lg shadow-primary/20">
              Share Your Project
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <Link to="/projects">
            <Button variant="outline" size="lg" className="rounded-full px-8 py-6 text-base border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10">
              Explore Projects
            </Button>
          </Link>
        </div>
        
        <div className="mt-8 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="glass-card rounded-2xl p-5 card-hover animate-float" style={{animationDelay: "0s"}}>
            <div className="flex justify-center">
              <img 
                src="https://picsum.photos/seed/1/400/250" 
                alt="Project example" 
                className="rounded-lg object-cover h-48 w-full shadow-md"
              />
            </div>
          </div>
          <div className="glass-card rounded-2xl p-5 card-hover hidden md:block animate-float" style={{animationDelay: "1s"}}>
            <div className="flex justify-center">
              <img 
                src="https://picsum.photos/seed/2/400/250" 
                alt="Project example" 
                className="rounded-lg object-cover h-48 w-full shadow-md"
              />
            </div>
          </div>
          <div className="glass-card rounded-2xl p-5 card-hover hidden lg:block animate-float" style={{animationDelay: "2s"}}>
            <div className="flex justify-center">
              <img 
                src="https://picsum.photos/seed/3/400/250" 
                alt="Project example" 
                className="rounded-lg object-cover h-48 w-full shadow-md"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
