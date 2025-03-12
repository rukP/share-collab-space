
import { Header } from "@/components/Header";
import AddProfileForm from "@/components/AddProfileForm";

const AddProfilePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <AddProfileForm />
      </main>
    </div>
  );
};

export default AddProfilePage;
