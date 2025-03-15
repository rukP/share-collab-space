
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Share2, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface ProjectActionsProps {
  projectId: number | string;
  likes: {
    count: number;
    isLiked: boolean;
    onLike: () => void;
  };
  status?: "open" | "closed" | "completed";
  size?: "sm" | "default";
  variant?: "grouped" | "separated";
  showLabels?: boolean;
  className?: string;
}

export const ProjectActions = ({
  projectId,
  likes,
  status = "open",
  size = "default",
  variant = "grouped",
  showLabels = true,
  className = "",
}: ProjectActionsProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleShare = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    navigator.clipboard.writeText(window.location.href).then(() => {
      toast({
        title: "Link Copied",
        description: "Project link copied to clipboard!"
      });
    });
  };

  const handleJoinRequest = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    navigate(`/projects/${projectId}/join`);
  };

  const handleLike = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    likes.onLike();
  };

  if (variant === "separated") {
    // Use separate buttons for card layouts
    return (
      <div className={`flex gap-4 ${className}`}>
        <Button 
          variant="ghost" 
          size={size === "default" ? "default" : "sm"}
          onClick={handleLike}
          className={likes.isLiked ? "text-primary" : ""}
        >
          <Heart className={`w-4 h-4 ${showLabels ? "mr-1" : ""} ${likes.isLiked ? "fill-primary" : ""}`} />
          {showLabels && likes.count}
        </Button>
        
        <Button 
          variant="ghost" 
          size={size === "default" ? "default" : "sm"}
          onClick={handleShare}
        >
          <Share2 className={`w-4 h-4 ${showLabels ? "mr-1" : ""}`} />
          {showLabels && "Share"}
        </Button>
        
        {(status === "open") && (
          <Button 
            variant="ghost" 
            size={size === "default" ? "default" : "sm"}
            onClick={handleJoinRequest}
            disabled={status !== "open"}
          >
            <UserPlus className={`w-4 h-4 ${showLabels ? "mr-1" : ""}`} />
            {showLabels && "Team up"}
          </Button>
        )}
      </div>
    );
  }

  // Default grouped style for page layouts
  return (
    <div className={`flex flex-wrap gap-4 ${className}`}>
      <Button 
        variant="outline" 
        onClick={handleLike} 
        className={likes.isLiked ? "text-accent border-accent" : ""}
      >
        <Heart className={`w-4 h-4 mr-2 ${likes.isLiked ? "fill-accent" : ""}`} />
        {likes.count} Likes
      </Button>
      
      <Button variant="outline" onClick={handleShare}>
        <Share2 className="w-4 h-4 mr-2" />
        Share
      </Button>
      
      {(status === "open") && (
        <Button 
          variant="default"
          className="bg-gradient-to-r from-primary to-purple-500 hover:opacity-90"
          onClick={handleJoinRequest}
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Request to Join
        </Button>
      )}
    </div>
  );
};
