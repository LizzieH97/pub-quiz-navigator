"use client";
import Carousel from "@/components/Carousel";
import PubCard from "@/components/PubCard";
import { useAllPubs } from "@/hooks/useAllPubs";
import { fetchPubs } from "@/lib/api";

export default async function AreaPage({
  params,
}: {
  params: { slug: string };
}) {
  const decodedArea = decodeURIComponent(params.slug);

  const { allPubs, loading, error } = useAllPubs();
  const areaPubs = allPubs.filter((pub) => pub.area === decodedArea);

  return (
    <div className="min-h-screen bg-bark font-[family-name:var(--font-schoolbell)]">
      <Carousel pubs={allPubs} />
      <h1 className="text-cream text-3xl text-center m-5">
        Pubs on {decodedArea}
      </h1>
      <ul className="text-cream flex flex-col items-center justify-center">
        {areaPubs.map((pub) => (
          <li key={pub.id}>
            <PubCard
              name={pub.name}
              pic={pub.pic}
              day={pub.day}
              address={pub.address}
              area={pub.area}
              id={pub.id}
              variant="large"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
