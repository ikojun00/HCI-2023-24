"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Spinner from "@/components/icons/Spinner";
import axios from "axios";
import { usePathname } from "next/navigation";
import { Backend_URL } from "@/lib/constants";
import ContentfulService from "@/services/ContentfulService";
import BookItem from "../../../../types/interfaces/BookItem";

export default function Genre() {
  const [books, setBooks] = useState<BookItem[]>([]);
  const pathname = usePathname().replace("/genres/", "");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await axios.get(`${Backend_URL}/genre/${pathname}`);
      const bookIds = res.data.map((item: { bookId: number }) => item.bookId);
      const bookPromises = bookIds.map((bookId: number) =>
        ContentfulService.getBookById(bookId)
      );
      const books = await Promise.all(bookPromises);
      setBooks(books);
      setLoading(false);
    })();
  }, [pathname]);

  return (
    <div>
      <div>
        <div className="flex flex-col max-w-screen-lg mx-auto px-6 sm:px-8">
          <h1 className="text-xl sm:text-2xl font-bold py-4 capitalize mt-6">
            {pathname}
          </h1>
          <div className="flex items-center flex-col">
            <ul className="flex flex-col items-start w-full gap-16 mt-4">
              {loading ? (
                <Spinner />
              ) : books.length === 0 ? (
                <p>No books.</p>
              ) : (
                books.map((book) => (
                  <div key={book.bookId}>
                    <li className="flex flex-row gap-8">
                      <Image
                        src={book.cover?.url}
                        alt="Cover"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "100px", height: "auto" }}
                      />
                      <div className="flex flex-col gap-2">
                        <Link href={`/discover/${book.bookId}`}>
                          <h2 className="text-2xl font-bold hover:underline">
                            {book.title}
                          </h2>
                        </Link>
                        <div className="flex flex-row gap-1 md:text-md">
                          <p>By:</p>
                          <p className="font-medium">{book.author}</p>
                        </div>
                      </div>
                    </li>
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
