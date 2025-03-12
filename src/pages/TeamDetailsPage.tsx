
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, UserPlus, Briefcase, Clock } from "lucide-react";

// Mock team data - in a real app this would come from an API
const TEAM_DATA = {
  id: 1,
  name: "Design Innovators",
  description: "A team focused on experimental design approaches across various media, exploring new possibilities in digital and physical spaces. We work collaboratively on projects that challenge conventional design thinking.",
  members: 4,
  openPositions: 2,
  createdAt: "2023-10-15",
  category: "Design & Technology",
  meetingTimes: "Tuesdays & Fridays",
  isRecruiting: true,
  projects: [
    {
      id: 1,
      title: "Interactive Art Installation",
      description: "A dynamic light installation responding to viewer movement",
      imageUrl: "https://picsum.photos/seed/1/800/600",
    },
    {
      id: 4,
      title: "Architectural Model Series",
      description: "Miniature architectural models exploring spatial relationships",
      imageUrl: "https://picsum.photos/seed/4/800/600",
    }
  ],
  teamMembers: [
    {
      id: 1,
      name: "Emma Johnson",
      role: "Team Leader",
      avatar: "https://picsum.photos/seed/user1/300/300"
    },
    {
      id: 2,
      name: "Michael Robinson",
      role: "Design Technologist",
      avatar: "https://picsum.photos/seed/user2/300/300"
    },
    {
      id: 3,
      name: "Sarah Park",
      role: "Visual Designer",
      avatar: "https://picsum.photos/seed/user3/300/300"
    },
    {
      id: 4,
      name: "Thomas Lee",
      role: "Creative Developer",
      avatar: "https://picsum.photos/seed/user4/300/300"
    }
  ]
};

const TeamDetailsPage = () => {
  const { id } = useParams();
  const [team, setTeam] = useState(TEAM_DATA);
  const [isJoining, setIsJoining] = useState(false);

  // In a real app, fetch team data based on ID
  useEffect(() => {
    // This would be an API call in a real app
    console.log(`Fetching team with ID: ${id}`);
    // For now, we'll just use our mock data
  }, [id]);

  const handleJoinTeam = () => {
    setIsJoining(true);
    // Simulate API call
    setTimeout(() => {
      setIsJoining(false);
      // Show success message
      alert("Request to join team sent!");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{team.name}</h1>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              Created: {team.createdAt}
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {team.members} members
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Briefcase className="w-3 h-3" />
              {team.category}
            </Badge>
            {team.isRecruiting && (
              <Badge variant="default" className="bg-accent">
                Recruiting
              </Badge>
            )}
          </div>
          <p className="text-muted-foreground mb-6">{team.description}</p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Button 
              onClick={handleJoinTeam} 
              disabled={isJoining || !team.isRecruiting}
              className="w-full sm:w-auto"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              {isJoining ? "Sending Request..." : "Request to Join"}
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Team details */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold mb-4">Team Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {team.projects.map(project => (
                <Card key={project.id} className="overflow-hidden hover:shadow-md transition-all">
                  <CardHeader className="p-0">
                    <img src={project.imageUrl} alt={project.title} className="w-full h-48 object-cover" />
                  </CardHeader>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                    <p className="text-muted-foreground text-sm">{project.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <h2 className="text-2xl font-semibold mb-4">Team Information</h2>
            <Card className="mb-8">
              <CardContent className="p-6">
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <dt className="text-muted-foreground">Category</dt>
                    <dd className="font-medium">{team.category}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Open Positions</dt>
                    <dd className="font-medium">{team.openPositions}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Meeting Times</dt>
                    <dd className="font-medium flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {team.meetingTimes}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Created</dt>
                    <dd className="font-medium">{team.createdAt}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          </div>
          
          {/* Team members sidebar */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Team Members</h2>
            <div className="space-y-4">
              {team.teamMembers.map(member => (
                <Card key={member.id} className="hover:shadow-md transition-all">
                  <CardContent className="p-4 flex items-center gap-4">
                    <Avatar className="w-12 h-12 border border-white/10">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{member.name}</h3>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeamDetailsPage;
