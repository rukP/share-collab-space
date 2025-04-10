
import { Header } from "@/components/Header";
import { useProtectedRoute } from "@/hooks/use-protected-route";
import { useProfile } from "@/hooks/use-profile";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileContent } from "@/components/profile/ProfileContent";

const ProfilePage = () => {
  const { isLoading: authLoading } = useProtectedRoute();
  
  // Use our custom hook to fetch all profile data
  const {
    profile,
    isProfileLoading,
    projects,
    isProjectsLoading,
    teams,
    isTeamsLoading,
    isProfileIncomplete
  } = useProfile();

  if (authLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <ProfileHeader isProfileIncomplete={isProfileIncomplete} />
        <ProfileContent
          profile={profile}
          isProfileLoading={isProfileLoading}
          projects={projects}
          isProjectsLoading={isProjectsLoading}
          teams={teams}
          isTeamsLoading={isTeamsLoading}
        />
      </main>
    </div>
  );
};

export default ProfilePage;
