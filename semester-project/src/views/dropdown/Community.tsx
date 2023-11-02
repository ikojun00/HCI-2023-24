import Link from "next/link";

export default function Community() {
  return (
    <div className="z-10 relative bg-white rounded-lg md:pr-16 md:absolute md:border-2 md:mt-2">
      <ul className="py-2 text-sm">
        <li>
          <Link href="#" className="block px-4 py-2 hover:underline">
            Discussions And Activities
          </Link>
        </li>
        <li>
          <Link href="#" className="block px-4 py-2 hover:underline">
            Book Club
          </Link>
        </li>
        <li>
          <Link href="#" className="block px-4 py-2 hover:underline">
            Book Swap And Trade
          </Link>
        </li>
        <li>
          <Link href="#" className="block px-4 py-2 hover:underline">
            Literary Events
          </Link>
        </li>
        <li>
          <Link href="#" className="block px-4 py-2 hover:underline">
            Bookstore and Library Locator
          </Link>
        </li>
      </ul>
    </div>
  );
}
