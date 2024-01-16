"use client";

import ContentfulService from "@/services/ContentfulService";
import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import BookItem from "../../../../types/interfaces/BookItem";

export default function Book() {
  const [book, setBook] = useState<any>(); //figure this out, should be BookItem
  const pathname = usePathname().replace("/discover/", "");

  useEffect(() => {
    (async () => {
      const newBook = await ContentfulService.getBookById(pathname);
      setBook(newBook);
    })();
  }, [pathname]);

  return (
    <main className="flex flex-col">
      <br />
      <br />
      <br />
      <div className="flex flex-col max-w-screen-xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex flex-row p-4">
          {book === undefined ? (
            <p>No book.</p>
          ) : (
            <>
              <Image
                src={book.cover?.url}
                alt="Cover"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "auto", height: "300px" }}
              />
              <div className="flex flex-col pl-8 gap-4">
                <h1 className="text-3xl font-bold">{book.title}</h1>
                <div className="flex flex-row gap-1 items-center">
                  <h1>By:</h1>
                  <h1 className="text-xl font-bold">{book.author}</h1>
                </div>
                <br />
                <p>{book.description}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
