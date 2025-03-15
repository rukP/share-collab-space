
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Share2, UserPlus, CheckCircle, XCircle, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface ProjectHeaderProps {
  id: string | undefined;
  project: {
    title: string;
    author: string;
    authorAvatar: string;
    date: string;
    team: string;
    status?: "open" | "closed" | "completed";
  };
  likes: {
    count: number;
    isLiked: boolean;
    onLike: () => void;
  };
}

export const ProjectHeader = ({ id, project, likes }: ProjectHeaderProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

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
    <div className="mb-8">
      <div className="flex items-center">
        <h1 className="text-3xl font-bold">{project.title}</h1>
        {getStatusBadge()}
      </div>
      <div className="flex flex-wrap items-center gap-4 mb-4 text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full overflow-hidden">
            <img src={project.authorAvatar} alt={project.author} className="w-full h-full object-cover" />
          </div>
          <span>{project.author}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>{project.date}</span>
        </div>
        <div className="flex items-center gap-1">
          <UserPlus className="w-4 h-4" />
          <span>{project.team}</span>
        </div>
      </div>
      
      <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
        <img 
          src={project.authorAvatar} 
          alt={project.title} 
          className="w-full h-[400px] object-cover" 
        />
      </div>
      
      <div className="flex flex-wrap gap-4 mb-8">
        <Button 
          variant="outline" 
          onClick={likes.onLike} 
          className={likes.isLiked ? "text-accent border-accent" : ""}
        >
          <Heart className={`w-4 h-4 mr-2 ${likes.isLiked ? "fill-accent" : ""}`} />
          {likes.count} Likes
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
    </div>
  );
};
