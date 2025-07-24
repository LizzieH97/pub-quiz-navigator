"use client";

import Accordion from "@/components/Accordion";
import Carousel from "@/components/Carousel";
import PubCard from "@/components/PubCard";
import { useAllPubs } from "@/hooks/useAllPubs";
import { fetchPubsByDate } from "@/lib/api";
import { useEffect, useState, useRef } from "react";

export default function SortByDay() {
  const { allPubs } = useAllPubs();
  const [openDay, setOpenDay] = useState<string | null>(null);
  const [dayPubs, setDayPubs] = useState<any[]>([]);
  const [error, setError] = useState<string | undefined>();

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  useEffect(() => {
    if (!openDay) return;

    const loadPubs = async () => {
      try {
        const data = await fetchPubsByDate(openDay.toLowerCase().slice(0, 3));
        setDayPubs(data || []);
      } catch (err: any) {
        setError(err.message);
      }
    };

    loadPubs();
  }, [openDay]);

  return (
    <div className="min-h-screen pb-2 sm:p-1 font-[family-name:var(--font-schoolbell)] bg-bark overflow-x-hidden">
      <Carousel pubs={allPubs} />

      <section className="flex flex-col items-center justify-center">
        <h1 className="w-full lg:text-5xl text-xl text-beige lg:p-8 lg:mt-4 text-center">
          Planning a night out? Check out what quizzes are on for your day here!
        </h1>

        <div className="mt-4 flex flex-col items-center justify-center w-full max-w-4xl">
          {days.map((day) => (
            <Accordion
              key={day}
              option={day}
              stateOption={openDay}
              setStateOption={setOpenDay}
              data={dayPubs}
              RenderComponent={PubCard}
            />
          ))}
        </div>

        {error && <p className="text-red-500">{error}</p>}
      </section>
    </div>
  );
}
