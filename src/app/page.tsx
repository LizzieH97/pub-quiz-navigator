"use client";
import Title from "@/components/Title";
import { useEffect, useState } from "react";
import { fetchPubs } from "../lib/api";
import Carousel from "@/components/Carousel";
import Map from "@/components/Map";
import { useAllPubs } from "@/hooks/useAllPubs";

export default function Home() {
  const { allPubs, loading, error } = useAllPubs();
  return (
    <div className=" min-h-screen pb-2 sm:p-1 font-[family-name:var(--font-schoolbell)] bg-bark">
      <Carousel pubs={allPubs} />
      <main className="flex flex-col w-full items-center sm:items-start">
        <section className="grid grid-cols-6 grid-rows-5 grid-flow-row">
          <div className="col-start-1 col-end-3 row-start-1 row-end-3 w-full h-full pt-6">
            <Title />
          </div>
          <span className="text-2xl px-7 col-start-3 col-end-7 row-start-1 row-end-3 text-white mt-8 m-4 p-2 bg-black/30 border-8 border-teal">
            Hi! I'm Lizzie and I am a massive quiz lover. I have always had an
            issue with pub quizzes - why is there so little information about
            days and locations on the internet? So I decided to fix that myself
            - here's a pub quiz locator for the Liverpool City Region! We have
            all the information you'll need to find a pub quiz on a night that
            suits you 🥳
            <br />
            <br />
            <span className="text-xl">
              Disclaimer: In the past I've turned up to pub quizzes advertised
              online (e.g. on Facebook) and the quiz has just not happened - I'm
              going to try my best and get reliable information directly from
              the pubs themselves but I can't make guarantees!
            </span>
          </span>

          <div className=" text-center col-start-1 col-end-7 row-start-3 row-end-6">
            <h2 className="text-cream text-3xl">
              Want to find one near you? Check out the map below!
            </h2>
            <Map pubs={allPubs} />
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
