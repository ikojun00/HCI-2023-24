"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Dropdown from "./Dropdown";

export default function Navbar() {
  const currentRoute = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 640) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-16">
        <div className="flex justify-between items-center w-full">
          <Link href="/">
            <h1 className="text-xl font-bold">📖 BookVoyage</h1>
          </Link>
          <div>
            {isOpen ? (
              <button
                className="sm:hidden block focus:outline-none"
                onClick={toggleMenu}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            ) : (
              <button
                className="sm:hidden block focus:outline-none"
                onClick={toggleMenu}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            )}
            <div
              className={`sm:flex justify-between ${
                isOpen ? "" : "hidden gap-8"
              }`}
            >
              {isOpen ? (
                <Dropdown heading="" />
              ) : (
                <>
                  <Link href="/discover">
                    <h2
                      className={`text-l font-semibold hover:underline ${
                        currentRoute === "/discover"
                          ? "text-green-500 underline"
                          : ""
                      }`}
                    >
                      Discover
                    </h2>
                  </Link>
                  <Dropdown heading="Community" />
                  <Link href="/reading-log">
                    <h2
                      className={`text-l font-semibold hover:underline ${
                        currentRoute === "/about"
                          ? "text-green-500 underline"
                          : ""
                      }`}
                    >
                      About
                    </h2>
                  </Link>
                  <Link href="/book-manager">
                    <h2
                      className={`text-l font-semibold hover:underline ${
                        currentRoute === "/about"
                          ? "text-green-500 underline"
                          : ""
                      }`}
                    >
                      Book Manager
                    </h2>
                  </Link>
                  <Link href="/signin">
                    <h2
                      className={`text-l font-semibold hover:underline ${
                        currentRoute === "/signin"
                          ? "text-green-500 underline"
                          : ""
                      }`}
                    >
                      Sign In
                    </h2>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
