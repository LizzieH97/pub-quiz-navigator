"use client";

import { useEffect, useState } from "react";
import { geocodeAddress } from "../../lib/geocode";
import { getNearbyPubs } from "../../lib/places";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import Carousel from "@/components/Carousel";
import { useAllPubs } from "@/hooks/useAllPubs";
import Link from "next/link";

const containerStyle = { width: "100%", height: "500px" };

const defaultCenter = { lat: 53.4084, lng: -2.9916 }; // Liverpool

export default function NearYou() {
  const { allPubs, loading, error } = useAllPubs();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: ["places"],
  });

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

  if (!mounted || !isLoaded) return <p>Loading map...</p>;
  const uniqueAreas = Array.from(new Set(allPubs.map((pub) => pub.area)));

  return (
    <div className="min-h-screen bg-bark font-[family-name:var(--font-schoolbell)]">
      <Carousel pubs={allPubs} />
      <div className="grid grid-cols-4 grid-rows-[100px_auto_auto_auto] grid-flow-row">
        <div className="col-start-1 col-end-2 row-start-1 h-28 flex flex-row items-center justify-end content-end">
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Search near you!"
            className="border p-2 w-60"
          />
          <button
            onClick={handleSearch}
            className="bg-teal text-white p-2 ml-2 "
          >
            Search
          </button>
        </div>
        <div className="w-full h-90 col-start-1 col-end-3 row-start-2 ">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={14}
          >
            <Marker position={center} title="You" />
            {nearPubs.map((pub, idx) => (
              <Marker
                key={idx}
                position={{
                  lat: pub.geometry.location.lat,
                  lng: pub.geometry.location.lng,
                }}
                title={pub.name}
              />
            ))}
          </GoogleMap>
        </div>
        <div className="col-start-3 col-end-5 row-start-2 text-cream m-5">
          <h1 className="text-2xl">
            Already know the area? Check out different pubs in popular areas
            below ⤵{" "}
            <div className="flex flex-row items-stretch justify-center content-center flex-wrap">
              {uniqueAreas.map((area) => {
                let areaLink = encodeURIComponent(area);
                return (
                  <div className="text-xl row-start-1 row-end-3 text-white m-4 p-2 bg-black/30 border-8 border-teal ">
                    <Link href={`/area/${areaLink}`}>{area}</Link>{" "}
                  </div>
                );
              })}
            </div>
          </h1>
        </div>
      </div>
    </div>
  );
}
