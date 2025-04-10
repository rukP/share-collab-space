
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { User, Mail, Building, School } from "lucide-react";
import { Control } from "react-hook-form";

interface ProfileBasicInfoProps {
  control: Control<any>;
  user: { email?: string } | null;
}

export const ProfileBasicInfo = ({ control, user }: ProfileBasicInfoProps) => {
  return (
    <div className="w-full md:w-2/3 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <FormControl>
                  <Input 
                    {...field} 
                    placeholder="Your name" 
                    className="pl-10 border-primary/20 focus-visible:ring-primary"
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <FormControl>
                  <Input 
                    {...field} 
                    placeholder="Your email" 
                    className="pl-10 border-primary/20 focus-visible:ring-primary"
                    disabled={!!user?.email}
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="course"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course / Program</FormLabel>
              <div className="relative">
                <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <FormControl>
                  <Input 
                    {...field} 
                    placeholder="Your course or program" 
                    className="pl-10 border-primary/20 focus-visible:ring-primary"
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="year"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Year</FormLabel>
              <div className="relative">
                <School className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <FormControl>
                  <Input 
                    {...field} 
                    placeholder="Current year (e.g., 2)" 
                    className="pl-10 border-primary/20 focus-visible:ring-primary"
                    type="number"
                    min="1"
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
