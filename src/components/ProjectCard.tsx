
import { Heart, Users, CheckCircle, XCircle, Clock } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Link } from "react-router-dom";

interface ProjectCardProps {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  likes: number;
  author: string;
  status?: "open" | "closed" | "completed";
}

export const ProjectCard = ({ id, title, description, imageUrl, likes, author, status = "open" }: ProjectCardProps) => {
  const [likesCount, setLikesCount] = useState(likes);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent link navigation when clicking the like button
    e.stopPropagation(); // Stop event propagation
    
    if (isLiked) {
      setLikesCount(prev => prev - 1);
    } else {
      setLikesCount(prev => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  const getStatusBadge = () => {
    switch (status) {
      case "open":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-200 border-green-300">
            <CheckCircle className="w-3 h-3 mr-1" />
            Open to Join
          </Badge>
        );
      case "closed":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-300">
            <XCircle className="w-3 h-3 mr-1" />
            Team Full
          </Badge>
        );
      case "completed":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-300">
            <Clock className="w-3 h-3 mr-1" />
            Completed
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <Link to={`/projects/${id}`}>
      <Card className="project-card overflow-hidden h-full">
        <CardHeader className="p-0">
          <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-semibold">{title}</h3>
            {getStatusBadge()}
          </div>
          <p className="text-muted-foreground text-sm">{description}</p>
        </CardContent>
        <CardFooter className="p-4 flex justify-between items-center mt-auto">
          <div className="text-sm text-muted-foreground">By {author}</div>
          <div className="flex gap-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleLike}
              className={isLiked ? "text-primary" : ""}
            >
              <Heart className="w-4 h-4 mr-1" />
              {likesCount}
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                window.location.href = `/projects/${id}/join`;
              }}
              disabled={status !== "open"}
            >
              <Users className="w-4 h-4 mr-1" />
              Team up
            </Button>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};
