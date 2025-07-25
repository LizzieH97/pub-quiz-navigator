"use client";
import { useUserProfile } from "@/hooks/useUserProfile";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function NavBar() {
  const { profile, signOut } = useUserProfile();
  const [isOpen, setIsOpen] = useState(false); // mobile
  const [isPubOpen, setIsPubOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const buttonStyling =
    "bg-bark h-14 w-28 text-lg text-cream rounded-xl border-4 border-teal flex items-center justify-center p-0 pl-1 text-center ";
  const contrastButtonStyling =
    "bg-beige h-14 w-28 text-lg text-bark rounded-xl border-4 border-teal flex items-center justify-center p-0 pl-1 text-center ";

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      setIsQuizOpen(false);
      setIsPubOpen(false);
      setIsAccountOpen(false);
    };

    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <ul className="menu lg:menu-horizontal bg-beige w-full lg:w-full h-16 flex items-start lg:content-start content-around justify-around my-0 sm:mt-2 p-0 rounded-3xl border-4 border-teal ">
      {/* MOBILE */}
      <button
        onClick={() => setIsDrawerOpen(true)}
        className="lg:hidden btn bg-bark text-cream border-4 border-teal w-16 h-4"
      >
        Menu
      </button>
      <li>
        <Link href="/" className="p-0  ">
          <img
            src="/logo.png"
            alt="logo"
            className="h-16 w-36 object-cover mr-10 lg:m-0"
          />
        </Link>
      </li>

      <div
        className={`dropdown sm:block lg:hidden ${
          isOpen ? "dropdown-open" : ""
        }`}
      >
        {isDrawerOpen && (
          <div className="fixed inset-0 z-50 flex w-32 -ml-4">
            <div
              className="flex-1 bg-black/50"
              onClick={() => setIsDrawerOpen(false)}
            ></div>

            <div className="w-64 bg-bark p-4 border-8 border-beige rounded-2xl flex flex-col space-y-2">
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="btn bg-beige text-bark border-4 border-teal  mb-4 w-16 h-8"
              >
                Close
              </button>
              <p className="text-base text-cream text-center">Quiz Info</p>
              <Link
                href="/today"
                onClick={() => setIsDrawerOpen(false)}
                className={contrastButtonStyling}
              >
                Quizzes Today
              </Link>
              <Link
                href="/nearyou"
                onClick={() => setIsDrawerOpen(false)}
                className={contrastButtonStyling}
              >
                Near You
              </Link>
              <Link
                href="/sortbyday"
                onClick={() => setIsDrawerOpen(false)}
                className={contrastButtonStyling}
              >
                Sort Pubs by Day
              </Link>
              <p className="text-base text-cream text-center">Account info</p>
              {profile ? (
                <>
                  <Link
                    href="/account"
                    onClick={() => setIsDrawerOpen(false)}
                    className={contrastButtonStyling}
                  >
                    Your Account
                  </Link>
                  <button
                    onClick={() => {
                      signOut();
                      setIsDrawerOpen(false);
                    }}
                    className={contrastButtonStyling}
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/signup"
                    onClick={() => setIsDrawerOpen(false)}
                    className={contrastButtonStyling}
                  >
                    Sign up!
                  </Link>
                  <Link
                    href="/signin"
                    onClick={() => setIsDrawerOpen(false)}
                    className={contrastButtonStyling}
                  >
                    Sign in
                  </Link>
                  <div>
                    <p className="text-base text-cream text-center">
                      Are you a pub?
                    </p>
                    <Link
                      href="/pubsignup"
                      onClick={() => setIsDrawerOpen(false)}
                      className={contrastButtonStyling}
                    >
                      Pub Sign up
                    </Link>
                    <Link
                      href="/pubsignin"
                      onClick={() => setIsDrawerOpen(false)}
                      className={contrastButtonStyling}
                    >
                      Pub Sign in
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* DESKTOP */}
      <div
        className={`dropdown hidden lg:block ${
          isQuizOpen ? "dropdown-open" : ""
        }`}
      >
        <label
          onClick={(e) => {
            e.stopPropagation();
            setIsQuizOpen(!isQuizOpen);
          }}
          className={`btn ${buttonStyling} hidden lg:block pt-3 font-normal`}
        >
          Quiz Info
        </label>
        <ul className="dropdown-content menu p-2 z-50 shadow bg-beige border-4 border-teal rounded-box w-44">
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
          <li className="hidden lg:block">
            <Link href="/sortbyday" className={buttonStyling}>
              Sort Pubs by Day
            </Link>
          </li>
        </ul>
      </div>

      {profile ? (
        <div
          className={`dropdown hidden lg:block ${
            isAccountOpen ? "dropdown-open" : ""
          }`}
        >
          <label
            onClick={(e) => {
              e.stopPropagation();
              setIsAccountOpen(!isAccountOpen);
            }}
            className={`btn ${buttonStyling} hidden lg:block pt-3 font-normal`}
          >
            Account Info
          </label>
          <ul className="dropdown-content menu p-2 z-50 shadow bg-beige border-4 border-teal rounded-box w-44">
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
          </ul>
        </div>
      ) : (
        <>
          <div
            className={`dropdown hidden lg:block ${
              isAccountOpen ? "dropdown-open" : ""
            }`}
          >
            <label
              onClick={(e) => {
                e.stopPropagation();
                setIsAccountOpen(!isAccountOpen);
              }}
              className={`btn ${buttonStyling} hidden lg:block pt-3 font-normal`}
            >
              Account Info
            </label>
            <ul className="dropdown-content menu p-2 z-50 shadow bg-beige border-4 border-teal rounded-box w-44">
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
            </ul>
          </div>
          <div
            className={`dropdown hidden lg:block ${
              isPubOpen ? "dropdown-open" : ""
            }`}
          >
            <label
              onClick={(e) => {
                e.stopPropagation();
                setIsPubOpen(!isPubOpen);
              }}
              className={`btn ${buttonStyling} hidden lg:block font-normal`}
            >
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
