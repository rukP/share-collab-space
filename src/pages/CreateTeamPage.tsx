
import { Header } from "@/components/Header";
import CreateTeamForm from "@/components/CreateTeamForm";

const CreateTeamPage = () => {
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
