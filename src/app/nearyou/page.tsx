"use client";

import { useEffect, useState } from "react";
import { useGeocode } from "../../lib/geocode"; // your hook
import { getNearbyPubs } from "../../lib/places";
import { useAllPubs } from "@/hooks/useAllPubs";
import Link from "next/link";
import Carousel from "@/components/Carousel";
import PubMap from "@/components/PubsMap";

const defaultCenter = { lat: 53.4084, lng: -2.9916 };

export default function NearYou() {
  const { allPubs } = useAllPubs();

  const [mounted, setMounted] = useState(false);
  const [searchAddress, setSearchAddress] = useState(""); // controlled input
  const [submittedAddress, setSubmittedAddress] = useState(""); // address passed to hook

  const { location, error } = useGeocode(submittedAddress);

  const [center, setCenter] = useState<{ lat: number; lng: number }>(
    defaultCenter
  );
  const [nearPubs, setNearPubs] = useState<any[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // When location updates (from the hook), update center and nearby pubs
  useEffect(() => {
    if (location) {
      setCenter(location);
      getNearbyPubs(location.lat, location.lng).then(setNearPubs);
    }
  }, [location]);

  const handleSearch = () => {
    if (!searchAddress.trim()) return;
    setSubmittedAddress(searchAddress);
  };

  if (!mounted) return <p>Loading...</p>;

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

      <div className="grid lg:grid-cols-4 lg:grid-rows-[100px_auto_auto_auto] grid-flow-row sm:grid-cols-1 sm:auto-rows-auto sm:gap-y-8">
        {/* Search bar */}
        <div className="lg:col-start-1 lg:col-end-2 lg:row-start-1 sm:col-auto sm:row-auto h-28 flex flex-row items-center justify-center content-end">
          <input
            value={searchAddress}
            onChange={(e) => setSearchAddress(e.target.value)}
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
        <div className="w-full h-90 lg:col-start-1 lg:col-end-3 lg:row-start-2 sm:col-auto sm:row-auto">
          <PubMap
            pubs={nearPubs.length > 0 ? nearPubs : allPubs}
            center={center}
          />
        </div>

        <div className="lg:col-start-3 lg:col-end-5 lg:row-start-2 sm:col-auto sm:row-auto text-cream m-5">
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
