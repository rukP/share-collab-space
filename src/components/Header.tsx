
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PlusCircle, Users, User, Search } from "lucide-react";

export const Header = () => {
  return (
    <header className="border-b sticky top-0 bg-background/95 backdrop-blur-sm z-10">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-primary">RCA Projects</h1>
        </Link>
        
        <div className="hidden md:flex items-center gap-6">
          <Link to="/projects" className="text-muted-foreground hover:text-foreground transition-colors">
            Explore
          </Link>
          <Link to="/teams" className="text-muted-foreground hover:text-foreground transition-colors">
            Teams
          </Link>
          <Link to="/search" className="text-muted-foreground hover:text-foreground transition-colors">
            Search
          </Link>
        </div>
        
        <nav className="flex items-center gap-4">
          <Link to="/profile">
            <Button variant="ghost" size="sm">
              <User className="w-4 h-4 mr-2" />
              Profile
            </Button>
          </Link>
          <Link to="/share-project">
            <Button size="sm">
              <PlusCircle className="w-4 h-4 mr-2" />
              Share Project
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
};
