import NavbarItem from "../types/interfaces/NavbarItem";

export const NavbarItems: NavbarItem[] = [
  {
    title: "Discover",
    path: "#",
    dropdowns: [
      { title: "Recommendations", path: "#" },
      { title: "Search Books", path: "/discover" },
      { title: "Author Spotlight", path: "#" },
      { title: "Quotes", path: "#" },
      { title: "Wanderlust", path: "#" },
      { title: "Book Adaptations", path: "#" },
    ],
  },
  {
    title: "Reading Log",
    path: "#",
    dropdowns: [
      { title: "Progress Tracker", path: "#" },
      { title: "Challenges", path: "#" },
    ],
  },
  {
    title: "Community",
    path: "#",
    dropdowns: [
      { title: "Discussions And Activities", path: "#" },
      { title: "Book Club", path: "#" },
      { title: "Book Swap And Trade", path: "#" },
      { title: "Literary Events", path: "#" },
      { title: "Bookstore and Library Locator", path: "#" },
    ],
  },
];
