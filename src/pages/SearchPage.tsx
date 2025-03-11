
import { Header } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { SearchTabs } from "@/components/SearchTabs";
import { SearchResults } from "@/components/SearchResults";
import { Tabs } from "@/components/ui/tabs";
import { useState } from "react";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState<"projects" | "teams" | "users">("projects");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8">Search</h2>
        
        <SearchBar 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        
        <Tabs value={searchType} onValueChange={(value) => setSearchType(value as any)}>
          <SearchTabs searchType={searchType} />
          <SearchResults searchQuery={searchQuery} searchType={searchType} />
        </Tabs>
      </main>
    </div>
  );
};

export default SearchPage;
