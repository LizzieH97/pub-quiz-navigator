"use client";

import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useEffect, useState } from "react";

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
    if (!isLoaded || !pub?.address) return;

    const geocoder = new window.google.maps.Geocoder();

    geocoder.geocode({ address: pub.address }, (results, status) => {
      if (status === "OK" && results && results[0]) {
        const loc = results[0].geometry.location;
        setLocation({
          lat: loc.lat(),
          lng: loc.lng(),
          name: pub.name,
        });
      } else {
        console.warn(`Geocode failed for ${pub.name}: ${status}`);
        setLocation(null);
      }
    });
  }, [pub, isLoaded]);

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
