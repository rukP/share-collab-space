
import { Header } from "@/components/Header";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Upload, X, Image, Plus, Tag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

const ShareProjectPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [course, setCourse] = useState("");
  const { toast } = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setImagePreview(null);
  };

  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Success!",
        description: "Your project has been shared.",
      });
      
      // Reset form
      setTitle("");
      setDescription("");
      setImagePreview(null);
      setTags([]);
      setCourse("");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 text-center">
            <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">Share Your Project</h2>
            <p className="text-muted-foreground mt-2">Showcase your work to the RCA community</p>
          </div>
          
          <Card className="shadow-lg border-primary/20">
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <h3 className="text-2xl font-semibold">Project Details</h3>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Project Title</Label>
                  <Input 
                    id="title" 
                    placeholder="Enter your project title" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border-primary/20 focus-visible:ring-primary"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="course">Course</Label>
                  <Input 
                    id="course" 
                    placeholder="Your program or course" 
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    className="border-primary/20 focus-visible:ring-primary"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Project Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Describe your project in detail..." 
                    rows={5}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border-primary/20 focus-visible:ring-primary resize-y"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Project Tags</Label>
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Add tags (e.g., Design, Interactive)" 
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      className="border-primary/20 focus-visible:ring-primary"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addTag();
                        }
                      }}
                    />
                    <Button 
                      type="button" 
                      onClick={addTag}
                      variant="outline"
                      className="border-primary/20"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {tags.map((tag, index) => (
                        <Badge 
                          key={index} 
                          className="px-3 py-1 bg-primary/10 hover:bg-primary/20 text-foreground"
                        >
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                          <button 
                            type="button" 
                            className="ml-2 text-foreground/70 hover:text-foreground"
                            onClick={() => removeTag(tag)}
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label>Project Cover Image</Label>
                  {imagePreview ? (
                    <div className="relative mt-2 border rounded-lg overflow-hidden">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="w-full h-64 object-cover" 
                      />
                      <Button 
                        type="button"
                        variant="destructive" 
                        size="icon" 
                        className="absolute top-2 right-2 opacity-90" 
                        onClick={clearImage}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <div 
                      className="border-2 border-dashed border-primary/30 rounded-lg p-8 text-center transition-colors hover:border-primary/50 cursor-pointer"
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={handleDrop}
                    >
                      <Image className="w-12 h-12 mx-auto mb-4 text-primary/70" />
                      <p className="mb-2 text-muted-foreground">
                        Drag and drop an image, or click to browse
                      </p>
                      <Input 
                        id="image" 
                        type="file" 
                        className="hidden" 
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                      <Label htmlFor="image" className="cursor-pointer">
                        <Button type="button" variant="outline" className="border-primary/20">
                          Select Image
                        </Button>
                      </Label>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t p-6">
                <Button 
                  type="button" 
                  variant="outline"
                  className="border-primary/20"
                >
                  Save as Draft
                </Button>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-primary to-purple-500 hover:opacity-90"
                >
                  {isSubmitting ? "Sharing..." : "Share Project"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ShareProjectPage;
