import Book from "@/components/icons/Book";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="bg-black">
      <div className="flex flex-col max-w-screen-xl mx-auto px-2 sm:px-4 lg:px-6 mt-44 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 overflow-hidden">
          <div className="flex flex-col gap-5 p-6">
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
          <div className="flex flex-col gap-5 p-6">
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
          <div className="flex flex-col gap-5 p-6">
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
          <div className="flex flex-col gap-5 p-6">
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
        <div className="flex flex-col mt-16">
          <div className="flex justify-center">
            <Link href="/">
              <h1 className="flex flex-row items-center gap-1 text-base sm:text-md font-bold">
                <Book inNavBar={false} /> BookVoyage
              </h1>
            </Link>
          </div>
          <div className="text-xs sm:text-sm flex justify-center">
            &copy; 2023 BookVoyage. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
}
