
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { projectService } from "@/services/mockServices";

// Query key for project likes
const projectLikesKeys = {
  all: ['project-likes'] as const,
  detail: (id: string) => [...projectLikesKeys.all, id] as const,
};

// Hook to get like status for a project
export function useProjectLikes(projectId: string) {
  return useQuery({
    queryKey: projectLikesKeys.detail(projectId),
    queryFn: () => projectService.getProjectLikeStatus(projectId),
    enabled: !!projectId,
  });
}

// Hook to toggle like status for a project with optimistic updates
export function useToggleProjectLike() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (projectId: string) => projectService.likeProject(projectId),
    // Optimistically update the UI
    onMutate: async (projectId) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: projectLikesKeys.detail(projectId) });
      
      // Get previous likes data
      const previousData = queryClient.getQueryData(projectLikesKeys.detail(projectId));
      
      // Optimistically update to the new value
      queryClient.setQueryData(
        projectLikesKeys.detail(projectId), 
        (old: any) => {
          if (!old) return { count: 1, isLiked: true };
          return {
            count: old.isLiked ? old.count - 1 : old.count + 1,
            isLiked: !old.isLiked
          };
        }
      );
      
      // Return previous likes data so we can roll back if error
      return { previousData };
    },
    // On error, roll back to previous value
    onError: (_err, projectId, context) => {
      queryClient.setQueryData(
        projectLikesKeys.detail(projectId),
        context?.previousData
      );
    },
    // Always refetch after error or success
    onSettled: (_data, _error, projectId) => {
      queryClient.invalidateQueries({ queryKey: projectLikesKeys.detail(projectId) });
    }
  });
}
