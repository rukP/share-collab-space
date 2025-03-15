
import { ProjectCard } from "@/components/ProjectCard";
import { TeamCard } from "@/components/TeamCard";
import { UserCard } from "@/components/UserCard";
import { TabsContent } from "@/components/ui/tabs";
import { MOCK_PROJECTS, MOCK_TEAMS, MOCK_USERS } from "@/data/mockData";

interface SearchResultsProps {
  searchQuery: string;
  searchType: "projects" | "teams" | "users";
}

export const SearchResults = ({ searchQuery, searchType }: SearchResultsProps) => {
  const filteredProjects = MOCK_PROJECTS.filter(project => 
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTeams = MOCK_TEAMS.filter(team => 
    team.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    team.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredUsers = MOCK_USERS.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.course.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <TabsContent value="projects">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard 
              key={project.id}
              id={project.id}
              title={project.title}
              description={project.description}
              imageUrl={project.imageUrl}
              likes={project.likes}
              author={project.author}
              status={(project.status as "open" | "closed" | "completed") || "open"}
            />
          ))}
          {filteredProjects.length === 0 && (
            <div className="col-span-3 text-center py-12 text-muted-foreground">
              No projects found matching your search.
            </div>
          )}
        </div>
      </TabsContent>
      
      <TabsContent value="teams">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeams.map((team) => (
            <TeamCard key={team.id} {...team} />
          ))}
          {filteredTeams.length === 0 && (
            <div className="col-span-3 text-center py-12 text-muted-foreground">
              No teams found matching your search.
            </div>
          )}
        </div>
      </TabsContent>
      
      <TabsContent value="users">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <UserCard key={user.id} {...user} />
          ))}
          {filteredUsers.length === 0 && (
            <div className="col-span-3 text-center py-12 text-muted-foreground">
              No users found matching your search.
            </div>
          )}
        </div>
      </TabsContent>
    </>
  );
};
