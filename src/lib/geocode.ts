import { useEffect, useState } from "react";

export function useGeocode(address: string) {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!address) {
      setLocation(null);
      setError(null);
      return;
    }

    if (!window.google?.maps?.Geocoder) {
      setError("Google Maps JavaScript API is not loaded");
      setLocation(null);
      return;
    }

    const geocoder = new window.google.maps.Geocoder();

    geocoder.geocode({ address }, (results, status) => {
      if (status === "OK" && results && results[0]) {
        const loc = results[0].geometry.location;
        setLocation({ lat: loc.lat(), lng: loc.lng() });
        setError(null);
      } else {
        setError(`Geocode error: ${status}`);
        setLocation(null);
      }
    });
  }, [address]);

  return { location, error };
}
