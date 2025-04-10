
import { useState, useEffect, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getCurrentProfile, updateUserProfile, uploadAvatar, Profile } from "@/services/profileService";
import { hotToast } from "@/components/ui/hot-toast";
import { useAuth } from "@/context/AuthContext";
import { AvatarUpload } from "./profile/AvatarUpload";
import { ProfileBasicInfo } from "./profile/ProfileBasicInfo";
import { ProfileBioField } from "./profile/ProfileBioField";

// Form schema for validation
const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  course: z.string().min(2, "Course must be at least 2 characters"),
  year: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Year must be a positive number",
  }),
  bio: z.string().min(10, "Bio must be at least 10 characters"),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const AddProfileForm = () => {
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [existingProfile, setExistingProfile] = useState<Profile | null>(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  // Initialize form with react-hook-form
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      email: "",
      course: "",
      year: "",
      bio: "",
    },
  });

  // Load existing profile data if available
  useEffect(() => {
    const loadProfile = async () => {
      if (user) {
        const profile = await getCurrentProfile();
        if (profile) {
          setExistingProfile(profile);
          
          // Set form values from existing profile
          form.setValue("name", profile.name || "");
          form.setValue("email", user.email || "");
          form.setValue("course", profile.course || "");
          form.setValue("year", profile.year ? String(profile.year) : "");
          form.setValue("bio", profile.bio || "");
        } else if (user.email) {
          form.setValue("email", user.email);
        }
      }
    };

    loadProfile();
  }, [user, form]);

  const handleAvatarChange = (file: File | null) => {
    setAvatarFile(file);
  };

  const onSubmit = async (data: ProfileFormValues) => {
    if (!user) {
      hotToast({
        title: "Error",
        description: "You must be logged in to update your profile",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);

      // Prepare profile update data
      const profileData = {
        name: data.name,
        course: data.course,
        year: Number(data.year),
        bio: data.bio,
      };

      // Upload avatar if selected
      let avatarUrl = existingProfile?.avatar_url;
      if (avatarFile) {
        avatarUrl = await uploadAvatar(user.id, avatarFile);
      }

      // Update profile
      await updateUserProfile(user.id, {
        ...profileData,
        avatar_url: avatarUrl,
      });

      hotToast({
        title: "Success",
        description: "Your profile has been updated successfully!",
        variant: "success",
      });

      // Navigate back to profile page
      navigate("/profile");
    } catch (error) {
      console.error("Error updating profile:", error);
      hotToast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
          Complete Your Profile
        </h2>
        <p className="text-muted-foreground mt-2">
          Tell the community about yourself and your work
        </p>
      </div>
      
      <Card className="shadow-lg border-primary/20">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <h3 className="text-2xl font-semibold">Personal Information</h3>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                {/* Avatar Upload Component */}
                <AvatarUpload 
                  avatarUrl={existingProfile?.avatar_url || null} 
                  onAvatarChange={handleAvatarChange} 
                />
                
                {/* Basic Info Component */}
                <ProfileBasicInfo control={form.control} user={user} />
              </div>
              
              {/* Bio Field Component */}
              <ProfileBioField control={form.control} />
            </CardContent>
            <CardFooter className="flex justify-end border-t p-6">
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-gradient-to-r from-primary to-purple-500 hover:opacity-90"
              >
                {isSubmitting ? "Saving..." : "Save Profile"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default AddProfileForm;
