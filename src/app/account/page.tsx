"use client";

import Carousel from "@/components/Carousel";
import { useAllPubs } from "@/hooks/useAllPubs";
import { useUserProfile } from "@/hooks/useUserProfile";
import AfterSignUpForm from "@/components/AfterSignUpForm";
import { usePubProfile } from "@/hooks/usePubUser";

export default function Today() {
  const { allPubs } = useAllPubs();
  const { profile } = useUserProfile();
  const { pubProfile } = usePubProfile();

  return (
    <div className="min-h-screen bg-bark font-[family-name:var(--font-schoolbell)]">
      <Carousel pubs={allPubs} />
      <section className="grid lg:grid-cols-4 grid-cols-1 grid-flow-row sm:flex sm:items-center sm:justify-center">
        <div className="relative w-11/12 lg:w-3/4 h-96 lg:m-20 border-8 border-teal m-4 lg:col-start-1 lg:col-end-3 flex items-center content-center justify-center">
          <img
            src={profile?.avatar_url || "/background.png"}
            className="absolute inset-0 w-full h-full object-cover opacity-90 z-0"
            alt="background"
          />

          <div className="relative bg-black/30 w-full h-full flex flex-col items-center justify-center  z-10 text-white text-3xl text-center">
            <h1 className=" tracking-wide z-20 bg-black/40 rounded-3xl px-4 py-6 w-104">
              Hi {profile?.full_name}! Check out and edit your profile here:
            </h1>
            {profile?.username ? (
              <p className="bg-black/40  p-1">
                {" "}
                Username: {profile?.username}{" "}
              </p>
            ) : (
              <></>
            )}

            {pubProfile ? (
              <p className="">Description: {pubProfile.bio} </p>
            ) : (
              <p className="bg-black/40  p-1"> Bio: {profile?.bio}</p>
            )}
          </div>
        </div>
        <div className="lg:col-start-3 ;g:col-end-5 m-10">
          <AfterSignUpForm title="update" />
        </div>
      </section>
    </div>
  );
}
