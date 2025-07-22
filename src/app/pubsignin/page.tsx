"use client";
import { useEffect, useState } from "react";

import Carousel from "@/components/Carousel";
import { useAllPubs } from "@/hooks/useAllPubs";
import SignInForm from "@/components/SignInForm";

export default function PubSignIn() {
  const { allPubs } = useAllPubs();

  return (
    <div className="min-h-screen bg-bark font-[family-name:var(--font-schoolbell)]">
      <Carousel pubs={allPubs} />

      <h1 className="text-cream text-5xl text-center m-5">
        Let's get your pub all sorted out!
      </h1>

      <div className="flex flex-flow-row items-center justify-between">
        <SignInForm />
      </div>
    </div>
  );
}
