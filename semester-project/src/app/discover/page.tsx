"use client";

import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

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
      try {
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&maxResults=4`
        );
        const bookData = response.data.items;
        setBooks(bookData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    searchTerm ? fetchBooks() : setBooks([]); // popraviti ovo
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
              <br />
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
