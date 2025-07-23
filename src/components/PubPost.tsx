import { useUserProfile } from "@/hooks/useUserProfile";
import { updatePost } from "@/lib/api";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function CreatePubPostForm() {
  const params = useParams();
  const pubId = Number(params.slug);
  const [post, setPost] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { profile } = useUserProfile();
  const name = profile?.full_name || null;

  const onMessageChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPost(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!profile) {
      setError("You need to sign in to leave a review!");
      return;
    }
    if (!name || !post) {
      setError("Add your message please!!");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await updatePost(name, post, profile.id);

      setPost("");
    } catch (err) {
      setError("Error submitting review.");
      console.error("Error posting review:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative w-full lg:w-80 h-36 max-w-md md:max-w-lg lg:max-w-xl flex items-center justify-center m-3 rounded-3xl overflow-hidden">
      <img
        src="/blackboard.png"
        alt="background"
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      />
      <div className="relative z-10 bg-black bg-opacity-40 shadow p-2 w-80 h-36">
        <form
          className="lg:w-80 w-full flex flex-col items-center justify-center lg:block"
          onSubmit={handleSubmit}
        >
          <div className="w-11/12 bg-beige text-base text-bark text-center md:text-lg rounded-3xl border-teal border-2 h-8 flex items-center px-2">
            {name
              ? `Name: ${name}`
              : "You must be signed in to leave a review!"}
          </div>

          <textarea
            className="w-11/12 bg-beige p-1 m-0 text-base text-teal md:text-lg rounded-3xl border-teal placeholder-bark border-2 h-12 "
            placeholder="Message"
            value={post}
            onChange={onMessageChange}
            disabled={isSubmitting}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-11/12 rounded-3xl bg-bark text-cream border-teal border-2 text-base md:text-lg font-bold hover:bg-bark h-8"
          >
            {isSubmitting ? "Posting..." : "Post!"}
          </button>
          {error && <p className="text-red-400 font-bold">{error}</p>}
        </form>
      </div>
    </div>
  );
}
