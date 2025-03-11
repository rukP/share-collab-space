
import { Link } from "react-router-dom";
import { ArrowRight, Zap, Users, Search, Palette, Globe, Clock } from "lucide-react";

export const FeatureSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Why Use RCA Projects?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our platform is designed specifically for the unique needs of art and design students.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="glass-card p-8 rounded-2xl card-hover">
            <div className="bg-primary/20 w-14 h-14 rounded-full flex items-center justify-center mb-6">
              <Zap className="text-primary w-7 h-7" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Share Projects</h3>
            <p className="text-muted-foreground mb-6">
              Document and showcase your work to peers and potential collaborators with a beautiful portfolio.
            </p>
            <Link to="/share-project" className="text-primary inline-flex items-center font-medium">
              Share a Project <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
          
          <div className="glass-card p-8 rounded-2xl card-hover">
            <div className="bg-primary/20 w-14 h-14 rounded-full flex items-center justify-center mb-6">
              <Users className="text-primary w-7 h-7" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Form Teams</h3>
            <p className="text-muted-foreground mb-6">
              Create or join teams to collaborate on ambitious interdisciplinary projects across departments.
            </p>
            <Link to="/teams" className="text-primary inline-flex items-center font-medium">
              Find Teams <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
          
          <div className="glass-card p-8 rounded-2xl card-hover">
            <div className="bg-primary/20 w-14 h-14 rounded-full flex items-center justify-center mb-6">
              <Search className="text-primary w-7 h-7" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Discover Work</h3>
            <p className="text-muted-foreground mb-6">
              Explore projects from students across different programs and get inspired by diverse approaches.
            </p>
            <Link to="/search" className="text-primary inline-flex items-center font-medium">
              Search Projects <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
          
          <div className="glass-card p-8 rounded-2xl card-hover">
            <div className="bg-primary/20 w-14 h-14 rounded-full flex items-center justify-center mb-6">
              <Palette className="text-primary w-7 h-7" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Showcase Talent</h3>
            <p className="text-muted-foreground mb-6">
              Create a beautiful portfolio that highlights your skills and creative vision to potential collaborators.
            </p>
            <Link to="/profile" className="text-primary inline-flex items-center font-medium">
              View Profile <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
          
          <div className="glass-card p-8 rounded-2xl card-hover">
            <div className="bg-primary/20 w-14 h-14 rounded-full flex items-center justify-center mb-6">
              <Globe className="text-primary w-7 h-7" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Connect Globally</h3>
            <p className="text-muted-foreground mb-6">
              Network with students and alumni from around the world who share your creative interests.
            </p>
            <Link to="/search" className="text-primary inline-flex items-center font-medium">
              Explore Network <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
          
          <div className="glass-card p-8 rounded-2xl card-hover">
            <div className="bg-primary/20 w-14 h-14 rounded-full flex items-center justify-center mb-6">
              <Clock className="text-primary w-7 h-7" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Track Progress</h3>
            <p className="text-muted-foreground mb-6">
              Document your creative journey and see how your projects evolve over time with version history.
            </p>
            <Link to="/share-project" className="text-primary inline-flex items-center font-medium">
              Start Tracking <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
