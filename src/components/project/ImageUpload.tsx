
import { Image, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ImageUploadProps {
  imagePreview: string | null;
  onImageChange: (file: File | null) => void;
  clearImage: () => void;
}

export const ImageUpload = ({ imagePreview, onImageChange, clearImage }: ImageUploadProps) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageChange(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      onImageChange(file);
    }
  };

  const handleImageClick = () => {
    // Trigger the hidden file input
    document.getElementById('project-image')?.click();
  };

  if (imagePreview) {
    return (
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
    );
  }

  return (
    <div 
      className="border-2 border-dashed border-primary/30 rounded-lg p-8 text-center transition-colors hover:border-primary/50 cursor-pointer"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      onClick={handleImageClick}
    >
      <Image className="w-12 h-12 mx-auto mb-4 text-primary/70" />
      <p className="mb-2 text-muted-foreground">
        Drag and drop an image, or click to browse
      </p>
      <Input 
        id="project-image" 
        type="file" 
        className="hidden" 
        accept="image/*"
        onChange={handleImageChange}
      />
      <Label htmlFor="project-image" className="cursor-pointer">
        <Button type="button" variant="outline" className="border-primary/20">
          Select Image
        </Button>
      </Label>
    </div>
  );
};
