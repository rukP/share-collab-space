
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Github, Instagram, Twitter, LogOut } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";
import { Profile } from "@/services/profileService";

interface ProfileSidebarProps {
  profile: Profile | null;
  isLoading: boolean;
}

export const ProfileSidebar = ({ profile, isLoading }: ProfileSidebarProps) => {
  const { signOut } = useAuth();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await signOut();
    } finally {
      setIsSigningOut(false);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full bg-primary/20"></div>
              <div className="h-6 bg-primary/20 rounded mt-4 w-3/4"></div>
              <div className="h-4 bg-primary/20 rounded mt-2 w-1/2"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-primary/20 rounded w-1/4"></div>
              <div className="h-16 bg-primary/20 rounded"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const defaultAvatar = "https://picsum.photos/seed/profile/300/300";

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col items-center mb-6">
          <img 
            src={profile?.avatar_url || defaultAvatar} 
            alt={profile?.name || "User"} 
            className="w-32 h-32 rounded-full object-cover border-4 border-primary/20" 
          />
          <h2 className="text-2xl font-bold mt-4">{profile?.name || "User"}</h2>
          <p className="text-accent font-medium">
            {profile?.course ? `${profile.course}${profile.year ? `, Year ${profile.year}` : ''}` : 'No course information'}
          </p>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">About</h3>
          <p className="text-muted-foreground">
            {profile?.bio || "No bio information yet. Click Edit Profile to add your bio."}
          </p>
        </div>
        
        <div className="space-y-3">
          <Link to="/add-profile">
            <Button className="w-full flex items-center justify-center">
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </Link>
          
          <Button 
            variant="destructive" 
            className="w-full flex items-center justify-center" 
            onClick={handleSignOut}
            disabled={isSigningOut}
          >
            <LogOut className="w-4 h-4 mr-2" />
            {isSigningOut ? "Signing out..." : "Sign Out"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
