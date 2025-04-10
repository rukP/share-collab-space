
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";

interface ProfileHeaderProps {
  isProfileIncomplete: boolean;
}

export const ProfileHeader = ({ isProfileIncomplete }: ProfileHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-3xl font-bold">My Profile</h2>
      
      {isProfileIncomplete && (
        <Link to="/add-profile">
          <Button className="bg-gradient-to-r from-primary to-purple-500 hover:opacity-90">
            <UserPlus className="w-4 h-4 mr-2" />
            Complete Profile
          </Button>
        </Link>
      )}
    </div>
  );
};
