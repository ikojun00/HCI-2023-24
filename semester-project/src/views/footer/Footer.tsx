import Book from "@/components/icons/Book";
import Link from "next/link";
import FooterLinkList from "./FooterLinkList";

const linkGroups = [
  {
    title: "Discover",
    links: [
      { href: "/", label: "Recommendations" },
      { href: "/", label: "Book Discovery" },
      { href: "/", label: "Author Spotlight" },
      { href: "/", label: "Quotes" },
      { href: "/", label: "Wanderlust" },
      { href: "/", label: "Genre Exploration" },
      { href: "/", label: "Book Adaptations" },
    ],
  },
  {
    title: "Reading Log",
    links: [
      { href: "/", label: "Progress Tracker" },
      { href: "/", label: "Challenges" },
    ],
  },
  {
    title: "Community",
    links: [
      { href: "/", label: "Discussions And Activities" },
      { href: "/", label: "Book Club" },
      { href: "/", label: "Book Swap And Trade" },
      { href: "/", label: "Literary Events" },
      { href: "/", label: "Bookstore and Library Locator" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/", label: "About" },
      { href: "/", label: "Terms Of Services" },
      { href: "/", label: "Contact" },
    ],
  },
];

export default function Footer() {
  return (
    <div className="bg-black">
      <div className="flex flex-col max-w-screen-lg mx-auto px-2 sm:px-4 lg:px-6 mt-44 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 overflow-hidden">
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
