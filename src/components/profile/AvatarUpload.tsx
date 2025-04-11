
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Upload, X, Camera } from "lucide-react";
import { hotToast } from "@/components/ui/hot-toast";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface AvatarUploadProps {
  avatarUrl: string | null;
  onAvatarChange: (file: File | null) => void;
}

export const AvatarUpload = ({ avatarUrl, onAvatarChange }: AvatarUploadProps) => {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(avatarUrl);
  
  // Create a reference to the file input
  const fileInputRef = useState<HTMLInputElement | null>(null)[1];

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        hotToast({
          title: "Invalid file type",
          description: "Please upload a JPG, PNG, or GIF image",
          variant: "destructive",
        });
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        hotToast({
          title: "File too large",
          description: "Please upload an image smaller than 5MB",
          variant: "destructive",
        });
        return;
      }
      
      onAvatarChange(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearAvatar = () => {
    onAvatarChange(null);
    setAvatarPreview(null);
    
    // Clear the file input
    if (fileInputRef) {
      const input = document.getElementById('avatar') as HTMLInputElement;
      if (input) input.value = '';
    }
  };

  // Function to trigger the file input click
  const triggerFileInput = () => {
    const fileInput = document.getElementById('avatar');
    if (fileInput) {
      fileInput.click();
    }
  };

  return (
    <div className="w-full md:w-1/3 flex flex-col items-center">
      <div 
        className="relative group cursor-pointer" 
        onClick={triggerFileInput}
      >
        {avatarPreview ? (
          <div className="relative h-40 w-40 rounded-full overflow-hidden border-4 border-primary/30 hover:border-primary/70 transition-all duration-300">
            <img 
              src={avatarPreview} 
              alt="Avatar Preview" 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Camera className="w-10 h-10 text-white" />
            </div>
            <Button 
              type="button"
              variant="destructive" 
              size="icon" 
              className="absolute top-0 right-0 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity" 
              onClick={(e) => {
                e.stopPropagation();
                clearAvatar();
              }}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <div className="h-40 w-40 rounded-full bg-muted flex items-center justify-center border-4 border-primary/30 hover:border-primary/70 transition-all duration-300 group-hover:bg-primary/10">
            <User className="h-16 w-16 text-muted-foreground group-hover:text-primary/70 transition-colors" />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-full flex items-center justify-center">
              <Camera className="w-10 h-10 text-white" />
            </div>
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
          ref={(input) => fileInputRef(input)}
        />
        <Label htmlFor="avatar" onClick={(e) => e.preventDefault()}>
          <Button 
            type="button" 
            variant="outline" 
            size="sm" 
            className="cursor-pointer hover:bg-primary/10 hover:text-primary transition-colors"
            onClick={triggerFileInput}
          >
            <Upload className="w-4 h-4 mr-2" />
            {avatarPreview ? 'Change Photo' : 'Upload Photo'}
          </Button>
        </Label>
      </div>
    </div>
  );
};
