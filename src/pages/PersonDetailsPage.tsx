
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/ProjectCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  GraduationCap, Briefcase, Mail, MapPin, 
  Link as LinkIcon, Github, Instagram, Twitter 
} from "lucide-react";

// Mock person data - in a real app this would come from an API
const PERSON_DATA = {
  id: 1,
  name: "Emma Johnson",
  avatar: "https://picsum.photos/seed/user1/300/300",
  bio: "Visual designer and digital artist exploring interactive installations and virtual environments. Currently in my second year at RCA studying Visual Communication.",
  course: "Visual Communication",
  year: 2,
  location: "London, UK",
  email: "emma.johnson@student.rca.ac.uk",
  skills: ["UI/UX Design", "Digital Illustration", "Installation Art", "Processing", "Web Development"],
  links: {
    portfolio: "emmajohnson.com",
    github: "github.com/emmajohnson",
    instagram: "instagram.com/emma.creates",
    twitter: "twitter.com/emmajohnson"
  },
  projects: [
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
  ],
  teams: [
    {
      id: 1,
      name: "Design Innovators",
      description: "A team focused on experimental design approaches across various media",
      members: 4,
      openPositions: 2,
      createdAt: "2023-10-15"
    }
  ]
};

const PersonDetailsPage = () => {
  const { id } = useParams();
  const [person, setPerson] = useState(PERSON_DATA);
  const [isConnecting, setIsConnecting] = useState(false);

  // In a real app, fetch person data based on ID
  useEffect(() => {
    // This would be an API call in a real app
    console.log(`Fetching person with ID: ${id}`);
    // For now, we'll just use our mock data
  }, [id]);

  const handleConnect = () => {
    setIsConnecting(true);
    // Simulate API call
    setTimeout(() => {
      setIsConnecting(false);
      alert("Connection request sent!");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile sidebar */}
          <div className="md:col-span-1">
            <Card className="sticky top-20">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center mb-6">
                  <Avatar className="w-24 h-24 mb-4">
                    <AvatarImage src={person.avatar} alt={person.name} />
                    <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h1 className="text-2xl font-bold">{person.name}</h1>
                  <p className="text-muted-foreground">{person.course}, Year {person.year}</p>
                  
                  <div className="mt-4 w-full">
                    <Button 
                      className="w-full mb-2" 
                      onClick={handleConnect}
                      disabled={isConnecting}
                    >
                      {isConnecting ? "Connecting..." : "Connect"}
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Mail className="w-4 h-4 mr-2" />
                      Message
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">About</h3>
                    <p className="text-muted-foreground">{person.bio}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Details</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2 text-muted-foreground">
                        <GraduationCap className="w-4 h-4" />
                        {person.course}
                      </li>
                      <li className="flex items-center gap-2 text-muted-foreground">
                        <Briefcase className="w-4 h-4" />
                        Year {person.year}
                      </li>
                      <li className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        {person.location}
                      </li>
                      <li className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="w-4 h-4" />
                        {person.email}
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {person.skills.map((skill, index) => (
                        <span 
                          key={index} 
                          className="bg-secondary px-3 py-1 rounded-full text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Links</h3>
                    <ul className="space-y-2 text-sm">
                      {person.links.portfolio && (
                        <li className="flex items-center gap-2 text-muted-foreground">
                          <LinkIcon className="w-4 h-4" />
                          <a 
                            href={`https://${person.links.portfolio}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="hover:text-primary hover:underline"
                          >
                            {person.links.portfolio}
                          </a>
                        </li>
                      )}
                      {person.links.github && (
                        <li className="flex items-center gap-2 text-muted-foreground">
                          <Github className="w-4 h-4" />
                          <a 
                            href={`https://${person.links.github}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="hover:text-primary hover:underline"
                          >
                            {person.links.github}
                          </a>
                        </li>
                      )}
                      {person.links.instagram && (
                        <li className="flex items-center gap-2 text-muted-foreground">
                          <Instagram className="w-4 h-4" />
                          <a 
                            href={`https://${person.links.instagram}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="hover:text-primary hover:underline"
                          >
                            {person.links.instagram}
                          </a>
                        </li>
                      )}
                      {person.links.twitter && (
                        <li className="flex items-center gap-2 text-muted-foreground">
                          <Twitter className="w-4 h-4" />
                          <a 
                            href={`https://${person.links.twitter}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="hover:text-primary hover:underline"
                          >
                            {person.links.twitter}
                          </a>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main content */}
          <div className="md:col-span-2">
            <Tabs defaultValue="projects">
              <TabsList className="mb-6">
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="teams">Teams</TabsTrigger>
              </TabsList>
              
              <TabsContent value="projects">
                <h2 className="text-2xl font-semibold mb-6">Projects by {person.name}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {person.projects.map((project) => (
                    <ProjectCard key={project.id} {...project} />
                  ))}
                  {person.projects.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground col-span-2">
                      No projects shared yet.
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="teams">
                <h2 className="text-2xl font-semibold mb-6">Teams {person.name} is part of</h2>
                <div className="space-y-4">
                  {person.teams.map((team) => (
                    <Card key={team.id} className="hover:shadow-md transition-all">
                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold mb-2">{team.name}</h3>
                        <p className="text-muted-foreground mb-4">{team.description}</p>
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <div>Members: {team.members}</div>
                          <div>Created: {team.createdAt}</div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {person.teams.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                      Not a member of any teams yet.
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PersonDetailsPage;
