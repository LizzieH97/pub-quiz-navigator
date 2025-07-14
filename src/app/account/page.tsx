"use client";
import { useEffect, useState } from "react";
import { fetchPubs } from "../../lib/api";
import PubCard from "@/components/PubCard";
import Carousel from "@/components/Carousel";
import { useAllPubs } from "@/hooks/useAllPubs";
import { useUserProfile } from "@/hooks/useUserProfile";
import AfterSignUpForm from "@/components/AfterSignUpForm";

export default function Today() {
  const { allPubs } = useAllPubs();
  const { profile } = useUserProfile();
  return (
    <div className="min-h-screen bg-bark font-[family-name:var(--font-schoolbell)]">
      <Carousel pubs={allPubs} />
      <section className="grid grid-cols-4 grid-flow-row">
        <div className="relative w-3/4 h-96 m-20 border-8 border-teal m-10 col-start-1 col-end-3 flex items-center justify-center">
          <img
            src={profile?.avatar_url || "/background.png"}
            className="absolute inset-0 w-full h-full object-cover opacity-90 z-0"
            alt="background"
          />

          <div className="relative bg-black/30 w-full h-full flex flex-col items-center justify-center rounded-2xl z-10 text-white text-3xl text-center">
            <h1 className=" tracking-wide z-20 bg-black rounded-3xl px-4 py-6 w-104">
              Hi {profile?.full_name}! Check out and edit your profile here:
            </h1>
            <p className="bg-black rounded-3xl p-2">
              {" "}
              Username: {profile?.username}{" "}
            </p>
            <p className="bg-black rounded-3xl p-2"> Bio: {profile?.bio}</p>
          </div>
        </div>
        <div className="col-start-3 col-end-5 m-10">
          <AfterSignUpForm title="update" />
        </div>
      </section>
    </div>
  );
}
