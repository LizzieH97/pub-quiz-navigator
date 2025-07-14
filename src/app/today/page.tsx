"use client";
import { useEffect, useState } from "react";
import { fetchPubs } from "../../lib/api";
import PubCard from "@/components/PubCard";
import Carousel from "@/components/Carousel";

export default function Today() {
  const date = new Date();
  const dateSplit = date.toString().split(" ");
  const shortDate = dateSplit[0].toLowerCase();
  console.log(shortDate);
  const [pubs, setPubs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPubs = async () => {
      try {
        const data = await fetchPubs();
        setPubs(data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadPubs();
  }, []);
  const pubsToday = pubs.filter((pub) => {
    return pub.day == shortDate;
  });
  console.log(pubsToday);
  console.log(pubs);
  return (
    <div className="min-h-screen bg-bark font-[family-name:var(--font-schoolbell)]">
      <Carousel pubs={pubs} />
      <h1 className="text-cream text-5xl flex items-center justify-center m-5">
        Check out what's on this evening!{" "}
      </h1>
      <div className="flex lg:flex-row flex-col items-center justify-center lg:gap-4">
        {pubsToday.length !== 0 ? (
          pubsToday.map((pub, index) => (
            <div key={index} className="m-5">
              <PubCard
                name={pub.name}
                id={pub.id}
                pic={pub.pic}
                day={pub.day}
                address={pub.address}
                area={pub.area}
                variant="large"
              />
            </div>
          ))
        ) : (
          <div className="relative w-96 h-80 border-8 border-teal m-10 ">
            <img
              src="/blackboard.png"
              className="absolute inset-0 w-full h-full object-cover opacity-90 z-0"
              alt="background"
            />

            <div className="relative bg-black/30 w-full h-full flex items-center justify-center rounded-2xl z-10">
              <h1 className="text-white text-3xl tracking-wide z-20 bg-black rounded-3xl px-4 py-2 w-full">
                Sorry, we've got no quizzes on this day of the week just yet!
                You'll have to just go out for a pint sans quiz 🍻
              </h1>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
