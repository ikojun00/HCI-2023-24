import Link from "next/link";

const dropdownMenu = [
  { title: "Recommendations", path: "#" },
  { title: "Search Books", path: "#" },
  { title: "Author Spotlight", path: "#" },
  { title: "Quotes", path: "#" },
  { title: "Wanderlust", path: "#" },
  { title: "Book Adaptations", path: "#" },
];

export default function Discover() {
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
