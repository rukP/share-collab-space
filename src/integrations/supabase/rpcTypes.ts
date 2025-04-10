
// This file defines types for RPC (Remote Procedure Call) functions in Supabase

export type RpcFunctionName = 'increment_likes' | 'decrement_likes';

export interface RpcParams {
  'increment_likes': { project_id: string };
  'decrement_likes': { project_id: string };
}
