"use client";

import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { geocodeAddress } from "../lib/geocode";

type Pub = {
  name: string;
  address: string;
};

const containerStyle = {
  width: "90%",
  height: "100%",
};

const defaultCenter = {
  lat: 53.4084,
  lng: -2.9916,
};

type OnePubMapProps = {
  pub: Pub;
};

export default function OnePubMap({ pub }: OnePubMapProps) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  const [location, setLocation] = useState<{
    lat: number;
    lng: number;
    name: string;
  } | null>(null);

  useEffect(() => {
    if (!pub?.address) return;

    const fetchLocation = async () => {
      const coords = await geocodeAddress(pub.address);
      if (coords) {
        setLocation({ ...coords, name: pub.name });
      }
    };

    fetchLocation();
  }, [pub]);

  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={location || defaultCenter}
      zoom={20}
    >
      {location && (
        <Marker
          position={{ lat: location.lat, lng: location.lng }}
          title={location.name}
        />
      )}
    </GoogleMap>
  );
}
