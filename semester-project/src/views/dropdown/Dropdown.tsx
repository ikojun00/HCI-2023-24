import Link from "next/link";
import DropdownItem from "../../../types/interfaces/DropdownItem";

interface DropdownProps {
  dropdownItems: DropdownItem[];
  isOpen: boolean;
  toggleHamburgerMenu: () => void;
}

export default function Dropdown({
  dropdownItems,
  isOpen,
  toggleHamburgerMenu,
}: DropdownProps) {
  return (
    <div className="z-10 relative bg-bv-blue rounded-lg md:pr-12 md:absolute md:border-2 md:mt-2 w-48">
      <ul className="py-2 text-sm">
        {dropdownItems.map((item) => (
          <li key={item.title}>
            <Link
              href={item.path}
              className="block px-4 py-2 hover:ml-2 hover:text-bv-purple transition-all ease-in duration-200"
              onClick={() => isOpen && toggleHamburgerMenu()}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
