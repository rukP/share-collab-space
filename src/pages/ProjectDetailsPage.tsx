import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  Share2, 
  MessageSquare, 
  Calendar, 
  Tag, 
  Users, 
  CheckCircle, 
  XCircle, 
  Clock, 
  UserPlus 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { MOCK_PROJECTS, MOCK_USERS } from "@/data/mockData";

const PROJECT_DATA = {
  id: 1,
  title: "Interactive Art Installation",
  description: "A dynamic light installation responding to viewer movement and environmental conditions. This project explores the relationship between technology, space, and human interaction through a series of responsive light elements that change based on proximity and movement patterns.",
  imageUrl: "https://picsum.photos/seed/1/1200/600",
  likes: 42,
  author: "Alice Chen",
  authorAvatar: "https://picsum.photos/seed/alice/300/300",
  authorCourse: "Visual Communication",
  tags: ["Interactive", "Installation", "Light", "Technology"],
  date: "March 15, 2023",
  team: "Design Innovators",
  teamId: 1,
  comments: [
    {
      id: 1,
      author: "Emma Johnson",
      authorAvatar: "https://picsum.photos/seed/user1/300/300",
      text: "This is such an innovative approach to interactive art! I'd love to know more about the technical implementation.",
      date: "March 20, 2023"
    },
    {
      id: 2,
      author: "Michael Robinson",
      authorAvatar: "https://picsum.photos/seed/user2/300/300",
      text: "The use of responsive lighting creates a really immersive experience. Have you considered expanding this to multiple rooms?",
      date: "March 22, 2023"
    }
  ],
  relatedProjects: [
    {
      id: 3,
      title: "Digital Typography Experiment",
      imageUrl: "https://picsum.photos/seed/3/800/600",
      author: "Sarah Park"
    },
    {
      id: 4,
      title: "Architectural Model Series",
      imageUrl: "https://picsum.photos/seed/4/800/600",
      author: "Michael Robinson"
    }
  ]
};

const ProjectDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [project, setProject] = useState(PROJECT_DATA);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(PROJECT_DATA.likes);
  const [comment, setComment] = useState("");

  useEffect(() => {
    console.log(`Fetching project with ID: ${id}`);
    const mockProject = MOCK_PROJECTS.find(p => p.id.toString() === id);
    if (mockProject) {
      setProject(prevProject => ({
        ...prevProject,
        status: mockProject.status || "open"
      }));
    }
  }, [id]);

  const handleLike = () => {
    if (liked) {
      setLikesCount(prev => prev - 1);
    } else {
      setLikesCount(prev => prev + 1);
    }
    setLiked(!liked);
  };

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      toast({
        title: "Comment Posted",
        description: "Your comment has been added to the project."
      });
      setComment("");
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      toast({
        title: "Link Copied",
        description: "Project link copied to clipboard!"
      });
    });
  };

  const getStatusBadge = () => {
    const status = project.status || "open";
    
    switch (status) {
      case "open":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-300 ml-2">
            <CheckCircle className="w-3 h-3 mr-1" />
            Open to Join
          </Badge>
        );
      case "closed":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300 ml-2">
            <XCircle className="w-3 h-3 mr-1" />
            Team Full
          </Badge>
        );
      case "completed":
        return (
          <Badge className="bg-blue-100 text-blue-800 border-blue-300 ml-2">
            <Clock className="w-3 h-3 mr-1" />
            Completed
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center">
            <h1 className="text-3xl font-bold">{project.title}</h1>
            {getStatusBadge()}
          </div>
          <div className="flex flex-wrap items-center gap-4 mb-4 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Avatar className="w-6 h-6">
                <AvatarImage src={project.authorAvatar} alt={project.author} />
                <AvatarFallback>{project.author.charAt(0)}</AvatarFallback>
              </Avatar>
              <span>{project.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{project.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{project.team}</span>
            </div>
          </div>
        </div>
        
        <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
          <img 
            src={project.imageUrl} 
            alt={project.title} 
            className="w-full h-[400px] object-cover" 
          />
        </div>
        
        <div className="flex flex-wrap gap-4 mb-8">
          <Button 
            variant="outline" 
            onClick={handleLike} 
            className={liked ? "text-accent border-accent" : ""}
          >
            <Heart className={`w-4 h-4 mr-2 ${liked ? "fill-accent" : ""}`} />
            {likesCount} Likes
          </Button>
          
          <Button variant="outline" onClick={handleShare}>
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          
          {(project.status === "open") && (
            <Button 
              variant="default"
              className="bg-gradient-to-r from-primary to-purple-500 hover:opacity-90"
              onClick={() => navigate(`/projects/${id}/join`)}
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Request to Join
            </Button>
          )}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="mb-8">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4">About this Project</h2>
                <p className="text-muted-foreground whitespace-pre-line">{project.description}</p>
                
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <h2 className="text-2xl font-semibold mb-4">Comments</h2>
            <Card className="mb-6">
              <CardContent className="p-6">
                <form onSubmit={handleComment}>
                  <div className="mb-4">
                    <textarea 
                      placeholder="Add a comment..." 
                      className="w-full p-3 border rounded-md bg-secondary/50 text-foreground resize-none"
                      rows={3}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                  </div>
                  <Button type="submit" disabled={!comment.trim()}>
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Post Comment
                  </Button>
                </form>
              </CardContent>
            </Card>
            
            <div className="space-y-4 mb-8">
              {project.comments.map(comment => (
                <Card key={comment.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={comment.authorAvatar} alt={comment.author} />
                        <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <h4 className="font-medium">{comment.author}</h4>
                          <span className="text-xs text-muted-foreground">{comment.date}</span>
                        </div>
                        <p className="text-muted-foreground">{comment.text}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          <div>
            <Card className="mb-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">About the Creator</h3>
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={project.authorAvatar} alt={project.author} />
                    <AvatarFallback>{project.author.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{project.author}</p>
                    <p className="text-sm text-muted-foreground">{project.authorCourse}</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full">View Profile</Button>
              </CardContent>
            </Card>
            
            <Card className="mb-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Project Team</h3>
                <div className="mb-4">
                  <p className="font-medium">{project.team}</p>
                  <p className="text-sm text-muted-foreground mb-4">Collaborative design team</p>
                  <Button variant="outline" className="w-full">View Team</Button>
                </div>
              </CardContent>
            </Card>
            
            <h3 className="text-lg font-semibold mb-4">Related Projects</h3>
            <div className="space-y-4">
              {project.relatedProjects.map(related => (
                <Card key={related.id} className="overflow-hidden hover:shadow-md transition-all">
                  <CardContent className="p-4">
                    <div className="aspect-video mb-3 overflow-hidden rounded-md">
                      <img 
                        src={related.imageUrl} 
                        alt={related.title} 
                        className="w-full h-full object-cover transition-transform hover:scale-105" 
                      />
                    </div>
                    <h4 className="font-medium">{related.title}</h4>
                    <p className="text-sm text-muted-foreground">By {related.author}</p>
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

export default ProjectDetailsPage;
