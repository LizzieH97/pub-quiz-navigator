"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function UpdatePasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function handleRecovery() {
      const hash = window.location.hash;

      if (hash) {
        const params = new URLSearchParams(hash.substring(1));
        const access_token = params.get("access_token");
        const refresh_token = params.get("refresh_token");

        if (access_token && refresh_token) {
          const { error } = await supabase.auth.setSession({
            access_token,
            refresh_token,
          });

          if (error) {
            console.error("Error setting session:", error.message);
          } else {
            console.log("Session set manually from URL fragment");

            window.history.replaceState(null, "", window.location.pathname);
          }
        }
      }
    }

    handleRecovery();

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth event:", event);
      }
    );

    return () => subscription.subscription.unsubscribe();
  }, []);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newPassword || newPassword.length < 6) {
      alert("Please enter a password of at least 6 characters.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    setLoading(false);

    if (error) {
      console.error(error);
      alert("Error updating password: " + error.message);
    } else {
      alert("Password updated! You can now sign in.");
      router.push("/");
    }
  };

  return (
    <div className="relative w-full max-w-md md:max-w-lg lg:max-w-xl flex items-center justify-center  min-h-screen pb-2 sm:p-1 font-[family-name:var(--font-schoolbell)] bg-bark">
      <img
        src="/blackboard.png"
        alt="background"
        className="absolute inset-0 w-full h-full object-cover opacity-30 rounded-3xl"
      />
      <div className="relative z-10 bg-black bg-opacity-40 rounded-3xl shadow p-6 w-full">
        <form onSubmit={handleUpdatePassword} className="text-cream w-full">
          <fieldset className="border-4 border-teal p-6 space-y-4">
            <legend className="px-2 font-bold text-lg md:text-xl mx-6 bg-teal border-beige border-4 rounded-3xl text-black">
              Set your new password 🔒
            </legend>

            <input
              className="w-full bg-beige p-3 text-base text-teal md:text-lg rounded-3xl border-teal placeholder-bark border-4"
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              minLength={6}
              required
              autoFocus
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded bg-bark text-cream p-3 border-teal border-4 rounded-3xl text-base md:text-lg font-bold hover:bg-bark disabled:opacity-60"
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
