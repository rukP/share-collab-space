
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tag } from "lucide-react";

interface ProjectInfoProps {
  description: string;
  tags: string[];
}

export const ProjectInfo = ({ description, tags }: ProjectInfoProps) => {
  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <h2 className="text-2xl font-semibold mb-4">About this Project</h2>
        <p className="text-muted-foreground whitespace-pre-line">{description}</p>
        
        <div className="mt-6 flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="flex items-center gap-1">
              <Tag className="w-3 h-3" />
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
