import Link from "next/link";
import DropdownItem from "../../../types/interfaces/DropdownItem";

interface DropdownProps {
  dropdownItems: DropdownItem[];
}

export default function Dropdown({ dropdownItems }: DropdownProps) {
  return (
    <div className="z-10 relative bg-slate-800 rounded-lg md:pr-16 md:absolute md:border-2 md:mt-2">
      <ul className="py-2 text-sm">
        {dropdownItems.map((item) => (
          <li key={item.title}>
            <Link href={item.path} className="block px-4 py-2 hover:underline">
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
