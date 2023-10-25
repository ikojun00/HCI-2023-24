import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface DropdownProps {
  heading: string;
}
export default function Dropdown({ heading }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {heading && (
        <h2
          className="text-l font-semibold hover:underline cursor-pointer"
          onClick={toggleDropdown}
        >
          {heading}
        </h2>
      )}

      {isOpen && (
        <div className="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow max-w-fit dark:bg-gray-700">
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover-bg-gray-100 dark:hover-bg-gray-600 dark:hover:text-white"
              >
                Settings
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover-bg-gray-100 dark:hover-bg-gray-600 dark:hover:text-white"
              >
                Earnings
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover-bg-gray-100 dark:hover-bg-gray-600 dark:hover:text-white"
              >
                Sign out
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
