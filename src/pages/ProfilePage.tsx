
import { Header } from "@/components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileSidebar } from "@/components/ProfileSidebar";
import { ProfileProjects } from "@/components/ProfileProjects";
import { ProfileTeams } from "@/components/ProfileTeams";

// Mock user data
const MOCK_USER = {
  id: 1,
  name: "Emma Johnson",
  bio: "Visual designer and digital artist exploring interactive installations and virtual environments. Currently in my second year at RCA.",
  avatar: "https://picsum.photos/seed/user1/300/300",
  course: "Visual Communication",
  year: 2,
  links: {
    github: "github.com/emmajohnson",
    instagram: "instagram.com/emma.creates",
    twitter: "twitter.com/emmajohnson"
  }
};

// Mock projects by this user
const USER_PROJECTS = [
  {
    id: 5,
    title: "Experimental Photography",
    description: "Series exploring texture and light through macro photography",
    imageUrl: "https://picsum.photos/seed/5/800/600",
    likes: 37,
    author: "Emma Johnson"
  },
  {
    id: 8,
    title: "Digital Landscapes",
    description: "Procedurally generated landscapes using custom algorithms",
    imageUrl: "https://picsum.photos/seed/8/800/600",
    likes: 28,
    author: "Emma Johnson"
  }
];

// Mock teams this user belongs to
const USER_TEAMS = [
  {
    id: 1,
    name: "Design Innovators",
    description: "A team focused on experimental design approaches across various media",
    members: 4,
    openPositions: 2,
    createdAt: "2023-10-15"
  }
];

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Profile sidebar */}
          <div className="w-full md:w-1/3">
            <ProfileSidebar user={MOCK_USER} />
          </div>
          
          {/* Main content */}
          <div className="w-full md:w-2/3">
            <Tabs defaultValue="projects">
              <TabsList className="mb-6">
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="teams">Teams</TabsTrigger>
              </TabsList>
              
              <TabsContent value="projects">
                <ProfileProjects projects={USER_PROJECTS} />
              </TabsContent>
              
              <TabsContent value="teams">
                <ProfileTeams teams={USER_TEAMS} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
