
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { QueryClientProvider } from "./context/QueryClientProvider";
import LoadingFallback from "./components/ui/loading-fallback";
import { AuthProvider } from "./context/AuthContext";

// Import the Index page normally to ensure it loads at startup
import Index from "./pages/Index";

// Lazy load other pages for better initial loading performance
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
const AuthPage = lazy(() => import("./pages/AuthPage"));

const App = () => (
  <QueryClientProvider>
    <BrowserRouter>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner 
            position="top-right"
            toastOptions={{
              className: "rounded-md shadow-lg",
              duration: 4000,
            }}
          />
          <Routes>
            {/* Render Index directly without Suspense to avoid dynamic import issues */}
            <Route path="/" element={<Index />} />
            
            {/* Auth page */}
            <Route path="/auth" element={
              <Suspense fallback={<LoadingFallback />}>
                <AuthPage />
              </Suspense>
            } />
            
            {/* Wrap these routes with Suspense */}
            <Route path="/projects" element={
              <Suspense fallback={<LoadingFallback />}>
                <ProjectsPage />
              </Suspense>
            } />
            <Route path="/projects/:id" element={
              <Suspense fallback={<LoadingFallback />}>
                <ProjectDetailsPage />
              </Suspense>
            } />
            <Route path="/projects/:id/join" element={
              <Suspense fallback={<LoadingFallback />}>
                <RequestToJoinPage />
              </Suspense>
            } />
            <Route path="/teams" element={
              <Suspense fallback={<LoadingFallback />}>
                <TeamsPage />
              </Suspense>
            } />
            <Route path="/teams/:id" element={
              <Suspense fallback={<LoadingFallback />}>
                <TeamDetailsPage />
              </Suspense>
            } />
            <Route path="/profile" element={
              <Suspense fallback={<LoadingFallback />}>
                <ProfilePage />
              </Suspense>
            } />
            <Route path="/profile/:id" element={
              <Suspense fallback={<LoadingFallback />}>
                <PersonDetailsPage />
              </Suspense>
            } />
            <Route path="/share-project" element={
              <Suspense fallback={<LoadingFallback />}>
                <ShareProjectPage />
              </Suspense>
            } />
            <Route path="/search" element={
              <Suspense fallback={<LoadingFallback />}>
                <SearchPage />
              </Suspense>
            } />
            <Route path="/events" element={
              <Suspense fallback={<LoadingFallback />}>
                <EventsPage />
              </Suspense>
            } />
            <Route path="/resources" element={
              <Suspense fallback={<LoadingFallback />}>
                <ResourcesPage />
              </Suspense>
            } />
            <Route path="/add-profile" element={
              <Suspense fallback={<LoadingFallback />}>
                <AddProfilePage />
              </Suspense>
            } />
            <Route path="/create-team" element={
              <Suspense fallback={<LoadingFallback />}>
                <CreateTeamPage />
              </Suspense>
            } />
            <Route path="*" element={
              <Suspense fallback={<LoadingFallback />}>
                <NotFound />
              </Suspense>
            } />
          </Routes>
        </TooltipProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
