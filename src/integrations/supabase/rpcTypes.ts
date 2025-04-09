
// Define types for our RPC functions to ensure type safety
export interface RpcFunctions {
  increment_likes: (params: { project_id: string }) => void;
  decrement_likes: (params: { project_id: string }) => void;
}

// You can extend this with other RPC functions as needed
