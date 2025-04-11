
import { useState } from "react";
import { Plus, Tag, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProjectTagInputProps {
  tags: string[];
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
}

export const ProjectTagInput = ({ tags, onAddTag, onRemoveTag }: ProjectTagInputProps) => {
  const [currentTag, setCurrentTag] = useState("");

  const handleAddTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      onAddTag(currentTag.trim());
      setCurrentTag("");
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input 
          placeholder="Add tags (e.g., Design, Interactive)" 
          value={currentTag}
          onChange={(e) => setCurrentTag(e.target.value)}
          className="border-primary/20 focus-visible:ring-primary"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAddTag();
            }
          }}
        />
        <Button 
          type="button" 
          onClick={handleAddTag}
          variant="outline"
          className="border-primary/20"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>
      
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag, index) => (
            <Badge 
              key={index} 
              className="px-3 py-1 bg-primary/10 hover:bg-primary/20 text-foreground"
            >
              <Tag className="w-3 h-3 mr-1" />
              {tag}
              <button 
                type="button" 
                className="ml-2 text-foreground/70 hover:text-foreground"
                onClick={() => onRemoveTag(tag)}
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};
