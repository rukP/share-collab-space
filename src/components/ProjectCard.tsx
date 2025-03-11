
import { Heart, Users } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  likes: number;
  author: string;
}

export const ProjectCard = ({ title, description, imageUrl, likes, author }: ProjectCardProps) => {
  const [likesCount, setLikesCount] = useState(likes);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      setLikesCount(prev => prev - 1);
    } else {
      setLikesCount(prev => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  return (
    <Card className="project-card overflow-hidden">
      <CardHeader className="p-0">
        <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center">
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
          <Button variant="ghost" size="sm">
            <Users className="w-4 h-4 mr-1" />
            Team up
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
