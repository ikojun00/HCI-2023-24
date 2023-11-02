import Link from "next/link";

export default function Discover() {
  return (
    <div className="z-10 relative bg-white rounded-lg md:pr-16 md:absolute md:border-2 md:mt-2">
      <ul className="py-2 text-sm">
        <li>
          <Link href="#" className="block px-4 py-2 hover:underline">
            Recommendations
          </Link>
        </li>
        <li>
          <Link href="#" className="block px-4 py-2 hover:underline">
            Book Discovery
          </Link>
        </li>
        <li>
          <Link href="#" className="block px-4 py-2 hover:underline">
            Author Spotlight
          </Link>
        </li>
        <li>
          <Link href="#" className="block px-4 py-2 hover:underline">
            Quotes
          </Link>
        </li>
        <li>
          <Link href="#" className="block px-4 py-2 hover:underline">
            Wanderlust
          </Link>
        </li>
        <li>
          <Link href="#" className="block px-4 py-2 hover:underline">
            Genre Exploration
          </Link>
        </li>
        <li>
          <Link href="#" className="block px-4 py-2 hover:underline">
            Book Adaptations
          </Link>
        </li>
      </ul>
    </div>
  );
}
