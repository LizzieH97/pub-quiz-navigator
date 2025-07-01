import Link from "next/link";

export default function NavBar() {
  const buttonStyling =
    "bg-bark h-8 text-xl text-cream rounded-xl border-4 border-teal flex items-center justify-center";
  return (
    <ul className="menu menu-horizontal bg-beige w-full h-12 flex items-center content-center justify-around mt-3 rounded-3xl border-4 border-teal">
      <li className={buttonStyling}>
        <Link href="/today">Quizzes on Today</Link>
      </li>
      <li className={buttonStyling}>
        <a>Item 2</a>
      </li>
      <li className={buttonStyling}>
        <a>Item 3</a>
      </li>
    </ul>
  );
}
