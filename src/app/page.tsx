"use client";
import Title from "@/components/Title";
import { useEffect, useState } from "react";
import { fetchPubs } from "../../lib/api";
import Carousel from "@/components/Carousel";
import Map from "@/components/Map";

export default function Home() {
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
  return (
    <div className=" min-h-screen pb-2 sm:p-1 font-[family-name:var(--font-schoolbell)] bg-bark">
      <Carousel pubs={pubs} />
      <main className="flex flex-col w-full items-center sm:items-start">
        <section className="grid grid-cols-6 grid-rows-4 grid-flow-row">
          <div className="col-start-1 col-end-3 row-start-1 row-end-3 w-full h-full">
            <Title />
          </div>
          <p className="text-2xl p-7 col-start-3 col-end-7 row-start-1 text-cream">
            Hi! I'm Lizzie and I am a massive quiz lover. I have always had an
            issue with pub quizzes - why is there so little information about
            days and locations on the internet? So I decided to fix that myself
            - here's a pub quiz locator for the Liverpool City Region! We have
            all the information you'll need to find a pub quiz on a night that
            suits you 🥳
          </p>

          <p className="text-xl p-7 col-start-3 col-end-7 row-start-2 mt-50 text-cream">
            Disclaimer: In the past I've turned up to pub quizzes advertised
            online (e.g. on Facebook) and the quiz has just not happened - I'm
            going to try my best and get reliable information directly from the
            pubs themselves but I can't make guarantees!
          </p>
          <div className="col-start-1 col-end-7 row-start-3 row-end-5">
            <Map pubs={pubs} />
          </div>
        </section>
      </main>
      <footer className="row-start-3 flex flex-wrap items-center justify-center text-cream">
        <p>
          Made by Lizzie 💕 I received no money from this, plz give me a job!!
        </p>
      </footer>
    </div>
  );
}
