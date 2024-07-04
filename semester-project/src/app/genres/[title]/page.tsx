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
    <div className="max-w-screen-lg mx-auto px-6 sm:px-8 mt-14">
      <h1 className="text-2xl sm:text-3xl font-semibold text-center capitalize mb-10">
        {pathname}
      </h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {books.length === 0 ? (
            <p className="col-span-full text-center text-lg">
              No books available.
            </p>
          ) : (
            books.map((book) => (
              <Link href={`/discover/${book.bookId}`} key={book.bookId}>
                <div className="flex flex-col items-center bg-bv-blue-dark px-4 py-6 rounded-lg h-full border-2 border-white hover:border-bv-purple transition-colors duration-300 ">
                  <div className="w-full h-48 relative mb-4">
                    <Image
                      src={book.cover?.url}
                      alt="Cover"
                      layout="fill"
                      objectFit="contain"
                      className="rounded"
                    />
                  </div>
                  <h2 className="text-lg font-semibold mb-2 text-center">
                    {book.title}
                  </h2>
                  <p className="text-sm text-gray-400 text-center">
                    by {book.author}
                  </p>
                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}
