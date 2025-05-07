
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { User, Mail, Phone, Building, Link as LinkIcon, X, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AddProfileForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [course, setCourse] = useState("");
  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState("");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearAvatar = () => {
    setAvatarPreview(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
      
      // Reset form or redirect (in a real app)
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
          Complete Your Profile
        </h2>
        <p className="text-muted-foreground mt-2">
          Tell the community about yourself and your work
        </p>
      </div>
      
      <Card className="shadow-lg border-primary/20">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <h3 className="text-2xl font-semibold">Personal Information</h3>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
              {/* Avatar Upload */}
              <div className="w-full md:w-1/3 flex flex-col items-center">
                <div className="relative">
                  {avatarPreview ? (
                    <div className="relative h-40 w-40 rounded-full overflow-hidden border-4 border-primary/30">
                      <img 
                        src={avatarPreview} 
                        alt="Avatar Preview" 
                        className="w-full h-full object-cover" 
                      />
                      <Button 
                        type="button"
                        variant="destructive" 
                        size="icon" 
                        className="absolute top-0 right-0 h-8 w-8" 
                        onClick={clearAvatar}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="h-40 w-40 rounded-full bg-muted flex items-center justify-center border-4 border-primary/30">
                      <User className="h-16 w-16 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <div className="mt-4">
                  <Input 
                    id="avatar" 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleAvatarChange}
                  />
                  <Label htmlFor="avatar">
                    <Button type="button" variant="outline" size="sm" className="cursor-pointer">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Photo
                    </Button>
                  </Label>
                </div>
              </div>
              
              {/* Basic Info */}
              <div className="w-full md:w-2/3 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="name" 
                        placeholder="Your name" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="pl-10 border-primary/20 focus-visible:ring-primary"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="email" 
                        type="email"
                        placeholder="Your email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 border-primary/20 focus-visible:ring-primary"
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone (Optional)</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="phone" 
                        placeholder="Your phone number" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="pl-10 border-primary/20 focus-visible:ring-primary"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="course">Course / Program</Label>
                    <div className="relative">
                      <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="course" 
                        placeholder="Your course or program" 
                        value={course}
                        onChange={(e) => setCourse(e.target.value)}
                        className="pl-10 border-primary/20 focus-visible:ring-primary"
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="website">Personal Website (Optional)</Label>
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="website" 
                      placeholder="https://yourwebsite.com" 
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      className="pl-10 border-primary/20 focus-visible:ring-primary"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea 
                id="bio" 
                placeholder="Tell us about yourself, your interests, and your work..." 
                rows={5}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="border-primary/20 focus-visible:ring-primary resize-y"
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end border-t p-6">
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-gradient-to-r from-primary to-purple-500 hover:opacity-90"
            >
              {isSubmitting ? "Saving..." : "Save Profile"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default AddProfileForm;
