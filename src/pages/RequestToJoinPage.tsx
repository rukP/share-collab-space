
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { MOCK_PROJECTS } from "@/data/mockData";
import { Check } from "lucide-react";
import { hotToast } from "@/components/ui/hot-toast";

const RequestToJoinPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Find the project from our mock data
  const projectId = Number(id);
  const project = MOCK_PROJECTS.find(p => p.id === projectId);
  
  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-6">
              <div className="text-center py-8">
                <h2 className="text-2xl font-bold mb-2">Project Not Found</h2>
                <p className="text-muted-foreground mb-4">The project you're looking for doesn't exist or has been removed.</p>
                <Button onClick={() => navigate('/projects')}>
                  Back to Projects
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }
  
  if (project.status !== "open") {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-6">
              <div className="text-center py-8">
                <h2 className="text-2xl font-bold mb-2">Project Not Open for Requests</h2>
                <p className="text-muted-foreground mb-4">
                  This project is currently {project.status === "closed" ? "not accepting new team members" : "completed"}. 
                  Check out other open projects.
                </p>
                <Button onClick={() => navigate('/projects')}>
                  Explore Open Projects
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      
      // Use hotToast instead of regular toast
      hotToast({
        title: "Request Sent!",
        description: "Your request to join this project has been sent to the project owner.",
        variant: "success",
        icon: <Check className="h-4 w-4 text-green-500" />
      });
      
      navigate(`/projects/${id}`);
    }, 1000);
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Request to Join Project</h2>
          
          <Card className="mb-6">
            <CardHeader className="border-b pb-3">
              <h3 className="text-lg font-medium">Project Information</h3>
            </CardHeader>
            <CardContent className="p-6">
              <h4 className="text-xl font-semibold mb-2">{project.title}</h4>
              <p className="text-muted-foreground mb-4">{project.description}</p>
              <p className="text-sm">Created by <span className="font-medium">{project.author}</span></p>
            </CardContent>
          </Card>
          
          <Card className="shadow-md">
            <form onSubmit={handleSubmit}>
              <CardHeader className="border-b pb-3">
                <h3 className="text-lg font-medium">Why do you want to join this project?</h3>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <p className="text-muted-foreground text-sm">
                    Tell the project owner about your skills, experience, and why you're interested in 
                    contributing to this project. Be specific about what you can bring to the team.
                  </p>
                  <Textarea
                    placeholder="I'd like to join this project because..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={6}
                    className="resize-y"
                    required
                  />
                </div>
              </CardContent>
              <CardFooter className="border-t p-6 flex justify-end gap-3">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate(`/projects/${id}`)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={isSubmitting || !message.trim()} 
                  className="bg-gradient-to-r from-primary to-purple-500 hover:opacity-90"
                >
                  {isSubmitting ? "Sending Request..." : "Send Request"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default RequestToJoinPage;
