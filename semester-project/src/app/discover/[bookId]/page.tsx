"use client";

import ContentfulService from "@/services/ContentfulService";
import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import BookItem from "../../../../types/interfaces/BookItem";
import Spinner from "@/components/icons/Spinner";
import Reviews from "@/views/book/Reviews";
import AddBookOnBookshelf from "@/components/AddBookOnBookshelf";
import YellowStar from "@/components/icons/YellowStar";

export default function Book() {
  const [book, setBook] = useState<BookItem | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const pathname = usePathname().replace("/discover/", "");
  const [averageRating, setAverageRating] = useState<number>();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const newBook = await ContentfulService.getBookById(parseInt(pathname));
      setBook(newBook);
      setLoading(false);
    })();
  }, [pathname]);

  return (
    <main className="flex flex-col">
      <br />
      <br />
      <br />
      <div className="flex flex-col max-w-screen-xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex flex-row p-4">
          {loading ? (
            <div className="h-[calc(100vh-78px)] flex justify-center items-center">
              <Spinner />
            </div>
          ) : book === undefined ? (
            <p>No book.</p>
          ) : (
            <div className="flex flex-col gap-24">
              <div className="flex gap-4 flex-col md:flex-row">
                <div className="flex justify-center">
                  <Image
                    src={book.cover?.url}
                    alt="Cover"
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: "250px", height: "auto" }}
                  />
                </div>
                <div className="flex flex-col gap-4 md:justify-between md:p-8">
                  <div className="flex flex-col md:items-start items-center gap-4">
                    <h1 className="text-3xl font-bold">{book.title}</h1>
                    <div className="flex flex-row gap-1 items-center">
                      <h1>By:</h1>
                      <h1 className="text-xl font-bold">{book.author}</h1>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between md:items-center">
                    <AddBookOnBookshelf pathname={pathname} />
                    {averageRating && (
                      <div className="flex items-center gap-2">
                        <YellowStar />
                        <h1 className="text-xl font-bold">{averageRating}</h1>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold">Book Info</h1>
                <hr />
                <br />
                <p className="">{book.description}</p>
              </div>
              <Reviews
                setAverageRating={setAverageRating}
                pathname={pathname}
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
