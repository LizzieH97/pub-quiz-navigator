import { useState } from "react";
import { signUpUser } from "../lib/api";

import { supabase } from "../lib/supabase";
import Link from "next/link";
import { useRouter } from "next/navigation";
type SignupFormProps = {
  onSuccess: () => void;
};
export default function SignupForm({ onSuccess }: SignupFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      setError("Passwords do not match.");
      return;
    }

    const result = await signUpUser(email, password);

    if (result.success && result.user) {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (!session) {
        setError("User session not ready yet, please try again.");
        return;
      }

      const { error: profileError } = await supabase
        .from("quiz-enjoyer")
        .insert({
          id: result.user.id,
          username: "",
          full_name: "",
          bio: "",
          avatar_url: "",
        });

      if (profileError) {
        setError("Failed to create profile: " + profileError.message);
        return;
      }

      setSuccess(true);
      setError("");
      onSuccess(); // 👈 Notify parent to show the next form
    } else {
      setError(result.error?.message || "Sign up failed");
    }
  };
  return (
    <div className="relative w-full max-w-md md:max-w-lg lg:max-w-xl flex items-center justify-center">
      <img
        src="/blackboard.png"
        alt="background"
        className="absolute inset-0 w-full h-full object-cover opacity-30 rounded-3xl"
      />
      <div className="relative z-10 bg-black bg-opacity-40 rounded-3xl shadow p-6">
        <form onSubmit={handleSubmit} className="text-cream w-full">
          <fieldset className="border-4 border-teal p-6 space-y-4">
            <legend className="px-2 font-bold text-lg md:text-xl mx-6 bg-teal border-beige border-4 rounded-3xl text-black">
              Welcome! Glad to have you 🥰 Sign up below ⬇
            </legend>
            <input
              className="w-full bg-beige p-3 text-base text-teal md:text-lg rounded-3xl border-teal placeholder-bark border-4"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              className="w-full bg-beige p-3 text-base text-teal md:text-lg rounded-3xl border-teal placeholder-bark border-4"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              className="w-full bg-beige p-3 text-base text-teal md:text-lg rounded-3xl border-4 border-teal placeholder-bark focus:outline-none"
              type="password"
              placeholder="Repeat Password"
              onChange={(e) => setRepeatPassword(e.target.value)}
            />

            <button
              type="submit"
              className="w-full rounded bg-bark text-cream p-3 border-teal border-4 rounded-3xl text-base md:text-lg font-bold hover:bg-bark"
            >
              Create Account
            </button>
            <Link
              href="/signin"
              className="block text-center text-s text-teak font-bold mb-2 bg-beige border-teal border-4 rounded-3xl"
            >
              Already have an account? Log in here!
            </Link>
            {error && <p className="text-red-400">{error}</p>}
            {success && (
              <p className="text-green-400">Signed up successfully!</p>
            )}
          </fieldset>{" "}
        </form>
      </div>
    </div>
  );
}
