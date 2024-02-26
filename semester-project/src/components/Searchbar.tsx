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
}

export default function Searchbar({ handleSearchbar }: HandleSearchbarProps) {
  const limit = 5;
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState<BookItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [tabs, setTabs] = useState("title");
  const [page, setPage] = useState(1);

  const handleMoreBooks = async () => {
    const newBooks = await ContentfulService.getBooksByTabs(
      tabs,
      searchTerm,
      limit,
      limit * page
    );
    setBooks(books.concat(newBooks));
    setPage(page + 1);
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
      }
    })();
  }, [searchTerm, tabs]);

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="flex flex-col border-2 rounded-md w-9/12 md:w-8/12 lg:w-7/12 xl:w-6/12 mx-auto bg-slate-800">
        <div className="flex justify-end">
          <button className="text-white m-6 md:m-8" onClick={handleSearchbar}>
            <CloseButton />
          </button>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 px-4 sm:px-6 lg:px-8">
            <div className="w-full pl-4 flex border rounded-md h-10 md:h-12 items-center bg-slate-700 gap-4">
              <Search />
              <input
                className="pl-2 w-11/12 h-full focus:outline-none text-lg md:text-xl bg-slate-700"
                type="text"
                placeholder="Search for books"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-6 border-b">
              <button
                onClick={() => setTabs("title")}
                className={`${
                  tabs === "title" ? "border-yellow-400" : "border-slate-800"
                } border-b-2`}
              >
                Books
              </button>
              <button
                onClick={() => setTabs("author")}
                className={`${
                  tabs === "author" ? "border-yellow-400" : "border-slate-800"
                } border-b-2`}
              >
                Authors
              </button>
            </div>
          </div>

          <div className="w-full h-96 overflow-y-auto overflow-x-clip">
            <ul className="flex flex-col items-start gap-4 flex-wrap px-4 sm:px-6 lg:px-8 my-4">
              {loading ? (
                <div className="flex h-48 w-full justify-center items-center">
                  <Spinner />
                </div>
              ) : books.length === 0 && searchTerm !== "" ? (
                <p>No books.</p>
              ) : (
                <>
                  {books.map((book) => (
                    <div key={book.bookId}>
                      <li className="flex flex-row gap-4">
                        <Image
                          src={book.cover?.url}
                          alt="Cover"
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{ width: "auto", height: "100px" }}
                        />
                        <div className="flex flex-col">
                          <Link
                            href={`/discover/${book.bookId}`}
                            onClick={handleSearchbar}
                          >
                            <h2 className="font-bold text-base md:text-lg hover:underline">
                              {book.title}
                            </h2>
                          </Link>
                          <div className="flex flex-row gap-1 text-sm md:text-base">
                            <p>By:</p>
                            <p className="font-medium">{book.author}</p>
                          </div>
                        </div>
                      </li>
                    </div>
                  ))}
                  {books.length !== 0 && books.length % limit === 0 && (
                    <button onClick={() => handleMoreBooks()}>See more</button>
                  )}
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
