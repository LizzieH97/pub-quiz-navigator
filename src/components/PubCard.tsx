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
      className={`relative group cursor-pointer overflow-hidden duration-500  bg-beige text-black px-5 py-1 border-4 border-teal rounded-3xl ${
        isSmall ? "w-64 h-32" : "w-64 h-auto"
      }`}
    >
      {" "}
      <Link href={`/pub/${id}`}>
        <div className="bg-tomato">
          <div
            className={`hover:scale-110  bg-teal duration-500 ${
              isSmall ? "w-full h-24" : "w-48 h-60"
            }`}
          >
            <img
              src={pic}
              className={` object-cover ${
                isSmall ? "w-full h-24" : "w-48 h-60"
              }`}
            ></img>
          </div>
          <div className="absolute w-56 left-0 p-5 -bottom-16 duration-500 hover:-translate-y-12 hover:bg-cream/70">
            <div className="absolute -z-10 left-0 w-64 h-16 opacity-0 duration-500 hover:bg-cream/70"></div>
            <div className="text-xl font-bold text-bark bg-cream/70 p-0">
              {name}
              <div></div>
              <ReadOnlyRating rating={rating} size={isSmall ? "sm" : "lg"} />
            </div>
            <span className="hover:opacity-100 w-64 h-24 duration-500 opacity-0 text-bark p-0">
              Day: {day}
              <br />
              Address: {addressLine[0]}
              <br />
              Click for more info!
            </span>{" "}
          </div>{" "}
        </div>
      </Link>
    </div>
  );
}
