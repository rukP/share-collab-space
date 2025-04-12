
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Users, Briefcase, Target, Plus, X, Tag, Image 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { createTeam, uploadTeamLogo } from "@/services/teamService";
import { supabase } from "@/integrations/supabase/client";

const CreateTeamForm = () => {
  const [name, setName] = useState("");
  const [purpose, setPurpose] = useState("");
  const [description, setDescription] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [openPositions, setOpenPositions] = useState<string[]>([]);
  const [currentPosition, setCurrentPosition] = useState("");
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedImage(file);
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
      setUploadedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setImagePreview(null);
    setUploadedImage(null);
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

  const addPosition = () => {
    if (currentPosition.trim() && !openPositions.includes(currentPosition.trim())) {
      setOpenPositions([...openPositions, currentPosition.trim()]);
      setCurrentPosition("");
    }
  };

  const removePosition = (positionToRemove: string) => {
    setOpenPositions(openPositions.filter(position => position !== positionToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to create a team",
          variant: "destructive"
        });
        setIsSubmitting(false);
        return;
      }
      
      // Upload image if provided
      let logoUrl = null;
      if (uploadedImage) {
        logoUrl = await uploadTeamLogo(user.id, uploadedImage);
      }
      
      // Create the team
      const fullDescription = `${purpose}\n\n${description}`;
      const team = await createTeam(name, fullDescription, logoUrl);
      
      if (team) {
        toast({
          title: "Team Created",
          description: "Your team has been successfully created.",
        });
        
        // Navigate to the team details page
        navigate(`/teams/${team.id}`);
      } else {
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Error creating team:", error);
      toast({
        title: "Error",
        description: "Failed to create team. Please try again.",
        variant: "destructive"
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
          Create a Team
        </h2>
        <p className="text-muted-foreground mt-2">
          Form a team to collaborate on projects and find new team members
        </p>
      </div>
      
      <Card className="shadow-lg border-primary/20">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <h3 className="text-2xl font-semibold">Team Details</h3>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Team Name</Label>
              <div className="relative">
                <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="name" 
                  placeholder="Your team's name" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 border-primary/20 focus-visible:ring-primary"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="purpose">Team Purpose</Label>
              <div className="relative">
                <Target className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="purpose" 
                  placeholder="One-line description of your team's purpose" 
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  className="pl-10 border-primary/20 focus-visible:ring-primary"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Team Description</Label>
              <Textarea 
                id="description" 
                placeholder="Describe your team, its goals, and what you're working on..." 
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border-primary/20 focus-visible:ring-primary resize-y"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Team Focus Areas</Label>
                <div className="flex gap-2">
                  <Input 
                    placeholder="Add area (e.g., Design, Film)" 
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
                <Label>Open Positions</Label>
                <div className="flex gap-2">
                  <Input 
                    placeholder="Add position (e.g., Designer)" 
                    value={currentPosition}
                    onChange={(e) => setCurrentPosition(e.target.value)}
                    className="border-primary/20 focus-visible:ring-primary"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addPosition();
                      }
                    }}
                  />
                  <Button 
                    type="button" 
                    onClick={addPosition}
                    variant="outline"
                    className="border-primary/20"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                {openPositions.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {openPositions.map((position, index) => (
                      <Badge 
                        key={index} 
                        className="px-3 py-1 bg-secondary/30 hover:bg-secondary/40 text-foreground"
                      >
                        <Briefcase className="w-3 h-3 mr-1" />
                        {position}
                        <button 
                          type="button" 
                          className="ml-2 text-foreground/70 hover:text-foreground"
                          onClick={() => removePosition(position)}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Team Image (Optional)</Label>
              {imagePreview ? (
                <div className="relative mt-2 border rounded-lg overflow-hidden">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="w-full h-48 object-cover" 
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
          <CardFooter className="flex justify-end border-t p-6">
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-gradient-to-r from-primary to-purple-500 hover:opacity-90"
            >
              {isSubmitting ? "Creating Team..." : "Create Team"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default CreateTeamForm;
