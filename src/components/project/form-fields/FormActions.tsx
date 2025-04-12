
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface FormActionsProps {
  isSubmitting: boolean;
  onCancel: () => void;
}

export const FormActions = ({ isSubmitting, onCancel }: FormActionsProps) => {
  return (
    <div className="flex justify-between border-t p-6">
      <Button 
        type="button" 
        variant="outline"
        className="border-primary/20"
        onClick={onCancel}
      >
        Cancel
      </Button>
      <Button 
        type="submit" 
        disabled={isSubmitting}
        className="bg-gradient-to-r from-primary to-purple-500 hover:opacity-90"
      >
        {isSubmitting ? "Sharing..." : "Share Project"}
      </Button>
    </div>
  );
};
