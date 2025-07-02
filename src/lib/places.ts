// lib/places.ts
export async function getNearbyPubs(lat: number, lng: number): Promise<any[]> {
  const radius = 200;
  const type = "pub";

  const res = await fetch(
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=${type}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
  );

  const data = await res.json();
  if (data.status === "OK") {
    return data.results;
  } else {
    console.warn("Places API error:", data.status);
    return [];
  }
}
