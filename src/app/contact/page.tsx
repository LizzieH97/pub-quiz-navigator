"use client";
import Carousel from "@/components/Carousel";
import { useAllPubs } from "@/hooks/useAllPubs";
import { postContact } from "@/lib/api";
import { truncate } from "fs";
import { useState } from "react";
import { FaBullseye } from "react-icons/fa6";

export default function Contact() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { allPubs } = useAllPubs();
  const onMessageChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name || !message) {
      setError("Add your message please!!");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      await postContact(name, message, email);

      setMessage("");
      setName("");
      setEmail("");
    } catch (err) {
      setError("Error sending message!");
      console.error("Error sending message:", err);
    } finally {
      setIsSubmitting(false);
      setSuccess(true);
    }
  };

  return (
    <div className="min-h-screen bg-bark font-[family-name:var(--font-schoolbell)]">
      <Carousel pubs={allPubs} />
      <section className="flex items-center justify-center flex-col">
        <h1 className="text-5xl text-beige m-5">Let us know what you think!</h1>
        <p className="text-3xl text-beige m-10">
          Disclaimer: When you do get in touch I will just be replying from my
          gmail account (it's just me that has access to it the data won't go
          anywhere) so look out for the subject "PUB QUIZ NAV"
        </p>
        <div className="relative w-full max-w-md md:max-w-lg lg:max-w-xl flex items-center justify-center m-3">
          <img
            src="/blackboard.png"
            alt="background"
            className="absolute inset-0 w-full h-full object-cover opacity-30 rounded-3xl"
          />
          <div className="relative z-10 bg-black bg-opacity-40 rounded-3xl shadow p-6 w-full">
            <form className="w-full" onSubmit={handleSubmit}>
              <legend className="px-2  text-lg  text-center mx-6 bg-teal border-beige border-8 rounded-3xl text-beige">
                Get in touch below ⤵
              </legend>

              <input
                type="email"
                required
                className="w-full bg-beige p-3 my-2 text-base text-teal md:text-lg rounded-3xl border-teal placeholder-bark border-4"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
              />
              <input
                type="text"
                required
                className="w-full bg-beige p-3 my-2 text-base text-teal md:text-lg rounded-3xl border-teal placeholder-bark border-4"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isSubmitting}
              />

              <textarea
                className="w-full bg-beige p-3 my-2 text-base text-teal md:text-lg rounded-3xl border-teal placeholder-bark border-4"
                placeholder="Review"
                value={message}
                onChange={onMessageChange}
                disabled={isSubmitting}
              />

              {error && <p className="text-red-400 font-bold">{error}</p>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded bg-bark text-cream p-3 border-teal border-4 rounded-3xl text-base md:text-lg font-bold hover:bg-bark"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
              {success && (
                <p className="text-sm text-cream">Submitted successfully!</p>
              )}
            </form>
          </div>
        </div>
        );
      </section>
    </div>
  );
}
