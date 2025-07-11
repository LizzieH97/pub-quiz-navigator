"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { useUserProfile } from "@/hooks/useUserProfile";

export default function SignInForm() {
  const router = useRouter();
  const { signIn, error, isAuthenticated, profile } = useUserProfile();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Email and password are required.");
      return;
    }

    try {
      await signIn(email, password);
      // ✅ guaranteed refresh
      window.location.href = "/";
    } catch (err) {
      console.error(err);
      alert("Sign in failed!");
    }
  };

  if (isAuthenticated && profile) {
    return (
      <div className=" flex flex-row items-center justify-around content-center m-5">
        <h1 className="text-cream text-5xl"> Hi, {profile.full_name}!</h1>
      </div>
    );
  }

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
              Welcome back! Sign in below ⤵
            </legend>

            <input
              className="w-full bg-beige p-3 text-base text-teal md:text-lg rounded-3xl border-teal placeholder-bark border-4"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              className="w-full bg-beige p-3 text-base text-teal md:text-lg rounded-3xl border-teal placeholder-bark border-4"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="submit"
              className="w-full rounded bg-bark text-cream p-3 border-teal border-4 rounded-3xl text-base md:text-lg font-bold hover:bg-bark"
            >
              Sign in!
            </button>

            <Link
              href="/signup"
              className="block text-center text-sm text-teak font-bold mt-2 bg-beige border-teal border-4 rounded-3xl"
            >
              No account? Sign up here!
            </Link>

            {error && <p className="text-red-400">{error}</p>}
          </fieldset>
        </form>
      </div>
    </div>
  );
}
