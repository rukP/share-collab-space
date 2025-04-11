
// This file contains SQL function definitions for the Supabase database
// These should be run manually in the Supabase SQL editor

/**
 * Increment likes function
 * SQL:
 * ```
 * CREATE OR REPLACE FUNCTION increment_likes(p_project_id UUID)
 * RETURNS void
 * LANGUAGE plpgsql
 * SECURITY DEFINER
 * AS $$
 * BEGIN
 *   UPDATE projects 
 *   SET likes = COALESCE(likes, 0) + 1
 *   WHERE id = p_project_id;
 * END;
 * $$;
 * ```
 */

/**
 * Decrement likes function
 * SQL:
 * ```
 * CREATE OR REPLACE FUNCTION decrement_likes(p_project_id UUID)
 * RETURNS void
 * LANGUAGE plpgsql
 * SECURITY DEFINER
 * AS $$
 * BEGIN
 *   UPDATE projects 
 *   SET likes = GREATEST(COALESCE(likes, 0) - 1, 0)
 *   WHERE id = p_project_id;
 * END;
 * $$;
 * ```
 */
