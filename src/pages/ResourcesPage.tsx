
import { Header } from "@/components/Header";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, ExternalLink, BookOpen, Video, FileImage } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock resources data
const MOCK_RESOURCES = [
  {
    id: 1,
    title: "Design Research Methods",
    description: "A comprehensive guide to qualitative and quantitative design research methods",
    type: "Document",
    format: "PDF",
    size: "2.4 MB",
    author: "Dr. Emma Johnson",
    downloadUrl: "#"
  },
  {
    id: 2,
    title: "Digital Portfolio Best Practices",
    description: "Tips and examples for creating an effective online portfolio",
    type: "Guide",
    format: "PDF",
    size: "1.8 MB",
    author: "Career Services",
    downloadUrl: "#"
  },
  {
    id: 3,
    title: "Introduction to 3D Modeling",
    description: "A beginner's video tutorial series on 3D modeling fundamentals",
    type: "Video",
    duration: "45 minutes",
    author: "Prof. Michael Chen",
    externalUrl: "#"
  },
  {
    id: 4,
    title: "Professional Practice Handbook",
    description: "Information on intellectual property, contracts, and professional ethics",
    type: "Document",
    format: "PDF",
    size: "3.2 MB",
    author: "RCA Professional Development",
    downloadUrl: "#"
  },
  {
    id: 5,
    title: "Image-making Techniques Workshop",
    description: "Recorded workshop exploring experimental image-making methods",
    type: "Video",
    duration: "90 minutes",
    author: "Prof. Sarah Williams",
    externalUrl: "#"
  },
  {
    id: 6,
    title: "Visual Research Archive",
    description: "Collection of student visual research examples from past projects",
    type: "Gallery",
    items: "45 images",
    author: "Visual Communication Department",
    externalUrl: "#"
  }
];

const getResourceIcon = (type: string) => {
  switch(type) {
    case "Document": return <FileText className="w-10 h-10 text-primary" />;
    case "Guide": return <BookOpen className="w-10 h-10 text-primary" />;
    case "Video": return <Video className="w-10 h-10 text-primary" />;
    case "Gallery": return <FileImage className="w-10 h-10 text-primary" />;
    default: return <FileText className="w-10 h-10 text-primary" />;
  }
};

const ResourcesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gradient">Learning Resources</h2>
          <Button className="rounded-full">
            <FileText className="w-4 h-4 mr-2" />
            Submit Resource
          </Button>
        </div>
        
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Resources</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="other">Other</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MOCK_RESOURCES.map((resource) => (
                <Card key={resource.id} className="overflow-hidden card-hover border border-white/10">
                  <CardHeader className="pb-3 flex flex-row items-start gap-4">
                    <div className="bg-muted rounded-lg p-2 flex items-center justify-center">
                      {getResourceIcon(resource.type)}
                    </div>
                    <div>
                      <Badge className="mb-2 bg-primary/20 text-primary-foreground hover:bg-primary/30">
                        {resource.type}
                      </Badge>
                      <h3 className="text-xl font-semibold">{resource.title}</h3>
                      <p className="text-sm text-muted-foreground">By {resource.author}</p>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-3">
                    <p className="text-muted-foreground mb-4">{resource.description}</p>
                    {resource.format && (
                      <div className="flex items-center gap-2 text-sm">
                        <span className="bg-secondary/30 rounded-full px-2 py-0.5">{resource.format}</span>
                        <span className="bg-secondary/30 rounded-full px-2 py-0.5">{resource.size}</span>
                      </div>
                    )}
                    {resource.duration && (
                      <div className="flex items-center gap-2 text-sm">
                        <span className="bg-secondary/30 rounded-full px-2 py-0.5">Duration: {resource.duration}</span>
                      </div>
                    )}
                    {resource.items && (
                      <div className="flex items-center gap-2 text-sm">
                        <span className="bg-secondary/30 rounded-full px-2 py-0.5">{resource.items}</span>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="border-t border-white/10 bg-card/50 pt-3">
                    <Button 
                      className="w-full rounded-full" 
                      variant={resource.downloadUrl ? "default" : "outline"}
                    >
                      {resource.downloadUrl ? (
                        <>Download <Download className="ml-2 w-4 h-4" /></>
                      ) : (
                        <>View Resource <ExternalLink className="ml-2 w-4 h-4" /></>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="documents">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MOCK_RESOURCES.filter(r => r.type === "Document" || r.type === "Guide").map((resource) => (
                <Card key={resource.id} className="overflow-hidden card-hover border border-white/10">
                  {/* Same card content as above */}
                  <CardHeader className="pb-3 flex flex-row items-start gap-4">
                    <div className="bg-muted rounded-lg p-2 flex items-center justify-center">
                      {getResourceIcon(resource.type)}
                    </div>
                    <div>
                      <Badge className="mb-2 bg-primary/20 text-primary-foreground hover:bg-primary/30">
                        {resource.type}
                      </Badge>
                      <h3 className="text-xl font-semibold">{resource.title}</h3>
                      <p className="text-sm text-muted-foreground">By {resource.author}</p>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-3">
                    <p className="text-muted-foreground mb-4">{resource.description}</p>
                    {resource.format && (
                      <div className="flex items-center gap-2 text-sm">
                        <span className="bg-secondary/30 rounded-full px-2 py-0.5">{resource.format}</span>
                        <span className="bg-secondary/30 rounded-full px-2 py-0.5">{resource.size}</span>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="border-t border-white/10 bg-card/50 pt-3">
                    <Button className="w-full rounded-full">
                      Download <Download className="ml-2 w-4 h-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="videos">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MOCK_RESOURCES.filter(r => r.type === "Video").map((resource) => (
                <Card key={resource.id} className="overflow-hidden card-hover border border-white/10">
                  {/* Same card content as above, adapted for videos */}
                  <CardHeader className="pb-3 flex flex-row items-start gap-4">
                    <div className="bg-muted rounded-lg p-2 flex items-center justify-center">
                      {getResourceIcon(resource.type)}
                    </div>
                    <div>
                      <Badge className="mb-2 bg-primary/20 text-primary-foreground hover:bg-primary/30">
                        {resource.type}
                      </Badge>
                      <h3 className="text-xl font-semibold">{resource.title}</h3>
                      <p className="text-sm text-muted-foreground">By {resource.author}</p>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-3">
                    <p className="text-muted-foreground mb-4">{resource.description}</p>
                    {resource.duration && (
                      <div className="flex items-center gap-2 text-sm">
                        <span className="bg-secondary/30 rounded-full px-2 py-0.5">Duration: {resource.duration}</span>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="border-t border-white/10 bg-card/50 pt-3">
                    <Button className="w-full rounded-full" variant="outline">
                      View Resource <ExternalLink className="ml-2 w-4 h-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="other">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MOCK_RESOURCES.filter(r => r.type !== "Document" && r.type !== "Guide" && r.type !== "Video").map((resource) => (
                <Card key={resource.id} className="overflow-hidden card-hover border border-white/10">
                  {/* Same card content as above, adapted for other types */}
                  <CardHeader className="pb-3 flex flex-row items-start gap-4">
                    <div className="bg-muted rounded-lg p-2 flex items-center justify-center">
                      {getResourceIcon(resource.type)}
                    </div>
                    <div>
                      <Badge className="mb-2 bg-primary/20 text-primary-foreground hover:bg-primary/30">
                        {resource.type}
                      </Badge>
                      <h3 className="text-xl font-semibold">{resource.title}</h3>
                      <p className="text-sm text-muted-foreground">By {resource.author}</p>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-3">
                    <p className="text-muted-foreground mb-4">{resource.description}</p>
                    {resource.items && (
                      <div className="flex items-center gap-2 text-sm">
                        <span className="bg-secondary/30 rounded-full px-2 py-0.5">{resource.items}</span>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="border-t border-white/10 bg-card/50 pt-3">
                    <Button className="w-full rounded-full" variant="outline">
                      View Resource <ExternalLink className="ml-2 w-4 h-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default ResourcesPage;
