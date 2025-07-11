import { fetchReviewsByPubId } from "@/lib/api";
import { useEffect, useState } from "react";
import ReadOnlyRating from "./ReadOnlyRating";

type ReviewProps = {
  pubId: number;
};
export default function Reviews({ pubId }: ReviewProps) {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const data = await fetchReviewsByPubId(pubId);
        setReviews(data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, [pubId]);

  return (
    <div className="relative w-full max-w-md md:max-w-lg lg:max-w-xl grid grid-cols-1 md:grid-cols-2 gap-4 m-3">
      {reviews.map((entry, index) => {
        let createdAt = entry.created_at;
        let slicedCreatedAt = createdAt.slice(0, 10);

        return (
          <div
            className="relative w-full rounded-3xl overflow-hidden"
            key={index}
          >
            <img
              src="/blackboard.png"
              alt="background"
              className="absolute inset-0 w-full h-full object-cover opacity-30"
            />

            <div className="absolute inset-0 bg-black bg-opacity-40" />

            <div className="relative z-10 flex flex-col items-center justify-center w-full p-4">
              <div className="w-11/12 md:w-5/6 flex flex-col items-center">
                <p className="w-full bg-teal p-2 text-lg text-center text-beige rounded-3xl border-beige border-8 mb-4">
                  {entry.name} | {slicedCreatedAt}
                </p>

                <div className="w-full bg-teal rounded-3xl p-4 flex flex-col items-center gap-4">
                  <div className="w-5/6 bg-beige p-2 rounded-3xl">
                    <ReadOnlyRating rating={entry.rating} />
                  </div>

                  <div className="w-11/12 bg-beige p-2 text-base text-bark md:text-lg rounded-3xl">
                    {entry.message}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
