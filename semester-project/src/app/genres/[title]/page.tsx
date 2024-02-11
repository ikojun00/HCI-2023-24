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
        <div className="flex flex-col items-center max-w-screen-xl mx-auto px-2 sm:px-4 lg:px-6">
          <br />
          <br />
          <h1>{pathname}</h1>
          <div className="flex items-center flex-col">
            <br />
            <ul className="flex flex-col items-start w-full gap-4 flex-wrap px-4 sm:px-6 lg:px-8 mt-4">
              {loading ? (
                <div className="h-[calc(100vh-78px)] flex justify-center items-center">
                  <Spinner />
                </div>
              ) : books.length === 0 ? (
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
