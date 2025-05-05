
import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getTeamById, getTeamMembers, joinTeam, leaveTeam } from "@/services/teamService";
import { supabase } from "@/integrations/supabase/client";
import { hotToast } from "@/components/ui/hot-toast";

export const useTeamDetails = (id: string | undefined) => {
  const [isJoining, setIsJoining] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [isCurrentUserMember, setIsCurrentUserMember] = useState(false);
  const queryClient = useQueryClient();

  // Team data query
  const {
    data: team,
    isLoading: isTeamLoading,
    error: teamError
  } = useQuery({
    queryKey: ['team', id],
    queryFn: () => (id ? getTeamById(id) : null),
    enabled: !!id
  });

  // Team members query
  const {
    data: members,
    isLoading: isMembersLoading,
    error: membersError
  } = useQuery({
    queryKey: ['team-members', id],
    queryFn: () => (id ? getTeamMembers(id) : []),
    enabled: !!id
  });

  // Get current user
  useEffect(() => {
    const checkCurrentUser = async () => {
      const { data } = await supabase.auth.getUser();
      setCurrentUserId(data.user?.id || null);
    };
    
    checkCurrentUser();
  }, []);

  // Check if current user is a member
  useEffect(() => {
    if (currentUserId && members) {
      const userIsMember = members.some(member => member.user_id === currentUserId);
      setIsCurrentUserMember(userIsMember);
    }
  }, [currentUserId, members]);

  // Handle join team
  const handleJoinTeam = async () => {
    if (!id || !currentUserId) {
      hotToast({
        title: "Error",
        description: "You must be logged in to join a team",
        variant: "destructive"
      });
      return;
    }

    setIsJoining(true);
    
    try {
      const success = await joinTeam(id, currentUserId);
      
      if (success) {
        // Refresh team members data
        queryClient.invalidateQueries({ queryKey: ['team-members', id] });
        setIsCurrentUserMember(true);
      }
    } catch (error) {
      console.error("Error joining team:", error);
    } finally {
      setIsJoining(false);
    }
  };

  // Handle leave team
  const handleLeaveTeam = async () => {
    if (!id || !currentUserId) return;

    setIsLeaving(true);
    
    try {
      const success = await leaveTeam(id, currentUserId);
      
      if (success) {
        // Refresh team members data
        queryClient.invalidateQueries({ queryKey: ['team-members', id] });
        setIsCurrentUserMember(false);
      }
    } catch (error) {
      console.error("Error leaving team:", error);
    } finally {
      setIsLeaving(false);
    }
  };

  return {
    team,
    members,
    isTeamLoading,
    isMembersLoading,
    teamError,
    membersError,
    currentUserId,
    isCurrentUserMember,
    isJoining,
    isLeaving,
    handleJoinTeam,
    handleLeaveTeam
  };
};
