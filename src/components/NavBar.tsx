"use client";
import { useUserProfile } from "@/hooks/useUserProfile";
import Link from "next/link";
import { useState } from "react";

export default function NavBar() {
  const { profile, signOut } = useUserProfile();
  const [isOpen, setIsOpen] = useState(false);
  const [isPubOpen, setIsPubOpen] = useState(false);

  const buttonStyling =
    "bg-bark h-16 w-28 text-lg text-cream rounded-xl border-4 border-teal flex items-center justify-center p-0 pl-1";

  return (
    <ul className="menu lg:menu-horizontal bg-beige w-full h-20 flex items-center content-center justify-around mt-2 sm:mt-1 rounded-3xl border-4 border-teal">
      <li>
        <Link href="/" className="p-0 m-0">
          <img
            src="/logo.png"
            alt="logo"
            className="h-12 w-32 object-cover m-0 p-0 border-4 border-teal rounded-2xl"
          />
        </Link>
      </li>

      <div
        className={`dropdown sm:block lg:hidden ${
          isOpen ? "dropdown-open" : ""
        }`}
      >
        <label
          onClick={() => setIsOpen(!isOpen)}
          className="btn bg-bark text-cream border-4 border-teal m-1 cursor-pointer"
        >
          Menu
        </label>
        <ul className="dropdown-content menu p-2 z-50 shadow bg-beige border-4 border-teal rounded-box w-52">
          <li>
            <Link
              href="/today"
              onClick={() => setIsOpen(false)}
              className={buttonStyling}
            >
              Quizzes on Today
            </Link>
          </li>
          <li>
            <Link
              href="/nearyou"
              onClick={() => setIsOpen(false)}
              className={buttonStyling}
            >
              Quizzes near you
            </Link>
          </li>
          {profile ? (
            <>
              <li>
                <Link
                  href="/account"
                  onClick={() => setIsOpen(false)}
                  className={buttonStyling}
                >
                  Your Account
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    signOut();
                    setIsOpen(false);
                  }}
                  className={buttonStyling}
                >
                  Sign out
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  href="/signup"
                  onClick={() => setIsOpen(false)}
                  className={buttonStyling}
                >
                  Sign up!
                </Link>
              </li>
              <li>
                <Link
                  href="/signin"
                  onClick={() => setIsOpen(false)}
                  className={buttonStyling}
                >
                  Sign in
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>

      {!profile && (
        <div
          className={`dropdown sm:block lg:hidden ${
            isPubOpen ? "dropdown-open" : ""
          }`}
        >
          <label
            onClick={() => setIsPubOpen(!isPubOpen)}
            className="btn bg-bark text-cream border-4 border-teal m-1 cursor-pointer"
          >
            Are you a pub?
          </label>
          <ul className="dropdown-content menu p-2 z-50 shadow bg-beige border-4 border-teal rounded-box w-44">
            <li>
              <Link
                href="/pubsignup"
                onClick={() => setIsPubOpen(false)}
                className={`${buttonStyling} m-1 w-3/4`}
              >
                Sign your pub up!
              </Link>
            </li>
            <li>
              <Link
                href="/pubsignin"
                onClick={() => setIsPubOpen(false)}
                className={`${buttonStyling} m-1 w-3/4`}
              >
                Sign your pub in!
              </Link>
            </li>
          </ul>
        </div>
      )}

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
          <div className="dropdown hidden lg:block ">
            <label className="btn bg-bark text-cream border-4 border-teal m-1 p-3 cursor-pointer hidden lg:block">
              Are you a pub?
            </label>
            <ul className="dropdown-content menu p-2 z-50 shadow bg-beige border-4 border-teal rounded-box w-44">
              <li>
                <Link
                  href="/pubsignup"
                  className={`${buttonStyling} m-1 w-3/4`}
                >
                  Sign your pub up!
                </Link>
              </li>
              <li>
                <Link
                  href="/pubsignin"
                  className={`${buttonStyling} m-1 w-3/4`}
                >
                  Sign your pub in!
                </Link>
              </li>
            </ul>
          </div>
        </>
      )}
    </ul>
  );
}
