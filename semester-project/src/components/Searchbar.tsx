"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import GoogleBooksService from "@/services/GoogleBooksService";
import CloseButton from "./icons/CloseButton";

interface Image {
  thumbnail: string;
}

interface VolumeInfo {
  title: string;
  authors?: string[];
  imageLinks?: Image;
  description?: string;
}

interface Book {
  id: string;
  volumeInfo: VolumeInfo;
}

interface HandleSearchbarProps {
  handleSearchbar: () => void;
}

export default function Searchbar({ handleSearchbar }: HandleSearchbarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState<Book[] | undefined>([]);
  const [filter, setFilter] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    (async () => {
      if (searchTerm !== "") {
        const newBooks = await GoogleBooksService(searchTerm, filter, category);
        setBooks(
          newBooks === undefined
            ? undefined
            : Array.from(
                new Set(newBooks.map((book: Book) => book.volumeInfo.title))
              ).map((title) =>
                newBooks.find((book: Book) => book.volumeInfo.title === title)
              )
        );
      }
    })();

    // popraviti ovo, kad izbrišem input ne izbrišu se knjige
  }, [category, filter, searchTerm]);

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="flex flex-col border-2 rounded-md w-9/12 md:w-8/12 lg:w-7/12 xl:w-6/12 mx-auto bg-slate-800">
        <div className="flex justify-end">
          <button className="text-white m-6 md:m-8" onClick={handleSearchbar}>
            <CloseButton />
          </button>
        </div>
        <div className="flex items-center flex-col">
          <div className="w-full md:h-12 flex justify-center gap-4 flex-col px-8">
            <input
              className="border rounded-md pl-2 h-full md:text-2xl text-black"
              type="text"
              placeholder="Search for books"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <select
              value={filter}
              className="text-black"
              onChange={(e) => {
                setFilter(e.target.value);
              }}
            >
              <option value="">All</option>
              <option value="inauthor:">Author</option>
              <option value="intitle:">Title</option>
              <option value="inpublisher:">Publisher</option>
            </select>
            <select
              value={category}
              className="text-black"
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              <option value="">All</option>
              <option value="+subject:fiction">Fiction</option>
              <option value="+subject:crime">Crime</option>
              <option value="+subject:poetry">Poetry</option>
              <option value="+subject:adventure">Adventure</option>
              <option value="+subject:travel">Travel</option>
              <option value="+subject:science">Science</option>
              <option value="+subject:cooking">Cooking</option>
              <option value="+subject:history">History</option>
            </select>
          </div>
          <br />
          <br />
          <div className="w-full h-96 overflow-y-auto overflow-x-clip">
            <ul className="flex flex-col items-start gap-4 flex-wrap px-4 sm:px-6 lg:px-8 mt-4">
              {books === undefined ? (
                <p>No books.</p>
              ) : (
                books.map((book) => (
                  <div key={book.id}>
                    <Link
                      onClick={handleSearchbar}
                      href={{
                        pathname: `discover/${book.id}`,
                        query: {
                          title: book.volumeInfo.title,
                          authors: book.volumeInfo.authors?.join(", "),
                          image: book.volumeInfo.imageLinks?.thumbnail,
                          description: book.volumeInfo.description,
                        },
                      }}
                    >
                      <li className="flex flex-row gap-4">
                        {book.volumeInfo.imageLinks?.thumbnail && (
                          <Image
                            src={book.volumeInfo.imageLinks?.thumbnail}
                            alt="Cover"
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: "auto", height: "100px" }}
                          />
                        )}
                        <div className="flex flex-col">
                          <h2 className="font-bold md:text-xl">
                            {book.volumeInfo.title}
                          </h2>
                          <div className="flex flex-row gap-1 md:text-md">
                            <p>By:</p>
                            <p className="font-medium">
                              {book.volumeInfo.authors?.join(", ")}
                            </p>
                          </div>
                        </div>
                      </li>
                    </Link>
                    <br />
                  </div>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
