"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import ContentfulService from "@/services/ContentfulService";
import BookItem from "../../../types/interfaces/BookItem";
import Spinner from "@/components/icons/Spinner";

export default function Discover() {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [books, setBooks] = useState<BookItem[] | []>([]);

  useEffect(() => {
    (async () => {
      if (searchTerm !== "") {
        setLoading(true);
        const newBooks = await ContentfulService.getBooksByTabs(
          "title",
          searchTerm,
          5,
          0
        );
        setBooks(newBooks);
        setLoading(false);
      }
    })();
  }, [searchTerm]);

  return (
    <div>
      <div>
        <div className="flex flex-col items-center max-w-screen-lg mx-auto px-2 sm:px-4 lg:px-6">
          <br />
          <br />
          <input
            className="border rounded-lg pl-2 md:w-96 text-black"
            type="text"
            placeholder="Search for books"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="flex items-center flex-col">
            <br />
            <ul className="flex flex-col items-start w-full gap-4 flex-wrap px-4 sm:px-6 lg:px-8 mt-4">
              {loading ? (
                <div className="h-[calc(100vh-78px)] flex justify-center items-center">
                  <Spinner />
                </div>
              ) : books.length === 0 && searchTerm !== "" ? (
                <p>No books.</p>
              ) : (
                books.map((book) => (
                  <div className="max-w-3xl" key={book.bookId}>
                    <Link href={`/discover/${book.bookId}`}>
                      <li className="flex flex-row gap-4">
                        <Image
                          src={book.cover?.url}
                          alt="Cover"
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{ width: "100px", height: "auto" }}
                        />
                        <div className="flex flex-col">
                          <h2 className="font-bold md:text-xl">{book.title}</h2>
                          <div className="flex flex-row gap-1 md:text-md">
                            <p>By:</p>
                            <p className="font-medium">{book.author}</p>
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

/*import Navbar from "../../components/Navbar";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import GoogleBooksService from "@/services/GoogleBooksService";
import ContentfulService from "@/services/ContentfulService";

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

export default function Discover() {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState<Book[] | undefined>([]);
  const [filter, setFilter] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      if (searchTerm !== "") {
        const newBooks = await GoogleBooksService(searchTerm, filter, category);
        newBooks === undefined
          ? setBooks(undefined)
          : setBooks(
              Array.from(
                new Set(newBooks.map((book: Book) => book.volumeInfo.title))
              ).map((title) =>
                newBooks.find((book: Book) => book.volumeInfo.title === title)
              )
            );
        const result = await ContentfulService.getAllBooks();
        console.log(result);
      }
    };
    fetchBooks(); // popraviti ovo, kad izbrišem input ne izbrišu se knjige
  }, [category, filter, searchTerm]);

  return (
    <div>
      <div className="flex flex-col max-w-screen-lg mx-auto px-2 sm:px-4 lg:px-6">
        <br />
        <br />
        <div className="flex items-center flex-col">
          <div className="flex justify-center gap-4 flex-col md:flex-row">
            <p>Browse by</p>
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
            <input
              className="border rounded-lg pl-2 md:w-96 text-black"
              type="text"
              placeholder="Search for books"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <br />
          <ul className="flex flex-col items-start w-full gap-4 flex-wrap px-4 sm:px-6 lg:px-8 mt-4">
            {books === undefined ? (
              <p>No books.</p>
            ) : (
              books.map((book) => (
                <div className="max-w-3xl" key={book.id}>
                  <Link
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
  );
}*/
