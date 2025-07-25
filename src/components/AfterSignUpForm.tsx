import { useEffect, useState } from "react";

import { updateProfile, updatePub } from "../lib/api";
import { supabase } from "../lib/supabase";
import { uploadAvatar } from "../lib/api";

type UpdateProps = {
  title?: "start" | "update";
  pub?: true | false;
};
export default function AfterSignUpForm({
  title = "start",
  pub = false,
}: UpdateProps) {
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [username, setUserName] = useState("");
  const [full_name, setFull_Name] = useState("");
  const [bio, setBio] = useState("");
  const [avatar_url, setAvatar_url] = useState<File | null>(null);
  const isStart = title === "start";
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setUserId(user.id);
      } else {
        setError("Not logged in.");
      }
    };

    getUser();
  }, []);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    const result = avatar_url
      ? await uploadAvatar(userId, avatar_url)
      : { success: true, url: null };

    if (!result.success) {
      setError("Failed to upload avatar.");
      return;
    }

    if (!userId) {
      setError("No user ID found.");
      return;
    }

    // Always update profile
    const profileUpdate = await updateProfile(userId, {
      username,
      full_name,
      bio,
      avatar_url: result.url,
    });

    if (!profileUpdate.success) {
      setError(profileUpdate.error?.message || "Failed to update profile.");
      return;
    }

    if (pub) {
      const pubUpdate = await updatePub(userId, {
        bio,
        avatar_url: result.url,
        name: full_name,
      });

      if (!pubUpdate.success) {
        setError(pubUpdate.error?.message || "Failed to update pub info.");
        return;
      }
    }

    setSuccess(true);
    setError("");
  };

  return (
    <div className="relative w-full max-w-md md:max-w-lg lg:max-w-xl flex items-center justify-center">
      <img
        src="/blackboard.png"
        alt="background"
        className="absolute inset-0 w-full h-full object-cover opacity-30 rounded-3xl"
      />

      <div className="relative z-10 bg-black bg-opacity-40 rounded-3xl shadow p-6">
        <form className="text-cream w-full" onSubmit={handleSubmit}>
          <fieldset className="border-4 border-teal p-6 space-y-4">
            <legend className="px-2 font-bold text-lg md:text-xl mx-24 bg-teal border-beige border-4 rounded-3xl text-black">
              {isStart
                ? "Just need a few more details:"
                : "Let's update your profile!"}
            </legend>
            {pub ? (
              <></>
            ) : (
              <input
                className="w-full bg-beige p-3 text-base md:text-lg rounded-3xl border-teal border-4 text-teal placeholder-bark "
                placeholder="Username"
                onChange={(e) => setUserName(e.target.value)}
              />
            )}
            <input
              className="w-full bg-beige p-3 text-base md:text-lg rounded-3xl border-teal border-4 text-teal placeholder-bark "
              placeholder="Name"
              onChange={(e) => setFull_Name(e.target.value)}
            />
            <textarea
              className="w-full bg-beige p-3 text-base md:text-lg rounded-3xl border-teal border-4 text-teal placeholder-bark"
              placeholder="Tell us about you!"
              onChange={(e) => setBio(e.target.value)}
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setAvatar_url(e.target.files[0]);
                }
              }}
            />
            <button
              className="w-full rounded bg-bark text-cream p-3 border-teal border-4 rounded-3xl text-base md:text-lg font-bold hover:bg-bark"
              type="submit"
            >
              Let's go!
            </button>{" "}
            {success && (
              <p className="flex text-green-400 font-bold">
                Yay! You're all sorted 🎉
              </p>
            )}
          </fieldset>
        </form>
      </div>
    </div>
  );
}
