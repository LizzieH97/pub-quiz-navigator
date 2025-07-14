"use client";
import { useUserProfile } from "@/hooks/useUserProfile";
import Link from "next/link";

export default function NavBar() {
  const { profile, signOut } = useUserProfile();
  const buttonStyling =
    "bg-bark h-16 w-24 text-lg text-cream rounded-xl border-4 border-teal flex items-center justify-center p-0";
  return (
    <ul className="menu menu-horizontal bg-beige w-full h-20 flex items-center content-center justify-around mt-3 rounded-3xl border-4 border-teal">
      <li>
        <Link href="/">
          <img src="/logo.png" className="h-16 w-28 object-cover"></img>
        </Link>
      </li>
      <li className={buttonStyling}>
        <Link href="/today" className="p-2 m-0">
          Quizzes on Today
        </Link>
      </li>
      <li className={buttonStyling}>
        <Link href="nearyou" className="p-2 m-0">
          Quizzes near you
        </Link>
      </li>
      {profile ? (
        <>
          <li className={buttonStyling}>
            <Link href="/account" className="p-2 m-0">
              <div className="relative ">
                <img
                  src={profile.avatar_url || "/background.png"}
                  className="absolute inset-0 w-full h-full object-cover opacity-80 z-0"
                  alt="background"
                />

                <div className="relative bg-bark/40 w-full h-full flex items-center justify-center rounded-2xl z-10">
                  Your Account
                </div>
              </div>
            </Link>
          </li>
          <li className={buttonStyling}>
            <button onClick={signOut} className="p-2 m-0">
              Sign out
            </button>
          </li>
        </>
      ) : (
        <>
          <li className={buttonStyling}>
            <Link href="/signup" className="p-2 m-0">
              {" "}
              Sign up!{" "}
            </Link>
          </li>
          <li className={buttonStyling}>
            <Link href="signin" className="p-2 m-0">
              Sign in
            </Link>
          </li>
        </>
      )}
    </ul>
  );
}
