"use client";

import { useEffect, useState } from "react";
import { geocodeAddress } from "../../lib/geocode";
import { getNearbyPubs } from "../../lib/places";
import { useAllPubs } from "@/hooks/useAllPubs";
import Link from "next/link";
import Carousel from "@/components/Carousel";
import PubMap from "@/components/PubsMap";

const defaultCenter = { lat: 53.4084, lng: -2.9916 }; // Liverpool

export default function NearYou() {
  const { allPubs } = useAllPubs();

  const [mounted, setMounted] = useState(false);
  const [address, setAddress] = useState("");
  const [center, setCenter] = useState<{ lat: number; lng: number }>(
    defaultCenter
  );
  const [nearPubs, setNearPubs] = useState<any[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSearch = async () => {
    const coords = await geocodeAddress(address);
    if (!coords) return alert("Address not found");

    setCenter(coords);

    const pubsNearby = await getNearbyPubs(coords.lat, coords.lng);
    setNearPubs(pubsNearby);
  };

  if (!mounted) return <p>Loading...</p>;

  // ✅ Create Map of normalized area -> original area
  const areaMap = new Map<string, string>();
  allPubs.forEach((pub) => {
    if (!pub.area) return;
    const norm = pub.area.trim().toLowerCase();
    if (!areaMap.has(norm)) {
      areaMap.set(norm, pub.area.trim());
    }
  });
  const uniqueAreas = Array.from(areaMap.entries());

  return (
    <div className="min-h-screen bg-bark font-[family-name:var(--font-schoolbell)]">
      <Carousel pubs={allPubs} />

      <div className="grid grid-cols-4 grid-rows-[100px_auto_auto_auto] grid-flow-row">
        {/* Search bar */}
        <div className="col-start-1 col-end-2 row-start-1 h-28 flex flex-row items-center justify-end content-end">
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Search near you!"
            className="border p-2 w-60"
          />
          <button
            onClick={handleSearch}
            className="bg-teal text-white p-2 ml-2"
          >
            Search
          </button>
        </div>

        {/* Map */}
        <div className="w-full h-90 col-start-1 col-end-3 row-start-2">
          <PubMap
            pubs={nearPubs.length > 0 ? nearPubs : allPubs}
            center={center}
          />
        </div>

        <div className="col-start-3 col-end-5 row-start-2 text-cream m-5">
          <h1 className="text-2xl">
            Already know the area? Check out different pubs in popular areas
            below ⤵
          </h1>
          <div className="flex flex-row flex-wrap justify-center mt-4">
            {uniqueAreas.map(([norm, original]) => (
              <div
                key={norm}
                className="text-xl text-white m-4 p-2 bg-black/30 border-8 border-teal"
              >
                <Link href={`/area/${encodeURIComponent(norm)}`}>
                  {original}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
