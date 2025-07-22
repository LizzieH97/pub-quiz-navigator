"use client";
import { useUserProfile } from "@/hooks/useUserProfile";
import Link from "next/link";
import { useState } from "react";

export default function NavBar() {
  const { profile, signOut } = useUserProfile();
  const [isOpen, setIsOpen] = useState(false);
  const buttonStyling =
    "bg-bark h-16 w-28 text-lg text-cream rounded-xl border-4 border-teal flex items-center justify-center p-0 pl-1";

  return (
    <ul className="menu lg:menu-horizontal bg-beige w-full h-20 flex items-center content-center justify-around mt-3 sm:mt-1  rounded-3xl border-4 border-teal">
      <li>
        <Link href="/" className="sm:p-0">
          <img src="/logo.png" className="h-16 w-28 object-cover "></img>
        </Link>
      </li>

      <div
        className={`dropdown sm:block lg:hidden ${
          isOpen ? "dropdown-open" : ""
        }`}
      >
        <label
          onClick={() => setIsOpen(!isOpen)}
          className="btn bg-bark text-cream border-4 border-teal m-1"
        >
          Menu
        </label>
        <ul className="dropdown-content menu p-2 z-50 shadow bg-beige border-4 border-teal rounded-box w-52">
          <li>
            <Link href="/today" onClick={() => setIsOpen(false)}>
              Quizzes on Today
            </Link>
          </li>
          <li>
            <Link href="/nearyou" onClick={() => setIsOpen(false)}>
              Quizzes near you
            </Link>
          </li>
          {profile ? (
            <>
              <li>
                <Link href="/account" onClick={() => setIsOpen(false)}>
                  Your Account
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    signOut();
                    setIsOpen(false);
                  }}
                >
                  Sign out
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/signup" onClick={() => setIsOpen(false)}>
                  Sign up!
                </Link>
              </li>
              <li>
                <Link href="/signin" onClick={() => setIsOpen(false)}>
                  Sign in
                </Link>
              </li>
              <li>
                <Link href="/pubsignup" onClick={() => setIsOpen(false)}>
                  Are you a pub? Sign up here!
                </Link>
              </li>
              <li>
                <Link href="/pubsignin" onClick={() => setIsOpen(false)}>
                  Sign your pub in here!
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>

      <li className="hidden lg:block">
        <Link href="/today" className={buttonStyling}>
          Quizzes on Today
        </Link>
      </li>
      <li className="hidden lg:block">
        <Link href="/nearyou" className={buttonStyling}>
          Quizzes near you
        </Link>
      </li>
      {profile ? (
        <>
          <li className="hidden lg:block">
            <Link href="/account" className={buttonStyling}>
              Your Account
            </Link>
          </li>
          <li className="hidden lg:block">
            <button onClick={signOut} className={buttonStyling}>
              Sign out
            </button>
          </li>
        </>
      ) : (
        <>
          <li className="hidden lg:block">
            <Link href="/signup" className={buttonStyling}>
              Sign up!
            </Link>
          </li>
          <li className="hidden lg:block">
            <Link href="/signin" className={buttonStyling}>
              Sign in
            </Link>
          </li>
          <li>
            <Link
              href="/pubsignup"
              onClick={() => setIsOpen(false)}
              className={buttonStyling}
            >
              Sign your pub up here
            </Link>
          </li>
          <li>
            <Link
              href="/pubsignin"
              onClick={() => setIsOpen(false)}
              className={buttonStyling}
            >
              Sign your pub in here
            </Link>
          </li>
        </>
      )}
    </ul>
  );
}
