"use client";

import Carousel from "@/components/Carousel";
import PubCard from "@/components/PubCard";
import { useAllPubs } from "@/hooks/useAllPubs";

export default function AllPubs() {
  const { allPubs } = useAllPubs();
  return (
    <div className="min-h-screen bg-bark font-[family-name:var(--font-schoolbell)]">
      <Carousel pubs={allPubs} />
      <h1 className="text-cream text-3xl text-center m-5">
        This is all I have so far. Please get in touch if you know of any more!
      </h1>
      <ul className="text-cream flex flex-row flex-wrap items-center justify-center">
        {allPubs.map((pub) => (
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
