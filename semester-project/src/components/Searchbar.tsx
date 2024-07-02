"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import CloseButton from "./icons/CloseButton";
import ContentfulService from "@/services/ContentfulService";
import BookItem from "../../types/interfaces/BookItem";
import Spinner from "./icons/Spinner";
import Search from "./icons/Search";

interface HandleSearchbarProps {
  handleSearchbar: () => void;
  isOpenMenuOnSmallScreen: boolean;
  toggleHamburgerMenu: () => void;
}

export default function Searchbar({
  handleSearchbar,
  isOpenMenuOnSmallScreen,
  toggleHamburgerMenu,
}: HandleSearchbarProps) {
  const limit = 5;
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState<BookItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [tabs, setTabs] = useState("title");
  const [page, setPage] = useState(1);
  const [noNewBooks, setNoNewBooks] = useState(false);

  const handleMoreBooks = async () => {
    const newBooks = await ContentfulService.getBooksByTabs(
      tabs,
      searchTerm,
      limit,
      limit * page
    );
    if (newBooks.length > 0) {
      setBooks(books.concat(newBooks));
      setPage(page + 1);
    } else {
      setNoNewBooks(true);
    }
  };

  useEffect(() => {
    (async () => {
      if (searchTerm !== "") {
        setPage(1);
        setLoading(true);
        setBooks(
          await ContentfulService.getBooksByTabs(tabs, searchTerm, limit, 0)
        );
        setLoading(false);
      } else {
        setBooks([]);
        setLoading(false);
      }
    })();
  }, [searchTerm, tabs]);

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="flex flex-col border-2 rounded-md px-2 w-9/12 md:w-8/12 lg:w-7/12 xl:w-6/12 mx-auto bg-bv-blue">
        <div className="flex justify-end">
          <button
            className="text-white mx-4 my-6 sm:mx-6 md:m-8"
            onClick={handleSearchbar}
          >
            <CloseButton />
          </button>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 px-4 sm:px-6 lg:px-8">
            <div className="w-full md:pl-4 flex border rounded-md h-10 md:h-12 items-center bg-bv-blue-light gap-4">
              <div className="pl-2 scale-75 md:scale-100">
                <Search color="white" />
              </div>
              <input
                className="w-11/12 h-full focus:outline-none text-base sm:text-lg md:text-xl bg-bv-blue-light"
                type="text"
                placeholder="Search for books"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-6">
              <button
                onClick={() => setTabs("title")}
                className={`text-sm md:text-base ${
                  tabs === "title"
                    ? "border-bv-purple "
                    : "border-b border-bv-blue-light text-gray-400 hover:border-bv-purple transition-colors duration-300"
                } border-b-2 uppercase text-base whitespace-nowrap`}
              >
                Books
              </button>
              <button
                onClick={() => setTabs("author")}
                className={`text-sm md:text-base ${
                  tabs === "author"
                    ? "border-bv-purple "
                    : "border-b border-bv-blue-light text-gray-400 hover:border-bv-purple transition-colors duration-300"
                } border-b-2 uppercase text-base whitespace-nowrap`}
              >
                Authors
              </button>
            </div>
          </div>

          <div className="w-full h-96 overflow-y-auto overflow-x-clip">
            <ul className="flex flex-col items-start flex-wrap px-4 sm:px-6 lg:px-8 my-4">
              {loading ? (
                <div className="flex h-48 w-full justify-center items-center">
                  <Spinner />
                </div>
              ) : books.length === 0 && searchTerm !== "" ? (
                <p>No books.</p>
              ) : (
                <>
                  {books.map((book, index) => (
                    <div
                      className={`flex items-center w-full  py-4 ${
                        index != 0 && "border-t-2 border-bv-blue-light"
                      }`}
                      key={book.bookId}
                    >
                      <li className="flex flex-row gap-4">
                        <Link
                          className="shrink-0"
                          href={`/discover/${book.bookId}`}
                          onClick={() => {
                            handleSearchbar();
                            isOpenMenuOnSmallScreen && toggleHamburgerMenu();
                          }}
                        >
                          <div className="border-white border-2 hover:border-bv-purple transition-colors duration-300">
                            <Image
                              src={book.cover?.url}
                              alt="Cover"
                              width={65}
                              height={100}
                              sizes="100vw"
                            />
                          </div>
                        </Link>
                        <div className="flex flex-col items-start">
                          <Link
                            href={`/discover/${book.bookId}`}
                            onClick={() => {
                              handleSearchbar();
                              isOpenMenuOnSmallScreen && toggleHamburgerMenu();
                            }}
                          >
                            <h2 className="font-semibold text-left text-base sm:text-lg md:text-xl hover:text-bv-purple-light transition-colors duration-300">
                              {book.title}
                            </h2>
                          </Link>
                          <div className="flex flex-row gap-1 text-sm sm:text-base md:text-md">
                            <span className="font-light">by </span>
                            <p className="font-medium">{book.author}</p>
                          </div>
                        </div>
                      </li>
                    </div>
                  ))}
                  <div className="flex w-full justify-center mt-2 mb-4">
                    {books.length !== 0 &&
                      books.length % limit === 0 &&
                      noNewBooks === false && (
                        <button
                          className="bg-bv-green hover:bg-bv-green-dark cursor-pointer font-medium text-base flex justify-between items-center rounded-lg py-2.5 px-3 transition-all duration-300"
                          onClick={handleMoreBooks}
                        >
                          Show more books
                        </button>
                      )}
                  </div>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
