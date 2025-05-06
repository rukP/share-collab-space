
import { useState, useEffect } from "react";
import { mockTeams, mockTeamMembers, mockCurrentUser } from "@/data/mockDataStore";

export const useTeamDetails = (id: string | undefined) => {
  // Find team by ID from mock data
  const [team] = useState(() => 
    id ? mockTeams.find(t => String(t.id) === id) : null
  );
  
  // Filter team members for this team
  const [members] = useState(() => 
    id ? mockTeamMembers.filter(m => m.team_id === id) : []
  );
  
  const [isJoining, setIsJoining] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const [currentUserId] = useState(mockCurrentUser.id);
  
  // Check if current user is a member of this team
  const [isCurrentUserMember] = useState(() => 
    members.some(member => member.user_id === mockCurrentUser.id)
  );

  // Handle join team
  const handleJoinTeam = async () => {
    if (!id) return;
    
    setIsJoining(true);
    
    try {
      console.log(`Mock join team: User ${currentUserId} joined team ${id}`);
      // In a real app, this would update the database
      setTimeout(() => {
        setIsJoining(false);
      }, 1000);
    } catch (error) {
      console.error("Error joining team:", error);
      setIsJoining(false);
    }
  };

  // Handle leave team
  const handleLeaveTeam = async () => {
    if (!id) return;
    
    setIsLeaving(true);
    
    try {
      console.log(`Mock leave team: User ${currentUserId} left team ${id}`);
      // In a real app, this would update the database
      setTimeout(() => {
        setIsLeaving(false);
      }, 1000);
    } catch (error) {
      console.error("Error leaving team:", error);
      setIsLeaving(false);
    }
  };

  return {
    team,
    members,
    isTeamLoading: false,
    isMembersLoading: false,
    teamError: null,
    membersError: null,
    currentUserId,
    isCurrentUserMember,
    isJoining,
    isLeaving,
    handleJoinTeam,
    handleLeaveTeam
  };
};
