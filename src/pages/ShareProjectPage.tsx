
import { Header } from "@/components/Header";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useProtectedRoute } from "@/hooks/use-protected-route";
import { ShareProjectForm } from "@/components/project/ShareProjectForm";

const ShareProjectPage = () => {
  const { isLoading, userId } = useProtectedRoute();
  const navigate = useNavigate();

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>;
  }

  if (!userId) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">Authentication Required</h3>
        <p className="text-muted-foreground mb-4">You need to be logged in to share a project.</p>
        <button 
          onClick={() => navigate('/auth')}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
        >
          Log In
        </button>
      </div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 text-center">
            <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">Share Your Project</h2>
            <p className="text-muted-foreground mt-2">Showcase your work to the RCA community</p>
          </div>
          
          <ShareProjectForm userId={userId} />
        </div>
      </main>
    </div>
  );
};

export default ShareProjectPage;
