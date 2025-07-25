import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

type UserProfile = {
  id: string;
  username: string;
  full_name: string;
  bio: string;
  avatar_url: string | null;
  favourites?: number[]; // add this if your table has it!
};

export function useUserProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [signInError, setSigninError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const refetch = async () => {
    setLoading(true);
    setProfileError(null);

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      setProfileError("Not logged in");
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
      setProfileError(profileError.message);
      setProfile(null);
    } else {
      setProfile(data);
      setIsAuthenticated(true);
    }

    setLoading(false);
  };

  useEffect(() => {
    refetch();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setSigninError(signInError.message);
    } else {
      setSigninError(null);
      await refetch(); // reuse refetch
    }
    return { error: signInError };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setProfile(null);
    setIsAuthenticated(false);
    window.location.href = "/";
  };

  return {
    profile,
    loading,
    error: profileError,
    isAuthenticated,
    signIn,
    signOut,
    refetch,
  };
}
