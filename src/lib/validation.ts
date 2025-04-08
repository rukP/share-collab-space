
import { z } from "zod";

// Project validation schema
export const projectSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  teamId: z.string().uuid("Team ID must be a valid UUID"),
  imageUrl: z.string().url().optional(),
});

// Profile validation schema
export const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  course: z.string().optional(),
  year: z.number().int().positive().optional(),
  bio: z.string().max(500, "Bio must be less than 500 characters").optional(),
});

// Join request validation schema
export const joinRequestSchema = z.object({
  projectId: z.string().uuid("Project ID must be a valid UUID"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

// Team validation schema
export const teamSchema = z.object({
  name: z.string().min(3, "Team name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  logoUrl: z.string().url().optional(),
});

// Helper function to validate data with proper error handling
export function validateData<T>(schema: z.ZodSchema<T>, data: unknown): { success: true, data: T } | { success: false, error: string } {
  try {
    const validData = schema.parse(data);
    return { success: true, data: validData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors[0].message };
    }
    return { success: false, error: "Validation failed" };
  }
}
