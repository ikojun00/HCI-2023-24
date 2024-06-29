import Book from "@/components/icons/Book";
import Link from "next/link";
import FooterLinkList from "./FooterLinkList";

const linkGroups = [
  {
    title: "Discover",
    links: [
      { href: "/#", label: "User Dashboard" },
      { href: "/discover", label: "Search Books" },
      { href: "/genres", label: "Genre Exploration" },
    ],
  },

  {
    title: "Profile",
    links: [
      { href: "/profile", label: "About Me" },
      { href: "/profile", label: "Bookshelves" },
      { href: "/profile", label: "Reading Goal" },
    ],
  },
];

export default function Footer() {
  return (
    <div className="bg-black">
      <div className="flex flex-col max-w-screen-lg mx-auto px-2 sm:px-4 lg:px-6 mt-40 py-8">
        <div className="flex justify-around overflow-hidden">
          {linkGroups.map((group, index) => (
            <FooterLinkList
              key={index}
              title={group.title}
              links={group.links}
            />
          ))}
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
