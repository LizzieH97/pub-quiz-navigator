import AllPubs from "@/app/allpubs/page";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useLoadScript,
} from "@react-google-maps/api";
import Link from "next/link";
import { useEffect, useState } from "react";

type Pub = {
  name: string;
  address: string;
  pic: string;
  id: number;
};

type MapProps = {
  pubs: Pub[];
  center: { lat: number; lng: number };
};

const containerStyle = {
  width: "100%",
  height: "500px",
};

export default function PubMap({ pubs, center }: MapProps) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  const [locations, setLocations] = useState<
    { name: string; lat: number; lng: number; pic: string; id: number }[]
  >([]);

  const [selected, setSelected] = useState<{
    name: string;
    lat: number;
    lng: number;
    pic: string;
    id: number;
  } | null>(null);

  useEffect(() => {
    if (!isLoaded) return;

    const geocoder = new window.google.maps.Geocoder();

    const fetchLocations = async () => {
      const promises = pubs.map(
        (pub) =>
          new Promise<{
            name: string;
            lat: number;
            lng: number;
            pic: string;
            id: number;
          } | null>((resolve) => {
            geocoder.geocode({ address: pub.address }, (results, status) => {
              if (status === "OK" && results && results[0]) {
                const loc = results[0].geometry.location;
                resolve({
                  name: pub.name,
                  pic: pub.pic,
                  lat: loc.lat(),
                  lng: loc.lng(),
                  id: pub.id,
                });
              } else {
                console.warn(
                  `Geocode failed for ${pub.name}: ${status}`,
                  results
                );
                resolve(null);
              }
            });
          })
      );

      const locs = await Promise.all(promises);
      setLocations(locs.filter(Boolean) as any[]);
    };

    if (pubs.length > 0) {
      fetchLocations();
    } else {
      setLocations([]);
    }
  }, [pubs, isLoaded]);

  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
      <Marker position={center} title="You" />

      {locations.map((loc, idx) => (
        <Marker
          key={idx}
          position={{ lat: loc.lat, lng: loc.lng }}
          title={loc.name}
          onClick={() => setSelected(loc)}
        />
      ))}

      {selected && (
        <InfoWindow
          position={{ lat: selected.lat, lng: selected.lng }}
          onCloseClick={() => setSelected(null)}
        >
          <div className="p-0 m-0 flex flex-col items-center justify-center">
            <Link href={`/pub/${selected.id}`}>
              <h2 className="text-lg font-bold">{selected.name}</h2>
              <img src={selected.pic} className="w-16 lg:w-24 h-auto"></img>
            </Link>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}
