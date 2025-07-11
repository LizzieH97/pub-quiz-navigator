import { useUserProfile } from "@/hooks/useUserProfile";
import { uploadReview } from "@/lib/api";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function CreateReviewForm() {
  const params = useParams();
  const pubId = Number(params.slug);
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { profile } = useUserProfile();
  const name = profile?.full_name || null;

  const onMessageChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRating(parseInt(event.target.value));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!profile) {
      setError("You need to sign in to leave a review!");
      return;
    }
    if (!name || !message || rating === 0) {
      setError("All fields including a rating are required.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await uploadReview(profile.id, name, message, rating, pubId);

      setMessage("");
      setRating(0);
    } catch (err) {
      setError("Error submitting review.");
      console.error("Error posting review:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative w-full max-w-md md:max-w-lg lg:max-w-xl flex items-center justify-center m-3">
      <img
        src="/blackboard.png"
        alt="background"
        className="absolute inset-0 w-full h-full object-cover opacity-30 rounded-3xl"
      />
      <div className="relative z-10 bg-black bg-opacity-40 rounded-3xl shadow p-6 w-full">
        <form className="w-full" onSubmit={handleSubmit}>
          <legend className="px-2  text-lg  text-center mx-6 bg-teal border-beige border-8 rounded-3xl text-beige">
            Drop your review below ⤵
          </legend>

          <div className="w-full bg-beige p-3 my-2 text-base text-bark md:text-lg rounded-3xl border-teal  border-4">
            {" "}
            {name
              ? `Name: ${name}`
              : "You must be signed in to leave a review!"}
          </div>

          <textarea
            className="w-full bg-beige p-3 my-2 text-base text-teal md:text-lg rounded-3xl border-teal placeholder-bark border-4"
            placeholder="Review"
            value={message}
            onChange={onMessageChange}
            disabled={isSubmitting}
          />
          <div className="flex flex-row items-center justify-between">
            <div className="rating rating-lg my-4">
              {[1, 2, 3, 4, 5].map((value) => (
                <input
                  key={value}
                  type="radio"
                  name="rating-10"
                  className="mask mask-star-2 bg-teal"
                  aria-label={`${value} star`}
                  value={value}
                  checked={rating === value}
                  onChange={handleRatingChange}
                  disabled={isSubmitting}
                />
              ))}
            </div>
            <div className="w-64 bg-beige p-3 my-2 text-base text-bark md:text-lg rounded-3xl border-teal  border-4">
              Don't forget to leave a rating! Click on the stars here ↩
            </div>
          </div>

          {error && <p className="text-red-400 font-bold">{error}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded bg-bark text-cream p-3 border-teal border-4 rounded-3xl text-base md:text-lg font-bold hover:bg-bark"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
