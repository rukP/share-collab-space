
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Generic hook for optimistic updates
export function useOptimisticMutation<TData, TVariables, TContext = unknown>({
  mutationFn,
  queryKey,
  onMutate,
  onSuccess,
  onError,
}: {
  mutationFn: (variables: TVariables) => Promise<TData>;
  queryKey: unknown[];
  onMutate?: (variables: TVariables) => Promise<TContext> | TContext;
  onSuccess?: (data: TData, variables: TVariables, context: TContext | undefined) => Promise<unknown> | unknown;
  onError?: (error: Error, variables: TVariables, context: TContext | undefined) => Promise<unknown> | unknown;
}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onMutate: async (variables) => {
      // Cancel related queries to prevent race conditions
      await queryClient.cancelQueries({ queryKey });
      
      // Store previous data to roll back if mutation fails
      const previousData = queryClient.getQueryData(queryKey);
      
      // Apply custom onMutate callback if provided
      let context = undefined;
      if (onMutate) {
        context = await onMutate(variables);
      }
      
      return { previousData, ...context };
    },
    onSuccess: async (data, variables, context) => {
      // Invalidate related queries to refetch fresh data
      queryClient.invalidateQueries({ queryKey });
      
      // Apply custom onSuccess callback if provided
      if (onSuccess) {
        await onSuccess(data, variables, context);
      }
    },
    onError: async (error, variables, context) => {
      // Revert to previous data on error
      if (context?.previousData) {
        queryClient.setQueryData(queryKey, context.previousData);
      }
      
      // Apply custom onError callback if provided
      if (onError) {
        await onError(error as Error, variables, context);
      }
    },
  });
}
