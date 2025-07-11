"use client";
import Carousel from "@/components/Carousel";
import CreateReviewForm from "@/components/CreateReview";
import OnePubMap from "@/components/OnePubMap";
import ReadOnlyRating from "@/components/ReadOnlyRating";
import Reviews from "@/components/Reviews";
import { useAllPubs } from "@/hooks/useAllPubs";
import { useOnePub } from "@/hooks/useOnePub";
import { useParams } from "next/navigation";

export default function OnePub() {
  const params = useParams();
  const pubId = Number(params.slug);
  const { allPubs, loading, error } = useAllPubs();
  const { onePub, err } = useOnePub(pubId);
  if (!onePub) return <p>Loading pub...</p>;

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
  return (
    <div className=" min-h-screen pb-2 sm:p-1 font-[family-name:var(--font-schoolbell)] bg-bark">
      <Carousel pubs={allPubs} />
      <section className="grid grid-cols-3 grid-flow-row min-h-screen">
        <aside className="col-start-1 col-end-2 mt-8 ml-4 flex flex-col items-around justify-between content-center min-h-screen">
          <div className="relative m-3 ">
            <img
              src={onePub.pic}
              alt={onePub.name}
              className="absolute inset-0  object-cover opacity-90 z-0 border-8 border-teal w-full h-90"
            />

            <div className="relative z-10 bg-beige bg-opacity-70  p-2 mt-20 ml-2 flex flex-col justify-center w-60 h-24">
              <h1 className="text-4xl text-black">{onePub.name}</h1>
              <ReadOnlyRating rating={onePub.rating} size="lg" />
            </div>
          </div>
          <div className="mt-32 ml-3 w-full h-full">
            <OnePubMap pub={onePub} />
          </div>
        </aside>
        <aside className="col-start-2 col-end-4 flex flex-col items-center justify-between min-h-screen p-3">
          <div className="text-2xl px-7 text-white mt-8 m-4 mx-4 p-4 bg-black/30 border-8 border-teal overflow-hidden ">
            <h1 className="text-4xl p-0 ">Details</h1>
            <ul className="text-xl  px-6 leading-10">
              <li className="list-disc mb-6">
                Description:{" "}
                <span className="text-2xl">
                  [pubs can add their own descriptions here]
                </span>
              </li>
              <li className="list-disc mb-6">
                Area: <span className="text-2xl">{onePub.area}</span>
              </li>
              <li className="list-disc mb-6">
                Week day: <span className="text-2xl">{onePub.day}</span>
              </li>
              <li className="list-disc mb-6">
                Time:{" "}
                <span className="text-2xl">{onePub.time.slice(0, 5)}</span>{" "}
                <span className="text-base ">
                  (I can't guarantee this soz been burnt many times)
                </span>
              </li>
            </ul>
          </div>
          <div className="flex flex-col items-center justify-center">
            <Reviews pubId={pubId} />
            <CreateReviewForm />
          </div>
        </aside>
      </section>
    </div>
  );
}
