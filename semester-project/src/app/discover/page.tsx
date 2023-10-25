"use client";

import Navbar from "../../components/Navbar";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import GoogleBooksService from "@/services/GoogleBooksService";

interface Image {
  thumbnail: string;
}

interface VolumeInfo {
  title: string;
  authors?: string[];
  imageLinks?: Image;
}

interface Book {
  id: string;
  volumeInfo: VolumeInfo;
}

export default function Discover() {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      setBooks(await GoogleBooksService(searchTerm))
    };

    searchTerm ? fetchBooks() : setBooks([]); // popraviti ovo, kad izbrišem input ne izbrišu se knjige
  }, [searchTerm]);

  return (
    <div>
      <Navbar />
      <div className="flex items-center flex-col">
        <br />
        <input
          className="border rounded-lg pl-2 w-6/12 max-w-xl"
          type="text"
          placeholder="Search for books"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <br />
        <ul className="flex flex-row justify-center gap-4 flex-wrap max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          {books.map((book) => (
            <div className="max-w-xs" key={book.id}>
              <Link href={`discover/${book.id}`}>
                <li className="flex flex-row gap-4">
                  {book.volumeInfo.imageLinks?.thumbnail && (
                    <Image
                      src={book.volumeInfo.imageLinks?.thumbnail}
                      alt="Cover"
                      width={0}
                      height={0}
                      sizes="100vw"
                      style={{ width: "30%", height: "auto" }}
                    />
                  )}
                  <div className="flex flex-col">
                    <h2 className="line-clamp-1">{book.volumeInfo.title}</h2>
                    <p className="line-clamp-1">
                      Author:{" "}
                      {book.volumeInfo.authors &&
                        book.volumeInfo.authors.join(", ")}
                    </p>
                  </div>
                </li>
              </Link>
              <br />
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
