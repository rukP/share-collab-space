
import { useParams, Link, useNavigate } from "react-router-dom";
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
  ArrowLeft,
  UserMinus
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getTeamById, getTeamMembers, joinTeam, leaveTeam } from "@/services/teamService";
import { supabase } from "@/integrations/supabase/client";
import { hotToast } from "@/components/ui/hot-toast";

const TeamDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [isJoining, setIsJoining] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [isCurrentUserMember, setIsCurrentUserMember] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    data: team,
    isLoading: isTeamLoading,
    error: teamError
  } = useQuery({
    queryKey: ['team', id],
    queryFn: () => (id ? getTeamById(id) : null),
    enabled: !!id
  });

  const {
    data: members,
    isLoading: isMembersLoading,
    error: membersError
  } = useQuery({
    queryKey: ['team-members', id],
    queryFn: () => (id ? getTeamMembers(id) : []),
    enabled: !!id
  });

  // Get current user
  useEffect(() => {
    const checkCurrentUser = async () => {
      const { data } = await supabase.auth.getUser();
      setCurrentUserId(data.user?.id || null);
    };
    
    checkCurrentUser();
  }, []);

  // Check if current user is a member
  useEffect(() => {
    if (currentUserId && members) {
      const userIsMember = members.some(member => member.user_id === currentUserId);
      setIsCurrentUserMember(userIsMember);
    }
  }, [currentUserId, members]);

  // Handle join team
  const handleJoinTeam = async () => {
    if (!id || !currentUserId) {
      hotToast({
        title: "Error",
        description: "You must be logged in to join a team",
        variant: "destructive"
      });
      return;
    }

    setIsJoining(true);
    
    try {
      const success = await joinTeam(id, currentUserId);
      
      if (success) {
        // Refresh team members data
        queryClient.invalidateQueries({ queryKey: ['team-members', id] });
        setIsCurrentUserMember(true);
      }
    } catch (error) {
      console.error("Error joining team:", error);
    } finally {
      setIsJoining(false);
    }
  };

  // Handle leave team
  const handleLeaveTeam = async () => {
    if (!id || !currentUserId) return;

    setIsLeaving(true);
    
    try {
      const success = await leaveTeam(id, currentUserId);
      
      if (success) {
        // Refresh team members data
        queryClient.invalidateQueries({ queryKey: ['team-members', id] });
        setIsCurrentUserMember(false);
      }
    } catch (error) {
      console.error("Error leaving team:", error);
    } finally {
      setIsLeaving(false);
    }
  };

  if (isTeamLoading) {
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

  if (teamError || !team) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center h-[60vh]">
            <p className="text-lg text-muted-foreground mb-4">Team not found or error loading team details.</p>
            <Button onClick={() => navigate("/teams")}>
              Back to Teams
            </Button>
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
              {currentUserId && (
                isCurrentUserMember ? (
                  <Button 
                    onClick={handleLeaveTeam}
                    disabled={isLeaving}
                    size="sm"
                    variant="outline"
                    className="gap-2"
                  >
                    <UserMinus className="w-4 h-4" />
                    {isLeaving ? "Leaving..." : "Leave Team"}
                  </Button>
                ) : (
                  <Button 
                    onClick={handleJoinTeam} 
                    disabled={isJoining}
                    size="sm"
                    className="gap-2"
                  >
                    <UserPlus className="w-4 h-4" />
                    {isJoining ? "Joining..." : "Join Team"}
                  </Button>
                )
              )}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              Founded: {new Date(team.created_at).toLocaleDateString()}
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {members?.length || 0} members
            </Badge>
          </div>
          
          <p className="text-muted-foreground">{team.description}</p>
        </div>
        
        {/* Team Content Tabs */}
        <Tabs defaultValue="overview" onValueChange={setActiveTab} className="mb-8">
          <TabsList className="mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
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
                    {team.description || "No team description provided."}
                  </p>
                  
                  <div className="bg-card/50 p-4 rounded-lg border border-border">
                    <h3 className="text-sm font-medium mb-2">Team Details</h3>
                    <dl className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <dt className="text-muted-foreground">Created</dt>
                        <dd className="font-medium mt-1">{new Date(team.created_at).toLocaleDateString()}</dd>
                      </div>
                      <div>
                        <dt className="text-muted-foreground">Members</dt>
                        <dd className="font-medium mt-1">{members?.length || 0}</dd>
                      </div>
                    </dl>
                  </div>
                </CardContent>
              </Card>
              
              {/* Team Admins */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <h2 className="text-lg font-semibold">Team Admins</h2>
                  </CardHeader>
                  <CardContent>
                    {isMembersLoading ? (
                      <div className="animate-pulse space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary/10"></div>
                          <div className="space-y-2">
                            <div className="h-4 w-24 bg-primary/10 rounded"></div>
                            <div className="h-3 w-16 bg-primary/5 rounded"></div>
                          </div>
                        </div>
                      </div>
                    ) : members && members.filter(m => m.role === "admin").length > 0 ? (
                      <div className="space-y-3">
                        {members.filter(m => m.role === "admin").map(admin => (
                          <div key={admin.id} className="flex items-center gap-4">
                            <Avatar className="w-10 h-10 border border-white/10">
                              <AvatarImage src={admin.profile?.avatar_url || undefined} />
                              <AvatarFallback>
                                {(admin.profile?.name || "User").charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-medium">{admin.profile?.name || "User"}</h3>
                              <p className="text-sm text-muted-foreground">{admin.role}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-sm">No team admins found.</p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          {/* Members Tab */}
          <TabsContent value="members">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Team Members</h2>
              </div>
              
              {isMembersLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map(i => (
                    <Card key={i} className="hover:shadow-md transition-all">
                      <CardContent className="p-4 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 animate-pulse"></div>
                        <div className="flex-1 space-y-2 animate-pulse">
                          <div className="h-4 bg-primary/10 rounded w-1/3"></div>
                          <div className="h-3 bg-primary/5 rounded w-1/4"></div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : members && members.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {members.map(member => (
                    <Card key={member.id} className="hover:shadow-md transition-all">
                      <CardContent className="p-4 flex items-center gap-4">
                        <Avatar className="w-12 h-12 border border-white/10">
                          <AvatarImage src={member.profile?.avatar_url || undefined} />
                          <AvatarFallback>
                            {(member.profile?.name || "User").charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-medium">{member.profile?.name || "User"}</h3>
                          <p className="text-sm text-muted-foreground">{member.role}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No members in this team yet.</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          {/* Projects Tab */}
          <TabsContent value="projects">
            <div className="text-center py-8">
              <h2 className="text-xl font-semibold mb-2">Coming Soon</h2>
              <p className="text-muted-foreground">Team projects feature is under development.</p>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default TeamDetailsPage;
