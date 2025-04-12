
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface CourseFieldProps {
  course: string;
  setCourse: (course: string) => void;
}

export const CourseField = ({ course, setCourse }: CourseFieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="course">Course</Label>
      <Input 
        id="course" 
        placeholder="Your program or course" 
        value={course}
        onChange={(e) => setCourse(e.target.value)}
        className="border-primary/20 focus-visible:ring-primary"
        required
      />
    </div>
  );
};
