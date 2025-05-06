
import { MOCK_PROJECTS, MOCK_TEAMS, MOCK_USERS, MOCK_REQUESTS } from "./mockData";
import { User, Session } from "@supabase/supabase-js";

// Extended mock data
export const mockTeamMembers = [
  {
    id: "1",
    team_id: "1",
    user_id: "1",
    role: "admin",
    joined_at: new Date(2023, 8, 15).toISOString(),
    profile: {
      name: "Grace Ishimwe",
      avatar_url: "https://picsum.photos/seed/user1/300/300"
    }
  },
  {
    id: "2",
    team_id: "1",
    user_id: "2",
    role: "member",
    joined_at: new Date(2023, 8, 20).toISOString(),
    profile: {
      name: "Kevin Mugisha",
      avatar_url: "https://picsum.photos/seed/user2/300/300"
    }
  },
  {
    id: "3",
    team_id: "1",
    user_id: "3",
    role: "admin",
    joined_at: new Date(2023, 9, 1).toISOString(),
    profile: {
      name: "Alice Uwase",
      avatar_url: "https://picsum.photos/seed/user3/300/300"
    }
  },
  {
    id: "4",
    team_id: "2",
    user_id: "1",
    role: "member",
    joined_at: new Date(2023, 10, 5).toISOString(),
    profile: {
      name: "Grace Ishimwe",
      avatar_url: "https://picsum.photos/seed/user1/300/300"
    }
  }
];

export const mockProfiles = [
  {
    id: "1",
    name: "Grace Ishimwe",
    course: "Software Engineering",
    year: 3,
    bio: "Full stack developer passionate about AI and machine learning. Looking to collaborate on projects with social impact.",
    avatar_url: "https://picsum.photos/seed/user1/300/300",
    created_at: new Date(2023, 0, 15).toISOString(),
    updated_at: new Date(2023, 6, 10).toISOString()
  },
  {
    id: "2",
    name: "Kevin Mugisha",
    course: "Network Engineering",
    year: 2,
    bio: "Cybersecurity enthusiast with experience in network protocols and system administration.",
    avatar_url: "https://picsum.photos/seed/user2/300/300",
    created_at: new Date(2023, 1, 20).toISOString(),
    updated_at: new Date(2023, 7, 5).toISOString()
  },
  {
    id: "3",
    name: "Alice Uwase",
    course: "Data Science & AI",
    year: 4,
    bio: "Researcher focused on natural language processing and computer vision applications.",
    avatar_url: "https://picsum.photos/seed/user3/300/300",
    created_at: new Date(2022, 10, 10).toISOString(),
    updated_at: new Date(2023, 5, 15).toISOString()
  }
];

// Mock Teams with structure matching Team type
export const mockTeams = MOCK_TEAMS.map(team => ({
  id: String(team.id),
  name: team.name,
  description: team.description || null,
  logo_url: null,
  created_at: new Date(team.createdAt).toISOString(),
  updated_at: new Date(team.createdAt).toISOString(),
  // Additional properties for UI display (not in the Team type)
  members: team.members,
  openPositions: team.openPositions,
  category: team.category,
  meetingTimes: team.meetingTimes,
  isRecruiting: team.isRecruiting,
  teamLeader: team.teamLeader,
  teamMembers: team.teamMembers,
  projects: team.projects
}));

// Mock Projects with converted IDs to string
export const mockProjects = MOCK_PROJECTS.map(project => ({
  id: String(project.id),
  title: project.title,
  description: project.description,
  image_url: project.imageUrl,
  team_id: String(project.id), // Assuming each project belongs to a team
  likes: project.likes,
  status: project.status,
  created_at: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)).toISOString(),
  updated_at: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)).toISOString()
}));

// Mock user with Supabase User structure
export const mockCurrentUser: User = {
  id: "1",
  email: "user@example.com",
  created_at: new Date().toISOString(),
  app_metadata: {
    provider: "email",
    providers: ["email"]
  },
  user_metadata: {
    name: "Grace Ishimwe"
  },
  aud: "authenticated",
  role: ""
};

// Mock session object with Supabase Session structure
const mockSessionObject: Session = {
  access_token: "mock-access-token",
  refresh_token: "mock-refresh-token",
  expires_in: 3600,
  expires_at: new Date().getTime() + 3600000,
  token_type: "bearer",
  user: mockCurrentUser
};

// Mock authentication functions
export const mockAuth = {
  isAuthenticated: true,
  isLoading: false,
  user: mockCurrentUser,
  session: mockSessionObject,
  signIn: async () => ({ error: null }),
  signUp: async () => ({ error: null }),
  signOut: async () => {},
};

// Mock likes data
export const mockLikes = new Map([
  ["1", { count: 32, isLiked: false }],
  ["2", { count: 24, isLiked: true }],
  ["3", { count: 45, isLiked: false }],
]);
