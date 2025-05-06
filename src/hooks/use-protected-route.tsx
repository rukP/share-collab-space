
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockCurrentUser } from "@/data/mockDataStore";

export const useProtectedRoute = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Using mock authentication - always consider user as authenticated
        setUserId(mockCurrentUser.id);
      } catch (error) {
        console.error("Auth error:", error);
        navigate("/auth", { replace: true });
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  return { isLoading, userId };
};
