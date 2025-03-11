
import { Header } from "@/components/Header";
import { ProjectCard } from "@/components/ProjectCard";

// Temporary mock data
const MOCK_PROJECTS = [
  {
    id: 1,
    title: "Interactive Art Installation",
    description: "A dynamic light installation responding to viewer movement",
    imageUrl: "https://picsum.photos/seed/1/800/600",
    likes: 24,
    author: "Alice Chen"
  },
  {
    id: 2,
    title: "Sustainable Fashion Collection",
    description: "Exploring eco-friendly materials in contemporary fashion",
    imageUrl: "https://picsum.photos/seed/2/800/600",
    likes: 18,
    author: "James Wilson"
  },
  {
    id: 3,
    title: "Digital Typography Experiment",
    description: "Playing with variable fonts and animation",
    imageUrl: "https://picsum.photos/seed/3/800/600",
    likes: 32,
    author: "Sarah Park"
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_PROJECTS.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;
