
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { mockProjects, mockLikes } from "@/data/mockDataStore";
import { projectService } from "@/services/mockServices";

export const projectKeys = {
  all: ['projects'] as const,
  lists: () => [...projectKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown>) => [...projectKeys.lists(), { filters }] as const,
  details: () => [...projectKeys.all, 'detail'] as const,
  detail: (id: string) => [...projectKeys.details(), id] as const,
};

// Custom hook for fetching all projects
export function useProjects() {
  return useQuery({
    queryKey: projectKeys.lists(),
    queryFn: projectService.getProjects,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

// Custom hook for fetching a single project
export function useProject(id: string) {
  return useQuery({
    queryKey: projectKeys.detail(id),
    queryFn: () => projectService.getProjectById(id),
    staleTime: 1000 * 60 * 2, // 2 minutes
    enabled: !!id,
  });
}

// Custom hook for creating a project
export function useCreateProject() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({
      title,
      description,
      teamId,
      imageUrl,
    }: {
      title: string;
      description: string;
      teamId: string;
      imageUrl?: string;
    }) => projectService.createProject(title, description, teamId, imageUrl),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
    },
  });
}

// Custom hook for liking a project
export function useLikeProject() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (projectId: string) => projectService.likeProject(projectId),
    onSuccess: (_, projectId) => {
      queryClient.invalidateQueries({ queryKey: projectKeys.detail(projectId) });
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
    },
  });
}

// Custom hook for submitting a join request
export function useSubmitJoinRequest() {
  return useMutation({
    mutationFn: ({
      projectId,
      message,
    }: {
      projectId: string;
      message: string;
    }) => projectService.submitJoinRequest(projectId, message),
  });
}
