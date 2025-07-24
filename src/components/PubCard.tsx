import { supabase } from "@/lib/supabase";
import ReadOnlyRating from "./ReadOnlyRating";
import Link from "next/link";
import { useEffect, useState } from "react";

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
      className={`relative group cursor-pointer overflow-hidden duration-500  bg-beige text-black px-3 py-1 mr-3 border-4 border-teal rounded-3xl ${
        isSmall ? "w-60 h-32" : "w-64 h-80"
      }`}
    >
      {" "}
      <Link href={`/pub/${id}`}>
        <div
          className={`relative group cursor-pointer overflow-hidden duration-500 bg-beige text-black mr-4  rounded-3xl ${
            isSmall ? "w-60 h-32" : "w-64 h-80"
          }`}
        >
          <div
            className={`absolute hover:scale-110 duration-500 ${
              isSmall ? "w-full h-full mr-5" : "w-48 h-60"
            } `}
          >
            <img
              src={pic}
              className={`object-cover absolute hover:scale-110 duration-500 ${
                isSmall ? "w-full h-full mr-5" : "w-48 h-60"
              } rounded-3xl`}
            />
          </div>
          <div
            className={`absolute  w-full p-0 duration-500 
        ${
          isSmall
            ? "inset-0 top-5 flex flex-col items-start justify-start bg-black/40 text-cream"
            : "-bottom-8 group-hover:-translate-y-12 group-hover:bg-cream/70"
        } rounded-3xl`}
          >
            <div className="text-xl font-bold text-bark bg-cream/70 p-1 leading-tight flex flex-col">
              <span>{name}</span>
              <ReadOnlyRating rating={rating} size={isSmall ? "sm" : "lg"} />
              <div className={`${isSmall ? "text-base" : "hidden"}`}>
                Click for more info!
              </div>
            </div>

            <span
              className={`w-64 h-24 duration-500 opacity-0 text-bark p-0 ${
                isSmall ? "hidden" : "group-hover:opacity-100"
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
      </Link>
    </div>
  );
}
