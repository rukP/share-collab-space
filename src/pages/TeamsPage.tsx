
import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, UserPlus, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { getTeams } from "@/services/teamService";
import { TeamCard } from "@/components/TeamCard";
import { useQuery } from "@tanstack/react-query";
import { hotToast } from "@/components/ui/hot-toast";

const TeamsPage = () => {
  const { data: teams, isLoading, error } = useQuery({
    queryKey: ['teams'],
    queryFn: getTeams,
  });

  // Show error toast if teams fetching fails
  useEffect(() => {
    if (error) {
      hotToast({
        title: "Error",
        description: "Failed to load teams. Please try again later.",
        variant: "destructive"
      });
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Find Teams</h2>
          <Link to="/create-team">
            <Button>
              <Users className="w-4 h-4 mr-2" />
              Create Team
            </Button>
          </Link>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="overflow-hidden">
                <CardHeader className="bg-accent/20 pb-3 animate-pulse">
                  <div className="h-6 bg-primary/10 rounded w-3/4"></div>
                  <div className="h-4 bg-primary/5 rounded w-1/2 mt-2"></div>
                </CardHeader>
                <CardContent className="pt-4 animate-pulse">
                  <div className="h-4 bg-primary/10 rounded w-full mb-2"></div>
                  <div className="h-4 bg-primary/10 rounded w-full mb-2"></div>
                  <div className="h-4 bg-primary/10 rounded w-3/4"></div>
                </CardContent>
                <CardFooter className="border-t bg-card/50 pt-3 animate-pulse">
                  <div className="h-9 bg-primary/10 rounded w-full"></div>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : teams && teams.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teams.map((team) => (
              <Card key={team.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardHeader className="bg-accent/20 pb-3">
                  <h3 className="text-xl font-semibold">{team.name}</h3>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-1" />
                    Created: {new Date(team.created_at).toLocaleDateString()}
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-muted-foreground mb-4">
                    {team.description || "No description provided"}
                  </p>
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {/* This would need a separate query to count members */}
                      Members
                    </div>
                    <div className="flex items-center gap-1">
                      <UserPlus className="w-4 h-4" />
                      Open positions
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t bg-card/50 pt-3">
                  <Link to={`/teams/${team.id}`} className="w-full">
                    <Button className="w-full" variant="default">
                      View Team
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">No teams found</h3>
            <p className="text-muted-foreground mb-6">
              There are no teams to display right now.
            </p>
            <Link to="/create-team">
              <Button>
                <Users className="w-4 h-4 mr-2" />
                Create the first team
              </Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default TeamsPage;
