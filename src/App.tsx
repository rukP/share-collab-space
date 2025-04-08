
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { QueryClientProvider } from "./context/QueryClientProvider";
import LoadingFallback from "./components/ui/loading-fallback";

// Lazy load pages for better initial loading performance
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const TeamsPage = lazy(() => import("./pages/TeamsPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const ShareProjectPage = lazy(() => import("./pages/ShareProjectPage"));
const SearchPage = lazy(() => import("./pages/SearchPage"));
const EventsPage = lazy(() => import("./pages/EventsPage"));
const ResourcesPage = lazy(() => import("./pages/ResourcesPage"));
const TeamDetailsPage = lazy(() => import("./pages/TeamDetailsPage"));
const ProjectDetailsPage = lazy(() => import("./pages/ProjectDetailsPage"));
const PersonDetailsPage = lazy(() => import("./pages/PersonDetailsPage"));
const AddProfilePage = lazy(() => import("./pages/AddProfilePage"));
const CreateTeamPage = lazy(() => import("./pages/CreateTeamPage"));
const RequestToJoinPage = lazy(() => import("./pages/RequestToJoinPage"));

const App = () => (
  <QueryClientProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner 
        position="top-right"
        toastOptions={{
          className: "rounded-md shadow-lg",
          duration: 4000,
        }}
      />
      <BrowserRouter>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:id" element={<ProjectDetailsPage />} />
            <Route path="/projects/:id/join" element={<RequestToJoinPage />} />
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
