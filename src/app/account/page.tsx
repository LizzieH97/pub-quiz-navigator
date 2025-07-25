"use client";

import Carousel from "@/components/Carousel";
import { useAllPubs } from "@/hooks/useAllPubs";
import { useUserProfile } from "@/hooks/useUserProfile";
import AfterSignUpForm from "@/components/AfterSignUpForm";
import { usePubProfile } from "@/hooks/usePubUser";
import PubCard from "@/components/PubCard";

export default function Today() {
  const { allPubs } = useAllPubs();
  const { profile } = useUserProfile();
  const { pubProfile } = usePubProfile();
  const favs = profile?.favourites;

  const favPubs = allPubs.filter((pub) => favs?.includes(pub.id));
  return (
    <div className="min-h-screen bg-bark font-[family-name:var(--font-schoolbell)]">
      <Carousel pubs={allPubs} />

      <section className="grid grid-cols-1 lg:grid-cols-4 lg:grid-rows-2 gap-4 p-4">
        {/* BIG CARD */}
        <div className="flex flex-col items-center justify-center lg:col-start-1 lg:col-end-3 lg:row-start-1">
          <div className="relative w-80 h-64 border-8 border-teal flex items-center justify-center">
            <img
              src={profile?.avatar_url || "/background.png"}
              className="absolute inset-0 w-full h-full object-cover opacity-90 z-0"
              alt="background"
            />
            <div className="relative bg-black/30 w-full h-full flex flex-col items-center justify-center z-10 text-bark text-3xl text-center ">
              <h1 className="tracking-wide z-20 bg-cream/60 rounded-3xl px-4 py-6 w-72 h-36">
                Hi {profile?.full_name}! Check out and edit your profile here:
              </h1>
            </div>
          </div>

          <div className="relative bg-teal border-8 border-beige  m-3 w-80">
            <img
              src="/blackboard.png"
              className="absolute inset-0 w-full h-full object-cover opacity-90 z-0 "
              alt="background"
            />
            <div className="relative bg-teal/60 w-full h-full flex flex-col items-center justify-center z-10 text-center ">
              {profile?.username && (
                <p className="text-cream text-xl p-1">
                  Username:{" "}
                  <span className="text-3xl">{profile?.username}</span>
                </p>
              )}

              {pubProfile ? (
                <p className="text-cream text-xl p-1">
                  Description:{" "}
                  <span className="text-3xl ml-3">{pubProfile.bio}</span>
                </p>
              ) : (
                <p className="text-cream text-xl p-1">
                  Bio: <span className="text-3xl ml-3">{profile?.bio}</span>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* FORM */}
        <div className="flex items-center justify-center lg:col-start-3 lg:col-end-5 lg:row-start-1">
          <AfterSignUpForm title="update" />
        </div>
        <div className="lg:col-start-1 lg:col-end-5 lg:row-start-2">
          {profile ? (
            <div className="text-3xl text-cream text-center p-4 m-4">
              Your favourite pubs:
              <aside className="flex flex-row items-center justify-center ">
                {favPubs.map((pub, index) => (
                  <div key={index}>
                    <PubCard
                      name={pub.name}
                      pic={pub.pic}
                      day={pub.day}
                      address={pub.address}
                      area={pub.area}
                      id={pub.id}
                      variant="small"
                    />
                  </div>
                ))}
              </aside>
            </div>
          ) : (
            <></>
          )}
        </div>
      </section>
    </div>
  );
}
