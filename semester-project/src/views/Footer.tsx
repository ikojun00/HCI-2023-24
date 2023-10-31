import Link from "next/link";

export default function Footer() {
  return (
    <div className="flex flex-col gap-24 py-24">
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-5">
          <h1 className="font-bold">Discover</h1>
          <ul>
            <li>
              <Link href="/">Recommendations</Link>
            </li>
            <li>
              <Link href="/">Book Discovery</Link>
            </li>
            <li>
              <Link href="/">Author Spotlight</Link>
            </li>
            <li>
              <Link href="/">Quotes</Link>
            </li>
            <li>
              <Link href="/">Wanderlust</Link>
            </li>
            <li>
              <Link href="/">Genre Exploration</Link>
            </li>
            <li>
              <Link href="/">Book Adaptations</Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-5 justify-center">
          <h1 className="font-bold">Reading Log</h1>
          <ul>
            <li>
              <Link href="/">Progress Tracker</Link>
            </li>
            <li>
              <Link href="/">Challenges</Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-5 justify-center">
          <h1 className="font-bold">Community</h1>
          <ul>
            <li>
              <Link href="/">Discussions And Activities</Link>
            </li>
            <li>
              <Link href="/">Book Club</Link>
            </li>
            <li>
              <Link href="/">Book Swap And Trade</Link>
            </li>
            <li>
              <Link href="/">Literary Events</Link>
            </li>
            <li>
              <Link href="/">Bookstore and Library Locator</Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-5 justify-center">
          <h1 className="font-bold">Company</h1>
          <ul>
            <li>
              <Link href="/">About</Link>
            </li>
            <li>
              <Link href="/">Terms Of Services</Link>
            </li>
            <li>
              <Link href="/">Contact</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex justify-center">
          <Link href="/">
            <h1 className="text-lg font-bold">📖 BookVoyage</h1>
          </Link>
        </div>
        <div className="flex justify-center">
          &copy; 2023 BookVoyage. All rights reserved.
        </div>
      </div>
    </div>
  );
}
