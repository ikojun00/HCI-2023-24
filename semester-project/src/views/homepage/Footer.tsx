import Book from "@/components/icons/Book";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="flex flex-col gap-24 py-16">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 overflow-hidden">
        <div className="flex justify-center">
          <div className="flex flex-col gap-5 p-8">
            <h1 className="text-sm sm:text-base font-bold">Discover</h1>
            <ul>
              <li className="text-xs sm:text-sm">
                <Link href="/">Recommendations</Link>
              </li>
              <li className="text-xs sm:text-sm">
                <Link href="/">Book Discovery</Link>
              </li>
              <li className="text-xs sm:text-sm">
                <Link href="/">Author Spotlight</Link>
              </li>
              <li className="text-xs sm:text-sm">
                <Link href="/">Quotes</Link>
              </li>
              <li className="text-xs sm:text-sm">
                <Link href="/">Wanderlust</Link>
              </li>
              <li className="text-xs sm:text-sm">
                <Link href="/">Genre Exploration</Link>
              </li>
              <li className="text-xs sm:text-sm">
                <Link href="/">Book Adaptations</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="flex flex-col gap-5 p-8">
            <h1 className="text-sm sm:text-base font-bold">Reading Log</h1>
            <ul>
              <li className="text-xs sm:text-sm">
                <Link href="/">Progress Tracker</Link>
              </li>
              <li className="text-xs sm:text-sm">
                <Link href="/">Challenges</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="flex flex-col gap-5 p-8">
            <h1 className="text-sm sm:text-base font-bold">Community</h1>
            <ul>
              <li className="text-xs sm:text-sm">
                <Link href="/">Discussions And Activities</Link>
              </li>
              <li className="text-xs sm:text-sm">
                <Link href="/">Book Club</Link>
              </li>
              <li className="text-xs sm:text-sm">
                <Link href="/">Book Swap And Trade</Link>
              </li>
              <li className="text-xs sm:text-sm">
                <Link href="/">Literary Events</Link>
              </li>
              <li className="text-xs sm:text-sm">
                <Link href="/">Bookstore and Library Locator</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="flex flex-col gap-5 p-8">
            <h1 className="text-sm sm:text-base font-bold">Company</h1>
            <ul>
              <li className="text-xs sm:text-sm">
                <Link href="/">About</Link>
              </li>
              <li className="text-xs sm:text-sm">
                <Link href="/">Terms Of Services</Link>
              </li>
              <li className="text-xs sm:text-sm">
                <Link href="/">Contact</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex justify-center">
          <Link href="/">
            <h1 className="flex flex-row items-center gap-1 text-base sm:text-md font-bold">
              <Book /> BookVoyage
            </h1>
          </Link>
        </div>
        <div className="text-xs sm:text-sm flex justify-center">
          &copy; 2023 BookVoyage. All rights reserved.
        </div>
      </div>
    </div>
  );
}
