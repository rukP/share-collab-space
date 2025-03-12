
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProjectsPage from "./pages/ProjectsPage";
import TeamsPage from "./pages/TeamsPage";
import ProfilePage from "./pages/ProfilePage";
import ShareProjectPage from "./pages/ShareProjectPage";
import SearchPage from "./pages/SearchPage";
import EventsPage from "./pages/EventsPage";
import ResourcesPage from "./pages/ResourcesPage";
import TeamDetailsPage from "./pages/TeamDetailsPage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import PersonDetailsPage from "./pages/PersonDetailsPage";
import AddProfilePage from "./pages/AddProfilePage";
import CreateTeamPage from "./pages/CreateTeamPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:id" element={<ProjectDetailsPage />} />
          <Route path="/teams" element={<TeamsPage />} />
          <Route path="/teams/:id" element={<TeamDetailsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/:id" element={<PersonDetailsPage />} />
          <Route path="/share-project" element={<ShareProjectPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/add-profile" element={<AddProfilePage />} />
          <Route path="/create-team" element={<CreateTeamPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
