"use client";
import { useEffect, useState } from "react";
import { fetchPubs } from "../../../lib/api";
import PubCard from "@/components/PubCard";
import Carousel from "@/components/Carousel";

export default function Today() {
  const date = new Date();
  const dateSplit = date.toString().split(" ");
  const shortDate = dateSplit[0].toLowerCase();
  console.log(shortDate);
  const [pubs, setPubs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPubs = async () => {
      try {
        const data = await fetchPubs();
        setPubs(data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadPubs();
  }, []);
  const pubsToday = pubs.filter((pub) => {
    return pub.day == shortDate;
  });
  console.log(pubsToday);
  console.log(pubs);
  return (
    <div className="min-h-screen bg-bark font-[family-name:var(--font-schoolbell)]">
      <Carousel pubs={pubs} />
      <h1 className="text-cream text-5xl flex items-center justify-center m-5">
        Check out what's on this evening!{" "}
      </h1>
      <div className="flex flex-row items-center justify-center gap-4">
        {pubsToday.map((pub, index) => (
          <div key={index} className="m-5">
            <PubCard
              name={pub.name}
              pic={pub.pic}
              day={pub.day}
              address={pub.address}
              area={pub.area}
              variant="large"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
