
import { 
  mockProfiles, 
  mockTeams, 
  mockTeamMembers, 
  mockProjects, 
  mockCurrentUser,
  mockLikes 
} from '@/data/mockDataStore';

// Mock profile service
export const profileService = {
  getCurrentProfile: async () => {
    return mockProfiles.find(profile => profile.id === mockCurrentUser.id) || null;
  },
  
  getUserProfile: async (userId: string) => {
    return mockProfiles.find(profile => profile.id === userId) || null;
  },
  
  updateUserProfile: async (userId: string, updates: any) => {
    const profile = mockProfiles.find(profile => profile.id === userId);
    if (!profile) return null;
    
    console.log('Mock profile update:', updates);
    return { ...profile, ...updates, updated_at: new Date().toISOString() };
  },
  
  uploadAvatar: async (userId: string, file: File) => {
    console.log('Mock avatar upload for user:', userId);
    return "https://picsum.photos/seed/" + Math.random() + "/300/300";
  },
  
  isAuthenticated: async () => true
};

// Mock team service
export const teamService = {
  getTeams: async () => {
    return mockTeams;
  },
  
  getTeamById: async (id: string) => {
    return mockTeams.find(team => String(team.id) === id) || null;
  },
  
  getTeamMembers: async (teamId: string) => {
    return mockTeamMembers.filter(member => member.team_id === teamId);
  },
  
  joinTeam: async (teamId: string, userId: string, role: string = "member") => {
    console.log(`Mock join team: User ${userId} joined team ${teamId} as ${role}`);
    return true;
  },
  
  leaveTeam: async (teamId: string, userId: string) => {
    console.log(`Mock leave team: User ${userId} left team ${teamId}`);
    return true;
  },
  
  createTeam: async (name: string, description: string, logoUrl?: string | null) => {
    const newTeam = {
      id: String(Math.floor(Math.random() * 10000)),
      name,
      description,
      logo_url: logoUrl,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    console.log('Mock create team:', newTeam);
    return newTeam;
  },
  
  uploadTeamLogo: async (userId: string, file: File) => {
    console.log('Mock team logo upload for user:', userId);
    return "https://picsum.photos/seed/team" + Math.random() + "/300/300";
  }
};

// Mock project service
export const projectService = {
  getProjects: async () => {
    return mockProjects;
  },
  
  getProjectById: async (id: string) => {
    return mockProjects.find(project => String(project.id) === id) || null;
  },
  
  createProject: async (title: string, description: string, teamId: string, imageUrl?: string) => {
    const newProject = {
      id: String(Math.floor(Math.random() * 10000)),
      title,
      description,
      team_id: teamId,
      image_url: imageUrl || null,
      likes: 0,
      status: 'open' as const,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    console.log('Mock create project:', newProject);
    return newProject;
  },
  
  likeProject: async (projectId: string) => {
    console.log('Mock like project:', projectId);
    return true;
  },
  
  getProjectLikeStatus: async (projectId: string) => {
    const likeData = mockLikes.get(projectId) || { count: 0, isLiked: false };
    return likeData;
  },
  
  submitJoinRequest: async (projectId: string, message: string) => {
    console.log(`Mock join request for project ${projectId}: ${message}`);
    return true;
  },
  
  uploadProjectImage: async (userId: string, file: File) => {
    console.log('Mock project image upload for user:', userId);
    return "https://picsum.photos/seed/project" + Math.random() + "/800/600";
  }
};
