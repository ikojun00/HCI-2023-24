import Link from "next/link";

export default function Footer() {
  return (
    <div className="flex flex-col gap-24 py-16">
      <div className="flex flex-col items-center sm:flex-wrap sm:flex-row sm:justify-between sm:items-start">
        <div className="flex flex-col gap-5 p-8">
          <h1 className="text-base sm:text-lg font-bold">Discover</h1>
          <ul>
            <li className="text-sm sm:text-base">
              <Link href="/">Recommendations</Link>
            </li>
            <li className="text-sm sm:text-base">
              <Link href="/">Book Discovery</Link>
            </li>
            <li className="text-sm sm:text-base">
              <Link href="/">Author Spotlight</Link>
            </li>
            <li className="text-sm sm:text-base">
              <Link href="/">Quotes</Link>
            </li>
            <li className="text-sm sm:text-base">
              <Link href="/">Wanderlust</Link>
            </li>
            <li className="text-sm sm:text-base">
              <Link href="/">Genre Exploration</Link>
            </li>
            <li className="text-sm sm:text-base">
              <Link href="/">Book Adaptations</Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-5 justify-center p-8">
          <h1 className="text-base sm:text-lg font-bold">Reading Log</h1>
          <ul>
            <li className="text-sm sm:text-base">
              <Link href="/">Progress Tracker</Link>
            </li>
            <li className="text-sm sm:text-base">
              <Link href="/">Challenges</Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-5 justify-center p-8">
          <h1 className="text-base sm:text-lg font-bold">Community</h1>
          <ul>
            <li className="text-sm sm:text-base">
              <Link href="/">Discussions And Activities</Link>
            </li>
            <li className="text-sm sm:text-base">
              <Link href="/">Book Club</Link>
            </li>
            <li className="text-sm sm:text-base">
              <Link href="/">Book Swap And Trade</Link>
            </li>
            <li className="text-sm sm:text-base">
              <Link href="/">Literary Events</Link>
            </li>
            <li className="text-sm sm:text-base">
              <Link href="/">Bookstore and Library Locator</Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-5 justify-center p-8">
          <h1 className="text-base sm:text-lg font-bold">Company</h1>
          <ul>
            <li className="text-sm sm:text-base">
              <Link href="/">About</Link>
            </li>
            <li className="text-sm sm:text-base">
              <Link href="/">Terms Of Services</Link>
            </li>
            <li className="text-sm sm:text-base">
              <Link href="/">Contact</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex justify-center">
          <Link href="/">
            <h1 className="text-base sm:text-lg font-bold">📖 BookVoyage</h1>
          </Link>
        </div>
        <div className="text-base sm:text-lg flex justify-center">
          &copy; 2023 BookVoyage. All rights reserved.
        </div>
      </div>
    </div>
  );
}
