"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Book from "./icons/Book";
import SignInForm from "./SignInForm";
import Arrow from "./icons/Arrow";
import Dropdown from "@/views/dropdown/Dropdown";
import Searchbar from "./Searchbar";
import Search from "./icons/Search";
import NavbarItem from "../../types/interfaces/NavbarItem";
import ContentfulService from "@/services/ContentfulService";
import HamburgerIcon from "./icons/HamburgerIcon";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [showSearchbar, setShowSearchbar] = useState<boolean>(false);

  const handleSearchbar = () => {
    setShowSearchbar(!showSearchbar);
    !showSearchbar
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");
  };
  const [navbarNames, setNavbarNames] = useState<NavbarItem[]>([]);

  const handleDropdownClick = (index: number) => {
    activeDropdown === index
      ? setActiveDropdown(null)
      : setActiveDropdown(index);
  };

  useEffect(() => {
    (async () => {
      try {
        const data = await ContentfulService.getAllNavbarNames();
        setNavbarNames(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();

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

  const hamburgerIcon = (
    <button
      className="p-1 md:hidden block focus:outline-none"
      onClick={toggleHamburgerMenu}
    >
      <HamburgerIcon isOpen={isOpen} />
    </button>
  );

  return (
    <div className="sticky top-0 left-0 bg-slate-800 border-b-2">
      <div className="flex flex-col max-w-screen-xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex justify-between items-center p-4">
          {hamburgerIcon}
          <Link href="/">
            <div className="flex items-center gap-2">
              <Book inNavBar={true} />
              <h1 className="hidden sm:flex text-2xl font-bold">BookVoyage</h1>
            </div>
          </Link>
          <div className="flex gap-8 items-center">
            <div
              className={`md:flex ${
                isOpen
                  ? "absolute text-center top-16 right-0 w-full pt-8 bg-slate-800"
                  : "hidden gap-8"
              }`}
            >
              <div className="flex justify-center">
                <button
                  className="flex flex-row text-white md:mb-0 mb-8 bg-slate-700 p-1 md:hover:bg-slate-500 rounded-md pl-2 pr-20 py-2 gap-1"
                  onClick={handleSearchbar}
                >
                  <Search />
                  <h1>Search Books</h1>
                </button>
              </div>
              {showSearchbar && <Searchbar handleSearchbar={handleSearchbar} />}
              {navbarNames.map((item: NavbarItem, index: number) => (
                <div
                  className="flex flex-col items-center mb-8 md:block md:mb-0"
                  key={index}
                  onClick={() => handleDropdownClick(index)}
                >
                  <h2 className="flex items-center max-w-fit gap-2 text-base font-semibold p-2 rounded-lg cursor-pointer">
                    {item.title}
                    <Arrow active={activeDropdown === index} />
                  </h2>
                  {activeDropdown === index && (
                    <Dropdown dropdownItems={item.dropdowns} />
                  )}
                </div>
              ))}
            </div>
            <SignInForm />
          </div>
        </div>
      </div>
    </div>
  );
}
