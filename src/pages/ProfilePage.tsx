
import { Header } from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/ProjectCard";
import { Edit, GitHub, Instagram, Twitter } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center mb-6">
                  <img 
                    src={MOCK_USER.avatar} 
                    alt={MOCK_USER.name} 
                    className="w-32 h-32 rounded-full object-cover border-4 border-primary/20" 
                  />
                  <h2 className="text-2xl font-bold mt-4">{MOCK_USER.name}</h2>
                  <p className="text-accent font-medium">{MOCK_USER.course}, Year {MOCK_USER.year}</p>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">About</h3>
                  <p className="text-muted-foreground">{MOCK_USER.bio}</p>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Links</h3>
                  <div className="flex flex-col gap-2">
                    <a href={`https://${MOCK_USER.links.github}`} className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
                      <GitHub className="w-4 h-4 mr-2" />
                      {MOCK_USER.links.github}
                    </a>
                    <a href={`https://${MOCK_USER.links.instagram}`} className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
                      <Instagram className="w-4 h-4 mr-2" />
                      {MOCK_USER.links.instagram}
                    </a>
                    <a href={`https://${MOCK_USER.links.twitter}`} className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
                      <Twitter className="w-4 h-4 mr-2" />
                      {MOCK_USER.links.twitter}
                    </a>
                  </div>
                </div>
                
                <Button className="w-full">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </CardContent>
            </Card>
          </div>
          
          {/* Main content */}
          <div className="w-full md:w-2/3">
            <Tabs defaultValue="projects">
              <TabsList className="mb-6">
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="teams">Teams</TabsTrigger>
              </TabsList>
              
              <TabsContent value="projects">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {USER_PROJECTS.map((project) => (
                    <ProjectCard key={project.id} {...project} />
                  ))}
                </div>
                {USER_PROJECTS.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    No projects shared yet.
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="teams">
                {USER_TEAMS.map((team) => (
                  <Card key={team.id} className="mb-4">
                    <CardContent className="p-4">
                      <h3 className="text-xl font-semibold">{team.name}</h3>
                      <p className="text-muted-foreground">{team.description}</p>
                      <div className="flex mt-2 text-sm">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Users className="w-4 h-4" />
                          {team.members} members
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {USER_TEAMS.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    Not a member of any teams yet.
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
