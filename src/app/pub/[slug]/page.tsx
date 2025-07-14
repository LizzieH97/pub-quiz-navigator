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
    <div className="min-h-screen pb-2 sm:p-1 font-[family-name:var(--font-schoolbell)] bg-bark overflow-x-hidden">
      <Carousel pubs={allPubs} />
      <section className="grid lg:grid-cols-3 grid-flow-row min-h-screen sm:grid-cols-1 sm:auto-rows-6 sm:gap-y-8 overflow-x-hidden">
        <aside className="lg:col-start-1 lg:col-end-2 sm:col-auto sm:row-1 lg:mt-8 lg:ml-4 flex flex-col lg:items-around lg:justify-between content-center sm:items-center sm:jusify-center min-h-screen sm:m-0 sm:p-0 ">
          <div className="relative m-3 ">
            <img
              src={onePub.pic}
              alt={onePub.name}
              className="absolute inset-0 w-3/4 h-full object-cover max-w-full opacity-90 z-0 border-8 border-teal lg:w-full lg:h-90"
            />

            <div className="relative z-10 bg-beige bg-opacity-70  p-2 mt-20 ml-2 flex flex-col justify-center w-60 h-24">
              <h1 className="text-4xl text-black">{onePub.name}</h1>
              <ReadOnlyRating rating={onePub.rating} size="lg" />
            </div>
          </div>
          <div className="lg:col-start-1 lg:col-end-2 sm:col-auto sm:row-start-2 sm:row-end-3 mt-10 lg:mt-32  ml-3 w-3/4 h-full lg:w-full ">
            <OnePubMap pub={onePub} />
          </div>
        </aside>
        <aside className="lg:col-start-2 lg:col-end-4 sm:col-auto sm:row-3 flex flex-col lg:items-center lg:justify-between sm:justify-center sm:items-start min-h-screen lg:p-3">
          <div className="text-2xl sm:text-xl px-7 text-white mt-8 m-4 lg:mx-4 p-4 bg-black/30 border-8 border-teal overflow-hidden w-3/4 lg:w-full">
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
          <div className="flex flex-col items-center content-center justify-center w-3/4 lg:w-full ml-2 lg:ml-0">
            <Reviews pubId={pubId} />
            <CreateReviewForm />
          </div>
        </aside>
      </section>
    </div>
  );
}
