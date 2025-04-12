
import { Label } from "@/components/ui/label";
import { ProjectTagInput } from "../ProjectTagInput";

interface TagsFieldProps {
  tags: string[];
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
}

export const TagsField = ({ tags, onAddTag, onRemoveTag }: TagsFieldProps) => {
  return (
    <div className="space-y-2">
      <Label>Project Tags</Label>
      <ProjectTagInput 
        tags={tags} 
        onAddTag={onAddTag} 
        onRemoveTag={onRemoveTag} 
      />
    </div>
  );
};
