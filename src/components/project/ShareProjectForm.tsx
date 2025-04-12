
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { hotToast } from "@/components/ui/hot-toast";
import { uploadProjectImage, createProject } from "@/services/project/uploadProject";
import { TitleField } from "./form-fields/TitleField";
import { CourseField } from "./form-fields/CourseField";
import { DescriptionField } from "./form-fields/DescriptionField";
import { TagsField } from "./form-fields/TagsField";
import { ImageField } from "./form-fields/ImageField";
import { FormActions } from "./form-fields/FormActions";

interface ShareProjectFormProps {
  userId: string;
}

export const ShareProjectForm = ({ userId }: ShareProjectFormProps) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [course, setCourse] = useState("");

  const handleImageChange = (file: File | null) => {
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const addTag = (tag: string) => {
    if (tag.trim() && !tags.includes(tag.trim())) {
      setTags([...tags, tag.trim()]);
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleCancel = () => {
    navigate('/profile');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Upload image if provided
      let imageUrl = null;
      if (imageFile) {
        imageUrl = await uploadProjectImage(userId, imageFile);
        if (!imageUrl) {
          throw new Error('Failed to upload image');
        }
      }

      // Create project
      const project = await createProject(title, description, userId, imageUrl, tags);
      
      if (!project) {
        throw new Error('Failed to create project');
      }

      hotToast({
        title: "Success!",
        description: "Your project has been shared with the community.",
        variant: "success",
        icon: <Check className="h-4 w-4 text-green-500" />
      });
      
      // Navigate to the project details page
      navigate(`/projects/${project.id}`);
    } catch (error: any) {
      console.error("Error sharing project:", error);
      hotToast({
        title: "Error",
        description: error.message || "Failed to share project",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="shadow-lg border-primary/20">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <h3 className="text-2xl font-semibold">Project Details</h3>
        </CardHeader>
        <CardContent className="space-y-6">
          <TitleField title={title} setTitle={setTitle} />
          <CourseField course={course} setCourse={setCourse} />
          <DescriptionField description={description} setDescription={setDescription} />
          <TagsField tags={tags} onAddTag={addTag} onRemoveTag={removeTag} />
          <ImageField 
            imagePreview={imagePreview} 
            onImageChange={handleImageChange} 
            clearImage={clearImage} 
          />
        </CardContent>
        <CardFooter>
          <FormActions isSubmitting={isSubmitting} onCancel={handleCancel} />
        </CardFooter>
      </form>
    </Card>
  );
};
