import NavbarItem from "../types/interfaces/NavbarItem";

export const NavbarItems:NavbarItem[] = [
    {
        route: "/community",
        label: "Community",
        isDropdown: true
    },
    {
        route: "/",
        label: "Discover",
        isDropdown: true
    },
    {
        route: "/about",
        label: "About",
        isDropdown: false
    },
    {
        route: "/signin",
        label: "Signin",
        isDropdown: false
    },
]