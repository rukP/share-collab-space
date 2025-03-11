
import { Header } from "@/components/Header";
import { ProjectCard } from "@/components/ProjectCard";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Users, Laptop } from "lucide-react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Reusing the mock data from other pages
const MOCK_PROJECTS = [
  {
    id: 1,
    title: "Interactive Art Installation",
    description: "A dynamic light installation responding to viewer movement",
    imageUrl: "https://picsum.photos/seed/1/800/600",
    likes: 24,
    author: "Alice Chen"
  },
  {
    id: 2,
    title: "Sustainable Fashion Collection",
    description: "Exploring eco-friendly materials in contemporary fashion",
    imageUrl: "https://picsum.photos/seed/2/800/600",
    likes: 18,
    author: "James Wilson"
  },
  {
    id: 3,
    title: "Digital Typography Experiment",
    description: "Playing with variable fonts and animation",
    imageUrl: "https://picsum.photos/seed/3/800/600",
    likes: 32,
    author: "Sarah Park"
  }
];

const MOCK_TEAMS = [
  {
    id: 1,
    name: "Design Innovators",
    description: "A team focused on experimental design approaches across various media",
    members: 4,
    openPositions: 2
  },
  {
    id: 2,
    name: "Digital Fabrication Group",
    description: "Exploring the intersection of digital design and physical fabrication techniques",
    members: 3,
    openPositions: 1
  }
];

const MOCK_USERS = [
  {
    id: 1,
    name: "Emma Johnson",
    course: "Visual Communication",
    avatar: "https://picsum.photos/seed/user1/300/300"
  },
  {
    id: 2,
    name: "Michael Robinson",
    course: "Information Experience Design",
    avatar: "https://picsum.photos/seed/user2/300/300"
  },
  {
    id: 3,
    name: "Sarah Park",
    course: "Animation",
    avatar: "https://picsum.photos/seed/user3/300/300"
  }
];

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState<"projects" | "teams" | "users">("projects");

  const filteredProjects = MOCK_PROJECTS.filter(project => 
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTeams = MOCK_TEAMS.filter(team => 
    team.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    team.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredUsers = MOCK_USERS.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.course.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8">Search</h2>
        
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex gap-2">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search for projects, teams, or users..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button type="submit">Search</Button>
          </div>
        </div>
        
        <Tabs value={searchType} onValueChange={(value) => setSearchType(value as any)}>
          <TabsList className="mb-6 mx-auto">
            <TabsTrigger value="projects">
              <Laptop className="w-4 h-4 mr-2" />
              Projects
            </TabsTrigger>
            <TabsTrigger value="teams">
              <Users className="w-4 h-4 mr-2" />
              Teams
            </TabsTrigger>
            <TabsTrigger value="users">
              <User className="w-4 h-4 mr-2" />
              Users
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="projects">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} {...project} />
              ))}
              {filteredProjects.length === 0 && (
                <div className="col-span-3 text-center py-12 text-muted-foreground">
                  No projects found matching your search.
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="teams">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTeams.map((team) => (
                <Card key={team.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{team.name}</h3>
                    <p className="text-muted-foreground mb-4">{team.description}</p>
                    <div className="flex justify-between text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Users className="w-4 h-4" />
                        {team.members} members
                      </div>
                      <Button size="sm">View Team</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {filteredTeams.length === 0 && (
                <div className="col-span-3 text-center py-12 text-muted-foreground">
                  No teams found matching your search.
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="users">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUsers.map((user) => (
                <Card key={user.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardContent className="p-6 flex items-center gap-4">
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className="w-16 h-16 rounded-full object-cover" 
                    />
                    <div>
                      <h3 className="text-lg font-semibold">{user.name}</h3>
                      <p className="text-muted-foreground text-sm">{user.course}</p>
                      <Button variant="outline" size="sm" className="mt-2">View Profile</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {filteredUsers.length === 0 && (
                <div className="col-span-3 text-center py-12 text-muted-foreground">
                  No users found matching your search.
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default SearchPage;
