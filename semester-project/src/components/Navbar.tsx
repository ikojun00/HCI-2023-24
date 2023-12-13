"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Community from "@/views/dropdown/Community";
import Discover from "@/views/dropdown/Discover";
import ReadingLog from "@/views/dropdown/ReadingLog";
import Book from "./icons/Book";
import SignInForm from "./SignInForm";
import Arrow from "./icons/Arrow";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  const handleDropdownClick = (index: number) => {
    activeDropdown === index
      ? setActiveDropdown(null)
      : setActiveDropdown(index);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
        setActiveDropdown(null);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleHamburgerMenu = () => {
    setIsOpen(!isOpen);
    setActiveDropdown(null);
  };

  const dropdowns = [
    { title: "Discover", component: <Discover /> },
    { title: "Reading Log", component: <ReadingLog /> },
    { title: "Community", component: <Community /> },
  ];

  const hamburgerIcon = (
    <button
      className="md:hidden block focus:outline-none"
      onClick={toggleHamburgerMenu}
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
          d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
        />
      </svg>
    </button>
  );

  return (
    <div className="flex justify-between items-center p-4">
      {hamburgerIcon}
      <Link href="/">
        <h1 className="flex items-center gap-2 text-xl font-bold">
          <Book /> BookVoyage
        </h1>
      </Link>
      <div className="flex gap-8">
        <div
          className={`md:flex ${
            isOpen
              ? "absolute text-center top-14 right-0 w-full pt-8 bg-slate-800"
              : "hidden gap-8"
          }`}
        >
          {dropdowns.map((item, index) => (
            <div
              className="flex flex-col items-center mb-8 md:block md:mb-0"
              key={index}
              onClick={() => handleDropdownClick(index)}
            >
              <h2 className="flex items-center max-w-fit gap-2 text-base font-semibold hover:bg-slate-700 p-2 rounded-lg cursor-pointer">
                {item.title}
                <Arrow active={activeDropdown === index} />
              </h2>
              {activeDropdown === index && <>{item.component}</>}
            </div>
          ))}
        </div>
        <SignInForm />
      </div>
    </div>
  );
}
