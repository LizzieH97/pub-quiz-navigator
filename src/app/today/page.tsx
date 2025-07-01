"use client";
import { useEffect, useState } from "react";
import { fetchPubsByDate } from "../../../lib/api";
import PubCard from "@/components/PubCard";

export default function Today() {
  const date = new Date();
  const dateSplit = date.toString().split(" ");
  const shortDate = dateSplit[0].toLowerCase();

  const [pubs, setPubs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPubs = async () => {
      try {
        const data = await fetchPubsByDate(shortDate);
        setPubs(data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadPubs();
  }, []);

  return (
    <div className="min-h-screen bg-bark font-[family-name:var(--font-schoolbell)]">
      <div className="flex flex-row items-center justify-center gap-4">
        <h1 className="text-cream ">This is the today page</h1>

        {pubs.map((pub, index) => (
          <div key={index} className="w-64 m-5">
            <PubCard
              name={pub.name}
              pic={pub.pic}
              day={pub.day}
              address={pub.address}
              area={pub.area}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
