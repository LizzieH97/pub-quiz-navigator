"use client";
import Title from "@/components/Title";

import Carousel from "@/components/Carousel";

import { useAllPubs } from "@/hooks/useAllPubs";
import { useUserProfile } from "@/hooks/useUserProfile";
import PubMap from "@/components/PubsMap";

export default function Home() {
  const { allPubs, loading, error } = useAllPubs();
  const { profile } = useUserProfile();
  const center = { lat: 53.4084, lng: -2.9916 };
  return (
    <div className=" min-h-screen pb-2 sm:p-1 font-[family-name:var(--font-schoolbell)] bg-bark">
      <Carousel pubs={allPubs} />
      <main className="flex flex-col w-full items-center sm:items-start">
        <section className="lg:grid grid-cols-6 grid-rows-5 grid-flow-row sm:flex sm:flex-col">
          <div className="col-start-1 col-end-3 row-start-1 row-end-3 w-full h-full pt-6">
            <Title />
          </div>
          <div className="text-2xl px-7 col-start-3 col-end-7 lg:row-start-1 lg:row-end-3 text-white mt-8 m-4 p-2 bg-black/30 border-8 border-teal sm:flex flex-col">
            {profile ? (
              <span className="text-4xl sm:text-2xl">
                Hi {profile?.full_name}!!{" "}
              </span>
            ) : (
              <span className="text-4xl sm:text-2xl">Hi!! </span>
            )}

            <p className="text-xl sm:text-base">
              I'm Lizzie and I am a massive quiz lover. I have always had an
              issue with pub quizzes - why is there so little information about
              days and locations on the internet? So I decided to fix that
              myself - here's a pub quiz locator for the Liverpool City Region!
              We have all the information you'll need to find a pub quiz on a
              night that suits you 🥳
            </p>

            <p className="text-xl mt-4 sm:text-xs">
              Disclaimer: In the past I've turned up to pub quizzes advertised
              online (e.g. on Facebook) and the quiz has just not happened - I'm
              going to try my best and get reliable information directly from
              the pubs themselves but I can't make guarantees!
            </p>
          </div>

          <div className=" text-center col-start-1 col-end-7 row-start-3 row-end-6">
            <h2 className="text-cream text-3xl">
              Want to find one near you? Check out the map below!
            </h2>
            <PubMap pubs={allPubs} center={center} />
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
