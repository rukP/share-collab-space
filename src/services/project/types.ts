
export interface Project {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  team_id: string | null;
  status: 'open' | 'closed' | 'completed';
  likes: number | null;
  created_at: string;
  updated_at: string;
}

export interface JoinRequest {
  id: string;
  project_id: string;
  user_id: string;
  message: string | null;
  status: 'pending' | 'approved' | 'rejected' | null;
  created_at: string;
  updated_at: string;
}
