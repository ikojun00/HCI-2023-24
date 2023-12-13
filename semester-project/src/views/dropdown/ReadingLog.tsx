import Link from "next/link";

const dropdownMenu = [
  { title: "Progress Tracker", path: "#" },
  { title: "Challenges", path: "#" },
];
export default function ReadingLog() {
  return (
    <div className="z-10 relative bg-slate-800 rounded-lg md:pr-16 md:absolute md:border-2 md:mt-2">
      <ul className="py-2 text-sm">
        {dropdownMenu.map((item) => (
          <li>
            <Link href={item.path} className="block px-4 py-2 hover:underline">
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
