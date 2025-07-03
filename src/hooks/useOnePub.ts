// hooks/useAllPubs.ts
import { useEffect, useState } from "react";
import { fetchPubById } from "@/lib/api";

export function useOnePub(id: number) {
  const [onePub, setOnePub] = useState<any>();
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const loadPubs = async () => {
      try {
        const data = await fetchPubById(id);
        setOnePub(data || []);
      } catch (err: any) {
        setErr(err.message);
      }
    };
    loadPubs();
  }, [id]);

  return { onePub, err };
}
