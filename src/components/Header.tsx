
import { Button } from "@/components/ui/button";
import { PlusCircle, User } from "lucide-react";

export const Header = () => {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary">RCA Projects</h1>
        <nav className="flex items-center gap-4">
          <Button variant="ghost">
            <User className="w-4 h-4 mr-2" />
            Profile
          </Button>
          <Button>
            <PlusCircle className="w-4 h-4 mr-2" />
            Share Project
          </Button>
        </nav>
      </div>
    </header>
  );
};
