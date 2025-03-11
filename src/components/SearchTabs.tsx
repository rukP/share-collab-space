
import { Laptop, User, Users } from "lucide-react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SearchTabsProps {
  searchType: string;
}

export const SearchTabs = ({ searchType }: SearchTabsProps) => {
  return (
    <TabsList className="mb-6 mx-auto">
      <TabsTrigger value="projects">
        <Laptop className="w-4 h-4 mr-2" />
        Projects
      </TabsTrigger>
      <TabsTrigger value="teams">
        <Users className="w-4 h-4 mr-2" />
        Teams
      </TabsTrigger>
      <TabsTrigger value="users">
        <User className="w-4 h-4 mr-2" />
        Users
      </TabsTrigger>
    </TabsList>
  );
};
