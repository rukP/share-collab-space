
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Comment {
  id: number;
  author: string;
  authorAvatar: string;
  text: string;
  date: string;
}

interface CommentSectionProps {
  comments: Comment[];
}

export const CommentSection = ({ comments }: CommentSectionProps) => {
  const [comment, setComment] = useState("");
  const { toast } = useToast();

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

  return (
    <div>
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
        {comments.map(comment => (
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
  );
};
