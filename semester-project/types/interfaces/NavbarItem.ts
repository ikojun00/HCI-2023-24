import DropdownItem from "./DropdownItem";

export default interface NavbarItem {
  title: string;
  path: string;
  dropdowns: DropdownItem[];
}
