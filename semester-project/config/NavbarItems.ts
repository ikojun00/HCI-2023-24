import NavbarItem from "../types/interfaces/NavbarItem";

export const NavbarItems: NavbarItem[] = [
  {
    route: "/community",
    label: "Community",
    isDropdown: true,
  },
  {
    route: "/",
    label: "Discover",
    isDropdown: true,
  },
  {
    route: "/reading-log",
    label: "Reading Log",
    isDropdown: false,
  },
  {
    route: "/book-manager",
    label: "Book Manager",
    isDropdown: false,
  },
  {
    route: "/signin",
    label: "Signin",
    isDropdown: false,
  },
];
