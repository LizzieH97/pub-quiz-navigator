"use client";
import Carousel from "@/components/Carousel";
import OnePubMap from "@/components/OnePubMap";
import ReadOnlyRating from "@/components/ReadOnlyRating";
import { useAllPubs } from "@/hooks/useAllPubs";
import { useOnePub } from "@/hooks/useOnePub";
import { useParams } from "next/navigation";

export default function OnePub() {
  const params = useParams();
  const id = Number(params.slug);
  const { allPubs, loading, error } = useAllPubs();
  const { onePub, err } = useOnePub(id);
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
      <section className="grid grid-cols-6 grid-rows-6 min-h-screen">
        <div className="relative col-start-1 col-end-3 row-start-1 row-end-5 m-10">
          <img
            src={onePub.pic}
            alt={onePub.name}
            className="absolute inset-0 w-96 h-80 object-cover opacity-90 z-0 border-8 border-teal"
          />

          <div className="relative z-10 bg-beige bg-opacity-70  p-2 mt-40 ml-2 flex flex-col justify-center w-60 h-24">
            <h1 className="text-4xl text-black">{onePub.name}</h1>
            <ReadOnlyRating rating={onePub.rating} size="lg" />
          </div>
        </div>
        <div className="text-2xl px-7 col-start-3 col-end-7 row-start-1 row-end-6 text-white mt-8 m-4 mx-8 pt-8 bg-black/30 border-8 border-teal ">
          <h1 className="text-4xl p-0 m-0">Details</h1>
          <ul className="text-xl  px-6 leading-10">
            <li className="list-disc">
              Description:{" "}
              <span className="text-2xl">
                [pubs can add their own descriptions here]
              </span>
            </li>
            <li className="list-disc">
              Area: <span className="text-2xl">{onePub.area}</span>
            </li>
            <li className="list-disc">
              Week day: <span className="text-2xl">{onePub.day}</span>
            </li>
            <li className="list-disc">
              Time: <span className="text-2xl">{onePub.time.slice(0, 5)}</span>{" "}
              <span className="text-base">
                (I can't guarantee this soz been burnt many times)
              </span>
            </li>
            <li className="list-disc">
              Map below ⤵{" "}
              <span className="text-base">
                (may be off by a few metres sorry)
              </span>
            </li>{" "}
          </ul>
          <OnePubMap pub={onePub} />
        </div>
      </section>
    </div>
  );
}
