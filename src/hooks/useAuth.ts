import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Auth error:", error);
      }
      setUser(data?.user ?? null);
      setLoading(false);
    };
    getUser();
  }, []);

  return { user, loading };
}
