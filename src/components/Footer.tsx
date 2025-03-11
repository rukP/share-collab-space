
import { Link } from "react-router-dom";
import { Github, Twitter, Instagram, Mail, Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-border/40 py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-xl font-semibold mb-4">RCA Projects</h3>
            <p className="text-muted-foreground mb-4">
              A platform for Royal College of Art students to showcase their work, collaborate, and discover inspiring projects.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com" className="text-muted-foreground hover:text-primary transition-colors">
                <Github size={20} />
              </a>
              <a href="https://twitter.com" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="mailto:info@rcaprojects.com" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/projects" className="text-muted-foreground hover:text-foreground transition-colors">
                  All Projects
                </Link>
              </li>
              <li>
                <Link to="/teams" className="text-muted-foreground hover:text-foreground transition-colors">
                  Find Teams
                </Link>
              </li>
              <li>
                <Link to="/search" className="text-muted-foreground hover:text-foreground transition-colors">
                  Search
                </Link>
              </li>
              <li>
                <Link to="/share-project" className="text-muted-foreground hover:text-foreground transition-colors">
                  Share Your Work
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact</h3>
            <p className="text-muted-foreground mb-2">Royal College of Art</p>
            <p className="text-muted-foreground mb-2">Kensington Gore</p>
            <p className="text-muted-foreground mb-2">London, SW7 2EU</p>
            <p className="text-muted-foreground">info@rcaprojects.com</p>
          </div>
        </div>
        
        <div className="border-t border-border/40 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} RCA Projects. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm flex items-center mt-4 md:mt-0">
            Made with <Heart size={14} className="mx-1 text-destructive" /> for the RCA community
          </p>
        </div>
      </div>
    </footer>
  );
};
