
import { Label } from "@/components/ui/label";
import { ImageUpload } from "../ImageUpload";

interface ImageFieldProps {
  imagePreview: string | null;
  onImageChange: (file: File | null) => void;
  clearImage: () => void;
}

export const ImageField = ({ imagePreview, onImageChange, clearImage }: ImageFieldProps) => {
  return (
    <div className="space-y-2">
      <Label>Project Cover Image</Label>
      <ImageUpload 
        imagePreview={imagePreview}
        onImageChange={onImageChange}
        clearImage={clearImage}
      />
    </div>
  );
};
