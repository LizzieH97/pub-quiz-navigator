import { supabase } from "@/lib/supabase";
import ReadOnlyRating from "./ReadOnlyRating";
import Link from "next/link";
import { useEffect, useState } from "react";
import LikeShow from "./LikeShow";

type PubProps = {
  name: string;
  pic: string;
  day: string;
  address: string;
  area: string;

  id: number;
  variant?: "small" | "large";
};

export default function PubCard({
  name,
  pic,
  day,
  address,
  area,

  id,
  variant = "large",
}: PubProps) {
  const isSmall = variant === "small";
  const [averageRating, setAverageRating] = useState<number | null>(null);

  useEffect(() => {
    const fetchRating = async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select("rating")
        .eq("pub_id", id); // 👈 filter by this pub's id

      if (error) {
        console.error("Failed to fetch ratings:", error);
        return;
      }

      if (data && data.length > 0) {
        const total = data.reduce((sum, r) => sum + r.rating, 0);
        setAverageRating(total / data.length);
      } else {
        setAverageRating(null); // No reviews yet
      }
    };

    fetchRating();
  }, [id]);

  switch (day) {
    case "mon":
      day = "Monday";
      break;
    case "tue":
      day = "Tuesday";
      break;
    case "wed":
      day = "Wednesday";
      break;
    case "thu":
      day = "Thursday";
      break;
    case "fri":
      day = "Friday";
      break;
    case "sat":
      day = "Saturday";
      break;
    case "sun":
      day = "Sunday";
      break;
  }
  let rating = averageRating;
  const addressLine = address.split(",");
  if (!averageRating || rating == null) {
    rating = 0;
  }
  return (
    <div
      className={`relative group cursor-pointer overflow-hidden duration-500  bg-teal text-black px-3 py-1 mr-3 border-4 border-beige rounded-3xl ${
        isSmall ? "w-60 h-32" : "w-64 h-80"
      }`}
    >
      {" "}
      <Link href={`/pub/${id}`}>
        <div
          className={`relative group cursor-pointer overflow-hidden duration-500 bg-teal text-black   rounded-3xl ${
            isSmall ? "w-60 h-32 mr-4" : "w-64 h-80"
          }`}
        >
          <div
            className={`absolute hover:scale-110 duration-500 ${
              isSmall ? "w-full h-full mr-5" : "w-72 h-60"
            } `}
          >
            <img
              src={pic}
              className={`object-cover absolute hover:scale-110 duration-500 ${
                isSmall ? "w-full h-full mr-5" : "w-60 h-80"
              } rounded-3xl`}
            />
          </div>
          <div
            className={`absolute  w-full p-0 duration-500 
        ${
          isSmall
            ? "inset-0  flex flex-col items-start justify-start bg-black/40 "
            : "-bottom-8 group-hover:-translate-y-12 group-hover:bg-cream/70"
        } rounded-3xl`}
          >
            <div className="absolute top-0 right-5 p-0 m-0">
              <LikeShow id={id} />
            </div>
            <div className="text-xl mt-5 font-bold text-bark bg-cream/70 p-1 leading-tight flex flex-col ">
              <span>{name}</span>
              <ReadOnlyRating rating={rating} size={isSmall ? "sm" : "lg"} />
              <div
                className={`${
                  isSmall ? "text-base" : "hidden"
                } flex flex-row items-center justify-start`}
              >
                Click for more info!
              </div>
            </div>
            <div className="p-2 ">
              <span
                className={`w-64 h-24 duration-500 opacity-0 text-bark  ${
                  isSmall ? "hidden" : "group-hover:opacity-100 "
                }`}
              >
                Day: {day}
                <br />
                Address: {addressLine[0]}
                <br />
                Click for more info!
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
