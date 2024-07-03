"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import ContentfulService from "@/services/ContentfulService";
import BookItem from "../../../types/interfaces/BookItem";
import Spinner from "@/components/icons/Spinner";
import Search from "@/components/icons/Search";
import Arrow from "@/components/icons/Arrow";
import SearchImage from "../../../public/SearchImage";

interface SearchOptionsInterface {
  option: string;
  tabKeyword: string;
}

const searchOptions: SearchOptionsInterface[] = [
  {
    option: "Title",
    tabKeyword: "title",
  },
  {
    option: "Author",
    tabKeyword: "author",
  },
];

export default function Discover() {
  const limit = 5;
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState<BookItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchMode, setSearchMode] = useState<SearchOptionsInterface>(
    searchOptions[0]
  );
  const [page, setPage] = useState(1);

  const handleMoreBooks = async () => {
    const newBooks = await ContentfulService.getBooksByTabs(
      searchMode.tabKeyword,
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
        const newBooks = await ContentfulService.getBooksByTabs(
          searchMode.tabKeyword,
          searchTerm,
          limit,
          0
        );
        setBooks(newBooks);
        setLoading(false);
      } else {
        setBooks([]);
        setLoading(false);
      }
    })();
  }, [searchTerm, searchMode]);

  return (
    <div className="max-w-screen-lg mx-auto px-6 sm:px-8 mt-14">
      <div className="mb-10 text-base sm:text-lg md:text-xl lg:text-3xl font-bold text-center">
        Discover New Books
      </div>
      <div className="flex flex-col sm:flex-row gap-5">
        {/* Tabs */}
        <div className="flex flex-col gap-4 min-w-fit h-fit bg-bv-blue-dark px-4 py-8 border shadow-md rounded-md">
          <div className="uppercase italic text-gray-400 text-base px-3 pb-1 border-b-2">
            Search by:
          </div>
          {searchOptions.map((item) => (
            <button
              key={item.tabKeyword}
              onClick={() => setSearchMode(item)}
              className={`uppercase text-gray-200 font-medium text-base px-3 py-1 ${
                searchMode.option == item.option
                  ? "border-bv-purple"
                  : "text-gray-400 bg-opacity-20 border-transparent hover:border-bv-purple hover:border-opacity-40 transition-colors duration-300"
              } border-2 rounded-md bg-bv-blue-light`}
            >
              {item.option}
            </button>
          ))}
        </div>
        <div className="w-full border shadow-md rounded-md bg-bv-blue-dark px-6 py-8">
          {/* Search Bar */}
          <div className="w-full flex border rounded-md h-10 md:h-12 items-center bg-bv-blue-light gap-4">
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

          {/* Books - Search Results */}
          {searchTerm !== "" ? (
            <div className="flex items-center flex-col mt-5">
              <ul className="flex flex-col items-start w-full flex-wrap px-4 sm:px-6 lg:px-8 mt-4">
                {loading ? (
                  <div className="h-[calc(100vh-78px)] w-full flex justify-center items-center">
                    <Spinner />
                  </div>
                ) : books.length === 0 && searchTerm !== "" ? (
                  <p>No books.</p>
                ) : (
                  <>
                    {books.map((book, index) => (
                      <div
                        className={`flex items-center w-full  py-6 ${
                          index != 0 && "border-t-2 border-bv-blue-light"
                        }`}
                        key={book.bookId}
                      >
                        <li className="flex flex-row gap-4">
                          <Link
                            className="shrink-0"
                            href={`/discover/${book.bookId}`}
                          >
                            <div className=" border-white border-2 hover:border-bv-purple transition-colors duration-300">
                              <Image
                                src={book.cover?.url}
                                alt="Cover"
                                width={100}
                                height={150}
                                sizes="100vw"
                              />
                            </div>
                          </Link>
                          <div className="flex flex-col items-start">
                            <Link href={`/discover/${book.bookId}`}>
                              <h2 className="font-bold md:text-xl text-left hover:text-bv-purple-light transition-colors duration-300">
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
                      {books.length !== 0 && books.length % limit === 0 && (
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
          ) : (
            <div className="flex justify-center mt-5 scale-75 md:scale-100 ">
              <SearchImage />
            </div>
          )}
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
