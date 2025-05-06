
import { useState, useEffect } from "react";
import { mockProfiles, mockProjects, mockTeams } from "@/data/mockDataStore";

export const useProfile = () => {
  // Use the first mock profile as the current user's profile
  const [profile] = useState(mockProfiles[0]);
  const [isProfileLoading] = useState(false);
  
  // Filter projects for the current user (using profile.id)
  const [projects] = useState(
    mockProjects.map(project => ({
      id: project.id,
      title: project.title,
      description: project.description || "",
      imageUrl: project.image_url || "https://picsum.photos/seed/project/800/600",
      likes: project.likes || 0,
      author: profile?.name || 'User',
      status: project.status as "open" | "closed" | "completed",
      createdAt: project.created_at
    }))
  );
  const [isProjectsLoading] = useState(false);
  
  // Get teams for the current user
  const [teams] = useState(
    mockTeams.map(team => ({
      id: String(team.id),
      name: team.name,
      description: team.description || 'No description provided',
      members: team.members,
      openPositions: team.openPositions,
      createdAt: team.created_at // Changed from createdAt to created_at to match the property name in mockTeams
    }))
  );
  const [isTeamsLoading] = useState(false);

  // Check if the profile is incomplete
  const isProfileIncomplete = !profile || 
    !profile.name || 
    !profile.course || 
    !profile.bio || 
    !profile.avatar_url;

  // Provide method to refresh profile data (no-op in mock version)
  const refreshProfile = () => {
    console.log('Mock refresh profile');
  };

  return {
    profile,
    isProfileLoading,
    projects,
    isProjectsLoading,
    teams,
    isTeamsLoading,
    isProfileIncomplete,
    refreshProfile
  };
};
