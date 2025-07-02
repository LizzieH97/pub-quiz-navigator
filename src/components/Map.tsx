"use client";

import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { geocodeAddress } from "../lib/geocode";

type Pub = {
  name: string;
  address: string;
};

type MapProps = {
  pubs: Pub[];
};

const containerStyle = {
  width: "100%",
  height: "500px",
};

const defaultCenter = {
  lat: 53.4084,
  lng: -2.9916, // Liverpool
};

export default function PubMap({ pubs }: MapProps) {
  const libraries: "places"[] = ["places"];
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  const [locations, setLocations] = useState<
    { name: string; lat: number; lng: number }[]
  >([]);

  useEffect(() => {
    const fetchLocations = async () => {
      const locs = await Promise.all(
        pubs.map(async (pub) => {
          const coords = await geocodeAddress(pub.address);
          return coords ? { name: pub.name, ...coords } : null;
        })
      );

      setLocations(locs.filter(Boolean) as any[]);
    };

    fetchLocations();
  }, [pubs]);

  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={defaultCenter}
      zoom={13}
    >
      {locations.map((loc, idx) => (
        <Marker
          key={idx}
          position={{ lat: loc.lat, lng: loc.lng }}
          title={loc.name}
        />
      ))}
    </GoogleMap>
  );
}
