
import { Header } from "@/components/Header";
import { ProfileSidebar } from "@/components/ProfileSidebar";
import { ProfileProjects } from "@/components/ProfileProjects";
import { ProfileTeams } from "@/components/ProfileTeams";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { UserPlus } from "lucide-react";

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">My Profile</h2>
          <Link to="/add-profile">
            <Button className="bg-gradient-to-r from-primary to-purple-500 hover:opacity-90">
              <UserPlus className="w-4 h-4 mr-2" />
              Complete Profile
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <ProfileSidebar />
          </div>
          
          <div className="lg:col-span-3">
            <Tabs defaultValue="projects" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="teams">Teams</TabsTrigger>
              </TabsList>
              <TabsContent value="projects">
                <ProfileProjects />
              </TabsContent>
              <TabsContent value="teams">
                <ProfileTeams />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
