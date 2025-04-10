
import { Header } from "@/components/Header";
import CreateTeamForm from "@/components/CreateTeamForm";
import { useProtectedRoute } from "@/hooks/use-protected-route";

const CreateTeamPage = () => {
  const { isLoading } = useProtectedRoute();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <CreateTeamForm />
      </main>
    </div>
  );
};

export default CreateTeamPage;
