
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface DescriptionFieldProps {
  description: string;
  setDescription: (description: string) => void;
}

export const DescriptionField = ({ description, setDescription }: DescriptionFieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="description">Project Description</Label>
      <Textarea 
        id="description" 
        placeholder="Describe your project in detail..." 
        rows={5}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border-primary/20 focus-visible:ring-primary resize-y"
        required
      />
    </div>
  );
};
