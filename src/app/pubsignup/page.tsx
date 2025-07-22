"use client";
import { useEffect, useState } from "react";

import Carousel from "@/components/Carousel";
import { useAllPubs } from "@/hooks/useAllPubs";
import SignupForm from "@/components/SignUpForm";
import AfterSignUpForm from "@/components/AfterSignUpForm";

export default function PubSignUp() {
  const { allPubs } = useAllPubs();
  const [showAfterForm, setShowAfterForm] = useState(false);

  return (
    <div className="min-h-screen bg-bark font-[family-name:var(--font-schoolbell)]">
      <Carousel pubs={allPubs} />

      <h1 className="text-cream text-5xl text-center m-5">
        Let's get your pub all sorted out!
      </h1>

      <div className="flex flex-col lg:flex-row items-center justify-between">
        <SignupForm onSuccess={() => setShowAfterForm(true)} />
        {showAfterForm && <AfterSignUpForm pub={true} />}
      </div>
    </div>
  );
}
