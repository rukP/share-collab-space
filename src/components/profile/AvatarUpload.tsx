
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Upload, X } from "lucide-react";
import { hotToast } from "@/components/ui/hot-toast";

interface AvatarUploadProps {
  avatarUrl: string | null;
  onAvatarChange: (file: File | null) => void;
}

export const AvatarUpload = ({ avatarUrl, onAvatarChange }: AvatarUploadProps) => {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(avatarUrl);

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
  };

  return (
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
  );
};
