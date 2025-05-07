
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Users, 
  UserPlus, 
  Briefcase, 
  Clock, 
  Github, 
  ExternalLink,
  MessageSquare,
  ArrowLeft
} from "lucide-react";
import { MOCK_TEAMS } from "@/data/mockData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

const TeamDetailsPage = () => {
  const { id } = useParams();
  const [team, setTeam] = useState<any>(null);
  const [isJoining, setIsJoining] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    // In a real app, this would be an API call
    if (id) {
      const foundTeam = MOCK_TEAMS.find(team => team.id === parseInt(id));
      if (foundTeam) {
        setTeam(foundTeam);
      }
    }
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

  if (!team) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-[60vh]">
            <p className="text-lg text-muted-foreground">Loading team details...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Back button */}
        <Link to="/teams" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Teams
        </Link>
        
        {/* Team Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
            <h1 className="text-3xl font-bold">{team.name}</h1>
            
            <div className="flex gap-3">
              <Link to="/profile">
                <Button variant="outline" size="sm" className="gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Contact
                </Button>
              </Link>
              {team.isRecruiting && (
                <Button 
                  onClick={handleJoinTeam} 
                  disabled={isJoining}
                  size="sm"
                  className="gap-2"
                >
                  <UserPlus className="w-4 h-4" />
                  {isJoining ? "Sending Request..." : "Join Team"}
                </Button>
              )}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              Founded: {team.createdAt}
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {team.members} members
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Briefcase className="w-3 h-3" />
              {team.category}
            </Badge>
            {team.isRecruiting ? (
              <Badge variant="default" className="bg-green-500/10 text-green-500 border-green-500/20">
                Recruiting
              </Badge>
            ) : (
              <Badge variant="outline" className="text-yellow-500 border-yellow-500/20">
                Not Recruiting
              </Badge>
            )}
          </div>
          
          <p className="text-muted-foreground">{team.description}</p>
        </div>
        
        {/* Team Content Tabs */}
        <Tabs defaultValue="overview" onValueChange={setActiveTab} className="mb-8">
          <TabsList className="mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Team Information */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <h2 className="text-xl font-semibold">About the Team</h2>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    {team.name} is a team of passionate developers and designers from Rwanda Coding Academy.
                    We focus on {team.category} projects, with an emphasis on building solutions that address
                    local challenges and provide opportunities for learning and growth.
                  </p>
                  
                  <div className="bg-card/50 p-4 rounded-lg border border-border">
                    <h3 className="text-sm font-medium mb-2">Team Details</h3>
                    <dl className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <dt className="text-muted-foreground">Category</dt>
                        <dd className="font-medium mt-1">{team.category}</dd>
                      </div>
                      <div>
                        <dt className="text-muted-foreground">Open Positions</dt>
                        <dd className="font-medium mt-1">{team.openPositions}</dd>
                      </div>
                      <div>
                        <dt className="text-muted-foreground">Meeting Times</dt>
                        <dd className="font-medium mt-1 flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {team.meetingTimes}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-muted-foreground">Founded</dt>
                        <dd className="font-medium mt-1">{team.createdAt}</dd>
                      </div>
                    </dl>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Resources & Links</h3>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="gap-2">
                        <Github className="w-4 h-4" />
                        GitHub
                      </Button>
                      <Button variant="outline" size="sm" className="gap-2">
                        <ExternalLink className="w-4 h-4" />
                        Team Website
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Team Lead and Recent Activity */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <h2 className="text-lg font-semibold">Team Lead</h2>
                  </CardHeader>
                  <CardContent>
                    {team.teamMembers && team.teamMembers.filter(member => member.role === "Team Leader").map(leader => (
                      <div key={leader.id} className="flex items-center gap-4">
                        <Avatar className="w-12 h-12 border border-white/10">
                          <AvatarImage src={leader.avatar} alt={leader.name} />
                          <AvatarFallback>{leader.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{leader.name}</h3>
                          <p className="text-sm text-muted-foreground">{leader.role}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <h2 className="text-lg font-semibold">Activity</h2>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <div className="w-1 bg-primary rounded-full" />
                        <div>
                          <p className="text-sm">Team completed project <span className="font-medium">RCA Student Portal</span></p>
                          <p className="text-xs text-muted-foreground">2 days ago</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="w-1 bg-primary rounded-full" />
                        <div>
                          <p className="text-sm">New member <span className="font-medium">Marie Uwimana</span> joined</p>
                          <p className="text-xs text-muted-foreground">1 week ago</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="w-1 bg-primary rounded-full" />
                        <div>
                          <p className="text-sm">Started new project <span className="font-medium">Alumni Tracking System</span></p>
                          <p className="text-xs text-muted-foreground">2 weeks ago</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          {/* Projects Tab */}
          <TabsContent value="projects">
            <div className="mb-4">
              <h2 className="text-2xl font-semibold mb-4">Team Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {team.projects && team.projects.map(project => (
                  <Card key={project.id} className="overflow-hidden hover:shadow-md transition-all">
                    <CardHeader className="p-0">
                      <img src={project.imageUrl} alt={project.title} className="w-full h-48 object-cover" />
                    </CardHeader>
                    <CardContent className="p-4">
                      <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                      <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
                    </CardContent>
                    <CardFooter className="border-t bg-card/50 p-4">
                      <Button variant="outline" className="w-full">View Details</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
          
          {/* Members Tab */}
          <TabsContent value="members">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Team Members</h2>
                {team.openPositions > 0 && (
                  <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
                    {team.openPositions} open positions
                  </Badge>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {team.teamMembers && team.teamMembers.map(member => (
                  <Card key={member.id} className="hover:shadow-md transition-all">
                    <CardContent className="p-4 flex items-center gap-4">
                      <Avatar className="w-12 h-12 border border-white/10">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-medium">{member.name}</h3>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                      </div>
                      <Button variant="ghost" size="sm">View Profile</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {team.openPositions > 0 && (
                <div className="mt-8">
                  <Separator className="mb-6" />
                  <h3 className="text-lg font-semibold mb-4">Open Positions</h3>
                  <div className="space-y-4">
                    {Array.from({length: team.openPositions}).map((_, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <h4 className="font-medium mb-2">
                            {index === 0 ? "Frontend Developer" : 
                             index === 1 ? "Backend Developer" : "UI Designer"}
                          </h4>
                          <p className="text-sm text-muted-foreground mb-4">
                            {index === 0 ? "Looking for someone experienced with React and TypeScript." : 
                             index === 1 ? "Need a developer familiar with Node.js and MongoDB." : 
                             "Seeking someone with UI/UX design skills for our projects."}
                          </p>
                          <Button size="sm" onClick={handleJoinTeam} disabled={isJoining}>
                            {isJoining ? "Applying..." : "Apply Now"}
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default TeamDetailsPage;
