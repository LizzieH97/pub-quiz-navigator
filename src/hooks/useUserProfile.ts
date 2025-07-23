import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

type UserProfile = {
  id: string;
  username: string;
  full_name: string;
  bio: string;
  avatar_url: string | null;
};

export function useUserProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);

      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        setError("Not logged in");
        setProfile(null);
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      const { data, error: profileError } = await supabase
        .from("quiz-enjoyer")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profileError) {
        setError(profileError.message);
        setProfile(null);
      } else {
        setProfile(data);
        setIsAuthenticated(true);
      }

      setLoading(false);
    };

    fetchProfile();
  }, []);

  // Sign in method
  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      // re-fetch profile after login
      setError(null);
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data, error: profileError } = await supabase
          .from("quiz-enjoyer")
          .select("*")
          .eq("id", user.id)
          .single();

        if (profileError) {
          setError(profileError.message);
        } else {
          setProfile(data);
          setIsAuthenticated(true);
        }
      }
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setProfile(null); // Reset profile data
    setIsAuthenticated(false);
    window.location.href = "/"; // Mark user as logged out
  };

  return { profile, loading, error, isAuthenticated, signIn, signOut };
}
