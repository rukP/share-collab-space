
import { Header } from "@/components/Header";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, UserPlus, Calendar } from "lucide-react";

// Mock teams data
const MOCK_TEAMS = [
  {
    id: 1,
    name: "Design Innovators",
    description: "A team focused on experimental design approaches across various media",
    members: 4,
    openPositions: 2,
    createdAt: "2023-10-15"
  },
  {
    id: 2,
    name: "Digital Fabrication Group",
    description: "Exploring the intersection of digital design and physical fabrication techniques",
    members: 3,
    openPositions: 1,
    createdAt: "2023-11-03"
  },
  {
    id: 3,
    name: "Sustainable Futures",
    description: "Creating projects that address environmental challenges through design",
    members: 5,
    openPositions: 0,
    createdAt: "2023-09-28"
  },
  {
    id: 4,
    name: "Interactive Media Lab",
    description: "Developing interactive installations and digital experiences",
    members: 3,
    openPositions: 3,
    createdAt: "2023-12-05"
  }
];

const TeamsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Find Teams</h2>
          <Button>
            <Users className="w-4 h-4 mr-2" />
            Create Team
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_TEAMS.map((team) => (
            <Card key={team.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardHeader className="bg-accent/20 pb-3">
                <h3 className="text-xl font-semibold">{team.name}</h3>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4 mr-1" />
                  Created: {team.createdAt}
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-muted-foreground mb-4">{team.description}</p>
                <div className="flex justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {team.members} members
                  </div>
                  <div className="flex items-center gap-1">
                    <UserPlus className="w-4 h-4" />
                    {team.openPositions} open positions
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t bg-card/50 pt-3">
                <Button className="w-full" variant={team.openPositions > 0 ? "default" : "secondary"} disabled={team.openPositions === 0}>
                  {team.openPositions > 0 ? "Join Team" : "Team Full"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default TeamsPage;
