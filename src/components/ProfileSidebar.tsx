
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Github, Instagram, Twitter, LogOut, ExternalLink, Mail, Bookmark } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";
import { Profile } from "@/services/profileService";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

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
      <Card className="shadow-md border-primary/10 overflow-hidden">
        <div className="h-24 bg-gradient-to-r from-primary/30 to-accent/30"></div>
        <CardContent className="p-6 -mt-12">
          <div className="animate-pulse space-y-4">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-primary/20 border-4 border-card"></div>
              <div className="h-6 bg-primary/20 rounded mt-4 w-3/4"></div>
              <div className="h-4 bg-primary/20 rounded mt-2 w-1/2"></div>
            </div>
            <div className="space-y-2 mt-4">
              <div className="h-4 bg-primary/20 rounded w-1/4"></div>
              <div className="h-16 bg-primary/20 rounded"></div>
            </div>
            <div className="space-y-2">
              <div className="h-10 bg-primary/20 rounded"></div>
              <div className="h-10 bg-primary/20 rounded"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const defaultAvatar = "https://picsum.photos/seed/profile/300/300";
  const firstName = profile?.name?.split(' ')[0] || "User";

  return (
    <Card className="shadow-lg border-primary/10 overflow-hidden hover-glow transition-all duration-300">
      <div className="h-24 bg-gradient-to-r from-primary/40 to-accent/40"></div>
      <CardContent className="p-6 -mt-12">
        <div className="flex flex-col items-center mb-6">
          <Avatar className="w-24 h-24 border-4 border-card shadow-md">
            <AvatarImage 
              src={profile?.avatar_url || defaultAvatar} 
              alt={profile?.name || "User"} 
              className="object-cover" 
            />
            <AvatarFallback className="bg-primary/20 text-2xl font-bold text-primary">
              {firstName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          
          <h2 className="text-2xl font-bold mt-4 text-center">{profile?.name || "User"}</h2>
          {profile?.course && (
            <Badge variant="outline" className="mt-1 py-1 px-3 bg-accent/10 text-accent border-accent/20">
              {profile?.course}
              {profile.year ? `, Year ${profile.year}` : ''}
            </Badge>
          )}
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">About</h3>
          <p className="text-muted-foreground rounded-md p-3 bg-primary/5">
            {profile?.bio || "No bio information yet. Click Edit Profile to add your bio."}
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-3">
          <Link to="/add-profile">
            <Button className="w-full flex items-center justify-center bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity">
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
