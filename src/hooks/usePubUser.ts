import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type PubProfile = {
  id: string;
  pub_id: string;
  bio: string;
  avatar_url: string | null;
  name: string;
};

export function usePubProfile(userId?: string) {
  const [pubProfile, setPubProfile] = useState<PubProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from("pub-users")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Pub profile error:", error);
      }

      setPubProfile(data ?? null);
      setLoading(false);
    };

    fetchProfile();
  }, [userId]);

  return { pubProfile, loading };
}
