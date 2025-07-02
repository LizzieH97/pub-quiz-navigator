// hooks/useAllPubs.ts
import { useEffect, useState } from "react";
import { fetchPubs } from "@/lib/api";

export function useAllPubs() {
  const [allPubs, setAllPubs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPubs = async () => {
      try {
        const data = await fetchPubs();
        setAllPubs(data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadPubs();
  }, []);

  return { allPubs, loading, error };
}
