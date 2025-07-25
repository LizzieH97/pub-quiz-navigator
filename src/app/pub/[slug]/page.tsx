"use client";
import Carousel from "@/components/Carousel";
import CreateReviewForm from "@/components/CreateReview";
import FavToggle from "@/components/FavToggle";
import OnePubMap from "@/components/OnePubMap";
import CreatePubPostForm from "@/components/PubPost";
import ReadOnlyRating from "@/components/ReadOnlyRating";
import Reviews from "@/components/Reviews";
import { useAllPubs } from "@/hooks/useAllPubs";
import { useAuth } from "@/hooks/useAuth";
import { useOnePub } from "@/hooks/useOnePub";
import { usePubProfile } from "@/hooks/usePubUser";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useParams } from "next/navigation";

export default function OnePub() {
  const params = useParams();
  const pubId = Number(params.slug);

  const { allPubs } = useAllPubs();
  const { onePub, loading } = useOnePub(pubId);
  const { user } = useAuth();
  const { profile } = useUserProfile();
  const { pubProfile, loading: pubProfileLoading } = usePubProfile(user?.id);

  if (loading || !onePub) return <p>Loading pub...</p>;

  const ownerId = onePub.id; // pub's id
  const isOwner = pubProfile?.pub_id === ownerId;

  const description = onePub.pub_user?.bio || onePub.description || "No info";
  console.log("user.id:", user?.id);
  console.log("user.pub_id:", user?.pub_id);
  console.log("onePub.id:", onePub.id);
  console.log("onePub.pub_user?.id:", onePub.pub_user?.id);
  switch (onePub.day) {
    case "mon":
      onePub.day = "Monday";
      break;
    case "tue":
      onePub.day = "Tuesday";
      break;
    case "wed":
      onePub.day = "Wednesday";
      break;
    case "thu":
      onePub.day = "Thursday";
      break;
    case "fri":
      onePub.day = "Friday";
      break;
    case "sat":
      onePub.day = "Saturday";
      break;
    case "sun":
      onePub.day = "Sunday";
      break;
  }
  console.log(profile);
  return (
    <div className="min-h-screen pb-2 sm:p-1 font-[family-name:var(--font-schoolbell)] bg-bark overflow-x-hidden">
      <Carousel pubs={allPubs} />
      <section className="bg-teal border-4 border-beige p-1 mt-1 ">
        {onePub.post ? (
          <div className="flex flex-row sm:flex-col items-center justify-around h-3/4">
            <p>{onePub.post}</p>
            {isOwner && <CreatePubPostForm />}
          </div>
        ) : isOwner ? (
          <div className="flex flex-row items-center justify-around">
            <p className="text-xl text-beige">
              You haven’t posted anything yet. Post any updates here ↪
            </p>
            <CreatePubPostForm />
          </div>
        ) : (
          <p className="text-beige text-xl text-center">
            No updates from this pub yet!
          </p>
        )}
      </section>

      <section className="grid lg:grid-cols-3 grid-flow-row min-h-screen sm:grid-cols-1 sm:auto-rows-6 sm:gap-y-8 overflow-x-hidden">
        <aside className="lg:col-start-1 lg:col-end-2 sm:col-auto sm:row-1 lg:mt-8 lg:ml-4 flex flex-col lg:items-around lg:justify-between content-center sm:items-center sm:jusify-center min-h-screen sm:m-0 sm:p-0 ">
          <div className="relative m-3 p-4 w-3/4 h-full">
            <img
              src={onePub.pic}
              alt={onePub.name}
              className="absolute inset-0 w-full h-full object-cover opacity-90 z-0 border-8 border-teal lg:w-full"
            />
            {profile ? (
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-beige bg-opacity-70 p-4 flex flex-row items-center content-around justify-around w-48 h-12">
                <FavToggle pubId={pubId} />
                <div className="w-16">Favourite this pub!</div>
              </div>
            ) : (
              <></>
            )}
            <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 bg-beige bg-opacity-70 p-4 flex flex-col items-center justify-center w-72">
              <h1 className="text-4xl text-black">{onePub.name}</h1>
              <ReadOnlyRating rating={onePub.rating} size="lg" />
            </div>
          </div>

          <div className="lg:col-start-1 lg:col-end-2 sm:col-auto sm:row-start-2 sm:row-end-3 mt-10 lg:mt-32  ml-3 w-3/4 h-full lg:w-full ">
            <OnePubMap pub={onePub} />
          </div>
        </aside>
        <aside className="lg:col-start-2 lg:col-end-4 sm:col-auto sm:row-3 flex flex-col lg:items-center lg:justify-between sm:justify-center sm:items-start min-h-screen lg:p-3">
          <div className="flex flex-col text-2xl  sm:text-xl pl-4 text-cream mt-8 m-4 lg:mx-4 p-2 bg-black/30 border-8 border-teal overflow-hidden w-3/4 lg:w-full h-full ">
            <h1 className="text-4xl p-0 ">Details</h1>
            <ul className="pt-2 text-lg pl-6 flex flex-col justify-between flex-1 ">
              {onePub.description ? (
                <li className="list-disc ">
                  <span className="text-2xl ">{onePub.bio}</span>
                </li>
              ) : (
                <></>
              )}
              <li className="list-disc ">
                Area: <span className="text-2xl">{onePub.area}</span>
              </li>
              <li className="list-disc ">
                Week day: <span className="text-2xl">{onePub.day}</span>
              </li>
              <li className="list-disc ">
                Time:{" "}
                <span className="text-2xl ">{onePub.time.slice(0, 5)}</span>{" "}
              </li>
              {onePub.cost ? (
                <li className="list-disc">
                  Cost: <span className="text-2xl">£{onePub.cost}</span>
                </li>
              ) : (
                <></>
              )}
              <li className="list-disc text-2xl">{onePub.extra_info}</li>
            </ul>
          </div>
          <div className="flex flex-col items-center content-center justify-center w-3/4 lg:w-full ml-2 lg:ml-0">
            <Reviews pubId={pubId} />
            <CreateReviewForm />
          </div>
        </aside>
      </section>
    </div>
  );
}
