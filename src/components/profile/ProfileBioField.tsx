
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Control } from "react-hook-form";

interface ProfileBioFieldProps {
  control: Control<any>;
}

export const ProfileBioField = ({ control }: ProfileBioFieldProps) => {
  return (
    <FormField
      control={control}
      name="bio"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Bio</FormLabel>
          <FormControl>
            <Textarea 
              {...field} 
              placeholder="Tell us about yourself, your interests, and your work..." 
              rows={5}
              className="border-primary/20 focus-visible:ring-primary resize-y"
            />
          </FormControl>
          <FormDescription>
            Your bio will be visible to other users on your profile page.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
