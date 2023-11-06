import Link from "next/link";

export default function ReadingLog() {
  return (
    <div className="z-10 relative bg-slate-800 rounded-lg md:pr-16 md:absolute md:border-2 md:mt-2">
      <ul className="py-2 text-sm">
        <li>
          <Link href="#" className="block px-4 py-2 hover:underline">
            Progress Tracker
          </Link>
        </li>
        <li>
          <Link href="#" className="block px-4 py-2 hover:underline">
            Challenges
          </Link>
        </li>
      </ul>
    </div>
  );
}
