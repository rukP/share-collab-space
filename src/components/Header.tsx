
import { Link } from "react-router-dom";
import { PlusCircle, User, Menu, X, Search, Users, LogOut } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/context/AuthContext";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const { isAuthenticated, signOut, user } = useAuth();

  return (
    <header className="border-b border-white/5 sticky top-0 bg-background/95 backdrop-blur-md z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <h1 className="text-xl md:text-2xl font-bold text-gradient">RCA Projects</h1>
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
          {isAuthenticated ? (
            <Link to="/profile" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
              <User className="w-4 h-4" />
              Profile
            </Link>
          ) : (
            <Link to="/auth" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
              <User className="w-4 h-4" />
              Sign In
            </Link>
          )}
        </div>
        
        <nav className="hidden md:flex items-center gap-3">
          {isAuthenticated && (
            <>
              <Link to="/create-team" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                <Users className="w-4 h-4" />
                Create Team
              </Link>
              <Link to="/share-project">
                <Button size="sm" className="rounded-full shadow-lg shadow-primary/20">
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Share Project
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={signOut} className="text-muted-foreground">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </>
          )}
          
          {!isAuthenticated && (
            <Link to="/auth">
              <Button size="sm" className="rounded-full shadow-lg shadow-primary/20">
                Sign In
              </Button>
            </Link>
          )}
        </nav>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-card/95 backdrop-blur-md py-4 px-4 border-b border-white/5 absolute w-full left-0 shadow-lg">
          <nav className="flex flex-col space-y-4">
            <Link 
              to="/projects" 
              className="text-foreground py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Explore
            </Link>
            <Link 
              to="/teams" 
              className="text-foreground py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Teams
            </Link>
            <Link 
              to="/search" 
              className="text-foreground py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Search
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link 
                  to="/profile" 
                  className="text-foreground py-2 flex items-center gap-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User className="w-4 h-4" />
                  Profile
                </Link>
                <Link 
                  to="/create-team" 
                  className="text-foreground py-2 flex items-center gap-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Users className="w-4 h-4" />
                  Create Team
                </Link>
                <Link to="/share-project" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full justify-center rounded-full shadow-lg shadow-primary/20">
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Share Project
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  className="w-full justify-center"
                  onClick={() => {
                    signOut();
                    setMobileMenuOpen(false);
                  }}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full justify-center rounded-full shadow-lg shadow-primary/20">
                  Sign In
                </Button>
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};
