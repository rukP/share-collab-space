
// Define types for our RPC functions to ensure type safety
export interface RpcFunctions {
  increment_likes: (params: { project_id: string }) => void;
  decrement_likes: (params: { project_id: string }) => void;
}

// Type for RPC function names to be used with supabase.rpc
export type RpcFunctionName = keyof RpcFunctions;
