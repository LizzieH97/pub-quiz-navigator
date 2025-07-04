import { useUserProfile } from "@/hooks/useUserProfile";
import Link from "next/link";

export default function NavBar() {
  const { profile, signOut } = useUserProfile();
  const buttonStyling =
    "bg-bark h-8 text-xl text-cream rounded-xl border-4 border-teal flex items-center justify-center";
  return (
    <ul className="menu menu-horizontal bg-beige w-full h-20 flex items-center content-center justify-around mt-3 rounded-3xl border-4 border-teal">
      <li>
        <Link href="/">
          <img src="/logo.png" className="h-16 w-28 object-cover"></img>
        </Link>
      </li>
      <li className={buttonStyling}>
        <Link href="/today">Quizzes on Today</Link>
      </li>
      <li className={buttonStyling}>
        <Link href="nearyou">Quizzes near you</Link>
      </li>
      {profile ? (
        <>
          <li className={buttonStyling}>
            <Link href="/account">Your Account</Link>
          </li>
          <li className={buttonStyling}>
            <button onClick={signOut}>Sign out</button>
          </li>
        </>
      ) : (
        <>
          <li className={buttonStyling}>
            <Link href="/signup"> Sign up! </Link>
          </li>
          <li className={buttonStyling}>
            <Link href="signin">Sign in</Link>
          </li>
        </>
      )}
    </ul>
  );
}
