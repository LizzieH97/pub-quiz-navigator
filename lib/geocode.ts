export async function geocodeAddress(
  address: string
): Promise<google.maps.LatLngLiteral | null> {
  const res = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
  );
  const data = await res.json();

  if (data.status === "OK") {
    const { lat, lng } = data.results[0].geometry.location;
    return { lat, lng };
  } else {
    console.warn(`Geocoding failed for address: ${address}`, data.status);
    return null;
  }
}
