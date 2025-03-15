
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { MOCK_PROJECTS } from "@/data/mockData";
import { ProjectHeader } from "@/components/project/ProjectHeader";
import { ProjectInfo } from "@/components/project/ProjectInfo";
import { CommentSection } from "@/components/project/CommentSection";
import { ProjectSidebar } from "@/components/project/ProjectSidebar";

interface ProjectData {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  likes: number;
  author: string;
  authorAvatar: string;
  authorCourse: string;
  tags: string[];
  date: string;
  team: string;
  teamId: number;
  status?: "open" | "closed" | "completed";
  comments: {
    id: number;
    author: string;
    authorAvatar: string;
    text: string;
    date: string;
  }[];
  relatedProjects: {
    id: number;
    title: string;
    imageUrl: string;
    author: string;
  }[];
}

const PROJECT_DATA: ProjectData = {
  id: 1,
  title: "Interactive Art Installation",
  description: "A dynamic light installation responding to viewer movement and environmental conditions. This project explores the relationship between technology, space, and human interaction through a series of responsive light elements that change based on proximity and movement patterns.",
  imageUrl: "https://picsum.photos/seed/1/1200/600",
  likes: 42,
  author: "Alice Chen",
  authorAvatar: "https://picsum.photos/seed/alice/300/300",
  authorCourse: "Visual Communication",
  tags: ["Interactive", "Installation", "Light", "Technology"],
  date: "March 15, 2023",
  team: "Design Innovators",
  teamId: 1,
  status: "open",
  comments: [
    {
      id: 1,
      author: "Emma Johnson",
      authorAvatar: "https://picsum.photos/seed/user1/300/300",
      text: "This is such an innovative approach to interactive art! I'd love to know more about the technical implementation.",
      date: "March 20, 2023"
    },
    {
      id: 2,
      author: "Michael Robinson",
      authorAvatar: "https://picsum.photos/seed/user2/300/300",
      text: "The use of responsive lighting creates a really immersive experience. Have you considered expanding this to multiple rooms?",
      date: "March 22, 2023"
    }
  ],
  relatedProjects: [
    {
      id: 3,
      title: "Digital Typography Experiment",
      imageUrl: "https://picsum.photos/seed/3/800/600",
      author: "Sarah Park"
    },
    {
      id: 4,
      title: "Architectural Model Series",
      imageUrl: "https://picsum.photos/seed/4/800/600",
      author: "Michael Robinson"
    }
  ]
};

const ProjectDetailsPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState<ProjectData>(PROJECT_DATA);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(PROJECT_DATA.likes);

  useEffect(() => {
    console.log(`Fetching project with ID: ${id}`);
    const mockProject = MOCK_PROJECTS.find(p => p.id.toString() === id);
    if (mockProject) {
      setProject(prevProject => ({
        ...prevProject,
        status: mockProject.status as "open" | "closed" | "completed" || "open"
      }));
    }
  }, [id]);

  const handleLike = () => {
    if (liked) {
      setLikesCount(prev => prev - 1);
    } else {
      setLikesCount(prev => prev + 1);
    }
    setLiked(!liked);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <ProjectHeader 
          id={id} 
          project={{
            title: project.title,
            author: project.author,
            authorAvatar: project.authorAvatar,
            date: project.date,
            team: project.team,
            status: project.status
          }}
          likes={{
            count: likesCount,
            isLiked: liked,
            onLike: handleLike
          }}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ProjectInfo 
              description={project.description}
              tags={project.tags}
            />
            
            <CommentSection 
              comments={project.comments}
            />
          </div>
          
          <div>
            <ProjectSidebar 
              creator={{
                name: project.author,
                avatar: project.authorAvatar,
                course: project.authorCourse
              }}
              team={{
                name: project.team
              }}
              relatedProjects={project.relatedProjects}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProjectDetailsPage;
