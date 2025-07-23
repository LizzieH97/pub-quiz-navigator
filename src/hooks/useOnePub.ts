import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export function useOnePub(pubId: number) {
  const [onePub, setOnePub] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPub = async () => {
      const { data, error } = await supabase
        .from("pub-list")
        .select(
          `
          *,
          pub-users:pub-users (bio, name, avatar_url)
        `
        )
        .eq("id", pubId)
        .single();

      if (error) {
        console.error("One pub error:", error);
      }

      setOnePub(data ?? null);
      setLoading(false);
    };

    fetchPub();
  }, [pubId]);

  return { onePub, loading };
}
