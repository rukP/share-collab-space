
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface TitleFieldProps {
  title: string;
  setTitle: (title: string) => void;
}

export const TitleField = ({ title, setTitle }: TitleFieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="title">Project Title</Label>
      <Input 
        id="title" 
        placeholder="Enter your project title" 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border-primary/20 focus-visible:ring-primary"
        required
      />
    </div>
  );
};
